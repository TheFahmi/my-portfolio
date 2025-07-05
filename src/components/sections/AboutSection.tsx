'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import ToggleableAboutImage from '@/components/ui/ToggleableAboutImage';

const AboutSection = () => {
  const { theme } = useTheme();



  const experiences = [
    {
      year: '2023 - Present',
      title: 'Senior Frontend Engineer',
      company: 'Tech Company',
      description: 'Leading frontend development and team management'
    },
    {
      year: '2021 - 2023',
      title: 'Frontend Engineer',
      company: 'Digital Agency',
      description: 'Building responsive web applications with React'
    },
    {
      year: '2020 - 2021',
      title: 'Junior Developer',
      company: 'Startup',
      description: 'Learning and growing in web development'
    }
  ];

  const personalInfo = [
    { label: 'Name', value: 'Muhammad Fahmi Hassan' },
    { label: 'Email', value: 'hello.fahmihassan@gmail.com' },
    { label: 'Location', value: 'Indonesia' },
    { label: 'Experience', value: '4+ Years' },
  ];

  return (
    <section id="about" className={`py-20 transition-colors duration-300 ${
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
            About Me
          </motion.div>
          
          <h2 className={`text-4xl lg:text-5xl font-bold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Get to Know Me
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            A passionate frontend engineer with expertise in modern web technologies
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Image and Personal Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-8"
          >
            {/* Profile Image */}
            <div className="relative">
              <motion.div
                className="relative w-full max-w-md mx-auto"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Simple Border */}
                <div className={`absolute inset-0 rounded-2xl p-2 ${
                  theme === 'dark' 
                    ? 'bg-gray-800 border border-gray-700' 
                    : 'bg-gray-100 border border-gray-200'
                } shadow-xl`}>
                  <div className="w-full h-full rounded-xl overflow-hidden">
                    <ToggleableAboutImage
                      className="w-full aspect-[4/5] object-cover"
                      imageUrl="/images/fahmi-profile.jpg"
                      alt="Fahmi Hassan - Frontend Engineer"
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Personal Information Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className={`p-6 rounded-xl ${
                theme === 'dark' 
                  ? 'bg-gray-800 border border-gray-700' 
                  : 'bg-gray-50 border border-gray-200'
              }`}
            >
              <h3 className={`text-xl font-bold mb-6 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Personal Information
              </h3>
              <div className="space-y-4">
                {personalInfo.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                    className="flex justify-between items-center py-2"
                  >
                    <span className={`font-medium ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {item.label}:
                    </span>
                    <span className={`font-semibold ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {item.value}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Main Content */}
            <div>
              <motion.h3 
                className={`text-3xl font-bold mb-6 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                Who Am I?
              </motion.h3>
              
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <p className={`text-lg leading-relaxed ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  I&apos;m a passionate Frontend Engineer with over 4 years of experience in creating innovative and impactful web applications. My expertise extends to project management, team leadership, and implementing Agile methodologies.
                </p>
                <p className={`text-lg leading-relaxed ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  I specialize in React, Next.js, TypeScript, and modern web technologies. I&apos;ve successfully led frontend teams and delivered high-quality projects on time.
                </p>
              </motion.div>
            </div>



            {/* Experience Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <h4 className={`text-2xl font-bold mb-6 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Experience
              </h4>
              
              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                    className={`p-6 rounded-xl border ${
                      theme === 'dark' 
                        ? 'bg-gray-800/50 border-gray-700' 
                        : 'bg-gray-50/50 border-gray-200'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h5 className={`text-xl font-bold ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                          {exp.title}
                        </h5>
                        <div className={`text-lg font-semibold ${
                          theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                        }`}>
                          {exp.company}
                        </div>
                      </div>
                      <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                        theme === 'dark' 
                          ? 'bg-gray-700 text-gray-300' 
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {exp.year}
                      </span>
                    </div>
                    <p className={`${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {exp.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="pt-4"
            >
                              <Link
                  href="#contact"
                  className="inline-flex items-center px-8 py-3 rounded-lg font-semibold transition-all duration-300 bg-blue-600 text-white hover:bg-blue-700"
                >
                Let&apos;s Work Together
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
