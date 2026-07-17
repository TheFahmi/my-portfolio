'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import siteConfig, { getLocalizedConfig } from '@/config/siteConfig';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import PageTransition from '@/components/effects/PageTransition';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import dynamic from 'next/dynamic';

const AnimatedSphere = dynamic(() => import('@/components/three/AnimatedSphere'), {
  ssr: true,
});

export default function WorkClient() {
  const t = useTranslations('work');
  const locale = useLocale();
  const config = getLocalizedConfig(locale);
  const { projects, skills } = config;

  return (
    <PageTransition>
      <main className="min-h-screen transition-colors duration-300" style={{ backgroundColor: 'var(--theme-bg)', color: 'var(--theme-fg-secondary)' }}>
        {/* Page Header with 3D Sphere */}
        <section className="relative pt-32 pb-16 px-6 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px] pointer-events-none" style={{ backgroundColor: 'var(--theme-sphere-glow)', opacity: 0.15 }} />
          
          <div className="max-w-5xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="text-xs font-medium uppercase tracking-widest" style={{ color: 'var(--theme-fg-dim)' }}>
                {t('sectionLabel') || 'Work'}
              </span>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mt-4 mb-6"
                style={{ color: 'var(--theme-fg)' }}
              >
                {t('title') || 'My Work'}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg max-w-2xl mx-auto leading-relaxed"
                style={{ color: 'var(--theme-fg-muted)' }}
              >
                {t('subtitle') || "Projects I've built from the ground up, ranging from SaaS platforms to corporate websites."}
              </motion.p>
            </motion.div>

            {/* Featured 3D Sphere */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] rounded-3xl overflow-hidden mb-16"
              style={{ backgroundColor: 'var(--theme-bg-card)', border: '1px solid var(--theme-border-glass)' }}
            >
              <AnimatedSphere className="w-full h-full" />
            </motion.div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {projects.map((project, idx) => (
                  <motion.article
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className="group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)]"
                    style={{
                      backgroundColor: 'var(--theme-card-bg)',
                      border: '1px solid var(--theme-border-glass)',
                    }}
                  >
                    {/* Project Image */}
                    <div className="relative h-56 md:h-64 w-full overflow-hidden">
                      <Image
                        src={project.image || '/images/project-placeholder.svg'}
                        alt={project.title}
                        fill
                        className="object-cover object-center transition-all duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      
                      {/* Badges */}
                      <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                        <span className="text-xs font-medium px-3 py-1.5 rounded-full border"
                          style={{
                            backgroundColor: 'rgba(0,0,0,0.6)',
                            backdropFilter: 'blur(8px)',
                            color: 'white',
                            borderColor: 'rgba(255,255,255,0.1)',
                          }}
                        >
                          {project.category}
                        </span>
                        {project.featured && (
                          <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-white text-black">
                            {t('featured') || 'Featured'}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Project Content */}
                    <div className="p-6 md:p-8 flex flex-col flex-grow">
                      <h3 className="text-2xl font-semibold mb-4" style={{ color: 'var(--theme-fg)' }}>
                        {project.title}
                      </h3>
                      <p className="mb-6 flex-grow leading-relaxed" style={{ color: 'var(--theme-fg-muted)' }}>
                        {project.description}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-8">
                        {project.technologies.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-xs font-medium rounded-md px-2.5 py-1 transition-colors"
                            style={{
                              backgroundColor: 'var(--theme-social-hover-bg)',
                              color: 'var(--theme-fg-secondary)',
                              border: '1px solid var(--theme-border-glass)',
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Action Links */}
                      <div className="flex items-center gap-4 mt-auto pt-6" style={{ borderTop: '1px solid var(--theme-divider)' }}>
                        <Link
                          href={`/${locale}/work/${project.id}`}
                          className="flex items-center gap-2 text-sm font-medium transition-colors group-hover:text-[var(--theme-fg)]"
                          style={{ color: 'var(--theme-fg-muted)' }}
                        >
                          <span>{t('viewCaseStudy') || 'View Case Study'}</span>
                          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:translate-y-[-1px]" />
                        </Link>
                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm font-medium transition-colors group-hover:text-[var(--theme-fg)]"
                            style={{ color: 'var(--theme-fg-muted)' }}
                          >
                            <span>{t('liveDemo') || 'Live Demo'}</span>
                            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:translate-y-[-1px]" />
                          </a>
                        )}
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm font-medium transition-colors"
                            style={{ color: 'var(--theme-fg-muted)' }}
                          >
                            <Github className="w-4 h-4" />
                            <span>GitHub</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Technical Arsenal */}
        <section className="py-24 px-6 transition-colors duration-300" style={{ backgroundColor: 'var(--theme-bg-section-alt)' }}>
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4" style={{ color: 'var(--theme-fg)' }}>
                {t('technicalArsenal') || 'Technical Arsenal'}
              </h2>
              <p className="max-w-2xl mx-auto" style={{ color: 'var(--theme-fg-muted)' }}>
                {t('technicalArsenalDesc') || 'Comprehensive breakdown of the tools, languages, and frameworks I use to build scalable digital products.'}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {skills.map((category, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="rounded-2xl p-8 transition-all duration-300 hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.2)]"
                  style={{
                    backgroundColor: 'var(--theme-card-bg)',
                    border: '1px solid var(--theme-border-glass)',
                  }}
                >
                  <h3 className="text-xl font-semibold mb-6 pb-4" style={{ color: 'var(--theme-fg)', borderBottom: '1px solid var(--theme-divider)' }}>
                    {category.title}
                  </h3>
                  <div className="space-y-6">
                    {category.skills.map((skill, sIdx) => (
                      <div key={sIdx}>
                        <div className="flex justify-between items-end mb-2">
                          <span className="font-medium" style={{ color: 'var(--theme-fg)' }}>{skill.name}</span>
                          <span className="text-xs" style={{ color: 'var(--theme-fg-dim)' }}>{skill.level}%</span>
                        </div>
                        <div className="h-1.5 w-full rounded-full overflow-hidden" style={{ backgroundColor: 'var(--theme-skill-bar-track)' }}>
                          <motion.div
                            className="h-full rounded-full"
                            style={{ backgroundColor: 'var(--theme-skill-bar-fill)' }}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true, margin: '-20px' }}
                            transition={{ duration: 1, delay: 0.2 }}
                          />
                        </div>
                        <p className="text-xs mt-2" style={{ color: 'var(--theme-fg-dim)' }}>{skill.description}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-6" style={{ borderTop: '1px solid var(--theme-divider)' }}>
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight mb-6"
              style={{ color: 'var(--theme-fg)' }}
            >
              {t('ctaTitle1') || "Let's Build"} <span style={{ color: 'var(--theme-fg-muted)' }}>{t('ctaTitle2') || 'Something Great'}</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg mb-10 max-w-xl mx-auto leading-relaxed"
              style={{ color: 'var(--theme-fg-muted)' }}
            >
              {t('ctaDescription') || 'Whether you need a new platform, a custom web app, or a reliable development partner — I\'m ready to help turn your vision into reality.'}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <a
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-medium transition-colors w-full sm:w-auto"
                style={{
                  backgroundColor: 'var(--theme-btn-primary-bg)',
                  color: 'var(--theme-btn-primary-fg)',
                }}
                href="/en/contact"
              >
                <span>{t('startProject') || 'Start a Project'}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <a
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-medium transition-colors w-full sm:w-auto"
                style={{
                  border: '1px solid var(--theme-btn-outline-border)',
                  color: 'var(--theme-btn-outline-fg)',
                }}
                href="/en/work"
              >
                <span>{t('viewWork') || 'View My Work'}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>
        </section>
      </main>
    </PageTransition>
  );
}