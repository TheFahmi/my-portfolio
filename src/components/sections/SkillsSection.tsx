"use client";

import { motion } from "framer-motion";
import siteConfig from "@/config/siteConfig";

const SkillsSection = () => {
  const { skills } = siteConfig;

  return (
    <section id="skills" className="py-32 relative bg-slate-50 dark:bg-slate-950">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">

        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 relative">
          <div>
            <span className="text-slate-500 font-semibold tracking-wider uppercase mb-2 block">Technologies</span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white"
            >
              Technical <span className="text-slate-400 dark:text-slate-600">Expertise.</span>
            </motion.h2>
          </div>

          {/* Chapter Number */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="hidden lg:block text-right"
          >
            <span className="block text-6xl font-bold text-slate-200 dark:text-slate-800">03</span>
            <span className="text-sm font-medium uppercase tracking-widest text-slate-400">Skillset</span>
          </motion.div>

          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-md text-right lg:hidden">
            The tools and technologies I use to bring ideas to life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-slate-900/50 rounded-[2rem] p-8 border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="mb-8">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {idx + 1}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{category.title}</h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="relative">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-slate-700 dark:text-slate-300">{skill.name}</span>
                      <span className="text-xs font-bold text-slate-400">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-slate-900 dark:bg-white rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}

          {/* Decorative Extra Card to fill grid if needed or show soft skills */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-slate-900 rounded-[2rem] p-8 cursor-pointer group flex flex-col justify-between text-white border border-slate-800"
          >
            <div>
              <h3 className="text-2xl font-bold mb-2">Always Learning</h3>
              <p className="text-slate-400">Currently exploring Web3 and AI integration patterns.</p>
            </div>
            <div className="w-12 h-12 rounded-full border-2 border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-slate-900 transition-all">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
