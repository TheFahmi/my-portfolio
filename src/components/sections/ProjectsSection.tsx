"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import siteConfig, { Project } from "@/config/siteConfig";
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

const techIcons: Record<string, string> = {
  "TypeScript": "TS",
  "Next.js": "Nx",
  "React.js": "Re",
  "React": "Re",
  "Vue.js": "Vu",
  "Nuxt.js": "Nu",
  "Node.js": "No",
  "Docker": "Do",
  "AI": "AI",
  "PostgreSQL": "Pg",
  "MongoDB": "Mg",
  "MySQL": "My",
  "TailwindCSS": "Tw",
  "Flutter": "Fl",
  "Dart": "Da",
  "JavaScript": "JS",
  "Redux": "Rx",
  "NestJS": "Ne",
  "Express": "Ex"
};

const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6"
    >
      <div
        className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl"
        onClick={onClose}
      />

      <motion.div
        layoutId={`card-${project.id}`}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all backdrop-blur-md hover:scale-110"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="relative aspect-video w-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
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
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-70" />

          <div className="absolute bottom-0 left-0 p-8 w-full">
            <div className="flex items-center gap-3 mb-3">
              <span className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-cyan-500 to-blue-600 backdrop-blur-md rounded-full">
                {project.category}
              </span>
              {project.featured && (
                <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-900 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/30">
                  Featured
                </span>
              )}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">{project.title}</h2>
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
                  className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-cyan-500/50 transition-colors"
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
                className="flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl hover:opacity-90 transition-all font-medium hover:scale-105"
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
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:opacity-90 transition-all font-medium hover:scale-105"
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

const BentoProjectCard = ({ project, onClick, index }: { project: Project; onClick: (p: Project) => void; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      layoutId={`card-${project.id}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      onClick={() => onClick(project)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 cursor-pointer min-h-[360px] md:min-h-[400px]"
      whileHover={{ y: -4 }}
    >
      <div className="absolute inset-0">
        {project.image && !imgError ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 33vw"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${getGradient(project.id)}`} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-500" />
      </div>

      <div className="relative h-full flex flex-col justify-end p-6 md:p-8">
        {project.featured && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute top-6 left-6"
          >
            <span className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-950 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/30">
              Featured
            </span>
          </motion.div>
        )}

        <div className="mb-3">
          <span className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white bg-slate-950/60 backdrop-blur-md rounded-full border border-white/30 shadow-lg">
            {project.category}
          </span>
        </div>

        <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors drop-shadow-lg">
          {project.title}
        </h3>

        <p className="text-sm text-slate-200 mb-4 line-clamp-2 drop-shadow-md">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1.5 text-xs font-semibold text-white bg-slate-950/50 backdrop-blur-sm rounded-md border border-white/20 shadow-md"
            >
              {techIcons[tech] || tech.slice(0, 2)}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-2.5 py-1.5 text-xs font-semibold text-white/80 bg-slate-950/40 rounded-md">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        <motion.div
          animate={{ x: isHovered ? 5 : 0, opacity: isHovered ? 1 : 0.7 }}
          className="flex items-center gap-2 text-cyan-300 drop-shadow-lg"
        >
          <span className="text-sm font-bold">View Project</span>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </motion.div>
      </div>

      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 via-transparent to-transparent" />
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const { projects } = siteConfig;
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

  const filteredProjects = activeFilter === "All"
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  const sortedProjects = [...filteredProjects].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

  return (
    <section id="projects" className="py-24 md:py-32 relative overflow-hidden bg-slate-50 dark:bg-slate-950">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        <div className="mb-16">
          <ScrollReveal variant="slideUp" className="mb-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white">
              Selected{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">
                Works.
              </span>
            </h2>
          </ScrollReveal>

          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
            <ScrollReveal
              variant="slideUp"
              delay={0.1}
              className="max-w-xl"
            >
              <p className="text-lg text-slate-600 dark:text-slate-400">
                A curated collection of projects where I've challenged myself to solve complex problems and build impactful solutions.
              </p>
            </ScrollReveal>

            <ScrollReveal
              variant="slideLeft"
              delay={0.2}
            >
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    onClick={() => setActiveFilter(category)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${activeFilter === category
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25"
                      : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50"
                      }`}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-min"
        >
          <AnimatePresence mode="popLayout">
            {sortedProjects.map((project, index) => (
              <BentoProjectCard
                key={project.id}
                project={project}
                onClick={setSelectedProject}
                index={index}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        <ScrollReveal variant="fade" delay={0.3}>
          <div className="mt-16 text-center">
            <a
              href="https://github.com/mhmmdfahmidev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold hover:scale-105 transition-transform group"
            >
              <span>View more on GitHub</span>
              <svg
                className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </ScrollReveal>
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
