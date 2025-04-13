'use client';

import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

const ProjectsComingSoon = () => {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // After mounting, we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  // Determine if dark mode is active
  const isDarkMode = mounted && (resolvedTheme === 'dark' || theme === 'dark');

  return (
    <section id="projects" className={`section-alt py-20 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} relative overflow-hidden transition-colors duration-300`}>
      {/* Decorative circles */}
      <div className={`absolute top-1/6 left-0 w-72 h-72 rounded-full ${isDarkMode ? 'bg-blue-900/20' : 'bg-blue-100/30'} z-0`}></div>
      <div className={`absolute bottom-1/10 right-0 w-80 h-80 rounded-full ${isDarkMode ? 'bg-blue-900/20' : 'bg-blue-100/30'} z-0`}></div>

      {/* Animated floating circles */}
      <motion.div
        className={`absolute top-1/4 right-1/12 w-12 h-12 rounded-full ${isDarkMode ? 'bg-blue-900/30' : 'bg-blue-100/40'} z-0`}
        animate={{
          y: [0, -10, 0],
          x: [0, 5, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      <motion.div
        className={`absolute bottom-1/3 left-1/8 w-16 h-16 rounded-full ${isDarkMode ? 'bg-blue-900/30' : 'bg-blue-100/40'} z-0`}
        animate={{
          y: [0, 15, 0],
          x: [0, -8, 0]
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3
        }}
      />
      <motion.div
        className={`absolute top-2/3 right-1/4 w-10 h-10 rounded-full ${isDarkMode ? 'bg-blue-900/30' : 'bg-blue-100/40'} z-0`}
        animate={{
          y: [0, 8, 0],
          x: [0, -5, 0]
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>My Projects</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-8"></div>
          <p className={`text-lg max-w-2xl mx-auto mb-10 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Check back soon to see my portfolio of projects.
          </p>
        </motion.div>

        {/* Coming Soon Display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`max-w-3xl mx-auto ${isDarkMode ? 'bg-gray-700' : 'bg-white'} rounded-xl shadow-lg overflow-hidden`}
        >
          <div className={`relative h-60 bg-gradient-to-r ${isDarkMode ? 'from-blue-600/30 to-purple-600/30' : 'from-blue-500/20 to-purple-500/20'} overflow-hidden`}>
            {/* Animated dots */}
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-2 h-2 rounded-full ${isDarkMode ? 'bg-white/30' : 'bg-white/40'}`}
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

            {/* Ship animation */}
            <motion.div
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-16 h-16"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <svg viewBox="0 0 24 24" className="w-full h-full">
                <path
                  d="M20 21C18.61 21 17.22 20.53 16 19.67C13.56 21.38 10.44 21.38 8 19.67C6.78 20.53 5.39 21 4 21H2V19H4C5.37 19 6.74 18.38 7.58 17.38C8.25 16.5 9.42 16.5 10.08 17.38C11.54 19.38 14.46 19.38 15.92 17.38C16.58 16.5 17.75 16.5 18.42 17.38C19.26 18.38 20.62 19 22 19H22V21H20ZM20 3H15V8H20L18 5L20 3ZM4 3H9V8H4L6 5L4 3ZM17 8V5H12V8H17ZM12 10V13H17V10H12ZM9 10H4V13H9V10ZM9 5V8H12V5H9Z"
                  className={isDarkMode ? 'fill-blue-300' : 'fill-blue-800'}
                />
              </svg>
            </motion.div>
          </div>

          <div className="p-8 text-center">
            <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-700'} mb-4`}>
              Projects Coming Soon
            </h3>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
              I&apos;m currently working on some exciting projects that will be showcased here.
              Check back soon to see my portfolio of work including web applications, mobile apps,
              and other development projects.
            </p>

            {/* Progress indicator */}
            <div className={`w-full max-w-md mx-auto h-2 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'} rounded-full overflow-hidden mb-6`}>
              <motion.div
                className={`h-full ${isDarkMode ? 'bg-blue-500' : 'bg-blue-600'} rounded-full`}
                initial={{ width: 0 }}
                animate={{ width: '75%' }}
                transition={{
                  duration: 1.5,
                  ease: "easeInOut",
                }}
              />
            </div>

            {/* Animated tools icons */}
            <div className="flex justify-center space-x-6">
              <motion.div
                className={`w-12 h-12 flex items-center justify-center rounded-full ${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'}`}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0 }}
              >
                <i className="fas fa-code text-lg"></i>
              </motion.div>
              <motion.div
                className={`w-12 h-12 flex items-center justify-center rounded-full ${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'}`}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                <i className="fas fa-paint-brush text-lg"></i>
              </motion.div>
              <motion.div
                className={`w-12 h-12 flex items-center justify-center rounded-full ${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'}`}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                <i className="fas fa-cog text-lg"></i>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsComingSoon;
