'use client';

import { motion } from 'framer-motion';
import { useId } from 'react';

interface AnimatedProfileAvatarProps {
  className?: string;
}

const AnimatedProfileAvatar = ({ className = '' }: AnimatedProfileAvatarProps) => {
  const id = useId();
  const gradientId = `avatar-gradient-${id}`;
  const patternId = `avatar-pattern-${id}`;
  
  return (
    <div className={`w-full h-full relative overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <motion.stop
              offset="0%"
              stopColor="#3b82f6"
              animate={{ stopColor: ['#3b82f6', '#60a5fa', '#3b82f6'] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.stop
              offset="100%"
              stopColor="#2563eb"
              animate={{ stopColor: ['#2563eb', '#1d4ed8', '#2563eb'] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
          </linearGradient>
          
          <pattern id={patternId} patternUnits="userSpaceOnUse" width="40" height="40" patternTransform="rotate(45)">
            <motion.rect 
              width="100%" 
              height="100%" 
              fill={`url(#${gradientId})`}
              animate={{ opacity: [0.7, 0.9, 0.7] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.circle 
              cx="20" 
              cy="20" 
              r="3" 
              fill="rgba(255, 255, 255, 0.4)"
              animate={{ r: [3, 4, 3] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </pattern>
        </defs>
        
        {/* Background circle */}
        <circle cx="100" cy="100" r="100" fill={`url(#${patternId})`} />
        
        {/* Head */}
        <motion.circle 
          cx="100" 
          cy="85" 
          r="40" 
          fill="#f8fafc"
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Body */}
        <motion.path 
          d="M60,125 Q100,170 140,125" 
          fill="#f8fafc"
          animate={{ d: ["M60,125 Q100,170 140,125", "M60,125 Q100,175 140,125", "M60,125 Q100,170 140,125"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Eyes */}
        <g>
          <motion.circle 
            cx="85" 
            cy="80" 
            r="5" 
            fill="#1e40af"
            animate={{ 
              scaleY: [1, 0.1, 1],
              y: [0, 0, 0]
            }}
            transition={{ 
              scaleY: { duration: 0.3, repeat: Infinity, repeatDelay: 3 },
              y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }}
          />
          <motion.circle 
            cx="115" 
            cy="80" 
            r="5" 
            fill="#1e40af"
            animate={{ 
              scaleY: [1, 0.1, 1],
              y: [0, 0, 0]
            }}
            transition={{ 
              scaleY: { duration: 0.3, repeat: Infinity, repeatDelay: 3 },
              y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }}
          />
        </g>
        
        {/* Smile */}
        <motion.path 
          d="M85,100 Q100,115 115,100" 
          fill="none" 
          stroke="#1e40af" 
          strokeWidth="3" 
          strokeLinecap="round"
          animate={{ 
            d: ["M85,100 Q100,115 115,100", "M85,105 Q100,120 115,105", "M85,100 Q100,115 115,100"] 
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Decorative elements */}
        <motion.circle 
          cx="65" 
          cy="50" 
          r="8" 
          fill="rgba(255, 255, 255, 0.6)"
          animate={{ 
            cx: [65, 68, 65],
            cy: [50, 48, 50]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.circle 
          cx="135" 
          cy="50" 
          r="5" 
          fill="rgba(255, 255, 255, 0.6)"
          animate={{ 
            cx: [135, 132, 135],
            cy: [50, 48, 50]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Code symbols */}
        <motion.text 
          x="70" 
          y="150" 
          fontSize="12" 
          fontFamily="monospace" 
          fill="rgba(255, 255, 255, 0.8)"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          &lt;/&gt;
        </motion.text>
        <motion.text 
          x="115" 
          y="150" 
          fontSize="12" 
          fontFamily="monospace" 
          fill="rgba(255, 255, 255, 0.8)"
          animate={{ opacity: [1, 0.6, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          {}
        </motion.text>
      </svg>
      
      {/* Animated border */}
      <motion.div 
        className="absolute inset-0 rounded-full border-4 border-transparent"
        animate={{ 
          borderColor: ['rgba(59, 130, 246, 0.5)', 'rgba(37, 99, 235, 0.5)', 'rgba(59, 130, 246, 0.5)'],
          rotate: [0, 360]
        }}
        transition={{ 
          borderColor: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 20, repeat: Infinity, ease: "linear" }
        }}
        style={{ borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }}
      />
    </div>
  );
};

export default AnimatedProfileAvatar;
