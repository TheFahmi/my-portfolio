'use client';

import { useState, useEffect } from 'react';

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

        return () => {
            observer.disconnect();
        };
    }, []);

    return { isDarkMode, mounted };
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

export default function AnimatedSphere({ className = '' }: { className?: string }) {
    const { isDarkMode, mounted } = useThemeDetector();

    if (!mounted) {
        return <CSSFallbackSphere className={className} isDark={isDarkMode} />;
    }

    return <CSSFallbackSphere className={className} isDark={isDarkMode} />;
}
