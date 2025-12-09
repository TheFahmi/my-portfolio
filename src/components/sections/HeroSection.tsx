"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import siteConfig from "@/config/siteConfig";
import ToggleableProfileImage from "@/components/ui/ToggleableProfileImage";

const HeroSection = () => {
  const { personalInfo } = siteConfig;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <section id="home" className="relative min-h-[95vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Background Elements - Monochromatic/Subtle */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-slate-200/50 dark:bg-slate-800/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-slate-200/50 dark:bg-slate-800/20 rounded-full blur-[120px]" />
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col space-y-8"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-full px-4 py-2 w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-500"></span>
              </span>
              <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Available for projects</span>
            </motion.div>

            <motion.div variants={itemVariants} className="relative">
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                Full Stack <br />
                <span className="text-slate-500 dark:text-slate-400">
                  Engineer
                </span> <br />
                & Team Lead
              </h1>
            </motion.div>

            <motion.p variants={itemVariants} className="text-lg text-slate-600 dark:text-slate-400 max-w-lg leading-relaxed">
              Full Stack Developer specializing in the MERN stack, Vue.js, and Project Management. Transforming complex requirements into seamless web experiences.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <Link
                href="#contact"
                className="px-8 py-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold hover:scale-105 transition-transform duration-200 shadow-lg shadow-slate-900/20 dark:shadow-white/20"
              >
                Start a Project
              </Link>
              <Link
                href="#projects"
                className="px-8 py-4 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-200"
              >
                View Projects
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-8 border-t border-slate-200 dark:border-slate-800 grid grid-cols-3 gap-8">
              <div>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white">5+</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Years Exp.</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white">10+</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Projects</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white">ID</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Indonesia</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Image Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative lg:h-[600px] flex items-center justify-center p-4"
          >
            {/* Abstract Shapes behind - Monochrome */}
            <div className="absolute inset-0 bg-slate-200/50 dark:bg-slate-800/30 rounded-[2rem] transform rotate-3 scale-95 blur-sm" />

            <div className="relative w-full h-full max-h-[600px] rounded-[2rem] overflow-hidden border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm shadow-2xl">
              <ToggleableProfileImage
                imageUrl={personalInfo.profileImage}
                alt={personalInfo.name}
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
              />

              {/* Floating Badge */}
              <div className="absolute bottom-8 right-8 bg-white/10 backdrop-blur-md border border-slate-200/20 dark:border-slate-700/30 p-4 rounded-2xl max-w-[200px]">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-slate-900 dark:bg-white" />
                  <span className="text-xs font-semibold text-slate-900 dark:text-white">Latest Tech</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Built with Next.js 14 & React Server Components
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
