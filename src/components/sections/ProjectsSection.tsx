'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';

const ProjectsSection = () => {
  const { theme } = useTheme();
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Frontend', 'Full Stack', 'Mobile'];

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'A modern e-commerce platform built with Next.js, TypeScript, and Stripe integration for seamless online shopping experience.',
      category: 'Full Stack',
      technologies: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL'],
      image: '/images/project-ecommerce.jpg',
      github: 'https://github.com/example/ecommerce',
      demo: 'https://ecommerce-demo.com',
      featured: true
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates, built using React and Socket.io.',
      category: 'Frontend',
      technologies: ['React', 'Socket.io', 'Redux', 'TailwindCSS'],
      image: '/images/project-tasks.jpg',
      github: 'https://github.com/example/task-app',
      demo: 'https://task-app-demo.com',
      featured: true
    },
    {
      id: 3,
      title: 'Weather Mobile App',
      description: 'Cross-platform weather application with location-based forecasts and beautiful UI animations.',
      category: 'Mobile',
      technologies: ['React Native', 'Weather API', 'Expo', 'Styled Components'],
      image: '/images/project-weather.jpg',
      github: 'https://github.com/example/weather-app',
      demo: 'https://weather-app-demo.com',
      featured: false
    },
    {
      id: 4,
      title: 'Portfolio Website',
      description: 'A responsive portfolio website showcasing modern web development techniques and clean design principles.',
      category: 'Frontend',
      technologies: ['Next.js', 'Framer Motion', 'TailwindCSS', 'TypeScript'],
      image: '/images/project-portfolio.jpg',
      github: 'https://github.com/example/portfolio',
      demo: 'https://portfolio-demo.com',
      featured: false
    },
    {
      id: 5,
      title: 'Learning Management System',
      description: 'A comprehensive LMS platform with course management, video streaming, and progress tracking features.',
      category: 'Full Stack',
      technologies: ['Vue.js', 'Node.js', 'MongoDB', 'Socket.io'],
      image: '/images/project-lms.jpg',
      github: 'https://github.com/example/lms',
      demo: 'https://lms-demo.com',
      featured: true
    },
    {
      id: 6,
      title: 'Social Media Dashboard',
      description: 'Analytics dashboard for social media management with data visualization and automated reporting.',
      category: 'Frontend',
      technologies: ['React', 'Chart.js', 'REST API', 'Material-UI'],
      image: '/images/project-dashboard.jpg',
      github: 'https://github.com/example/dashboard',
      demo: 'https://dashboard-demo.com',
      featured: false
    }
  ];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <section id="projects" className={`py-20 transition-colors duration-300 ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-white'
    }`}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-6 ${
              theme === 'dark' 
                ? 'bg-gray-800 text-gray-300 border border-gray-700' 
                : 'bg-gray-100 text-gray-600 border border-gray-200'
            }`}
          >
            My Projects
          </motion.div>
          
          <h2 className={`text-4xl lg:text-5xl font-bold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Featured Work
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            A collection of projects that showcase my skills and experience in web development
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeFilter === filter
                  ? theme === 'dark'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-blue-600 text-white shadow-lg'
                  : theme === 'dark'
                    ? 'bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700'
                    : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`group relative rounded-2xl overflow-hidden ${
                theme === 'dark' 
                  ? 'bg-gray-800 border border-gray-700' 
                  : 'bg-white border border-gray-200'
              } shadow-lg hover:shadow-xl transition-all duration-300`}
            >
              {/* Featured Badge */}
              {project.featured && (
                <div className={`absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-xs font-semibold ${
                  theme === 'dark' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-blue-600 text-white'
                } shadow-lg`}>
                  Featured
                </div>
              )}

              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <div className={`w-full h-full ${
                  theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                } flex items-center justify-center`}>
                  <div className={`text-6xl ${
                    theme === 'dark' ? 'text-gray-600' : 'text-gray-400'
                  }`}>
                    🖼️
                  </div>
                </div>
                {/* Overlay */}
                <div className={`absolute inset-0 ${
                  theme === 'dark' 
                    ? 'bg-gray-900/80' 
                    : 'bg-white/80'
                } opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4`}>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-full ${
                      theme === 'dark' 
                        ? 'bg-gray-800 text-white hover:bg-gray-700' 
                        : 'bg-white text-gray-800 hover:bg-gray-100'
                    } shadow-lg transition-all duration-300 transform hover:scale-110`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 shadow-lg transition-all duration-300 transform hover:scale-110"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className={`text-xl font-bold mb-3 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {project.title}
                </h3>
                
                <p className={`text-sm mb-4 leading-relaxed ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        theme === 'dark' 
                          ? 'bg-gray-700 text-gray-300 border border-gray-600' 
                          : 'bg-gray-100 text-gray-700 border border-gray-200'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Category */}
                <div className="flex justify-between items-center">
                  <span className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                  }`}>
                    {project.category}
                  </span>
                  <div className="flex space-x-2">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-sm font-medium ${
                        theme === 'dark' 
                          ? 'text-gray-400 hover:text-white' 
                          : 'text-gray-600 hover:text-gray-900'
                      } transition-colors duration-300`}
                    >
                      Code
                    </a>
                    <span className={`${
                      theme === 'dark' ? 'text-gray-600' : 'text-gray-400'
                    }`}>•</span>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-sm font-medium ${
                        theme === 'dark' 
                          ? 'text-gray-400 hover:text-white' 
                          : 'text-gray-600 hover:text-gray-900'
                      } transition-colors duration-300`}
                    >
                      Live Demo
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <div className={`p-8 rounded-2xl ${
            theme === 'dark' 
              ? 'bg-gray-800 border border-gray-700' 
              : 'bg-gray-50 border border-gray-200'
          } max-w-4xl mx-auto`}>
            <h3 className={`text-2xl font-bold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Interested in Working Together?
            </h3>
            <p className={`text-lg mb-6 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              I&apos;m always open to discussing new opportunities and exciting projects.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center px-8 py-3 rounded-lg font-semibold transition-all duration-300 bg-blue-600 text-white hover:bg-blue-700"
            >
              Get In Touch
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
