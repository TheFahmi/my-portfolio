'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import siteConfig from '@/config/siteConfig';
import { useTranslations } from 'next-intl';
import PageTransition from '@/components/effects/PageTransition';

export default function WorkPage() {
  const t = useTranslations('work');
  const { projects, skills } = siteConfig;

  return (
    <PageTransition>
      <main className="min-h-screen bg-black text-gray-400">
        {/* Page Header */}
        <section className="pt-32 pb-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent"
            >
              {t('title') || 'My Work'}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg leading-relaxed max-w-2xl mx-auto"
            >
              {t('subtitle') || "Projects I've built from the ground up, ranging from SaaS platforms to corporate websites."}
            </motion.p>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              {projects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="group flex flex-col bg-[#111]/80 border border-white/[0.08] rounded-xl overflow-hidden hover:border-white/[0.15] transition-colors"
                >
                  <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#1a1a1a]">
                    <Image
                      src={project.demo
                        ? `/api/screenshot?url=${encodeURIComponent(project.demo)}`
                        : project.image}
                      alt={project.title}
                      fill
                      unoptimized={!!project.demo}
                      className="object-cover object-top opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent opacity-80" />
                    
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="bg-black/60 backdrop-blur-md text-white text-xs font-medium px-3 py-1.5 rounded-full border border-white/10">
                        {project.category}
                      </span>
                      {project.featured && (
                        <span className="bg-white text-black text-xs font-bold px-3 py-1.5 rounded-full">
                          Featured
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="p-6 md:p-8 flex flex-col flex-grow">
                    <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
                    <p className="text-gray-400 mb-6 flex-grow">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.technologies.map((tech, tIdx) => (
                        <span 
                          key={tIdx} 
                          className="bg-[#1a1a1a] text-gray-300 text-xs font-medium rounded-md px-2.5 py-1 border border-white/[0.05]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-4 mt-auto pt-6 border-t border-white/[0.05]">
                      {project.demo && (
                        <a 
                          href={project.demo} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors text-sm font-medium"
                        >
                          <span>Live Demo</span>
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}
                      {project.github && (
                        <a 
                          href={project.github} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium"
                        >
                          <span>GitHub</span>
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Deep Dive */}
        <section className="py-24 px-6 bg-[#0a0a0a]">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                Technical Arsenal
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Comprehensive breakdown of the tools, languages, and frameworks I use to build scalable digital products.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {skills.map((category, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="bg-[#111]/80 border border-white/[0.08] rounded-xl p-8"
                >
                  <h3 className="text-xl font-bold text-white mb-6 pb-4 border-b border-white/[0.05]">
                    {category.title}
                  </h3>
                  <div className="space-y-6">
                    {category.skills.map((skill, sIdx) => (
                      <div key={sIdx}>
                        <div className="flex justify-between items-end mb-2">
                          <span className="text-white font-medium">{skill.name}</span>
                          <span className="text-gray-500 text-xs">{skill.level}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-[#1a1a1a] rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-white/80 rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.2 }}
                          />
                        </div>
                        <p className="text-gray-500 text-xs mt-2">{skill.description}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </PageTransition>
  );
}