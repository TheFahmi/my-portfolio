'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';

const LoadingScreen = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const { theme } = useTheme();

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 150);

    return () => clearInterval(progressInterval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const logoVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const dotVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-colors duration-300 ${
            theme === 'dark' ? 'bg-gray-900' : 'bg-white'
          }`}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 overflow-hidden">
            <div className={`absolute inset-0 ${
              theme === 'dark' 
                ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
                : 'bg-gradient-to-br from-gray-50 via-white to-gray-50'
            }`}>
              {/* Floating Dots */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`absolute w-2 h-2 rounded-full ${
                    theme === 'dark' ? 'bg-blue-400/20' : 'bg-blue-600/20'
                  }`}
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${30 + (i % 3) * 20}%`,
                  }}
                  variants={dotVariants}
                  animate={{
                    y: [-10, 10, -10],
                    opacity: [0.3, 0.7, 0.3],
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="relative z-10 text-center px-4 max-w-md">
            {/* Logo/Brand */}
            <motion.div
              variants={logoVariants}
              className="mb-12"
            >
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6 ${
                theme === 'dark' 
                  ? 'bg-gradient-to-br from-blue-600 to-blue-700' 
                  : 'bg-gradient-to-br from-blue-600 to-blue-700'
              } shadow-2xl`}>
                <span className="text-white text-2xl font-bold">FH</span>
              </div>
              
              <motion.h1
                className={`text-3xl font-bold mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
                variants={itemVariants}
              >
                Fahmi Hassan
              </motion.h1>
              
              <motion.p
                className={`text-lg ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}
                variants={itemVariants}
              >
                Full Stack Developer
              </motion.p>
              </motion.div>

            {/* Loading Progress */}
              <motion.div
              variants={itemVariants}
              className="w-full"
            >
              {/* Progress Bar */}
              <div className={`w-full h-1 rounded-full overflow-hidden mb-4 ${
                theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
              }`}>
              <motion.div
                  className="h-full bg-gradient-to-r from-blue-600 to-blue-500 rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>

              {/* Progress Text */}
              <motion.p
                className={`text-sm ${
                  theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                }`}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {progress < 100 ? 'Loading...' : 'Welcome!'}
              </motion.p>
            </motion.div>

            {/* Loading Dots Animation */}
            <motion.div
              variants={itemVariants}
              className="flex justify-center space-x-2 mt-8"
            >
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`w-2 h-2 rounded-full ${
                    theme === 'dark' ? 'bg-blue-400' : 'bg-blue-600'
                  }`}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </motion.div>
          </div>

          {/* Bottom Text */}
          <motion.div
            variants={itemVariants}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <p className={`text-xs ${
              theme === 'dark' ? 'text-gray-600' : 'text-gray-400'
            }`}>
              © 2024 Fahmi Hassan Portfolio
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
