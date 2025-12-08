"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import siteConfig from "@/config/siteConfig";
import ToggleableProfileImage from "@/components/ui/ToggleableProfileImage";
import { TypewriterEffect } from "@/components/ui/TypewriterEffect";

const HeroSection = () => {
  const { hero, personalInfo } = siteConfig;

  // Prepare words for typewriter
  const words = [
    { text: "Build", className: "text-blue-500 dark:text-blue-500" },
    { text: "amazing", className: "text-blue-500 dark:text-blue-500" },
    { text: "apps", className: "text-blue-500 dark:text-blue-500" },
    { text: "with", className: "text-blue-500 dark:text-blue-500" },
    { text: "Fahmi.", className: "text-blue-500 dark:text-blue-500" },
  ];

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20 px-4 md:px-8">
      <div className="container mx-auto max-w-7xl z-10 relative">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

          {/* Text Content */}
          <div className="w-full lg:w-1/2 flex flex-col items-start space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-700 backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-xs font-semibold text-blue-600 dark:text-blue-300 tracking-wide uppercase">
                {hero.badge}
              </span>
            </motion.div>

            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white"
              >
                Hi, I'm <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300">
                  {hero.titleHighlight}
                </span>
              </motion.h1>

              <TypewriterEffect words={hero.subtitle.split(" ").map(word => ({ text: word }))} className="!text-left text-xl md:text-2xl text-slate-600 dark:text-slate-300 font-medium" cursorClassName="bg-blue-500 h-6 md:h-8" />

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-lg text-slate-600 dark:text-slate-400 max-w-lg leading-relaxed"
              >
                {hero.description}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <Link href="#projects" className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-blue-600 px-8 font-medium text-white transition-all duration-300 hover:bg-blue-700 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-50 dark:focus:ring-offset-slate-900">
                <span className="mr-2">View My Projects</span>
                <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>

              {siteConfig.features.enableDownloads && personalInfo.resumeUrl && (
                <a
                  href={personalInfo.resumeUrl}
                  download
                  className="inline-flex h-12 items-center justify-center rounded-md border border-slate-200 dark:border-slate-700 bg-transparent px-8 font-medium text-slate-900 dark:text-white transition-all duration-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 dark:focus:ring-offset-slate-900"
                >
                  <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Resume
                </a>
              )}
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="grid grid-cols-3 gap-6 pt-8 w-full max-w-md border-t border-slate-200 dark:border-slate-800 mt-4"
            >
              {hero.quickStats.map((stat, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">{stat.number}</span>
                  <span className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Image / Graphic */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end relative">
            <div className="relative w-72 h-72 md:w-[500px] md:h-[500px]">
              {/* Decorative blobs */}
              <div className="absolute top-0 right-0 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
              <div className="absolute -bottom-8 left-0 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
              <div className="absolute -bottom-8 right-20 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

              {/* Profile Image with modern frame */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                className="relative z-10 w-full h-full rounded-[2rem] overflow-hidden border-4 border-white/50 dark:border-slate-800/50 shadow-2xl backdrop-blur-sm"
              >
                <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800 animate-pulse" /> {/* Placeholder while loading */}
                <ToggleableProfileImage
                  imageUrl={personalInfo.profileImage}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover"
                />

                {/* Glass overlay effect */}
                <div className="absolute inset-0 ring-1 ring-inset ring-black/10 dark:ring-white/10 rounded-[2rem]"></div>
              </motion.div>

              {/* Floating tech stack icons could go here */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
