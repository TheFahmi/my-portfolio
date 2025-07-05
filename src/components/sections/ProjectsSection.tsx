'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ComingSoon from '@/components/ui/ComingSoon';

// Project data
const projects = [
  {
    id: 1,
    title: 'Modern E-Commerce Platform',
    description: 'A full-featured e-commerce platform with product management, shopping cart, payment integration, and admin dashboard. Built with modern web technologies.',
    image: '/projects/project1.jpg',
    category: 'web',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'TypeScript'],
    demoLink: 'https://ecommerce-demo.fahmihassan.com',
    codeLink: 'https://github.com/TheFahmi/ecommerce-platform',
    status: 'completed'
  },
  {
    id: 2,
    title: 'Real-time Task Management',
    description: 'A collaborative task management application with real-time updates, team collaboration, drag-and-drop functionality, and progress tracking.',
    image: '/projects/project2.jpg',
    category: 'web',
    technologies: ['Vue.js', 'NuxtJS', 'Socket.io', 'PostgreSQL', 'TailwindCSS'],
    demoLink: 'https://taskmanager-demo.fahmihassan.com',
    codeLink: 'https://github.com/TheFahmi/task-manager',
    status: 'coming-soon',
    progress: 85
  },
  {
    id: 3,
    title: 'Fitness Tracker Mobile App',
    description: 'A comprehensive mobile application for tracking workouts, nutrition, and health metrics with personalized recommendations and social features.',
    image: '/projects/project3.jpg',
    category: 'mobile',
    technologies: ['React Native', 'Firebase', 'Redux', 'Expo', 'Chart.js'],
    demoLink: 'https://fitness-tracker-demo.fahmihassan.com',
    codeLink: 'https://github.com/TheFahmi/fitness-tracker',
    status: 'completed'
  },
  {
    id: 4,
    title: 'Portfolio Website',
    description: 'A responsive and visually stunning portfolio website with smooth animations, dark mode support, and optimized performance.',
    image: '/projects/project4.jpg',
    category: 'web',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    demoLink: 'https://fahmihassan.com',
    codeLink: 'https://github.com/TheFahmi/my-portfolio',
    status: 'completed'
  },
  {
    id: 5,
    title: 'Weather Analytics Dashboard',
    description: 'An interactive weather dashboard with real-time data visualization, forecasting, and detailed analytics for weather patterns.',
    image: '/projects/project5.jpg',
    category: 'web',
    technologies: ['React', 'TypeScript', 'D3.js', 'Weather API', 'Recharts'],
    demoLink: 'https://weather-dashboard-demo.fahmihassan.com',
    codeLink: 'https://github.com/TheFahmi/weather-dashboard',
    status: 'coming-soon',
    progress: 65
  },
  {
    id: 6,
    title: 'Social Media Mobile App',
    description: 'A feature-rich social media application with real-time messaging, photo sharing, stories, and advanced privacy controls.',
    image: '/projects/project6.jpg',
    category: 'mobile',
    technologies: ['React Native', 'Node.js', 'MongoDB', 'Socket.io', 'AWS S3'],
    demoLink: 'https://social-app-demo.fahmihassan.com',
    codeLink: 'https://github.com/TheFahmi/social-media-app',
    status: 'coming-soon',
    progress: 40
  }
];

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
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeStatusFilter, setActiveStatusFilter] = useState('all');

  // Apply both category and status filters
  const filteredProjects = projects.filter(project => {
    const matchesCategory = activeFilter === 'all' || project.category === activeFilter;
    const matchesStatus = activeStatusFilter === 'all' || project.status === activeStatusFilter;
    return matchesCategory && matchesStatus;
  });

  return (
    <section id="projects" className="section-alt py-20 bg-gray-50 dark:bg-gray-800 relative overflow-hidden transition-colors duration-300">
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
            Here are some of the projects I&apos;ve worked on. Each project represents different challenges and solutions.
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
                    : 'bg-white dark:bg-transparent border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
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
                    : 'bg-white dark:bg-transparent border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
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
                  <div className="w-full h-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-gray-500 dark:text-gray-400">
                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"></path>
                    </svg>
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
                      className="px-3 py-1 bg-primary-light dark:bg-primary-medium text-primary rounded-full text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between">
                  {project.status === 'coming-soon' ? (
                    <span className="text-blue-600 dark:text-blue-400 text-sm italic">
                      <i className="fas fa-clock mr-1"></i> In Development
                    </span>
                  ) : (
                    <>
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
                    </>
                  )}
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
