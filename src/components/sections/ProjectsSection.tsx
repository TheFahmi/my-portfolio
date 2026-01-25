"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import siteConfig, { Project } from "@/config/siteConfig";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const getGradient = (id: number) => {
  const gradients = [
    "from-slate-800 to-slate-600",
    "from-blue-900 to-blue-700",
    "from-emerald-800 to-teal-700", 
    "from-amber-700 to-orange-600",
    "from-cyan-900 to-blue-800",
    "from-indigo-900 to-slate-800"
  ];
  return gradients[id % gradients.length];
};

const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6"
    >
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <motion.div
        layoutId={`card-${project.id}`}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 custom-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors backdrop-blur-md"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="relative aspect-video w-full bg-slate-100 dark:bg-slate-800">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${getGradient(project.id)}`}>
               <div className="flex flex-col items-center gap-4">
                <span className="text-6xl">🚀</span>
                <h3 className="text-3xl font-bold text-white/90">{project.title}</h3>
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />
          
          <div className="absolute bottom-0 left-0 p-8 w-full">
            <div className="flex items-center gap-4 mb-2">
              <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-white bg-blue-600/80 backdrop-blur-md rounded-full">
                {project.category}
              </span>
              {project.featured && (
                <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-900 bg-cyan-400 rounded-full">
                  Featured
                </span>
              )}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{project.title}</h2>
          </div>
        </div>

        <div className="p-8 space-y-8">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">About the Project</h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
              {project.description}
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 text-sm font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg hover:opacity-90 transition-opacity font-medium"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                View Code
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Live Demo
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

import { useEffect } from "react";

const ProjectsSection = () => {
  const { projects } = siteConfig;
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

  const filteredProjects = activeFilter === "All"
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="py-32 relative overflow-hidden bg-slate-50 dark:bg-slate-950">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        
        <div className="mb-16 relative">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-6">
            <ScrollReveal variant="slideUp" className="text-3xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white">
              Selected <span className="text-slate-400 dark:text-slate-600">Works.</span>
            </ScrollReveal>

            <ScrollReveal
              variant="fade"
              delay={0.2}
              className="hidden lg:block text-right mb-2"
            >
              <span className="block text-6xl font-bold text-slate-200 dark:text-slate-800">04</span>
              <span className="text-sm font-medium uppercase tracking-widest text-slate-400">Portfolio</span>
            </ScrollReveal>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            <ScrollReveal
              variant="slideUp"
              delay={0.1}
              className="text-xl text-slate-600 dark:text-slate-400 max-w-xl"
            >
              A collection of projects where I've challenged myself to solve complex problems.
            </ScrollReveal>

            <ScrollReveal
              variant="slideLeft"
              delay={0.2}
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
            </ScrollReveal>
          </div>
        </div>

        <ScrollReveal variant="slideUp" delay={0.4} width="100%">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-[minmax(400px,auto)]">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  onClick={setSelectedProject}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </ScrollReveal>

        <div className="mt-16 text-center">
          <a href="https://github.com/mhmmdfahmidev" target="_blank" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors border-b border-transparent hover:border-slate-900 dark:hover:border-white">
            View more on GitHub ↗
          </a>
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;
