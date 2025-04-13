'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Navbar from './Navbar.client';
import Footer from './Footer.client';
import LoadingScreen from '@/components/ui/LoadingScreen';
import BeachSection from '@/components/ui/svg/BeachElements/BeachSection';
import StarrySky from '@/components/ui/svg/BeachElements/StarrySky';
import { motion } from 'framer-motion';
import { ThemeProvider } from 'next-themes';
import ScrollToTopButton from '../ui/ScrollToTopButton';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time or wait for resources
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <OceanThemedLayout>
          {children}
        </OceanThemedLayout>
      )}
    </ThemeProvider>
  );
}

// Separate component to use theme hooks after ThemeProvider is mounted
function OceanThemedLayout({ children }: { children: React.ReactNode }) {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Determine if dark mode is active
  const isDarkMode = mounted && (resolvedTheme === 'dark' || theme === 'dark');

  // Floating bubbles animation for ocean theme
  const bubbles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 30 + 10,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 15,
  }));

  // Cloud data
  const clouds = [
    { left: 10, top: 15, width: 120, delay: 0, duration: 20, opacity: 0.8 },
    { left: 30, top: 8, width: 150, delay: 5, duration: 25, opacity: 0.7 },
    { left: 55, top: 12, width: 100, delay: 2, duration: 18, opacity: 0.75 },
    { left: 75, top: 5, width: 130, delay: 8, duration: 22, opacity: 0.85 },
    { left: 85, top: 20, width: 90, delay: 4, duration: 23, opacity: 0.7 },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
      <Navbar />

      {/* Starry sky - will only show in dark mode naturally */}
      <div className="fixed inset-0 z-[-2] pointer-events-none overflow-hidden">
        <StarrySky starCount={150} />
      </div>

      {/* Clouds in the sky - more visible in light mode */}
      <div className="fixed inset-0 z-[-3] pointer-events-none overflow-hidden">
        {clouds.map((cloud, index) => (
          <Cloud
            key={index}
            left={cloud.left}
            top={cloud.top}
            width={cloud.width}
            delay={cloud.delay}
            duration={cloud.duration}
            opacity={isDarkMode ? cloud.opacity * 0.3 : cloud.opacity}
          />
        ))}
      </div>

      {/* Ocean-themed background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-5]">
        {/* Floating bubbles */}
        {bubbles.map((bubble) => (
          <motion.div
            key={bubble.id}
            className={`absolute rounded-full ${isDarkMode ? 'bg-ocean-400/20' : 'bg-ocean-300/10'}`}
            style={{
              width: bubble.size,
              height: bubble.size,
              left: `${bubble.left}%`,
              bottom: '-50px',
              zIndex: -1
            }}
            animate={{
              y: [0, -window.innerHeight - 100],
              opacity: [0, 0.7, 0],
            }}
            transition={{
              y: {
                duration: bubble.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: bubble.delay,
              },
              opacity: {
                duration: bubble.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: bubble.delay,
                times: [0, 0.1, 1]
              }
            }}
          />
        ))}

        {/* Subtle wave pattern at the top */}
        <div className="absolute top-0 left-0 w-full h-32 bg-waves-pattern opacity-5" style={{ zIndex: -1 }}></div>
      </div>

      <main className="flex-grow pt-16">{children}</main>

      {/* Fixed wave and beach elements at the bottom of the layout */}
      <div className="relative overflow-hidden w-full" style={{ maxWidth: '100vw' }}>
        <div className="relative" style={{ height: '300px', overflow: 'hidden' }}>
          {/* Beach elements (sand, starfish, shells) */}
          <BeachSection className="absolute bottom-0 left-0 w-full" />

          {/* Wave animation removed as requested */}
        </div>
      </div>

      <Footer />
      <ScrollToTopButton />
    </div>
  );
}

// Cloud component for the background
const Cloud = ({ left, top, width, delay, duration, opacity }: {
  left: number;
  top: number;
  width: number;
  delay: number;
  duration: number;
  opacity: number;
}) => {
  return (
    <motion.div
      className="absolute bg-white dark:bg-gray-300 rounded-full"
      style={{
        left: `${left}%`,
        top: `${top}%`,
        width: width,
        height: width * 0.6,
        boxShadow: '0px 0px 20px 8px rgba(255, 255, 255, 0.15)',
        opacity: opacity
      }}
      animate={{
        x: [0, 20, 0, -20, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
};
