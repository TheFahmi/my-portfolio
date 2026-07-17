'use client';

import { useRef, useState, useMemo, useCallback, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Theme-aware color palettes for the sphere
interface SphereTheme {
    bgColor: number;
    wireColor: number;
    wireOpacity: number;
    sphereColor: number;
    sphereOpacity: number;
    glowColor: number;
    particleColor: number;
    accentColor: number;
}

const SPHERE_THEMES: Record<'light' | 'dark', SphereTheme> = {
    light: {
        bgColor: 0xf5f0e8,
        wireColor: 0x000000,
        wireOpacity: 0.12,
        sphereColor: 0x0071e3,
        sphereOpacity: 0.15,
        glowColor: 0x0071e3,
        particleColor: 0x0071e3,
        accentColor: 0x0071e3,
    },
    dark: {
        bgColor: 0x0a0a0a,
        wireColor: 0xffffff,
        wireOpacity: 0.08,
        sphereColor: 0x0071e3,
        sphereOpacity: 0.2,
        glowColor: 0x0071e3,
        particleColor: 0xffffff,
        accentColor: 0x0071e3,
    },
};

// Check if WebGL is available (client-side only)
function isWebGLAvailable(): boolean {
    if (typeof window === 'undefined') return false;
    try {
        const canvas = document.createElement('canvas');
        return !!(
            window.WebGLRenderingContext &&
            (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
        );
    } catch {
        return false;
    }
}

// CSS-only fallback sphere with Apple-style pulse animation
function CSSFallbackSphere({ className = '', isDark = false }: { className?: string; isDark: boolean }) {
    return (
        <div
            className={`relative w-full h-full ${className}`}
            style={{
                minHeight: '300px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
            role="img"
            aria-label={isDark ? 'Interactive 3D sphere (dark mode)' : 'Interactive 3D sphere (light mode)'}
        >
            <style jsx>{`
                @keyframes spherePulse {
                    0%, 100% { transform: scale(1); opacity: 0.8; }
                    50% { transform: scale(1.02); opacity: 1; }
                }
                @keyframes innerPulse {
                    0%, 100% { transform: scale(1); opacity: 0.3; }
                    50% { transform: scale(1.3); opacity: 0.15; }
                }
            `}</style>
            <div
                className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full"
                style={{
                    background: isDark
                        ? 'radial-gradient(circle at 30% 30%, rgba(0, 113, 227, 0.15) 0%, transparent 70%)'
                        : 'radial-gradient(circle at 30% 30%, rgba(0, 113, 227, 0.1) 0%, transparent 70%)',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
                    boxShadow: isDark
                        ? '0 0 60px rgba(0, 113, 227, 0.08), inset 0 0 60px rgba(0, 113, 227, 0.04)'
                        : '0 0 60px rgba(0, 113, 227, 0.06), inset 0 0 60px rgba(0, 113, 227, 0.03)',
                    animation: 'spherePulse 4s ease-in-out infinite',
                }}
            >
                <div
                    className="absolute inset-0 rounded-full flex items-center justify-center"
                    style={{
                        background: isDark
                            ? 'radial-gradient(circle at 50% 50%, rgba(0, 113, 227, 0.08) 0%, transparent 70%)'
                            : 'radial-gradient(circle at 50% 50%, rgba(0, 113, 227, 0.05) 0%, transparent 70%)',
                    }}
                >
                    <div
                        className="w-16 h-16 rounded-full"
                        style={{
                            background: 'linear-gradient(135deg, #0071e3, #0056b3)',
                            opacity: 0.3,
                            animation: 'innerPulse 3s ease-in-out infinite',
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

// Theme detector for SSR-safe theme reading
function useThemeDetector() {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const root = document.documentElement;
        setIsDarkMode(root.classList.contains('dark'));

        const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    setIsDarkMode(root.classList.contains('dark'));
                }
            }
        });
        observer.observe(root, { attributes: true, attributeFilter: ['class'] });

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e: MediaQueryListEvent) => {
            if (!localStorage.getItem('theme')) {
                setIsDarkMode(e.matches);
            }
        };
        mediaQuery.addEventListener('change', handleChange);

        return () => {
            observer.disconnect();
            mediaQuery.removeEventListener('change', handleChange);
        };
    }, []);

    return { isDarkMode, mounted };
}

// WebGL error boundary for graceful fallback
function WebGLErrorBoundary({
    children,
    fallback,
}: {
    children: React.ReactNode;
    fallback: React.ReactElement;
}) {
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const handleError = (event: ErrorEvent) => {
            if (
                event.message?.includes('WebGL') ||
                event.message?.includes('three') ||
                event.message?.includes('canvas')
            ) {
                setHasError(true);
            }
        };
        window.addEventListener('error', handleError);
        return () => window.removeEventListener('error', handleError);
    }, []);

    if (hasError) return fallback;
    return <>{children}</>;
}

// Shared mutable drag state (outside React, safe for R3F)
const sharedDragState = {
    isDragging: false,
    dragOffset: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
    autoBlend: 0,
};

