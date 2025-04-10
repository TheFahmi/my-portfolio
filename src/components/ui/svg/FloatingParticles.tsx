'use client';

import { motion } from 'framer-motion';
import { useId } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

interface FloatingParticlesProps {
  className?: string;
  count?: number;
  color?: string;
}

const FloatingParticles = ({ 
  className = '', 
  count = 20, 
  color = 'rgba(37, 99, 235, 0.3)' 
}: FloatingParticlesProps) => {
  const id = useId();
  
  // Generate random particles
  const generateParticles = (count: number): Particle[] => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 8 + 2,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
    }));
  };

  const particles = generateParticles(count);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <svg
        className="absolute top-0 left-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <radialGradient id={`particle-gradient-${id}`}>
            <stop offset="0%" stopColor={color} stopOpacity="0.8" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </radialGradient>
        </defs>
        
        {particles.map((particle) => (
          <motion.circle
            key={particle.id}
            cx={particle.x}
            cy={particle.y}
            r={particle.size}
            fill={`url(#particle-gradient-${id})`}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.8, 0],
              cx: [particle.x, particle.x + (Math.random() * 20 - 10)],
              cy: [particle.y, particle.y - (Math.random() * 20 + 5)],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>
    </div>
  );
};

export default FloatingParticles;
