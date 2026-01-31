'use client';

import dynamic from 'next/dynamic';
import siteConfig from '@/config/siteConfig';
import PageTransition from '@/components/effects/PageTransition';

// Import all sections - HeroSection SSR for LCP, others lazy loaded
import HeroSection from '@/components/sections/HeroSection';
const AboutSection = dynamic(() => import('@/components/sections/AboutSection'), { ssr: true });
const ExperienceSection = dynamic(() => import('@/components/sections/ExperienceSection'), { ssr: false, loading: () => <div className="h-96" /> });
const SkillsSection = dynamic(() => import('@/components/sections/SkillsSection'), { ssr: false, loading: () => <div className="h-96" /> });
const ProjectsSection = dynamic(() => import('@/components/sections/ProjectsSection'), { ssr: false, loading: () => <div className="h-96" /> });
const ProjectsComingSoon = dynamic(() => import('@/components/sections/ProjectsComingSoon'), { ssr: false });
const ContactSection = dynamic(() => import('@/components/sections/ContactSection'), { ssr: false });

export default function HomeClient() {
  const { showProjects } = siteConfig.features;

  return (
    <PageTransition>
      <main>
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        {showProjects ? <ProjectsSection /> : <ProjectsComingSoon />}
        <ContactSection />
      </main>
    </PageTransition>
  );
}
