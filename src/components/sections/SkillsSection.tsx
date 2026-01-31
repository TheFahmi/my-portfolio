"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import siteConfig, { Skill } from "@/config/siteConfig";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const getLevelLabel = (level: number) => {
  if (level >= 90) return "Expert";
  if (level >= 80) return "Advanced";
  if (level >= 60) return "Intermediate";
  return "Beginner";
};

const SkillCard = ({ skill, index }: { skill: Skill; index: number }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="relative h-48 w-full cursor-pointer [perspective:1000px] group"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="w-full h-full relative transition-all duration-500 [transform-style:preserve-3d]"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-2xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-shadow flex flex-col justify-between overflow-hidden">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-cyan-400/10 rounded-full blur-2xl group-hover:bg-cyan-400/20 transition-colors" />
          
          <div className="relative z-10">
            <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
              {skill.name}
            </h4>
            <div className="h-1 w-12 bg-cyan-400 rounded-full" />
          </div>

          <div className="relative z-10 flex justify-between items-end">
             <span className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
               Flip for details
             </span>
             <div className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
               </svg>
             </div>
          </div>
        </div>

        <div 
          className="absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-2xl p-6 bg-slate-900 text-white border border-cyan-500/30 shadow-xl flex flex-col justify-between overflow-hidden [transform:rotateY(180deg)]"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 to-slate-900 z-0" />
          
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-2">
              <h4 className="text-lg font-bold text-cyan-400">
                {skill.name}
              </h4>
              <span className="px-2 py-0.5 text-xs font-bold bg-cyan-900/50 text-cyan-300 rounded-full border border-cyan-500/30">
                {getLevelLabel(skill.level)}
              </span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              {skill.description}
            </p>
          </div>

          <div className="relative z-10">
            <div className="flex justify-between text-xs font-medium text-slate-400 mb-1">
              <span>Proficiency</span>
              <span>{skill.level}%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-cyan-400"
                initial={{ width: 0 }}
                animate={{ width: isFlipped ? `${skill.level}%` : 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              />
            </div>
          </div>
        </div>
      </motion.div>

    </div>
  );
};

const SkillsSection = () => {
  const { skills } = siteConfig;
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <section id="skills" className="py-24 md:py-32 relative overflow-hidden bg-[#F5F1E8] dark:bg-[#2C2416]" ref={containerRef}>
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <motion.div style={{ y: y1 }} className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-cyan-400/5 rounded-full blur-3xl opacity-30" />
        <motion.div style={{ y: y2 }} className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 relative">
          <div>
            <span className="text-cyan-500 font-semibold tracking-wider uppercase mb-2 block">
              Capabilities
            </span>
            <ScrollReveal variant="slideUp" className="text-3xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white">
              Technical <span className="text-slate-400 dark:text-slate-600">Arsenal.</span>
            </ScrollReveal>
          </div>

          <ScrollReveal
            variant="fade"
            delay={0.2}
            className="hidden lg:block text-right"
          >
            <span className="block text-6xl font-bold text-slate-200 dark:text-slate-800">03</span>
            <span className="text-sm font-medium uppercase tracking-widest text-slate-400">Skillset</span>
          </ScrollReveal>
        </div>

        <div className="space-y-16">
          {skills.map((category, catIndex) => (
            <div key={category.title}>
              <ScrollReveal
                variant="slideLeft"
                delay={catIndex * 0.1}
                className="flex items-center gap-4 mb-8"
              >
                <div className="h-px flex-1 bg-gradient-to-r from-cyan-500/50 to-transparent" />
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white whitespace-nowrap">
                  {category.title}
                </h3>
                <div className="h-px flex-1 bg-gradient-to-l from-cyan-500/50 to-transparent" />
              </ScrollReveal>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {category.skills.map((skill, skillIndex) => (
                  <ScrollReveal
                    key={skill.name}
                    variant="slideUp"
                    delay={(catIndex * 0.1) + (skillIndex * 0.05)}
                  >
                    <SkillCard skill={skill} index={skillIndex} />
                  </ScrollReveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
