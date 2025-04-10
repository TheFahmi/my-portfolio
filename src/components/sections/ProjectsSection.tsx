'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

// Project data
const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A modern e-commerce platform with product management, cart functionality, and payment integration.',
    image: '/projects/project1.jpg',
    category: 'web',
    technologies: ['React', 'Node.js', 'MongoDB'],
    demoLink: '#',
    codeLink: '#'
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates and team collaboration features.',
    image: '/projects/project2.jpg',
    category: 'web',
    technologies: ['Vue.js', 'Express', 'Socket.io'],
    demoLink: '#',
    codeLink: '#'
  },
  {
    id: 3,
    title: 'Fitness Tracker Mobile App',
    description: 'A mobile application for tracking workouts, nutrition, and health metrics with personalized recommendations.',
    image: '/projects/project3.jpg',
    category: 'mobile',
    technologies: ['React Native', 'Firebase', 'Redux'],
    demoLink: '#',
    codeLink: '#'
  },
  {
    id: 4,
    title: 'Portfolio Website',
    description: 'A responsive portfolio website built with modern web technologies and animations.',
    image: '/projects/project4.jpg',
    category: 'web',
    technologies: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
    demoLink: '#',
    codeLink: '#'
  },
  {
    id: 5,
    title: 'Weather Dashboard',
    description: 'A weather dashboard that displays current and forecasted weather data with interactive visualizations.',
    image: '/projects/project5.jpg',
    category: 'web',
    technologies: ['React', 'Chart.js', 'Weather API'],
    demoLink: '#',
    codeLink: '#'
  },
  {
    id: 6,
    title: 'Social Media App',
    description: 'A social media application with user profiles, posts, comments, and real-time notifications.',
    image: '/projects/project6.jpg',
    category: 'mobile',
    technologies: ['React Native', 'Node.js', 'MongoDB'],
    demoLink: '#',
    codeLink: '#'
  }
];

// Project filter categories
const categories = [
  { id: 'all', label: 'All' },
  { id: 'web', label: 'Web Apps' },
  { id: 'mobile', label: 'Mobile Apps' }
];

const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(project => project.category === activeFilter);

  return (
    <section id="projects" className="py-20 bg-white dark:bg-gray-800 relative overflow-hidden transition-colors duration-300">
      {/* Decorative circles */}
      <div className="absolute top-1/6 left-0 w-72 h-72 rounded-full bg-blue-100/30 dark:bg-blue-900/20 z-0"></div>
      <div className="absolute bottom-1/10 right-0 w-80 h-80 rounded-full bg-blue-100/30 dark:bg-blue-900/20 z-0"></div>

      {/* Animated floating circles */}
      <motion.div
        className="absolute top-1/4 right-1/12 w-12 h-12 rounded-full bg-blue-100/40 dark:bg-blue-900/30 z-0"
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
        className="absolute bottom-1/3 left-1/8 w-16 h-16 rounded-full bg-blue-100/40 dark:bg-blue-900/30 z-0"
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
        className="absolute top-2/3 right-1/4 w-10 h-10 rounded-full bg-blue-100/40 dark:bg-blue-900/30 z-0"
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
            Here are some of the projects I've worked on. Each project represents different challenges and solutions.
          </p>
        </motion.div>

        {/* Project Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              className={`px-6 py-2 rounded-full border transition-colors duration-300 ${
                activeFilter === category.id
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-transparent border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {category.label}
            </button>
          ))}
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
                <div className="w-full h-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-gray-500 dark:text-gray-400">
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"></path>
                  </svg>
                </div>
              </div>
              <div className="card-body">
                <h3 className="card-title mb-2">{project.title}</h3>
                <p className="card-text mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-primary-light dark:bg-primary-medium text-primary rounded-full text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between">
                  <a
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline transition-colors duration-300"
                  >
                    <i className="fas fa-external-link-alt mr-1"></i> Demo
                  </a>
                  <a
                    href={project.codeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline transition-colors duration-300"
                  >
                    <i className="fas fa-code mr-1"></i> Code
                  </a>
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
