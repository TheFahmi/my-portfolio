'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

// Skill categories and data
const skillCategories = [
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'tools', label: 'Tools & Others' }
];

const frontendSkills = [
  { name: 'React.js', level: 90, icon: 'react' },
  { name: 'Vue.js', level: 90, icon: 'vuejs' },
  { name: 'TypeScript', level: 85, icon: 'js' },
  { name: 'SCSS/SASS', level: 85, icon: 'sass' },
  { name: 'Tailwind CSS', level: 90, icon: 'wind' },
  { name: 'React Native', level: 80, icon: 'mobile-alt' }
];

const backendSkills = [
  { name: 'Node.js', level: 85, icon: 'node-js' },
  { name: 'NuxtJS', level: 85, icon: 'js' },
  { name: 'MongoDB', level: 80, icon: 'database' },
  { name: 'MySQL', level: 85, icon: 'database' },
  { name: 'Express', level: 80, icon: 'server' }
];

const toolsSkills = [
  { name: 'Agile/Scrum', level: 95, icon: 'tasks' },
  { name: 'Jira', level: 90, icon: 'jira' },
  { name: 'Team Leadership', level: 90, icon: 'users' },
  { name: 'Project Management', level: 90, icon: 'project-diagram' },
  { name: 'Git & GitHub', level: 90, icon: 'git-alt' },
  { name: 'Figma', level: 80, icon: 'figma' }
];

const SkillsSection = () => {
  const [activeTab, setActiveTab] = useState('frontend');

  const getSkillsByCategory = (category: string) => {
    switch (category) {
      case 'frontend':
        return frontendSkills;
      case 'backend':
        return backendSkills;
      case 'tools':
        return toolsSkills;
      default:
        return frontendSkills;
    }
  };

  // Get icon component based on icon name
  const getIconComponent = (iconName: string) => {
    // This is a simplified approach - in a real app, you might want to use a proper icon library
    return (
      <i className={`fas fa-${iconName}`}></i>
    );
  };

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-900 relative overflow-hidden transition-colors duration-300">
      {/* Decorative circles */}
      <div className="absolute top-1/4 left-0 w-64 h-64 rounded-full bg-blue-100/30 dark:bg-blue-900/20 z-0"></div>
      <div className="absolute bottom-1/6 right-0 w-48 h-48 rounded-full bg-blue-100/30 dark:bg-blue-900/20 z-0"></div>

      {/* Animated floating circles */}
      <motion.div
        className="absolute top-1/3 right-1/10 w-10 h-10 rounded-full bg-blue-100/40 dark:bg-blue-900/30 z-0"
        animate={{
          y: [0, -8, 0],
          x: [0, 8, 0]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-1/3 left-1/6 w-16 h-16 rounded-full bg-blue-100/40 dark:bg-blue-900/30 z-0"
        animate={{
          y: [0, 12, 0],
          x: [0, -8, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      <motion.div
        className="absolute top-2/3 right-1/4 w-8 h-8 rounded-full bg-blue-100/40 dark:bg-blue-900/30 z-0"
        animate={{
          y: [0, 6, 0],
          x: [0, -6, 0]
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
          <h2 className="section-title">My Skills</h2>
          <div className="section-divider"></div>
          <p className="section-subtitle">
            With 4+ years of experience, I've developed expertise in various technologies and methodologies.
            Here are the key skills that I bring to the table.
          </p>
        </motion.div>

        {/* Skills Connect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg py-6 px-4 md:px-8 mb-16 -mt-6 relative z-20 max-w-4xl mx-auto"
        >
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">4+</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">20+</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">10+</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Happy Clients</div>
            </div>
          </div>
        </motion.div>

        {/* Skills Tabs */}
        <div className="mb-10">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {skillCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`px-6 py-2 rounded-full transition-colors duration-300 ${
                  activeTab === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getSkillsByCategory(activeTab).map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="card card-body"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary-light dark:bg-primary-medium flex items-center justify-center text-primary mr-4">
                    {getIconComponent(skill.icon)}
                  </div>
                  <h3 className="card-title">{skill.name}</h3>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-1">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    className="bg-primary h-2.5 rounded-full"
                  ></motion.div>
                </div>
                <div className="text-right text-sm text-secondary">{skill.level}%</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
