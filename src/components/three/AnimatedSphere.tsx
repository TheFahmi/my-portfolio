'use client';

import { useRef, useState, useCallback, useEffect, Component, ReactNode } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';

function DistortedSphere() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
        }
    });

    return (
        <Sphere ref={meshRef} args={[1, 64, 64]} scale={2.4}>
            <MeshDistortMaterial
                color="#b08450"
                distort={0.35}
                speed={1.5}
                roughness={0.2}
                metalness={0.9}
            />
        </Sphere>
    );
}

// CSS-only fallback sphere when WebGL fails
function CSSFallbackSphere({ className = '' }: { className?: string }) {
    return (
        <div className={className}>
            <div className="w-full h-full flex items-center justify-center">
                <div
                    className="w-[60%] h-[60%] rounded-full animate-pulse"
                    style={{
                        background: 'radial-gradient(circle at 35% 35%, #dba66a, #b08450 40%, #8a6535 70%, #3d2e1a 100%)',
                        boxShadow: '0 0 120px 40px rgba(176, 132, 80, 0.15), 0 0 60px 20px rgba(176, 132, 80, 0.1)',
                        animation: 'spherePulse 4s ease-in-out infinite',
                    }}
                />
            </div>
            <style>{`
                @keyframes spherePulse {
                    0%, 100% { transform: scale(1); opacity: 0.9; }
                    50% { transform: scale(1.03); opacity: 1; }
                }
            `}</style>
        </div>
    );
}

// Error boundary to catch WebGL crashes
class WebGLErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { hasError: boolean }> {
    constructor(props: { children: ReactNode; fallback: ReactNode }) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback;
        }
        return this.props.children;
    }
}

// Check if WebGL is available
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

export default function AnimatedSphere({ className = '' }: { className?: string }) {
    const [webglSupported, setWebglSupported] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        if (!isWebGLAvailable()) {
            setWebglSupported(false);
        }
    }, []);

    const handleCreated = useCallback(() => {
        // Canvas created successfully
    }, []);

    const handleError = useCallback(() => {
        setHasError(true);
    }, []);

    if (!webglSupported || hasError) {
        return <CSSFallbackSphere className={className} />;
    }

    return (
        <WebGLErrorBoundary fallback={<CSSFallbackSphere className={className} />}>
            <div className={className}>
                <Canvas
                    camera={{ position: [0, 0, 5], fov: 75 }}
                    gl={{ antialias: true, alpha: true, powerPreference: 'default', failIfMajorPerformanceCaveat: false }}
                    style={{ background: 'transparent' }}
                    onCreated={handleCreated}
                    onError={handleError}
                    fallback={<CSSFallbackSphere className={className} />}
                >
                    <ambientLight intensity={0.4} />
                    <pointLight position={[10, 10, 10]} intensity={1.5} color="#dba66a" />
                    <pointLight position={[-10, -10, -5]} intensity={0.5} color="#8ca0b8" />
                    <directionalLight position={[0, 5, 5]} intensity={0.8} />
                    <DistortedSphere />
                    <Environment preset="night" />
                </Canvas>
            </div>
        </WebGLErrorBoundary>
    );
}
