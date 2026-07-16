'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import siteConfig, { getLocalizedConfig } from '@/config/siteConfig';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import PageTransition from '@/components/effects/PageTransition';
import { Download, Github, Linkedin, Twitter, MapPin, Mail, Phone } from 'lucide-react';

export default function AboutClient() {
  const t = useTranslations('about');
  const locale = useLocale();
  const config = getLocalizedConfig(locale);
  const { personalInfo, experience } = config;

  return (
    <PageTransition>
      <main className="min-h-screen transition-colors duration-300" style={{ backgroundColor: 'var(--theme-bg)', color: 'var(--theme-fg-secondary)' }}>
        {/* Page Header with Photo */}
        <section className="relative pt-32 pb-16 px-6 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px] pointer-events-none" style={{ backgroundColor: 'var(--theme-sphere-glow)', opacity: 0.1 }} />
          
          <div className="max-w-4xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center text-center"
            >
              {/* Profile Photo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="mb-8 relative"
              >
                <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-[0_0_60px_rgba(0,113,227,0.15)]" style={{ border: '2px solid var(--theme-border-glass)' }}>
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--theme-sphere-glow)]/20 to-transparent" />
                  <Image
                    src="/images/fahmi-profile.webp"
                    alt="M Fahmi Hassan"
                    fill
                    className="object-cover object-[center_15%]"
                    priority
                  />
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-6"
                style={{ color: 'var(--theme-fg)' }}
              >
                {t('title') || 'About Me'}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg leading-relaxed max-w-2xl mx-auto mb-8"
                style={{ color: 'var(--theme-fg-muted)' }}
              >
                {personalInfo.about[0]}
              </motion.p>

              {/* Download CV Button */}
              <motion.a
                href="/cv.pdf"
                download
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all hover:shadow-[0_10px_30px_-10px_rgba(0,113,227,0.4)]"
                style={{
                  backgroundColor: 'var(--theme-btn-primary-bg)',
                  color: 'var(--theme-btn-primary-fg)',
                }}
              >
                <Download className="w-4 h-4" />
                {t('downloadCV') || 'Download CV'}
              </motion.a>
            </motion.div>
          </div>
        </section>

        {/* Two-column: My Story + Skills */}
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* My Story */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-semibold mb-6" style={{ color: 'var(--theme-fg)' }}>
                {t('story') || 'My Story'}
              </h2>
              <div className="space-y-4 leading-relaxed" style={{ color: 'var(--theme-fg-muted)' }}>
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
              <h2 className="text-2xl font-semibold mb-6" style={{ color: 'var(--theme-fg)' }}>
                {t('skills') || 'Skills & Technologies'}
              </h2>
              <div className="flex flex-wrap gap-2 mb-12">
                {config.skills.flatMap(cat => cat.skills).map((skill, idx) => (
                  <span
                    key={idx}
                    className="text-sm rounded-full px-4 py-2 transition-all hover:border-[var(--theme-fg-muted)]"
                    style={{
                      backgroundColor: 'var(--theme-card-bg)',
                      color: 'var(--theme-fg)',
                      border: '1px solid var(--theme-border-glass)',
                    }}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>

              {/* Connect with Me */}
              <div>
                <h2 className="text-2xl font-semibold mb-6" style={{ color: 'var(--theme-fg)' }}>
                  {t('connect') || 'Connect with Me'}
                </h2>
                <div className="flex gap-4">
                  <a
                    href={siteConfig.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full flex items-center justify-center transition-all group"
                    style={{ border: '1px solid var(--theme-border-glass)', color: 'var(--theme-fg-muted)' }}
                  >
                    <Github className="w-5 h-5 group-hover:scale-110 transition-transform" style={{ color: 'currentColor' }} />
                  </a>
                  <a
                    href={siteConfig.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full flex items-center justify-center transition-all group"
                    style={{ border: '1px solid var(--theme-border-glass)', color: 'var(--theme-fg-muted)' }}
                  >
                    <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" style={{ color: 'currentColor' }} />
                  </a>
                  <a
                    href={siteConfig.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full flex items-center justify-center transition-all group"
                    style={{ border: '1px solid var(--theme-border-glass)', color: 'var(--theme-fg-muted)' }}
                  >
                    <Twitter className="w-5 h-5 group-hover:scale-110 transition-transform" style={{ color: 'currentColor' }} />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Experience Timeline */}
        <section className="py-24 px-6 transition-colors duration-300" style={{ backgroundColor: 'var(--theme-bg-section-alt)', borderTop: '1px solid var(--theme-divider)' }}>
          <div className="max-w-3xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-semibold text-center mb-16"
              style={{ color: 'var(--theme-fg)' }}
            >
              {t('experience') || 'Experience'}
            </motion.h2>
            
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5" style={{ backgroundColor: 'var(--theme-divider)' }} />
              
              <div className="space-y-12">
                {experience.map((exp, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className="relative pl-12 md:pl-20"
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-0 md:left-4 top-1 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center z-10 flex-shrink-0"
                      style={{
                        backgroundColor: 'var(--theme-bg-card)',
                        border: '2px solid var(--theme-sphere-glow)',
                        boxShadow: '0 0 0 4px var(--theme-bg-section-alt)',
                      }}
                    >
                      <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full" style={{ backgroundColor: 'var(--theme-sphere-glow)' }} />
                    </div>

                    {/* Experience Card */}
                    <div className="rounded-2xl p-6 md:p-8 transition-all duration-300 hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.2)]"
                      style={{
                        backgroundColor: 'var(--theme-card-bg)',
                        border: '1px solid var(--theme-border-glass)',
                      }}
                    >
                      {exp.roles ? (
                        exp.roles.map((role, rIdx) => (
                          <div key={rIdx} className={rIdx > 0 ? 'mt-8 pt-8' : ''} style={{ borderTop: rIdx > 0 ? '1px solid var(--theme-divider)' : 'none' }}>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                              <h3 className="text-xl font-semibold" style={{ color: 'var(--theme-fg)' }}>
                                {role.title}
                              </h3>
                              <span className="text-sm font-medium tracking-wide px-3 py-1 rounded-full"
                                style={{
                                  backgroundColor: 'var(--theme-social-hover-bg)',
                                  color: 'var(--theme-fg-dim)',
                                }}
                              >
                                {role.year}
                              </span>
                            </div>
                            <p className="font-medium mb-4" style={{ color: 'var(--theme-fg-muted)' }}>
                              {exp.company}
                            </p>
                            <p className="leading-relaxed" style={{ color: 'var(--theme-fg-muted)' }}>
                              {role.description}
                            </p>
                            {role.details && (
                              <ul className="mt-4 space-y-2">
                                {role.details.map((detail, dIdx) => (
                                  <li key={dIdx} className="flex gap-3 text-sm" style={{ color: 'var(--theme-fg-muted)' }}>
                                    <span className="mt-0.5 flex-shrink-0" style={{ color: 'var(--theme-fg-dim)' }}>▸</span>
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
                            <h3 className="text-xl font-semibold" style={{ color: 'var(--theme-fg)' }}>
                              {exp.title}
                            </h3>
                            <span className="text-sm font-medium tracking-wide px-3 py-1 rounded-full"
                              style={{
                                backgroundColor: 'var(--theme-social-hover-bg)',
                                color: 'var(--theme-fg-dim)',
                              }}
                            >
                              {exp.year}
                            </span>
                          </div>
                          <p className="font-medium mb-4" style={{ color: 'var(--theme-fg-muted)' }}>
                            {exp.company}
                          </p>
                          <p className="leading-relaxed" style={{ color: 'var(--theme-fg-muted)' }}>
                            {exp.description}
                          </p>
                          {exp.details && (
                            <ul className="mt-4 space-y-2">
                              {exp.details.map((detail, dIdx) => (
                                <li key={dIdx} className="flex gap-3 text-sm" style={{ color: 'var(--theme-fg-muted)' }}>
                                  <span className="mt-0.5 flex-shrink-0" style={{ color: 'var(--theme-fg-dim)' }}>▸</span>
                                  <span>{detail}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Current Stack / Stats */}
        <section className="py-24 px-6" style={{ borderTop: '1px solid var(--theme-divider)' }}>
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4" style={{ color: 'var(--theme-fg)' }}>
                {t('currentStack') || 'Current Stack'}
              </h2>
              <p className="max-w-2xl mx-auto" style={{ color: 'var(--theme-fg-muted)' }}>
                The tools I reach for daily when building modern, scalable applications.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: '⚛️', label: 'React / Next.js', desc: 'Frontend framework' },
                { icon: '🟦', label: 'TypeScript', desc: 'Type-safe JavaScript' },
                { icon: '🏗️', label: 'NestJS / Node.js', desc: 'Backend framework' },
                { icon: '🐘', label: 'PostgreSQL', desc: 'Primary database' },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="text-center p-6 rounded-2xl transition-all hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)]"
                  style={{
                    backgroundColor: 'var(--theme-card-bg)',
                    border: '1px solid var(--theme-border-glass)',
                  }}
                >
                  <span className="text-4xl mb-3 block">{item.icon}</span>
                  <h3 className="font-semibold mb-1" style={{ color: 'var(--theme-fg)' }}>{item.label}</h3>
                  <p className="text-sm" style={{ color: 'var(--theme-fg-dim)' }}>{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </PageTransition>
  );
}