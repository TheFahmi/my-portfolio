"use client";

import { motion } from "framer-motion";
import siteConfig from "@/config/siteConfig";
import ToggleableAboutImage from "@/components/ui/ToggleableAboutImage";

const AboutSection = () => {
  const { personalInfo, experience, education } = siteConfig;

  // Bento Box Item Component
  const BentoBox = ({ children, className = "", delay = 0 }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      className={`rounded-[2rem] bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 p-8 shadow-sm hover:shadow-md transition-shadow ${className}`}
    >
      {children}
    </motion.div>
  );

  return (
    <section id="about" className="py-32 relative bg-slate-50 dark:bg-slate-950">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white"
            >
              Hello, I'm <span className="text-slate-400 dark:text-slate-600">{personalInfo.name.split(' ')[1]}.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-slate-500 dark:text-slate-400 mt-4 max-w-2xl leading-relaxed"
            >
              I craft digital experiences with a focus on motion, interaction, and performance. Based in {personalInfo.location}.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="hidden lg:block text-right"
          >
            <span className="block text-6xl font-bold text-slate-200 dark:text-slate-800">02</span>
            <span className="text-sm font-medium uppercase tracking-widest text-slate-400">About Chapter</span>
          </motion.div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* 1. Large Bio with Photo */}
          <BentoBox className="lg:col-span-2 min-h-[400px] md:min-h-[500px] flex flex-col md:flex-row gap-8 items-center bg-gradient-to-br from-slate-100 to-white dark:from-slate-900 dark:to-slate-950">
            <div className="w-full md:w-1/2 h-64 md:h-full relative rounded-3xl overflow-hidden shadow-xl">
              <ToggleableAboutImage
                className="w-full h-full object-cover"
                imageUrl={personalInfo.profileImage}
                alt={personalInfo.name}
              />
              <div className="absolute inset-0 bg-black/10 dark:bg-black/20" />
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-center space-y-6">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">My Story</h3>
              <div className="space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed">
                {personalInfo.about.slice(0, 2).map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>
          </BentoBox>

          {/* 2. Professional Summary / What I Do */}
          <BentoBox className="flex flex-col justify-between !bg-slate-900 dark:!bg-white text-white dark:text-slate-900 p-8">
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="w-2 h-8 bg-slate-500 rounded-full"></span>
                What I Do
              </h3>
              <ul className="space-y-6">
                <li className="flex items-start gap-3">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0"></div>
                  <div>
                    <strong className="block text-lg font-semibold mb-1">Full Stack Development</strong>
                    <p className="text-sm text-slate-400 dark:text-slate-600 leading-relaxed">Building end-to-end web solutions using modern stacks like Next.js and Node.js.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0"></div>
                  <div>
                    <strong className="block text-lg font-semibold mb-1">System Architecture</strong>
                    <p className="text-sm text-slate-400 dark:text-slate-600 leading-relaxed">Designing scalable, secure, and performant application structures.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-8 border-t border-white/10 dark:border-black/10">
              <a
                href={personalInfo.resumeUrl}
                target="_blank"
                className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Resume
              </a>
            </div>
          </BentoBox>

          {/* 3. Experience Scroll */}
          <BentoBox className="lg:col-span-2 lg:row-span-2 overflow-hidden flex flex-col max-h-[600px]">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                <span className="w-2 h-8 bg-slate-500 rounded-full"></span>
                Career Journey
              </h3>
              <span className="text-sm text-slate-400">Scrollable</span>
            </div>

            <div className="flex-1 overflow-y-auto pr-4 pl-4 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700">
              <div className="relative border-l border-slate-200 dark:border-slate-800 ml-3 space-y-8 my-2">
                {experience.map((exp, idx) => (
                  <div key={idx} className="relative pl-8">
                    <span className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-slate-500 ring-4 ring-white dark:ring-slate-900 z-10"></span>

                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white">{exp.company}</h4>
                      <span className="text-sm font-medium text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">{exp.year}</span>
                    </div>

                    {exp.roles ? (
                      <div className="space-y-6 mt-4">
                        {exp.roles.map((role, rIdx) => (
                          <div key={rIdx} className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl">
                            <h5 className="font-semibold text-slate-800 dark:text-slate-200">{role.title}</h5>
                            <span className="text-xs text-slate-500 block mb-2">{role.year}</span>
                            <p className="text-sm text-slate-600 dark:text-slate-400">{role.description}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl mt-2">
                        <h5 className="font-semibold text-slate-800 dark:text-slate-200">{exp.title}</h5>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">{exp.description}</p>
                        {exp.details && (
                          <ul className="mt-3 space-y-1">
                            {exp.details.slice(0, 2).map((d, i) => (
                              <li key={i} className="text-xs text-slate-500 flex items-start gap-2">
                                <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400"></span>
                                {d}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </BentoBox>

          {/* 4. Education & Certs */}
          <BentoBox className="flex flex-col justify-between space-y-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Education</h3>
              <div className="space-y-4">
                {education && education.map((edu, idx) => (
                  <div key={idx} className="group cursor-default">
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="font-semibold text-slate-800 dark:text-slate-200 group-hover:text-slate-600 dark:group-hover:text-slate-400 transition-colors pr-4">{edu.degree}</span>
                      <span className="text-xs text-slate-400 whitespace-nowrap">{edu.year}</span>
                    </div>
                    <p className="text-sm text-slate-500">{edu.institution}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Core Skills</h3>
              <div className="flex flex-wrap gap-2">
                {["JavaScript", "TypeScript", "React", "Next.js", "Node.js"].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </BentoBox>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
