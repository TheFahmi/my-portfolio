'use client';

import { motion } from 'framer-motion';
import siteConfig from '@/config/siteConfig';
import { useTranslations } from 'next-intl';
import PageTransition from '@/components/effects/PageTransition';

export default function AboutPage() {
  const t = useTranslations('about');
  const { personalInfo, experience } = siteConfig;

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
              {t('title') || 'About Me'}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg leading-relaxed max-w-2xl mx-auto"
            >
              {personalInfo.about[0]}
            </motion.p>
          </div>
        </section>

        {/* Two-column: My Story + Skills */}
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 px-2">
            {/* My Story */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">{t('story') || 'My Story'}</h2>
              <div className="space-y-4 leading-relaxed text-gray-400">
                {personalInfo.about.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </motion.div>
            
            {/* Skills & Technologies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">{t('skills') || 'Skills & Technologies'}</h2>
              <div className="flex flex-wrap gap-2">
                {siteConfig.skills.flatMap(cat => cat.skills).map((skill, idx) => (
                  <span 
                    key={idx} 
                    className="bg-[#1a1a1a] text-white text-sm rounded-full px-4 py-2 border border-white/[0.05]"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
              
              {/* Connect with Me */}
              <div className="mt-16">
                <h2 className="text-2xl font-bold text-white mb-6">{t('connect') || 'Connect with Me'}</h2>
                <div className="flex gap-4">
                  <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer" 
                     className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all">
                    GH
                  </a>
                  <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer"
                     className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all">
                    LI
                  </a>
                  <a href={siteConfig.social.twitter} target="_blank" rel="noopener noreferrer"
                     className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all">
                    TW
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Experience */}
        <section className="py-24 px-6 bg-[#0a0a0a]">
          <div className="max-w-3xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent"
            >
              {t('experience') || 'Experience'}
            </motion.h2>
            <div className="space-y-6">
              {experience.map((exp, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="bg-[#111]/80 border border-white/[0.08] rounded-xl p-6 md:p-8"
                >
                  {exp.roles ? (
                    exp.roles.map((role, rIdx) => (
                      <div key={rIdx} className={rIdx > 0 ? 'mt-8 pt-8 border-t border-white/[0.05]' : ''}>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                          <h3 className="text-xl font-bold text-white">{role.title}</h3>
                          <span className="text-sm font-medium tracking-wide text-gray-500">{role.year}</span>
                        </div>
                        <p className="text-gray-400 font-medium mb-4">{exp.company}</p>
                        <p className="text-gray-400 leading-relaxed">{role.description}</p>
                        {role.details && (
                          <ul className="mt-4 space-y-2">
                            {role.details.map((detail, dIdx) => (
                              <li key={dIdx} className="flex gap-3 text-gray-400 text-sm">
                                <span className="text-white/30 mt-0.5">•</span>
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))
                  ) : (
                    <>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                        <span className="text-sm font-medium tracking-wide text-gray-500">{exp.year}</span>
                      </div>
                      <p className="text-gray-400 font-medium mb-4">{exp.company}</p>
                      <p className="text-gray-400 leading-relaxed">{exp.description}</p>
                      {exp.details && (
                        <ul className="mt-4 space-y-2">
                          {exp.details.map((detail, dIdx) => (
                            <li key={dIdx} className="flex gap-3 text-gray-400 text-sm">
                              <span className="text-white/30 mt-0.5">•</span>
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </PageTransition>
  );
}