'use client';

import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

interface StarrySkyProps {
  className?: string;
  starCount?: number;
}

const StarrySky = ({ className = '', starCount = 50 }: StarrySkyProps) => {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Determine if dark mode is active
  const isDarkMode = mounted && (resolvedTheme === 'dark' || theme === 'dark');

  // Jika belum dimount atau tidak dalam dark mode, jangan render apapun
  if (!mounted || !isDarkMode) return null;

  // Membuat data bintang acak
  const stars = Array.from({ length: starCount }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 2, // Ukuran bintang lebih besar
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 5,
    duration: Math.random() * 3 + 1,
  }));

  // Tambahkan bintang-bintang super terang
  const brightStars = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1000,
    size: Math.random() * 3 + 4, // Ukuran lebih besar
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 2,
    duration: Math.random() * 4 + 2,
  }));

  return (
    <div
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{
        background: 'linear-gradient(to bottom, rgba(8, 30, 70, 0.7), transparent)',
      }}
    >
      {/* Background gradient bintang */}
      <div className="absolute w-full h-full" style={{
        background: 'radial-gradient(ellipse at top, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
        mixBlendMode: 'screen'
      }}></div>

      {/* Super bright stars */}
      {brightStars.map((star) => (
        <motion.div
          key={`superbright-${star.id}`}
          className="absolute bg-white rounded-full"
          style={{
            width: star.size,
            height: star.size,
            left: `${star.x}%`,
            top: `${star.y}%`,
            boxShadow: '0 0 8px 4px rgba(255, 255, 255, 0.8), 0 0 12px 6px rgba(255, 255, 255, 0.4)',
          }}
          animate={{
            opacity: [0.7, 1, 0.7],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
          }}
        />
      ))}

      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full"
          style={{
            width: star.size,
            height: star.size,
            left: `${star.x}%`,
            top: `${star.y}%`,
            boxShadow: '0 0 3px 2px rgba(255, 255, 255, 0.4)',
          }}
          animate={{
            opacity: [0.4, 1, 0.4],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
          }}
        />
      ))}

      {/* Bintang-bintang yang lebih besar dan lebih terang */}
      {stars.slice(0, 10).map((star) => (
        <motion.div
          key={`bright-${star.id}`}
          className="absolute bg-white rounded-full"
          style={{
            width: star.size + 2,
            height: star.size + 2,
            left: `${(star.x + 20) % 100}%`,
            top: `${(star.y + 15) % 100}%`,
            boxShadow: '0 0 6px 2px rgba(255, 255, 255, 0.7)',
          }}
          animate={{
            opacity: [0.6, 1, 0.6],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: star.duration * 1.5,
            repeat: Infinity,
            delay: star.delay * 0.8,
          }}
        />
      ))}

      {/* Bintang jatuh yang muncul secara acak */}
      <motion.div
        className="absolute bg-white rounded-full"
        style={{
          width: '3px',
          height: '3px',
          boxShadow: '0 0 8px 2px rgba(255, 255, 255, 0.9), 0 0 12px 6px rgba(255, 255, 255, 0.5)',
          top: '20%',
          left: '70%',
        }}
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 1, 0],
          x: [0, 100, 150],
          y: [0, 50, 100],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatDelay: 15,
        }}
      />

      <motion.div
        className="absolute bg-white rounded-full"
        style={{
          width: '3px',
          height: '3px',
          boxShadow: '0 0 8px 2px rgba(255, 255, 255, 0.9), 0 0 12px 6px rgba(255, 255, 255, 0.5)',
          top: '15%',
          left: '30%',
        }}
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 1, 0],
          x: [0, 120, 180],
          y: [0, 60, 120],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatDelay: 25,
          delay: 5,
        }}
      />
    </div>
  );
};

export default StarrySky;