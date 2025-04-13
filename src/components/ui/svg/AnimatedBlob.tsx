'use client';

import { motion } from 'framer-motion';
import { useId } from 'react';
import { useThemeDetector } from '@/hooks/useThemeDetector';

interface AnimatedBlobProps {
  className?: string;
  color?: string;
  darkColor?: string;
  duration?: number;
  delay?: number;
}

const AnimatedBlob = ({
  className = '',
  color = 'rgba(37, 99, 235, 0.15)',
  darkColor = 'rgba(59, 130, 246, 0.5)',
  duration = 20,
  delay = 0
}: AnimatedBlobProps) => {
  const id = useId();
  const { isDarkMode } = useThemeDetector();

  // Use dark color in dark mode if provided
  const activeColor = isDarkMode && darkColor ? darkColor : color;
  
  // Higher opacity values for dark mode
  const startOpacity = isDarkMode ? 0.9 : 0.7;
  const endOpacity = isDarkMode ? 0.6 : 0.3;

  return (
    <motion.div
      className={`absolute ${className}`}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1, delay }}
    >
      <motion.svg
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        animate={{
          rotate: [0, 10, -10, 0],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <defs>
          <linearGradient id={`gradient-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: activeColor, stopOpacity: startOpacity }} />
            <stop offset="100%" style={{ stopColor: activeColor, stopOpacity: endOpacity }} />
          </linearGradient>
        </defs>
        <motion.path
          fill={`url(#gradient-${id})`}
          d="M40.4,-47.1C54.6,-34.9,69.8,-24.2,74.5,-9.8C79.2,4.6,73.4,22.8,62.3,35.5C51.2,48.2,34.9,55.4,17.8,60.1C0.7,64.8,-17.1,67,-31.4,60.5C-45.7,54,-56.5,38.9,-63.1,21.8C-69.7,4.7,-72.1,-14.3,-64.9,-28.5C-57.7,-42.7,-40.9,-52.1,-25.2,-64C-9.5,-75.9,5.1,-90.3,16.8,-86.5C28.5,-82.7,37.2,-60.7,40.4,-47.1Z"
          transform="translate(100 100)"
          animate={{
            d: [
              "M40.4,-47.1C54.6,-34.9,69.8,-24.2,74.5,-9.8C79.2,4.6,73.4,22.8,62.3,35.5C51.2,48.2,34.9,55.4,17.8,60.1C0.7,64.8,-17.1,67,-31.4,60.5C-45.7,54,-56.5,38.9,-63.1,21.8C-69.7,4.7,-72.1,-14.3,-64.9,-28.5C-57.7,-42.7,-40.9,-52.1,-25.2,-64C-9.5,-75.9,5.1,-90.3,16.8,-86.5C28.5,-82.7,37.2,-60.7,40.4,-47.1Z",
              "M47.3,-57.2C59.9,-45.1,68.2,-28.5,71.5,-10.7C74.8,7.1,73.1,26.1,63.3,38.9C53.5,51.7,35.6,58.3,17.8,63.1C0,67.9,-17.8,70.9,-33.9,65.2C-50,59.5,-64.5,45.1,-71.6,27.3C-78.7,9.5,-78.5,-11.7,-70.1,-28.5C-61.7,-45.3,-45.1,-57.7,-28.5,-67.3C-11.9,-76.9,4.7,-83.7,19.5,-79.1C34.3,-74.5,47.3,-58.5,47.3,-57.2Z",
              "M53.9,-63.2C68.2,-51.9,77.5,-33.7,79.3,-15.3C81.1,3.1,75.4,21.7,65.3,36.1C55.2,50.5,40.7,60.7,24.4,67.8C8.1,74.9,-10,78.9,-25.4,73.9C-40.8,68.9,-53.5,55,-63.1,39.2C-72.7,23.4,-79.2,5.7,-76.9,-10.8C-74.6,-27.3,-63.5,-42.7,-49.4,-54C-35.3,-65.3,-18.2,-72.5,0.5,-73.1C19.1,-73.7,38.2,-67.7,53.9,-63.2Z",
              "M40.4,-47.1C54.6,-34.9,69.8,-24.2,74.5,-9.8C79.2,4.6,73.4,22.8,62.3,35.5C51.2,48.2,34.9,55.4,17.8,60.1C0.7,64.8,-17.1,67,-31.4,60.5C-45.7,54,-56.5,38.9,-63.1,21.8C-69.7,4.7,-72.1,-14.3,-64.9,-28.5C-57.7,-42.7,-40.9,-52.1,-25.2,-64C-9.5,-75.9,5.1,-90.3,16.8,-86.5C28.5,-82.7,37.2,-60.7,40.4,-47.1Z"
            ],
          }}
          transition={{
            duration: duration * 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.svg>
    </motion.div>
  );
};

export default AnimatedBlob;
