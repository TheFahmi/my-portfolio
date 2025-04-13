'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import AnimatedBlob from '@/components/ui/svg/AnimatedBlob';
import GeometricShapes from '@/components/ui/svg/GeometricShapes';
import ToggleableAboutImage from '@/components/ui/ToggleableAboutImage';

const AboutSection = () => {
  return (
    <section id="about" className="section-alt py-20 bg-gray-50 dark:bg-gray-800 relative overflow-hidden transition-colors duration-300">
      {/* SVG Background Animations */}
      <AnimatedBlob
        className="top-1/4 left-1/5 w-[300px] h-[300px] opacity-20 dark:opacity-50 -z-10"
        color="rgba(37, 99, 235, 0.2)"
        darkColor="rgba(59, 130, 246, 0.6)"
        duration={20}
      />
      <AnimatedBlob
        className="bottom-1/4 right-1/6 w-[400px] h-[400px] opacity-15 dark:opacity-40 -z-10"
        color="rgba(37, 99, 235, 0.15)"
        darkColor="rgba(59, 130, 246, 0.5)"
        duration={25}
        delay={1}
      />
      <GeometricShapes className="-z-10 opacity-30 dark:opacity-60" count={10} />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">About Me</h2>
          <div className="section-divider"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-5 relative"
          >
            <div className="relative">
              <div className="absolute -top-5 -left-5 w-full h-full border-2 border-blue-600 rounded-lg z-0"></div>
              <div className="relative z-10 rounded-lg overflow-hidden shadow-xl bg-white dark:bg-gray-700">
                {/* Toggleable About Image */}
                <ToggleableAboutImage
                  className="w-full aspect-[4/5]"
                  imageUrl="/images/fahmi-profile.jpg"
                  alt="Fahmi Hassan - Frontend Engineer"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="md:col-span-7"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 relative inline-block">
              Who Am I?
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-blue-600"></span>
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              I&apos;m a passionate <span className="font-semibold text-blue-600 dark:text-blue-400">Frontend Engineer</span> with over 4 years of experience in creating innovative and impactful web applications. My expertise extends to project management, team leadership, and implementing Agile methodologies for efficient task execution.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              I&apos;ve led frontend teams to success by implementing Agile practices like sprint planning and stand-ups, ensuring project delivery within deadlines. My technical toolkit includes TypeScript, NuxtJs, TailwindCSS, ReactJs, Vue.js, and React Native for mobile development.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              I&apos;ve spearheaded redesign projects that improved user experience, migrated tech stacks to enhance performance, and maintained clear communication with stakeholders through regular progress reports.
            </p>

            <div className="card p-6 mb-6 border-l-4 border-primary">
              <h4 className="card-title mb-4">Personal Information</h4>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-32 font-medium text-gray-700 dark:text-gray-300 flex items-center">
                    <span className="w-3 h-3 bg-primary rounded-full mr-2"></span>
                    <span>Name:</span>
                  </div>
                  <span className="text-secondary">Muhammad Fahmi Hassan</span>
                </div>
                <div className="flex items-center">
                  <div className="w-32 font-medium text-gray-700 dark:text-gray-300 flex items-center">
                    <span className="w-3 h-3 bg-primary rounded-full mr-2"></span>
                    <span>Email:</span>
                  </div>
                  <span className="text-secondary break-all">hello.fahmihassan@gmail.com</span>
                </div>
                <div className="flex items-center">
                  <div className="w-32 font-medium text-gray-700 dark:text-gray-300 flex items-center">
                    <span className="w-3 h-3 bg-primary rounded-full mr-2"></span>
                    <span>Location:</span>
                  </div>
                  <span className="text-secondary">Indonesia</span>
                </div>
                <div className="flex items-center">
                  <div className="w-32 font-medium text-gray-700 dark:text-gray-300 flex items-center">
                    <span className="w-3 h-3 bg-primary rounded-full mr-2"></span>
                    <span>Experience:</span>
                  </div>
                  <span className="text-secondary">4+ Years</span>
                </div>
              </div>
            </div>

            <Link
              href="#contact"
              className="btn btn-primary"
            >
              Contact Me
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
