'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface ComingSoonProps {
  className?: string;
  title?: string;
  subtitle?: string;
}

const ComingSoon = ({ 
  className = '', 
  title = 'Coming Soon', 
  subtitle = 'This project is currently under development' 
}: ComingSoonProps) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Background with animated gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 dark:from-blue-600/30 dark:to-purple-600/30"></div>
      
      {/* Animated dots */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-white/40 dark:bg-white/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full p-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Coming Soon Text */}
          <h3 className="text-xl md:text-2xl font-bold text-blue-700 dark:text-blue-400 mb-2">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm md:text-base">
            {subtitle}
          </p>
          
          {/* Progress indicator */}
          <div className="w-32 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mx-auto">
            <motion.div
              className="h-full bg-blue-600 dark:bg-blue-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '70%' }}
              transition={{
                duration: 1.5,
                ease: "easeInOut",
              }}
            />
          </div>
          
          {/* Animated tools icons */}
          <div className="flex justify-center mt-4 space-x-3">
            <motion.div
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
            >
              <i className="fas fa-code text-xs"></i>
            </motion.div>
            <motion.div
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
            >
              <i className="fas fa-paint-brush text-xs"></i>
            </motion.div>
            <motion.div
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
            >
              <i className="fas fa-cog text-xs"></i>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ComingSoon;
