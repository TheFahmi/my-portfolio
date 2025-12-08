"use client";

import { motion } from "framer-motion";
import siteConfig from "@/config/siteConfig";

const SkillsSection = () => {
  const { skills } = siteConfig;

  return (
    <section id="skills" className="py-24 relative bg-slate-50/50 dark:bg-slate-900/50">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6"
          >
            Technical <span className="text-blue-500">Expertise</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-600 dark:text-slate-400 text-lg"
          >
            A breakdown of my technical skills and proficiency levels across different domains.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl border border-slate-100 dark:border-slate-700 hover:shadow-2xl hover:border-blue-500/20 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br ${idx === 0 ? "from-blue-500 to-cyan-500" :
                    idx === 1 ? "from-purple-500 to-pink-500" :
                      "from-amber-500 to-orange-500"
                  } text-white shadow-lg`}>
                  <span className="font-bold text-lg">{idx + 1}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{category.title}</h3>
              </div>

              <div className="space-y-6">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-slate-700 dark:text-slate-200">{skill.name}</span>
                      <span className="text-xs font-bold text-slate-400 dark:text-slate-500">{skill.level}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${idx === 0 ? "bg-blue-500" :
                            idx === 1 ? "bg-purple-500" :
                              "bg-amber-500"
                          }`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{skill.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