// Inner sphere mesh component
function InnerSphere({ config }: { config: SphereTheme }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;

        const { clock } = state;
        const ds = sharedDragState;

        if (ds.isDragging) {
            meshRef.current.rotation.x = ds.dragOffset.x;
            meshRef.current.rotation.y = ds.dragOffset.y;
        } else {
            ds.velocity.x *= 0.985;
            ds.velocity.y *= 0.985;
            ds.dragOffset.x += ds.velocity.x;
            ds.dragOffset.y += ds.velocity.y;

            meshRef.current.rotation.x = ds.dragOffset.x + Math.sin(clock.elapsedTime * 0.15) * 0.02;
            meshRef.current.rotation.y = ds.dragOffset.y + Math.cos(clock.elapsedTime * 0.12) * 0.02;

            if (Math.abs(ds.velocity.x) < 0.0001 && Math.abs(ds.velocity.y) < 0.0001) {
                ds.autoBlend += 0.0008;
                ds.dragOffset.x *= 1 - ds.autoBlend * 0.02;
                ds.dragOffset.y *= 1 - ds.autoBlend * 0.02;
            } else {
                ds.autoBlend = 0;
            }
        }
    });

    return (
        <mesh ref={meshRef} renderOrder={1}>
            <sphereGeometry args={[2.4, 64, 64]} />
            <meshPhysicalMaterial
                transparent
                opacity={config.sphereOpacity}
                color={config.sphereColor}
                metalness={0}
                roughness={0.3}
                clearcoat={1}
                clearcoatRoughness={0.1}
                transmission={0.1}
                thickness={0.5}
                ior={1.33}
            />
        </mesh>
    );
}

// Wireframe sphere
function WireSphere({ config }: { config: SphereTheme }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        const ds = sharedDragState;

        if (ds.isDragging) {
            meshRef.current.rotation.x = ds.dragOffset.x;
            meshRef.current.rotation.y = ds.dragOffset.y;
        } else {
            ds.velocity.x *= 0.985;
            ds.velocity.y *= 0.985;
            ds.dragOffset.x += ds.velocity.x;
            ds.dragOffset.y += ds.velocity.y;

            meshRef.current.rotation.x = ds.dragOffset.x + Math.sin(state.clock.elapsedTime * 0.15) * 0.02;
            meshRef.current.rotation.y = ds.dragOffset.y + Math.cos(state.clock.elapsedTime * 0.12) * 0.02;

            if (Math.abs(ds.velocity.x) < 0.0001 && Math.abs(ds.velocity.y) < 0.0001) {
                ds.autoBlend += 0.0008;
                ds.dragOffset.x *= 1 - ds.autoBlend * 0.02;
                ds.dragOffset.y *= 1 - ds.autoBlend * 0.02;
            } else {
                ds.autoBlend = 0;
            }
        }
    });

    return (
        <mesh ref={meshRef} renderOrder={2}>
            <sphereGeometry args={[2.52, 64, 32]} />
            <meshBasicMaterial
                transparent
                opacity={config.wireOpacity}
                color={config.wireColor}
                wireframe
                depthWrite={false}
            />
        </mesh>
    );
}

// Particle system
function Particles({ config }: { config: SphereTheme }) {
    const pointsRef = useRef<THREE.Points>(null);

    useFrame((state) => {
        if (!pointsRef.current) return;
        const ds = sharedDragState;

        const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
        const time = state.clock.elapsedTime;

        for (let i = 0; i < positions.length; i += 3) {
            const x = positions[i];
            const y = positions[i + 1];
            const z = positions[i + 2];

            const radius = Math.sqrt(x * x + y * y + z * z);
            const theta = Math.atan2(y, x);
            const phi = Math.acos(z / radius);

            const wave = Math.sin(radius * 2 - time * 1.5 + theta * 2) * 0.03;
            const newRadius = radius + wave;

            positions[i] = newRadius * Math.sin(phi) * Math.cos(theta);
            positions[i + 1] = newRadius * Math.sin(phi) * Math.sin(theta);
            positions[i + 2] = newRadius * Math.cos(phi);
        }
        pointsRef.current.geometry.attributes.position.needsUpdate = true;

        if (!ds.isDragging) {
            pointsRef.current.rotation.y += 0.0002;
            pointsRef.current.rotation.x += 0.0001;
        } else {
            pointsRef.current.rotation.x = ds.dragOffset.x;
            pointsRef.current.rotation.y = ds.dragOffset.y;
        }
    });

    const positions = new Float32Array(1500 * 3);
    for (let i = 0; i < 1500; i++) {
        const radius = 2.8 + Math.random() * 0.8;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = radius * Math.cos(phi);
    }

    return (
        <points ref={pointsRef} renderOrder={3}>
            <bufferGeometry>
                <bufferAttribute args={[positions, 3]} attach="attributes-position" />
            </bufferGeometry>
            <pointsMaterial
                size={0.018}
                color={config.particleColor}
                transparent
                opacity={0.6}
                sizeAttenuation
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

// Glow sphere
function GlowSphere({ config }: { config: SphereTheme }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        const ds = sharedDragState;

        if (ds.isDragging) {
            meshRef.current.rotation.x = ds.dragOffset.x;
            meshRef.current.rotation.y = ds.dragOffset.y;
        } else {
            meshRef.current.rotation.y += 0.0003;
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.02;
        }

        const pulse = Math.sin(state.clock.elapsedTime * 1.5) * 0.15 + 0.85;
        if (meshRef.current.material instanceof THREE.MeshBasicMaterial) {
            meshRef.current.material.opacity = 0.08 * pulse;
        }
    });

    return (
        <mesh ref={meshRef} renderOrder={0}>
            <sphereGeometry args={[3.2, 32, 32]} />
            <meshBasicMaterial
                transparent
                opacity={0.08}
                color={config.glowColor}
                side={THREE.BackSide}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </mesh>
    );
}

