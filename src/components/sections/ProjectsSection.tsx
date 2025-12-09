"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import siteConfig from "@/config/siteConfig";
import { ProjectCard } from "@/components/ui/ProjectCard";

const ProjectsSection = () => {
  const { projects } = siteConfig;
  const [activeFilter, setActiveFilter] = useState("All");

  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

  const filteredProjects = activeFilter === "All"
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="py-32 relative overflow-hidden bg-slate-50 dark:bg-slate-950">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">

        {/* Header */}
        <div className="mb-16 relative">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white"
            >
              Selected <span className="text-slate-400 dark:text-slate-600">Works.</span>
            </motion.h2>

            {/* Chapter Number */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="hidden lg:block text-right mb-2"
            >
              <span className="block text-6xl font-bold text-slate-200 dark:text-slate-800">04</span>
              <span className="text-sm font-medium uppercase tracking-widest text-slate-400">Portfolio</span>
            </motion.div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-slate-600 dark:text-slate-400 max-w-xl"
            >
              A collection of projects where I've challenged myself to solve complex problems.
            </motion.p>

            {/* Filters */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-2"
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer border ${activeFilter === category
                    ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white"
                    : "bg-transparent text-slate-500 border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600"
                    }`}
                >
                  {category}
                </button>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-16 text-center">
          <a href="https://github.com/mhmmdfahmidev" target="_blank" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors border-b border-transparent hover:border-slate-900 dark:hover:border-white">
            View more on GitHub ↗
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
