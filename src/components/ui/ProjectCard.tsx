"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Project } from "@/config/siteConfig";

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
}

export const ProjectCard = ({ project, onClick }: ProjectCardProps) => {
  const [imgError, setImgError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Generate deterministic gradient based on project ID
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

  return (
    <motion.div
      layoutId={`card-${project.id}`}
      onClick={() => onClick(project)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 cursor-pointer h-full
        ${project.featured ? 'md:col-span-2 lg:col-span-2' : 'col-span-1'}
      `}
      whileHover={{ y: -8, transition: { duration: 0.3, ease: "easeOut" } }}
    >
      {/* Image Container */}
      <div className={`relative w-full overflow-hidden bg-slate-100 dark:bg-slate-800 ${project.featured ? 'aspect-[21/9]' : 'aspect-[4/3]'}`}>
        {project.image && !imgError ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes={project.featured ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${getGradient(project.id)}`}>
            <div className="flex flex-col items-center gap-4 p-8 text-center">
              <div className="p-4 rounded-full bg-white/10 backdrop-blur-md shadow-lg border border-white/20">
                <span className="text-4xl">🚀</span>
              </div>
              <h3 className="text-xl font-bold text-white/90 drop-shadow-md max-w-[80%]">
                {project.title}
              </h3>
            </div>
          </div>
        )}

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-white bg-slate-900/50 backdrop-blur-md border border-white/20 rounded-full shadow-lg">
            {project.category}
          </span>
        </div>

        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-4 right-4 z-10">
             <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-900 bg-cyan-400 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.4)]">
                Featured
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6 lg:p-8">
        <div className="flex justify-between items-start gap-4 mb-4">
          <motion.h3 
            className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
          >
            {project.title}
          </motion.h3>
          <motion.div 
            animate={{ x: isHovered ? 5 : 0 }}
            className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </motion.div>
        </div>

        <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed mb-6 line-clamp-3">
          {project.description}
        </p>

        <div className="mt-auto">
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 5 && (
              <span className="px-2.5 py-1 text-xs font-medium text-slate-500 dark:text-slate-400">
                +{project.technologies.length - 5}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
