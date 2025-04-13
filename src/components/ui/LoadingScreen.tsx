'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeDetector } from '@/hooks/useThemeDetector';

const LoadingScreen = () => {
  const [loading, setLoading] = useState(true);
  const { isDarkMode } = useThemeDetector();

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500); // 2.5 seconds loading time

    return () => clearTimeout(timer);
  }, []);

  // Wave animation for the ocean theme
  const waveVariants = {
    animate: {
      x: [-100, 0],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 5,
          ease: "linear",
        },
      },
    },
  };

  // Ship animation
  const shipVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        y: {
          repeat: Infinity,
          repeatType: "reverse",
          duration: 2,
          ease: "easeInOut",
        },
      },
    },
  };

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white dark:bg-gray-900 px-4 sm:px-6"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative w-full max-w-md">
            {/* Logo or Brand */}
            <motion.div
              className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-blue-400 mb-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Fahmi Hassan
            </motion.div>

            {/* Ocean Animation Container */}
            <div className="relative h-40 w-full overflow-hidden rounded-lg bg-blue-100 dark:bg-blue-900 mb-6 mx-auto">
              {/* Waves */}
              <motion.div
                className="absolute bottom-0 left-0 w-[200%] h-24"
                variants={waveVariants}
                animate="animate"
              >
                <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="h-full w-full">
                  <path
                    d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                    className="fill-blue-500 dark:fill-blue-600 opacity-40 dark:opacity-70"
                  ></path>
                  <path
                    d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
                    className="fill-blue-500 dark:fill-blue-600 opacity-60 dark:opacity-80"
                  ></path>
                  <path
                    d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
                    className="fill-blue-500 dark:fill-blue-600 opacity-80 dark:opacity-90"
                  ></path>
                </svg>
              </motion.div>

              {/* Large Detailed Ship - Center */}
              <motion.div
                className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-24 h-24"
                variants={shipVariants}
                animate="animate"
              >
                <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  {/* Ship Body */}
                  <path d="M20 50H100L95 75H25L20 50Z" fill={isDarkMode ? "#4A7FC1" : "#34568B"} stroke={isDarkMode ? "#6A9FE1" : "#1E3A5F"} strokeWidth="1.5" />
                  <path d="M30 30H90V50H30V30Z" fill={isDarkMode ? "#5D9CEB" : "#4A7FC1"} stroke={isDarkMode ? "#7DBCFF" : "#2A5F9E"} strokeWidth="1.5" />
                  <path d="M40 10H80V30H40V10Z" fill={isDarkMode ? "#7DBCFF" : "#5D9CEB"} stroke={isDarkMode ? "#9DCFFF" : "#3A7DCB"} strokeWidth="1.5" />
                  
                  {/* Mast and Sail */}
                  <rect x="58" y="10" width="4" height="65" fill={isDarkMode ? "#A67C52" : "#8B4513"} stroke={isDarkMode ? "#C69C72" : "#6A340F"} strokeWidth="1" />
                  <path d="M62 20C75 25 85 40 85 50H62V20Z" fill="#FFFFFF" stroke="#DDDDDD" strokeWidth="1" />
                  
                  {/* Flags */}
                  <rect x="62" y="10" width="20" height="5" fill="#FF0000" />
                  <rect x="62" y="15" width="15" height="5" fill="#FFFFFF" />
                  
                  {/* Windows */}
                  <circle cx="40" cy="40" r="3" fill={isDarkMode ? "#FFE566" : "#FFD700"} />
                  <circle cx="55" cy="40" r="3" fill={isDarkMode ? "#FFE566" : "#FFD700"} />
                  <circle cx="70" cy="40" r="3" fill={isDarkMode ? "#FFE566" : "#FFD700"} />
                  <circle cx="85" cy="40" r="3" fill={isDarkMode ? "#FFE566" : "#FFD700"} />
                  
                  {/* Cargo */}
                  <rect x="45" y="15" width="10" height="10" fill={isDarkMode ? "#E89B6E" : "#D2691E"} stroke={isDarkMode ? "#C67C4E" : "#8B4513"} strokeWidth="1" />
                </svg>
              </motion.div>

              {/* Sailboat - Left */}
              <motion.div
                className="absolute bottom-12 left-1/4 transform -translate-x-1/2 w-16 h-16"
                variants={{
                  animate: {
                    y: [0, -8, 0],
                    transition: {
                      y: {
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 2.5,
                        ease: "easeInOut",
                      },
                    },
                  },
                }}
                animate="animate"
              >
                <svg viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  {/* Ship Body */}
                  <path d="M20 50H80L75 65H25L20 50Z" fill={isDarkMode ? "#4A7FC1" : "#34568B"} stroke={isDarkMode ? "#6A9FE1" : "#1E3A5F"} strokeWidth="1" />
                  
                  {/* Mast and Sail */}
                  <rect x="48" y="20" width="3" height="45" fill={isDarkMode ? "#A67C52" : "#8B4513"} stroke={isDarkMode ? "#C69C72" : "#6A340F"} strokeWidth="1" />
                  <path d="M51 20C65 25 70 45 70 50H51V20Z" fill="#FFFFFF" stroke="#DDDDDD" strokeWidth="1" />
                  
                  {/* Flags */}
                  <rect x="51" y="20" width="15" height="3" fill="#FF6347" />
                  
                  {/* Cabin */}
                  <rect x="40" y="40" width="20" height="10" fill={isDarkMode ? "#5D9CEB" : "#4A7FC1"} stroke={isDarkMode ? "#7DBCFF" : "#2A5F9E"} strokeWidth="1" />
                  <rect x="45" y="42" width="10" height="6" fill={isDarkMode ? "#FFE566" : "#FFD700"} stroke={isDarkMode ? "#FFE566" : "#FFD700"} strokeWidth="0.5" />
                </svg>
              </motion.div>

              {/* Fishing Boat - Right */}
              <motion.div
                className="absolute bottom-10 left-3/4 transform -translate-x-1/2 w-14 h-14"
                variants={{
                  animate: {
                    y: [0, -6, 0],
                    transition: {
                      y: {
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 1.8,
                        ease: "easeInOut",
                      },
                    },
                  },
                }}
                animate="animate"
              >
                <svg viewBox="0 0 90 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  {/* Ship Body */}
                  <path d="M15 40H75L70 55H20L15 40Z" fill={isDarkMode ? "#4A7FC1" : "#34568B"} stroke={isDarkMode ? "#6A9FE1" : "#1E3A5F"} strokeWidth="1" />
                  
                  {/* Cabin */}
                  <rect x="25" y="25" width="25" height="15" fill={isDarkMode ? "#5D9CEB" : "#4A7FC1"} stroke={isDarkMode ? "#7DBCFF" : "#2A5F9E"} strokeWidth="1" />
                  <rect x="30" y="28" width="15" height="8" fill={isDarkMode ? "#FFE566" : "#FFD700"} stroke={isDarkMode ? "#FFE566" : "#FFD700"} strokeWidth="0.5" />
                  
                  {/* Fishing Rod */}
                  <rect x="60" y="20" width="2" height="30" fill={isDarkMode ? "#A67C52" : "#8B4513"} stroke={isDarkMode ? "#C69C72" : "#6A340F"} strokeWidth="0.5" />
                  <path d="M62 20C62 20 75 15 80 25" stroke="#000000" strokeWidth="0.5" fill="none" />
                  <path d="M80 25C80 25 80 30 80 35" stroke="#000000" strokeWidth="0.5" fill="none" />
                </svg>
              </motion.div>
            </div>

            {/* Loading Bar */}
            <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden px-0">
              <motion.div
                className="h-full bg-blue-600 dark:bg-blue-400 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 2.3, ease: "easeInOut" }}
              />
            </div>

            {/* Loading Text */}
            <motion.div
              className="mt-4 text-gray-600 dark:text-gray-300 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Setting sail...
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
