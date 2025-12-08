"use client";

import { motion } from "framer-motion";
import siteConfig from "@/config/siteConfig";
import ToggleableAboutImage from "@/components/ui/ToggleableAboutImage";

const AboutSection = () => {
  const { personalInfo, experience, education } = siteConfig;

  const infoList = [
    { label: "Name", value: personalInfo.name },
    { label: "Email", value: personalInfo.email },
    { label: "Location", value: personalInfo.location },
    { label: "Experience", value: personalInfo.experienceYears },
  ];

  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6"
          >
            About <span className="text-blue-500">Me</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-600 dark:text-slate-400 text-lg"
          >
            Passionate about creating seamless user experiences and scalable applications.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Image & Personal Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4 space-y-8"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-card border border-slate-200 dark:border-slate-700">
              <div className="aspect-[4/5] w-full relative group">
                <ToggleableAboutImage
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  imageUrl={personalInfo.profileImage}
                  alt={personalInfo.name}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <p className="text-white font-medium">
                    &quot;Coding is not just about syntax, it&apos;s about solving problems.&quot;
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 border-b border-slate-100 dark:border-slate-700 pb-2">
                Personal Info
              </h3>
              <div className="space-y-3">
                {infoList.map((item) => (
                  <div key={item.label} className="flex justify-between items-center text-sm">
                    <span className="text-slate-500 dark:text-slate-400">{item.label}</span>
                    <span className="font-semibold text-slate-900 dark:text-slate-200 text-right">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Bio & Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-8 space-y-12"
          >
            {/* Bio */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Who am I?</h3>
              {personalInfo.about.map((paragraph, idx) => (
                <p key={idx} className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Experience */}
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <span className="w-8 h-1 bg-blue-500 rounded-full"></span> Experience
              </h3>
              <div className="space-y-8 pl-4 border-l-2 border-slate-200 dark:border-slate-800 ml-2">
                {experience.map((exp, index) => (
                  <div key={index} className="relative pl-4 group">
                    {/* Main Dot */}
                    <span className="absolute -left-[25px] top-2 w-4 h-4 rounded-full border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 group-hover:border-blue-500 group-hover:bg-blue-500 transition-colors"></span>

                    {/* If grouped experience (has roles) */}
                    {exp.roles ? (
                      <div className="pb-2">
                        <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-blue-500 transition-colors">
                          {exp.company}
                        </h4>
                        <div className="space-y-8 relative border-l-2 border-slate-200 dark:border-slate-700/50 ml-1 pl-4">
                          {exp.roles.map((role, rIdx) => (
                            <div key={rIdx} className="relative group/role">
                              <span className="absolute -left-[23px] top-2 w-3 h-3 rounded-full border-2 border-blue-500 bg-white dark:bg-slate-900"></span>

                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                                <h5 className="text-lg font-bold text-slate-800 dark:text-slate-200">{role.title}</h5>
                                <span className="text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full">{role.year}</span>
                              </div>

                              <p className="text-slate-600 dark:text-slate-300 text-sm mb-2">{role.description}</p>

                              {role.details && (
                                <ul className="list-disc list-outside ml-4 space-y-1 text-slate-500 dark:text-slate-400 text-sm">
                                  {role.details.map((detail, dIdx) => (
                                    <li key={dIdx}>{detail}</li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      /* Single Role Item */
                      <>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                          <h4 className="text-xl font-bold text-slate-800 dark:text-white group-hover:text-blue-500 transition-colors">{exp.title}</h4>
                          <span className="text-sm font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">{exp.year}</span>
                        </div>
                        <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">{exp.company}</p>
                        <p className="text-slate-600 dark:text-slate-300 mb-3">{exp.description}</p>
                        {exp.details && (
                          <ul className="list-disc list-outside ml-4 space-y-1 text-slate-500 dark:text-slate-400 text-sm">
                            {exp.details.map((detail, idx) => (
                              <li key={idx}>{detail}</li>
                            ))}
                          </ul>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            {education && (
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                  <span className="w-8 h-1 bg-purple-500 rounded-full"></span> Education
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {education.map((edu, index) => (
                    <div key={index} className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-100 dark:border-slate-700/50 hover:border-purple-500/30 transition-colors">
                      <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-2 block">{edu.year}</span>
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{edu.degree}</h4>
                      <p className="text-slate-600 dark:text-slate-400">{edu.institution}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
