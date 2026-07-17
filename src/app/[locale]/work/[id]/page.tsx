'use client';

import { useParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ExternalLink, ArrowLeft } from 'lucide-react';
import { getLocalizedConfig } from '@/config/siteConfig';
import PageTransition from '@/components/effects/PageTransition';

export default function CaseStudyPage() {
  const params = useParams();
  const id = Number(params.id);
  const locale = useLocale();
  const t = useTranslations('work');
  const config = getLocalizedConfig(locale);
  const project = config.projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--theme-bg)' }}>
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4" style={{ color: 'var(--theme-fg)' }}>{t('projectNotFound')}</h1>
          <Link href={`/${locale}/work`} className="text-[#0071e3] hover:underline">
            {t('backToWork')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <PageTransition>
      <main className="min-h-screen transition-colors duration-300 pb-24" style={{ backgroundColor: 'var(--theme-bg)', color: 'var(--theme-fg)' }}>
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 py-4 px-6" style={{ backgroundColor: 'var(--theme-bg)', borderBottom: '1px solid var(--theme-border-glass)' }}>
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <Link href={`/${locale}/work`} className="flex items-center gap-2 font-medium hover:text-[#0071e3] transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>{t('sectionLabel')}</span>
            </Link>
            <div className="text-xs font-medium px-3 py-1 rounded-full" style={{ backgroundColor: 'var(--theme-social-hover-bg)', color: 'var(--theme-fg-muted)' }}>
              {project.category}
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-32 pb-16 px-6 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-6">
              {project.title}
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: 'var(--theme-fg-muted)' }}>
              {project.description}
            </p>
          </motion.div>

          {/* Project Image / Hero */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden mb-20 shadow-2xl"
            style={{ backgroundColor: 'var(--theme-card-bg)', border: '1px solid var(--theme-border-glass)' }}
          >
            <Image
              src={project.image || '/images/project-placeholder.svg'}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </motion.div>
        </section>

        {/* Case Study Content */}
        {project.caseStudy && (
          <section className="px-6 max-w-4xl mx-auto space-y-32 mb-32">
            {/* Problem */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-sm font-semibold uppercase tracking-widest mb-8 text-[#0071e3]">{t('theProblem')}</h2>
              <p className="text-2xl md:text-3xl font-medium leading-relaxed">
                {project.caseStudy.problem}
              </p>
            </motion.div>

            {/* Solution */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-sm font-semibold uppercase tracking-widest mb-8 text-[#0071e3]">{t('theSolution')}</h2>
              <p className="text-lg md:text-xl leading-relaxed" style={{ color: 'var(--theme-fg-muted)' }}>
                {project.caseStudy.solution}
              </p>
            </motion.div>

            {/* Tech Stack */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-sm font-semibold uppercase tracking-widest mb-8 text-[#0071e3]">{t('techStack')}</h2>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 rounded-full text-sm font-medium"
                    style={{ backgroundColor: 'var(--theme-social-hover-bg)', color: 'var(--theme-fg)', border: '1px solid var(--theme-border-glass)' }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Impact / Results */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-sm font-semibold uppercase tracking-widest mb-8 text-[#0071e3]">{t('impactResults')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {project.caseStudy.impact.map((item, i) => (
                  <div key={i} className="p-6 rounded-2xl" style={{ backgroundColor: 'var(--theme-card-bg)', border: '1px solid var(--theme-border-glass)' }}>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#0071e3]/10 text-[#0071e3] font-bold mb-4">
                      {i + 1}
                    </div>
                    <p className="font-medium">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Role & Duration */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col md:flex-row gap-8 pt-8 border-t"
              style={{ borderColor: 'var(--theme-border)' }}
            >
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--theme-fg-muted)' }}>{t('role')}</h3>
                <p className="font-medium text-lg">{project.caseStudy.role}</p>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--theme-fg-muted)' }}>{t('duration')}</h3>
                <p className="font-medium text-lg">{project.caseStudy.duration}</p>
              </div>
            </motion.div>
          </section>
        )}

        {/* CTA Buttons */}
        <section className="px-6 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 pb-16">
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-medium transition-colors w-full sm:w-auto"
              style={{ backgroundColor: '#0071e3', color: 'white' }}
            >
              <ExternalLink className="w-4 h-4" />
              <span>{t('viewLive')}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          )}
          <Link
            href={`/${locale}/work`}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-medium transition-colors w-full sm:w-auto"
            style={{ border: '1px solid var(--theme-btn-outline-border)', color: 'var(--theme-btn-outline-fg)' }}
          >
            <span>{t('backToWork')}</span>
          </Link>
        </section>

        {/* Live Demo Section (Feature 2) */}
        {project.demo && (
          <section className="px-6 max-w-6xl mx-auto mb-20">
            <div className="rounded-3xl overflow-hidden shadow-2xl" style={{ backgroundColor: '#000', border: '8px solid #222' }}>
              {/* Browser Chrome */}
              <div className="h-10 flex items-center px-4 gap-2" style={{ backgroundColor: '#111' }}>
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <div className="flex-1 text-center text-xs font-medium text-gray-500 font-mono truncate px-4">
                  {project.demo.replace(/(^\w+:|^)\/\//, '')}
                </div>
              </div>
              <iframe
                src={project.demo}
                className="w-full border-0 bg-white"
                style={{ height: '75vh', minHeight: '600px' }}
                loading="lazy"
                title={`${project.title} Live Demo`}
              />
            </div>
          </section>
        )}
      </main>
    </PageTransition>
  );
}
