'use client';

import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';

const SkillsSection = () => {
  const { theme } = useTheme();

  const skillCategories = [
    {
      title: 'Frontend Technologies',
      skills: [
        { name: 'React', level: 95, description: 'Component-based UI development' },
        { name: 'Next.js', level: 90, description: 'Full-stack React framework' },
        { name: 'TypeScript', level: 88, description: 'Type-safe JavaScript development' },
        { name: 'Vue.js', level: 85, description: 'Progressive web applications' },
        { name: 'React Native', level: 80, description: 'Cross-platform mobile apps' },
      ]
    },
    {
      title: 'Styling & Design',
      skills: [
        { name: 'TailwindCSS', level: 92, description: 'Utility-first CSS framework' },
        { name: 'Sass/SCSS', level: 85, description: 'Advanced CSS preprocessing' },
        { name: 'Styled Components', level: 80, description: 'CSS-in-JS styling solution' },
        { name: 'Figma', level: 75, description: 'UI/UX design and prototyping' },
      ]
    },
    {
      title: 'Tools & Workflow',
      skills: [
        { name: 'Git', level: 90, description: 'Version control and collaboration' },
        { name: 'Webpack', level: 78, description: 'Module bundling and optimization' },
        { name: 'Vite', level: 85, description: 'Fast build tool and dev server' },
        { name: 'Jest', level: 82, description: 'JavaScript testing framework' },
      ]
    }
  ];

  return (
    <section id="skills" className={`py-20 transition-colors duration-300 ${
      theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
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
                ? 'bg-gray-700 text-gray-300 border border-gray-600' 
                : 'bg-white text-gray-600 border border-gray-200'
            }`}
          >
            My Skills
          </motion.div>
          
          <h2 className={`text-4xl lg:text-5xl font-bold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Technical Expertise
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            A comprehensive overview of my technical skills and proficiency levels
          </p>
        </motion.div>

        {/* Skills Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
              className={`p-8 rounded-2xl ${
                theme === 'dark' 
                  ? 'bg-gray-900 border border-gray-700' 
                  : 'bg-white border border-gray-200'
              } shadow-lg`}
            >
              {/* Category Header */}
              <div className="mb-8">
                <h3 className={`text-2xl font-bold mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {category.title}
                </h3>
                <div className={`w-12 h-1 rounded-full ${
                  theme === 'dark' ? 'bg-blue-500' : 'bg-blue-600'
                }`}></div>
              </div>

              {/* Skills List */}
              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.5, 
                      delay: categoryIndex * 0.2 + skillIndex * 0.1 
                    }}
                    className="group"
                  >
                    {/* Skill Header */}
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <h4 className={`font-semibold text-lg ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                          {skill.name}
                        </h4>
                        <p className={`text-sm ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {skill.description}
                        </p>
                      </div>
                      <span className={`text-sm font-bold ${
                        theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                      }`}>
                        {skill.level}%
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className={`w-full h-2 rounded-full ${
                      theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                    } overflow-hidden`}>
                      <motion.div
                        className={`h-full rounded-full ${
                          theme === 'dark' ? 'bg-blue-500' : 'bg-blue-600'
                        } transition-all duration-300 group-hover:shadow-lg`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ 
                          duration: 1.5, 
                          delay: categoryIndex * 0.2 + skillIndex * 0.1 + 0.3 
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className={`p-8 rounded-2xl ${
            theme === 'dark' 
              ? 'bg-gray-900 border border-gray-700' 
              : 'bg-white border border-gray-200'
          } shadow-lg max-w-4xl mx-auto`}>
            <h3 className={`text-2xl font-bold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Always Learning & Growing
            </h3>
            <p className={`text-lg leading-relaxed ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Technology evolves rapidly, and I&apos;m committed to continuous learning. 
              I regularly explore new frameworks, tools, and best practices to stay 
              current with industry trends and deliver cutting-edge solutions.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
