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
          className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-colors duration-500 ${theme === 'dark' ? 'bg-slate-950' : 'bg-slate-50'
            }`}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Main Content */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Logo Animation */}
            <motion.div
              variants={logoVariants}
              className="mb-8 relative"
            >
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-slate-700 to-slate-900 flex items-center justify-center shadow-2xl shadow-slate-500/20">
                <span className="text-white text-3xl font-bold tracking-tighter">FH</span>
              </div>
              <motion.div
                className="absolute -inset-4 rounded-3xl border border-slate-500/20"
                animate={{ scale: [1, 1.1, 1], opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>

            <motion.div variants={itemVariants} className="text-center space-y-2 mb-12">
              <h1 className={`text-3xl md:text-4xl font-bold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}>
                Fahmi<span className="text-slate-500">Hassan</span>
              </h1>
              <p className={`text-sm tracking-widest uppercase font-medium ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'
                }`}>
                Full Stack Engineer
              </p>
            </motion.div>

            {/* Progress Bar */}
            <motion.div
              variants={itemVariants}
              className="w-64 max-w-[80vw]"
            >
              <div className={`w-full h-1 rounded-full overflow-hidden mb-3 ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-200'
                }`}>
                <motion.div
                  className="h-full bg-slate-800 dark:bg-slate-200 rounded-full shadow-[0_0_10px_rgba(100,116,139,0.5)]"
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1, ease: "linear" }}
                />
              </div>

              <div className="flex justify-between text-[10px] font-medium tracking-wider uppercase">
                <span className={theme === 'dark' ? 'text-slate-600' : 'text-slate-400'}>Loading Assets</span>
                <span className={theme === 'dark' ? 'text-slate-500' : 'text-slate-500'}>{Math.round(progress)}%</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
