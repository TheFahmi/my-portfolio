"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

// Skill interface
interface Skill {
  name: string;
  level: number;
  icon: string;
  iconType: string;
}

// Skill categories and data
const skillCategories = [
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "tools", label: "Tools & Others" },
];

const frontendSkills = [
  { name: "React.js", level: 90, icon: "react", iconType: "fab" },
  { name: "Vue.js", level: 90, icon: "vuejs", iconType: "fab" },
  { name: "TypeScript", level: 85, icon: "js-square", iconType: "fab" },
  { name: "NuxtJS", level: 85, icon: "js-square", iconType: "fab" },
  { name: "SCSS/SASS", level: 85, icon: "sass", iconType: "fab" },
  { name: "Tailwind CSS", level: 90, icon: "css3-alt", iconType: "fab" },
  { name: "React Native", level: 80, icon: "mobile-alt", iconType: "fas" },
];

const backendSkills = [
  { name: "Node.js", level: 85, icon: "node-js", iconType: "fab" },
  { name: "MongoDB", level: 80, icon: "database", iconType: "fas" },
  { name: "MySQL", level: 85, icon: "database", iconType: "fas" },
  { name: "Express", level: 80, icon: "server", iconType: "fas" },
];

const toolsSkills = [
  { name: "Agile/Scrum", level: 95, icon: "tasks", iconType: "fas" },
  { name: "Jira", level: 90, icon: "jira", iconType: "fab" },
  { name: "Team Leadership", level: 90, icon: "users", iconType: "fas" },
  { name: "Project Management", level: 90, icon: "project-diagram", iconType: "fas" },
  { name: "Git & GitHub", level: 90, icon: "git-alt", iconType: "fab" },
  { name: "Figma", level: 80, icon: "figma", iconType: "fab" },
];

const SkillsSection = () => {
  const [activeTab, setActiveTab] = useState("frontend");

  const getSkillsByCategory = (category: string): Skill[] => {
    switch (category) {
      case "frontend":
        return frontendSkills;
      case "backend":
        return backendSkills;
      case "tools":
        return toolsSkills;
      default:
        return frontendSkills;
    }
  };

  // Get icon component based on icon name and type
  const getIconComponent = (iconName: string, iconType: string = "fas") => {
    // This is a simplified approach - in a real app, you might want to use a proper icon library
    return <i className={`${iconType} fa-${iconName}`}></i>;
  };
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // After mounting, we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  // Determine if dark mode is active

  const isDarkMode = mounted && (resolvedTheme === "dark" || theme === "dark");

  return (
    <section
      id="skills"
      className="section-primary py-20 bg-white dark:bg-gray-900 relative overflow-hidden transition-colors duration-300"
    >
      {/* Decorative circles */}
      <div className="absolute top-1/4 left-0 w-64 h-64 rounded-full bg-blue-100/30 dark:bg-blue-900/20 z-0"></div>
      <div className="absolute bottom-1/6 right-0 w-48 h-48 rounded-full bg-blue-100/30 dark:bg-blue-900/20 z-0"></div>

      {/* Animated floating circles */}
      <motion.div
        className="absolute top-1/3 right-1/10 w-10 h-10 rounded-full bg-blue-100/40 dark:bg-blue-900/30 z-0"
        animate={{
          y: [0, -8, 0],
          x: [0, 8, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/3 left-1/6 w-16 h-16 rounded-full bg-blue-100/40 dark:bg-blue-900/30 z-0"
        animate={{
          y: [0, 12, 0],
          x: [0, -8, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      <motion.div
        className="absolute top-2/3 right-1/4 w-8 h-8 rounded-full bg-blue-100/40 dark:bg-blue-900/30 z-0"
        animate={{
          y: [0, 6, 0],
          x: [0, -6, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
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
            With 4+ years of experience, I&apos;ve developed expertise in various
            technologies and methodologies. Here are the key skills that I bring
            to the table.
          </p>
        </motion.div>

        {/* Skills Connect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg py-6 px-4 md:px-8 mb-16 -mt-6 relative z-20 max-w-4xl mx-auto light-card"
        >
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                4+
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Years Experience
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                20+
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Projects Completed
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                10+
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Happy Clients
              </div>
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
                className={`px-6 py-2 rounded-full cursor-pointer transition-colors duration-300 ${
                  activeTab === category.id
                    ? "bg-blue-600 text-white"
                    : `${` ${isDarkMode ? 'border-gray-600 text-gray-100 bg-gray-700 hover:bg-gray-600' : 'border-gray-300 text-gray-700 bg-white border hover:bg-gray-100'}`}`
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
                className="card card-body bg-white dark:bg-gray-800 shadow-md rounded-lg p-5"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-700 dark:text-blue-300 mr-4">
                    {getIconComponent(skill.icon, skill.iconType)}
                  </div>
                  <h3 className="card-title">{skill.name}</h3>
                </div>
                <div
                  className={`w-full max-w-md mx-auto h-2 ${
                    isDarkMode ? "bg-gray-600" : "bg-gray-200"
                  } rounded-full overflow-hidden mb-6`}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    className="bg-blue-600 dark:bg-blue-500 h-2.5 rounded-full"
                  ></motion.div>
                </div>
                <div className="text-right text-sm text-gray-700 dark:text-gray-300">
                  {skill.level}%
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
