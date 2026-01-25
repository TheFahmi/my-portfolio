"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import siteConfig from "@/config/siteConfig";

const ExperienceSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const { experience } = siteConfig;

  return (
    <section id="experience" className="py-24 md:py-32 bg-slate-50 dark:bg-slate-900/50 relative overflow-hidden" ref={containerRef}>
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent opacity-50" />
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-blue-50 dark:bg-blue-900/10 rounded-full blur-3xl opacity-30 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[30%] h-[30%] bg-cyan-50 dark:bg-cyan-900/10 rounded-full blur-3xl opacity-30 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-6">
            Career <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-500">Journey.</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full mx-auto" />
          <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            My professional path from early beginnings to leading engineering teams.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-800 -translate-x-1/2 hidden md:block" />
          
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-800 block md:hidden" />

          <div className="space-y-12 md:space-y-0">
            {experience.map((exp, idx) => (
              <TimelineItem key={idx} data={exp} index={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const TimelineItem = ({ data, index }: { data: any; index: number }) => {
  const isEven = index % 2 === 0;
  const itemRef = useRef(null);

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative flex flex-col md:flex-row gap-8 md:gap-0 ${
        isEven ? "md:flex-row-reverse" : ""
      }`}
    >
      <div className="md:w-1/2 pl-12 md:pl-0">
        <div className={`relative p-6 md:p-8 bg-white dark:bg-black border border-slate-100 dark:border-slate-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 ${
          isEven ? "md:ml-12" : "md:mr-12"
        }`}>
          <div className={`hidden md:block absolute top-8 w-4 h-4 bg-white dark:bg-black border-t border-r border-slate-100 dark:border-slate-800 transform rotate-45 ${
            isEven ? "-left-2.5 border-t-0 border-r-0 border-b border-l" : "-right-2.5"
          }`} />

          <div className="flex flex-col gap-1 mb-4">
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
              {data.company}
            </h3>
            {!data.roles && (
               <div className="flex flex-wrap gap-2 items-center text-sm">
                 <span className="font-semibold text-cyan-600 dark:text-cyan-400">{data.title}</span>
                 <span className="text-slate-300 dark:text-slate-700">•</span>
                 <span className="font-mono text-slate-500 dark:text-slate-400">{data.year}</span>
               </div>
            )}
          </div>

          {data.roles ? (
            <div className="space-y-6">
              {data.roles.map((role: any, rIdx: number) => (
                <div key={rIdx} className="relative pl-6 border-l-2 border-slate-100 dark:border-slate-800 last:pb-0">
                  <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-cyan-500 ring-4 ring-white dark:ring-black" />
                  <h4 className="font-bold text-slate-800 dark:text-slate-200">{role.title}</h4>
                  <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mb-2">{role.year}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{role.description}</p>
                  {role.details && (
                    <ul className="space-y-1">
                      {role.details.map((detail: string, dIdx: number) => (
                        <li key={dIdx} className="text-xs text-slate-500 dark:text-slate-500 flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-300 shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-slate-600 dark:text-slate-400">{data.description}</p>
              {data.details && (
                 <ul className="space-y-2">
                   {data.details.map((detail: string, dIdx: number) => (
                     <li key={dIdx} className="text-sm text-slate-500 dark:text-slate-400 flex items-start gap-2">
                       <span className="mt-2 w-1 h-1 rounded-full bg-cyan-400 shrink-0" />
                       {detail}
                     </li>
                   ))}
                 </ul>
               )}
            </div>
          )}
        </div>
      </div>

      <div className="absolute left-4 md:left-1/2 top-8 -translate-x-1/2 flex items-center justify-center">
        <div className="w-4 h-4 rounded-full bg-cyan-500 ring-4 ring-white dark:ring-slate-900 shadow-lg z-10" />
      </div>

      <div className="hidden md:block md:w-1/2" />
    </motion.div>
  );
};

export default ExperienceSection;
