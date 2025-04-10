'use client';

import { motion } from 'framer-motion';
import { useId } from 'react';

interface AnimatedAboutAvatarProps {
  className?: string;
}

const AnimatedAboutAvatar = ({ className = '' }: AnimatedAboutAvatarProps) => {
  const id = useId();
  const gradientId = `about-gradient-${id}`;
  const patternId = `about-pattern-${id}`;
  
  return (
    <div className={`w-full h-full relative ${className}`}>
      <svg
        viewBox="0 0 400 500"
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
          
          <pattern id={patternId} patternUnits="userSpaceOnUse" width="20" height="20" patternTransform="rotate(45)">
            <rect width="100%" height="100%" fill="#f8fafc" />
            <rect width="2" height="20" fill="rgba(59, 130, 246, 0.1)" x="0" y="0" />
            <rect width="20" height="2" fill="rgba(59, 130, 246, 0.1)" x="0" y="0" />
          </pattern>
        </defs>
        
        {/* Background */}
        <rect width="400" height="500" fill={`url(#${patternId})`} />
        
        {/* Decorative elements */}
        <motion.circle 
          cx="50" 
          cy="50" 
          r="30" 
          fill="rgba(59, 130, 246, 0.1)"
          animate={{ 
            r: [30, 35, 30],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.circle 
          cx="350" 
          cy="450" 
          r="40" 
          fill="rgba(59, 130, 246, 0.1)"
          animate={{ 
            r: [40, 45, 40],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Laptop */}
        <g>
          <motion.rect 
            x="100" 
            y="200" 
            width="200" 
            height="120" 
            rx="10" 
            fill="#1e40af"
            animate={{ y: [200, 198, 200] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.rect 
            x="110" 
            y="210" 
            width="180" 
            height="100" 
            rx="5" 
            fill="#60a5fa"
            animate={{ opacity: [0.9, 1, 0.9] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.rect 
            x="80" 
            y="320" 
            width="240" 
            height="10" 
            rx="5" 
            fill="#1e40af"
            animate={{ y: [320, 318, 320] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path 
            d="M80,325 L80,335 C80,342 86,350 95,350 L305,350 C314,350 320,342 320,335 L320,325 Z" 
            fill="#1e3a8a"
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </g>
        
        {/* Code on screen */}
        <motion.g
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <rect x="120" y="220" width="160" height="5" rx="2" fill="#f8fafc" />
          <rect x="120" y="235" width="140" height="5" rx="2" fill="#f8fafc" />
          <rect x="120" y="250" width="160" height="5" rx="2" fill="#f8fafc" />
          <rect x="120" y="265" width="120" height="5" rx="2" fill="#f8fafc" />
          <rect x="120" y="280" width="150" height="5" rx="2" fill="#f8fafc" />
          <rect x="120" y="295" width="130" height="5" rx="2" fill="#f8fafc" />
        </motion.g>
        
        {/* Person */}
        <g>
          {/* Head */}
          <motion.circle 
            cx="200" 
            cy="120" 
            r="50" 
            fill="#f8fafc"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Face */}
          <g>
            <motion.circle 
              cx="180" 
              cy="110" 
              r="5" 
              fill="#1e40af"
              animate={{ 
                scaleY: [1, 0.1, 1],
                y: [0, 0, 0]
              }}
              transition={{ 
                scaleY: { duration: 0.3, repeat: Infinity, repeatDelay: 3 },
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }}
            />
            <motion.circle 
              cx="220" 
              cy="110" 
              r="5" 
              fill="#1e40af"
              animate={{ 
                scaleY: [1, 0.1, 1],
                y: [0, 0, 0]
              }}
              transition={{ 
                scaleY: { duration: 0.3, repeat: Infinity, repeatDelay: 3 },
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }}
            />
            <motion.path 
              d="M180,140 Q200,155 220,140" 
              fill="none" 
              stroke="#1e40af" 
              strokeWidth="3" 
              strokeLinecap="round"
              animate={{ 
                d: ["M180,140 Q200,155 220,140", "M180,145 Q200,160 220,145", "M180,140 Q200,155 220,140"] 
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </g>
          
          {/* Body */}
          <motion.path 
            d="M150,170 Q200,190 250,170 L250,200 Q200,220 150,200 Z" 
            fill="#3b82f6"
            animate={{ 
              d: [
                "M150,170 Q200,190 250,170 L250,200 Q200,220 150,200 Z",
                "M150,170 Q200,195 250,170 L250,200 Q200,225 150,200 Z",
                "M150,170 Q200,190 250,170 L250,200 Q200,220 150,200 Z"
              ] 
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Arms */}
          <motion.path 
            d="M150,180 L100,230" 
            fill="none" 
            stroke="#3b82f6" 
            strokeWidth="20" 
            strokeLinecap="round"
            animate={{ 
              d: [
                "M150,180 L100,230",
                "M150,180 L100,225",
                "M150,180 L100,230"
              ] 
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path 
            d="M250,180 L300,230" 
            fill="none" 
            stroke="#3b82f6" 
            strokeWidth="20" 
            strokeLinecap="round"
            animate={{ 
              d: [
                "M250,180 L300,230",
                "M250,180 L300,225",
                "M250,180 L300,230"
              ] 
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
          
          {/* Hands typing */}
          <motion.circle 
            cx="100" 
            cy="230" 
            r="15" 
            fill="#f8fafc"
            animate={{ 
              y: [0, -5, 0],
              x: [0, 5, 0]
            }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.circle 
            cx="300" 
            cy="230" 
            r="15" 
            fill="#f8fafc"
            animate={{ 
              y: [0, -5, 0],
              x: [0, -5, 0]
            }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
        </g>
        
        {/* Code symbols floating */}
        <motion.text 
          x="50" 
          y="400" 
          fontSize="20" 
          fontFamily="monospace" 
          fill="rgba(59, 130, 246, 0.5)"
          animate={{ 
            y: [400, 380, 400],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          &lt;/&gt;
        </motion.text>
        <motion.text 
          x="330" 
          y="100" 
          fontSize="20" 
          fontFamily="monospace" 
          fill="rgba(59, 130, 246, 0.5)"
          animate={{ 
            y: [100, 80, 100],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          {}
        </motion.text>
        <motion.text 
          x="280" 
          y="350" 
          fontSize="16" 
          fontFamily="monospace" 
          fill="rgba(59, 130, 246, 0.5)"
          animate={{ 
            y: [350, 330, 350],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          ()=&gt;
        </motion.text>
      </svg>
    </div>
  );
};

export default AnimatedAboutAvatar;