// Main Canvas content
function SphereCanvas({ config }: { config: SphereTheme }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const previousPointer = useRef({ x: 0, y: 0 });
    const lastDragTime = useRef(0);

    // Attach DOM-level pointer events for drag interaction
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const ds = sharedDragState;

        const onPointerDown = (e: PointerEvent) => {
            if (e.pointerType !== 'mouse') return;
            ds.isDragging = true;
            previousPointer.current = { x: e.clientX, y: e.clientY };
            ds.velocity = { x: 0, y: 0 };
            ds.autoBlend = 0;
            lastDragTime.current = performance.now();
            el.setPointerCapture(e.pointerId);
            el.style.cursor = 'grabbing';
        };

        const onPointerMove = (e: PointerEvent) => {
            if (!ds.isDragging) return;

            const deltaX = e.clientX - previousPointer.current.x;
            const deltaY = e.clientY - previousPointer.current.y;

            const sensitivity = 0.008;
            ds.dragOffset.y += deltaX * sensitivity;
            ds.dragOffset.x += deltaY * sensitivity;

            const now = performance.now();
            const dt = now - lastDragTime.current;
            if (dt > 0) {
                ds.velocity = {
                    x: (deltaY * sensitivity) / (dt / 16),
                    y: (deltaX * sensitivity) / (dt / 16),
                };
            }
            lastDragTime.current = now;

            previousPointer.current = { x: e.clientX, y: e.clientY };
        };

        const onPointerUp = () => {
            ds.isDragging = false;
            el.style.cursor = 'grab';
        };

        el.addEventListener('pointerdown', onPointerDown);
        el.addEventListener('pointermove', onPointerMove);
        el.addEventListener('pointerup', onPointerUp);
        el.addEventListener('pointercancel', onPointerUp);

        return () => {
            el.removeEventListener('pointerdown', onPointerDown);
            el.removeEventListener('pointermove', onPointerMove);
            el.removeEventListener('pointerup', onPointerUp);
            el.removeEventListener('pointercancel', onPointerUp);
        };
    }, []);

    return (
        <div ref={containerRef} style={{ width: '100%', height: '100%', cursor: 'grab' }}>
            <Canvas
                camera={{ position: [0, 0, 8], fov: 35 }}
                gl={{ antialias: true, alpha: true, preserveDrawingBuffer: false, powerPreference: 'high-performance' }}
                onCreated={({ gl }) => {
                    gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
                }}
                style={{ touchAction: 'none' }}
            >
                <color attach="background" args={[config.bgColor]} />
                <fog attach="fog" args={[config.bgColor, 5, 15]} />

                <GlowSphere config={config} />
                <InnerSphere config={config} />
                <WireSphere config={config} />
                <Particles config={config} />

                <ambientLight intensity={0.6} color={config.accentColor} />
                <directionalLight position={[5, 10, 7]} intensity={1.2} color={0xffffff} />
                <pointLight position={[-5, -5, 5]} intensity={0.5} color={config.accentColor} />
            </Canvas>
        </div>
    );
}

export default function AnimatedSphere({ className = '' }: { className?: string }) {
    const [webglSupported, setWebglSupported] = useState(true);
    const [hasError, setHasError] = useState(false);
    const { isDarkMode, mounted } = useThemeDetector();

    const config = useMemo(
        () => (isDarkMode ? SPHERE_THEMES.dark : SPHERE_THEMES.light),
        [isDarkMode]
    );

    const handleError = useCallback(() => {
        setHasError(true);
    }, []);

    useEffect(() => {
        if (!isWebGLAvailable()) {
            setWebglSupported(false);
        }
    }, []);

    // Don't render WebGL during SSR/hydration
    if (!mounted) {
        return <CSSFallbackSphere className={className} isDark={isDarkMode} />;
    }

    if (!webglSupported || hasError) {
        return <CSSFallbackSphere className={className} isDark={isDarkMode} />;
    }

    return (
        <WebGLErrorBoundary fallback={<CSSFallbackSphere className={className} isDark={isDarkMode} />}>
            <SphereCanvas config={config} />
        </WebGLErrorBoundary>
    );
}
