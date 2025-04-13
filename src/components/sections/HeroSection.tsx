"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import AnimatedBlob from "@/components/ui/svg/AnimatedBlob";
import WaveAnimation from "@/components/ui/svg/WaveAnimation";
import ToggleableProfileImage from "@/components/ui/ToggleableProfileImage";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="section-primary relative min-h-screen flex items-center bg-white dark:bg-gray-900 overflow-hidden transition-colors duration-300"
    >
      {/* SVG Background Animations */}
      <AnimatedBlob
        className="top-0 right-0 w-[600px] h-[600px] opacity-30 dark:opacity-60 -z-10"
        color="rgba(37, 99, 235, 0.15)"
        darkColor="rgba(59, 130, 246, 0.6)"
        duration={25}
      />
      {/* Removed second AnimatedBlob for cleaner design */}
      {/* Removed GeometricShapes and FloatingParticles for cleaner design */}
      <WaveAnimation
        className="bottom-0 left-0 -z-10"
        height={200}
        color="rgba(37, 99, 235, 0.2)"
        darkColor="rgba(59, 130, 246, 0.8)"
      />

      {/* Additional waves for layered effect */}
      <WaveAnimation
        className="bottom-0 left-0 -z-20"
        height={180}
        color="rgba(37, 99, 235, 0.15)"
        darkColor="rgba(59, 130, 246, 0.6)"
      />

      {/* More ships with different sizes and positions */}
      <WaveAnimation
        className="bottom-0 left-0 -z-10"
        height={150}
        color="rgba(37, 99, 235, 0.1)"
        darkColor="rgba(59, 130, 246, 0.4)"
      />

      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
                Hi, I&apos;m{" "}
                <span className="text-blue-600 dark:text-blue-400">
                  M Fahmi Hassan
                </span>
              </h1>
              <h2 className="text-2xl md:text-3xl font-medium mb-6 text-gray-700 dark:text-gray-300">
                Frontend Engineer & Team Lead
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-lg">
                A passionate Frontend Engineer with 4+ years of experience in
                creating innovative and impactful web applications.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="#projects" className="btn btn-primary">
                  View My Work
                </Link>
                <Link href="#contact" className="btn btn-secondary">
                  Contact Me
                </Link>
              </div>
            </motion.div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <AnimatedBlob
                className="bottom-0 left-0 w-[500px] h-[500px] opacity-20 dark:opacity-50 -z-10"
                color="rgba(37, 99, 235, 0.1)"
                darkColor="rgba(59, 130, 246, 0.5)"
                duration={30}
                delay={2}
              />

              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-blue-100 dark:bg-blue-900/50 overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl relative z-10">
                {/* Toggleable Profile Image */}
                <ToggleableProfileImage
                  className="w-full h-full"
                  imageUrl="/images/fahmi-profile.jpg"
                  alt="Fahmi Hassan - Frontend Engineer"
                />
              </div>
              <motion.div
                className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center text-white z-20"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, 0, -5, 0],
                }}
                transition={{
                  scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                  rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                }}
              >
                <span className="font-bold">4+</span>
                <span className="text-xs ml-1">
                  Years
                  <br />
                  Exp.
                </span>
              </motion.div>
            </motion.div>
          </div>
        </div>
        <div className="mt-16 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <Link
              href="#about"
              className="group flex flex-col items-center text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 cursor-pointer"
              aria-label="Scroll down to About section"
            >
              <span className="text-sm mb-2 hidden md:block font-medium">Scroll Down</span>
              <div className="w-8 h-12 md:w-10 md:h-14 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center pt-1 group-hover:border-blue-500 dark:group-hover:border-blue-400 transition-all duration-300 hover:shadow-md">
                <motion.div
                  className="w-1.5 h-1.5 md:w-2 md:h-2 bg-gray-400 dark:bg-gray-600 rounded-full group-hover:bg-blue-500 dark:group-hover:bg-blue-400 transition-colors duration-300"
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
