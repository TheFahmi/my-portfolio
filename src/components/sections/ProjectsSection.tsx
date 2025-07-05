'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import ComingSoon from '@/components/ui/ComingSoon';

// Project interface
interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  technologies: string[];
  demoLink: string;
  codeLink: string;
  status: string;
  progress?: number;
  stars?: number;
  forks?: number;
  updated?: string;
}
// Project data is now fetched from GitHub API

// Project filter categories
const categories = [
  { id: 'all', label: 'All' },
  { id: 'web', label: 'Web Apps' },
  { id: 'mobile', label: 'Mobile Apps' }
];

// Status filter categories
const statusFilters = [
  { id: 'all', label: 'All Status' },
  { id: 'completed', label: 'Completed' },
  { id: 'coming-soon', label: 'Coming Soon' }
];

const ProjectsSection = () => {
  const { theme } = useTheme();
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeStatusFilter, setActiveStatusFilter] = useState('all');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch projects from GitHub API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('/api/github/repositories');
        
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        setError('Failed to load projects');
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Apply both category and status filters
  const filteredProjects = projects.filter((project: Project) => {
    const matchesCategory = activeFilter === 'all' || project.category === activeFilter;
    const matchesStatus = activeStatusFilter === 'all' || project.status === activeStatusFilter;
    return matchesCategory && matchesStatus;
  });

  // Show loading state
  if (loading) {
    return (
      <section id="projects" className={`section-alt py-20 relative overflow-hidden transition-colors duration-300 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
      }`}>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <h2 className="section-title">My Projects</h2>
            <div className="section-divider"></div>
            <p className="section-subtitle">Loading projects from GitHub...</p>
            <div className="mt-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Show error state
  if (error) {
    return (
      <section id="projects" className={`section-alt py-20 relative overflow-hidden transition-colors duration-300 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
      }`}>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <h2 className="section-title">My Projects</h2>
            <div className="section-divider"></div>
            <p className={`section-subtitle ${
              theme === 'dark' ? 'text-red-400' : 'text-red-600'
            }`}>{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className={`section-alt py-20 relative overflow-hidden transition-colors duration-300 ${
      theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
    }`}>
      {/* Decorative circles */}
      <div className={`absolute top-1/6 left-0 w-72 h-72 rounded-full z-0 ${
        theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-100/30'
      }`}></div>
      <div className={`absolute bottom-1/10 right-0 w-80 h-80 rounded-full z-0 ${
        theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-100/30'
      }`}></div>

      {/* Animated floating circles */}
      <motion.div
        className={`absolute top-1/4 right-1/12 w-12 h-12 rounded-full z-0 ${
          theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-100/40'
        }`}
        animate={{
          y: [0, -10, 0],
          x: [0, 5, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      <motion.div
        className={`absolute bottom-1/3 left-1/8 w-16 h-16 rounded-full z-0 ${
          theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-100/40'
        }`}
        animate={{
          y: [0, 15, 0],
          x: [0, -8, 0]
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3
        }}
      />
      <motion.div
        className={`absolute top-2/3 right-1/4 w-10 h-10 rounded-full z-0 ${
          theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-100/40'
        }`}
        animate={{
          y: [0, 8, 0],
          x: [0, -5, 0]
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">My Projects</h2>
          <div className="section-divider"></div>
          <p className="section-subtitle">
            Here are my projects from GitHub repositories. Each project represents different challenges and solutions.
          </p>
        </motion.div>

        {/* Project Filters */}
        <div className="flex flex-col items-center mb-12 space-y-6">
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`px-6 py-2 rounded-full border cursor-pointer transition-colors duration-300 ${
                  activeFilter === category.id
                    ? 'bg-blue-600 text-white border-blue-600'
                    : theme === 'dark'
                      ? 'bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700'
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Status Filters */}
          <div className="flex flex-wrap justify-center gap-4">
            {statusFilters.map((status) => (
              <button
                key={status.id}
                onClick={() => setActiveStatusFilter(status.id)}
                className={`px-6 py-2 rounded-full border cursor-pointer transition-colors duration-300 ${
                  activeStatusFilter === status.id
                    ? 'bg-blue-600 text-white border-blue-600'
                    : theme === 'dark'
                      ? 'bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700'
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
              >
                {status.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="card"
            >
              <div className="relative h-48 overflow-hidden">
                {project.status === 'coming-soon' ? (
                  <ComingSoon
                    className="w-full h-full"
                    title="Coming Soon"
                    subtitle={`Project in progress - ${project.progress || 0}%`}
                  />
                ) : (
                  <div className={`w-full h-full flex items-center justify-center ${
                    theme === 'dark' 
                      ? 'bg-gray-600 text-gray-300' 
                      : 'bg-gray-300 text-gray-600'
                  }`}>
                    <i className="fas fa-image text-4xl"></i>
                  </div>
                )}
              </div>
              <div className="card-body">
                <h3 className="card-title mb-2">{project.title}</h3>
                <p className="card-text mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className={`px-3 py-1 text-primary rounded-full text-xs font-medium ${
                        theme === 'dark' ? 'bg-primary-medium' : 'bg-primary-light'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  {project.status === 'coming-soon' ? (
                    <span className={`text-sm italic ${
                      theme === 'dark' ? 'text-blue-300' : 'text-blue-700'
                    }`}>
                      <i className="fas fa-clock mr-1"></i> In Development
                    </span>
                  ) : (
                    <div className="flex space-x-4">
                      <a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`hover:underline transition-colors duration-300 ${
                          theme === 'dark' ? 'text-blue-300' : 'text-blue-700'
                        } ${
                          project.demoLink === '#' ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        <i className="fas fa-external-link-alt mr-1"></i> Demo
                      </a>
                      <a
                        href={project.codeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`hover:underline transition-colors duration-300 ${
                          theme === 'dark' ? 'text-blue-300' : 'text-blue-700'
                        }`}
                      >
                        <i className="fas fa-code mr-1"></i> Code
                      </a>
                    </div>
                  )}
                  {/* GitHub stats */}
                  <div className={`flex items-center space-x-3 text-sm ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {project.stars !== undefined && (
                      <span className="flex items-center">
                        <i className="fas fa-star mr-1 text-yellow-500"></i>
                        {project.stars}
                      </span>
                    )}
                    {project.forks !== undefined && (
                      <span className="flex items-center">
                        <i className={`fas fa-code-branch mr-1 ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}></i>
                        {project.forks}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
