"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import siteConfig from "@/config/siteConfig";
import ToggleableProfileImage from "@/components/ui/ToggleableProfileImage";
import { TypewriterEffect } from "@/components/ui/TypewriterEffect";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const HeroSection = () => {
  const { personalInfo, hero } = siteConfig;
  const { scrollY } = useScroll();
  const yBlob1 = useTransform(scrollY, [0, 1000], [0, 300]);
  const yBlob2 = useTransform(scrollY, [0, 1000], [0, -300]);
  const yContent = useTransform(scrollY, [0, 500], [0, 100]);

  const words = hero.subtitle.split(" ").map(word => ({
    text: word,
    className: "text-xl lg:text-2xl text-cyan-600 dark:text-cyan-400 font-bold"
  }));

  const parseStat = (value: string) => {
    const numericValue = parseInt(value.replace(/[^0-9]/g, ''));
    const suffix = value.replace(/[0-9]/g, '');
    return { 
      value: isNaN(numericValue) ? 0 : numericValue, 
      suffix 
    };
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 lg:pt-0 bg-white dark:bg-slate-950">
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div style={{ y: yBlob1 }} className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-cyan-400/10 dark:bg-cyan-500/10 rounded-full blur-[120px] animate-blob mix-blend-multiply dark:mix-blend-screen" />
        <motion.div style={{ y: yBlob2 }} className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-purple-400/10 dark:bg-purple-500/10 rounded-full blur-[120px] animate-blob animation-delay-2000 mix-blend-multiply dark:mix-blend-screen" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-slate-100/50 dark:bg-slate-900/50 rounded-full blur-[100px]" />
      </div>

      <motion.div style={{ y: yContent }} className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          <div className="flex flex-col space-y-6 lg:space-y-8 order-2 lg:order-1">
             <ScrollReveal 
              variant="slideLeft"
              delay={0.1}
              className="inline-flex items-center space-x-2 bg-slate-50 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-full px-4 py-1.5 w-fit shadow-sm"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
              </span>
              <span className="text-xs font-bold text-slate-600 dark:text-slate-300 tracking-wider uppercase">{hero.badge}</span>
            </ScrollReveal>

            <div className="space-y-2">
              <ScrollReveal 
                variant="slideUp"
                delay={0.2}
                className="text-xl md:text-2xl lg:text-3xl font-medium text-slate-500 dark:text-slate-400"
              >
                {hero.titlePrefix}
              </ScrollReveal>
              <ScrollReveal 
                variant="slideUp"
                delay={0.3}
                className="text-4xl sm:text-6xl lg:text-8xl font-black tracking-tighter text-slate-900 dark:text-white leading-[0.9] -ml-1"
              >
                {hero.titleHighlight.split(" ").map((word, i) => (
                  <span key={i} className="block">{word}</span>
                ))}
              </ScrollReveal>
              
              <ScrollReveal
                variant="fade"
                delay={0.5}
                className="pt-2 h-[40px] lg:h-[50px] flex items-center"
              >
                <TypewriterEffect words={words} className="text-left !text-xl lg:!text-3xl !font-bold" cursorClassName="bg-cyan-500" />
              </ScrollReveal>
            </div>

            <ScrollReveal 
              variant="slideUp"
              delay={0.6}
              className="text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-lg leading-relaxed font-medium"
            >
              {hero.description}
            </ScrollReveal>

            <ScrollReveal 
                variant="slideUp"
                delay={0.7}
                className="flex flex-wrap gap-2"
            >
                {hero.techStack.map((tech, idx) => (
                    <span key={idx} className="px-3 py-1 bg-white dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 text-sm font-semibold rounded-md border border-slate-200 dark:border-slate-700 shadow-sm">
                        {tech}
                    </span>
                ))}
            </ScrollReveal>

            <ScrollReveal 
              variant="slideUp"
              delay={0.8}
              className="flex flex-wrap gap-4 pt-2"
            >
              <Link
                href="#contact"
                className="px-8 py-4 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:scale-105 active:scale-95 transition-all duration-200 shadow-xl shadow-slate-900/20 dark:shadow-white/20"
              >
                Start a Project
              </Link>
              <Link
                href="#projects"
                className="px-8 py-4 rounded-full bg-transparent border-2 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200"
              >
                View Projects
              </Link>
            </ScrollReveal>

            <ScrollReveal 
              variant="fade"
              delay={1}
              className="pt-8 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {hero.quickStats.map((stat, idx) => {
                const { value, suffix } = parseStat(stat.number);
                return (
                  <div key={idx} className="flex flex-col items-start">
                    <AnimatedCounter value={value} suffix={suffix} />
                    <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider">{stat.label}</p>
                  </div>
                );
              })}
              
              <div className="flex flex-col items-start">
                <AnimatedCounter value={siteConfig.projects.length} />
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider">Total Projects</p>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal 
            variant="slideRight"
            duration={1}
            className="relative flex justify-center items-center order-1 lg:order-2 lg:h-[600px]"
          >
            <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] lg:w-[500px] lg:h-[500px]">
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-cyan-400/30 to-purple-500/30 rounded-full blur-[40px] lg:blur-[80px] animate-pulse" />
                
                <div className="absolute inset-0 rounded-[40px] lg:rounded-[60px] border border-cyan-500/20 dark:border-cyan-400/20 animate-[spin_10s_linear_infinite]" />
                <div className="absolute inset-4 rounded-[30px] lg:rounded-[50px] border border-purple-500/20 dark:border-purple-400/20 animate-[spin_15s_linear_infinite_reverse]" />

                <div className="absolute inset-8 lg:inset-10 rounded-[2rem] lg:rounded-[3rem] overflow-hidden bg-slate-100 dark:bg-slate-800 shadow-2xl rotate-3 hover:rotate-0 transition-all duration-500 group z-10 border-4 border-white dark:border-slate-900">
                    <ToggleableProfileImage
                        imageUrl={personalInfo.profileImage}
                        alt={personalInfo.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                 <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: [0, -10, 0], opacity: 1 }}
                    transition={{ 
                        y: { repeat: Infinity, duration: 4, ease: "easeInOut" },
                        opacity: { delay: 1.2, duration: 0.5 }
                    }}
                    className="absolute -bottom-4 -left-4 lg:bottom-10 lg:-left-10 z-20 bg-white dark:bg-slate-900 p-4 rounded-xl shadow-xl border border-slate-100 dark:border-slate-800 max-w-[160px] lg:max-w-[200px]"
                 >
                    <div className="flex items-center gap-2 mb-2">
                        <span className="flex h-2 w-2 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider">Current Stack</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                        {['Next.js', 'React', 'TS'].map((tag) => (
                            <span key={tag} className="text-[10px] font-mono px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded">
                                {tag}
                            </span>
                        ))}
                    </div>
                 </motion.div>

                 <div className="absolute top-10 -right-4 lg:top-20 lg:-right-10 flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-cyan-400/80" />
                    <div className="w-3 h-3 rounded-full bg-purple-400/80" />
                    <div className="w-3 h-3 rounded-full bg-slate-200/80 dark:bg-slate-700" />
                 </div>
            </div>
          </ScrollReveal>

        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
