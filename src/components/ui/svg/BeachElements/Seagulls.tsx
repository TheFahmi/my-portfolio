'use client';

import { motion } from 'framer-motion';
import { useThemeDetector } from '@/hooks/useThemeDetector';

interface SeagullsProps {
  className?: string;
  count?: number;
}

const Seagulls = ({ className = '', count = 5 }: SeagullsProps) => {
  const { isDarkMode } = useThemeDetector();

  // Warna berdasarkan tema
  const colors = {
    body: isDarkMode ? '#E0E0E0' : '#FFFFFF',
    stroke: isDarkMode ? '#CCCCCC' : '#EEEEEE',
  };

  // Membuat data burung camar
  const seagulls = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 0.4 + 0.8, // Random scale antara 0.8 dan 1.2
    x: Math.random() * 80 + 10, // Posisi horizontal random 10% - 90%
    y: Math.random() * 30 + 5, // Posisi vertikal random 5% - 35%
    delay: Math.random() * 10,
    duration: Math.random() * 15 + 20,
    wingSpeed: Math.random() * 0.5 + 0.8, // Kecepatan kepakan sayap
  }));

  return (
    <div className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}>
      {seagulls.map((seagull) => (
        <motion.div
          key={seagull.id}
          className="absolute"
          style={{
            left: `${seagull.x}%`,
            top: `${seagull.y}%`,
            transform: `scale(${seagull.size})`,
          }}
          animate={{
            x: [-20, 30, -10, 20, -30],
            y: [0, 15, 5, 10, 0],
          }}
          transition={{
            x: {
              duration: seagull.duration,
              repeat: Infinity,
              repeatType: 'mirror',
              ease: "easeInOut",
              delay: seagull.delay,
            },
            y: {
              duration: seagull.duration * 0.7,
              repeat: Infinity,
              repeatType: 'mirror',
              ease: "easeInOut",
              delay: seagull.delay,
            },
          }}
        >
          <svg width="60" height="30" viewBox="0 0 60 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Burung dengan sayap animasi */}
            <g>
              {/* Badan burung */}
              <path d="M25 15 C30 15 35 16 40 15" stroke={colors.stroke} strokeWidth="2" fill="none" />
              
              {/* Kepala dan paruh */}
              <circle cx="40" cy="15" r="3" fill={colors.body} stroke={colors.stroke} strokeWidth="1" />
              <path d="M43 15 L46 14" stroke="#f59e0b" strokeWidth="1.5" fill="none" />
              
              {/* Sayap kiri */}
              <motion.path 
                d="M25 15 C20 12 15 13 10 10" 
                stroke={colors.body} 
                strokeWidth="2" 
                fill="none"
                animate={{
                  d: [
                    "M25 15 C20 12 15 13 10 10", 
                    "M25 15 C20 18 15 17 10 20", 
                    "M25 15 C20 12 15 13 10 10"
                  ]
                }}
                transition={{
                  duration: seagull.wingSpeed,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              
              {/* Sayap kanan */}
              <motion.path 
                d="M30 15 C25 12 20 13 15 10" 
                stroke={colors.body} 
                strokeWidth="2" 
                fill="none"
                animate={{
                  d: [
                    "M30 15 C25 12 20 13 15 10", 
                    "M30 15 C25 18 20 17 15 20", 
                    "M30 15 C25 12 20 13 15 10"
                  ]
                }}
                transition={{
                  duration: seagull.wingSpeed,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </g>
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

export default Seagulls;

