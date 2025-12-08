"use client";

import { motion } from "framer-motion";

const ProjectsComingSoon = () => {
  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-white/50 dark:bg-slate-900/50">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto bg-white dark:bg-slate-800 rounded-2xl p-12 shadow-2xl border border-slate-200 dark:border-slate-700"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
            Projects <span className="text-blue-500">Coming Soon</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
            I'm actively working on building my project portfolio to showcase my best work. Stay tuned for updates!
          </p>

          <div className="flex justify-center gap-4">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
            </div>
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsComingSoon;
