"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTheme } from "next-themes";
import ToggleableProfileImage from "@/components/ui/ToggleableProfileImage";

const HeroSection = () => {
  const { theme } = useTheme();

  const quickStats = [
    { number: '4+', label: 'Years' },
    { number: '50+', label: 'Projects' },
    { number: '100%', label: 'Quality' },
  ];

  const techStack = ['React', 'Next.js', 'TypeScript', 'TailwindCSS'];

  return (
    <section
      id="home"
      className={`min-h-screen flex items-center py-20 transition-colors duration-300 ${
        theme === 'dark' 
          ? 'bg-gray-900' 
          : 'bg-white'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          {/* Left Content */}
          <motion.div 
            className="lg:w-1/2 text-center lg:text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-8 ${
                theme === 'dark' 
                  ? 'bg-gray-800 text-gray-300 border border-gray-700' 
                  : 'bg-gray-100 text-gray-600 border border-gray-200'
              }`}
            >
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              Available for work
            </motion.div>

            {/* Main Heading */}
            <motion.h1 
              className={`text-5xl lg:text-6xl font-bold mb-6 leading-tight ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
                             Hi, I&apos;m{" "}
              <span className={`${
                theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
              }`}>
                Fahmi Hassan
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.h2 
              className={`text-xl lg:text-2xl font-medium mb-8 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Frontend Engineer & Team Lead
            </motion.h2>

            {/* Description */}
            <motion.p 
              className={`text-lg mb-8 max-w-xl leading-relaxed ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              I create innovative web applications with modern technologies. 
              Passionate about clean code, user experience, and team collaboration.
            </motion.p>

            {/* Tech Stack */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mb-10"
            >
              <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                {techStack.map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      theme === 'dark' 
                        ? 'bg-gray-800 text-gray-300 border border-gray-700' 
                        : 'bg-gray-50 text-gray-700 border border-gray-200'
                    }`}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <Link 
                href="#projects" 
                className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                View My Work
              </Link>
              <Link 
                href="#contact" 
                className={`px-8 py-3 rounded-lg font-semibold border-2 transition-all duration-300 ${
                  theme === 'dark'
                    ? 'border-gray-700 text-gray-300 hover:bg-gray-800'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Contact Me
              </Link>
            </motion.div>

            {/* Quick Stats */}
            <motion.div 
              className="flex justify-center lg:justify-start gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              {quickStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.3 + index * 0.1 }}
                  className="text-center"
                >
                  <div className={`text-2xl font-bold ${
                    theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                  }`}>
                    {stat.number}
                  </div>
                  <div className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Profile Image */}
          <motion.div 
            className="lg:w-1/2 flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative">
              {/* Main Profile Image Container */}
              <motion.div
                className="relative w-80 h-80 lg:w-96 lg:h-96"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Simple Border */}
                <div className={`absolute inset-0 rounded-full p-2 ${
                  theme === 'dark' 
                    ? 'bg-gray-800 border border-gray-700' 
                    : 'bg-gray-100 border border-gray-200'
                } shadow-xl`}>
                  <div className="w-full h-full rounded-full overflow-hidden">
                    <ToggleableProfileImage
                      className="w-full h-full object-cover"
                      imageUrl="/images/fahmi-profile.jpg"
                      alt="Fahmi Hassan - Frontend Engineer"
                    />
                  </div>
                </div>

                {/* Simple Badge */}
                <motion.div
                  className={`absolute -bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-full text-sm font-semibold shadow-lg ${
                    theme === 'dark' 
                      ? 'bg-gray-800 text-gray-300 border border-gray-700' 
                      : 'bg-white text-gray-700 border border-gray-200'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.4 }}
                >
                  Frontend Engineer
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Down Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.5 }}
        >
          <Link
            href="#about"
            className={`flex flex-col items-center transition-colors duration-300 ${
              theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <span className="text-sm mb-2">Scroll Down</span>
            <div className={`w-6 h-10 border-2 rounded-full flex justify-center pt-2 ${
              theme === 'dark' ? 'border-gray-600' : 'border-gray-400'
            }`}>
              <motion.div
                className={`w-1 h-1 rounded-full ${
                  theme === 'dark' ? 'bg-gray-400' : 'bg-gray-600'
                }`}
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
