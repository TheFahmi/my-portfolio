'use client';

import dynamic from 'next/dynamic';
import siteConfig from '@/config/siteConfig';

// Import all sections
const HeroSection = dynamic(() => import('@/components/sections/HeroSection'), { ssr: false });
const AboutSection = dynamic(() => import('@/components/sections/AboutSection'), { ssr: false });
const ExperienceSection = dynamic(() => import('@/components/sections/ExperienceSection'), { ssr: false });
const SkillsSection = dynamic(() => import('@/components/sections/SkillsSection'), { ssr: false });
const ProjectsSection = dynamic(() => import('@/components/sections/ProjectsSection'), { ssr: false });
const ProjectsComingSoon = dynamic(() => import('@/components/sections/ProjectsComingSoon'), { ssr: false });
const ContactSection = dynamic(() => import('@/components/sections/ContactSection'), { ssr: false });

export default function HomeClient() {
  const { showProjects } = siteConfig.features;

  return (
    <main>
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <SkillsSection />
      {showProjects ? <ProjectsSection /> : <ProjectsComingSoon />}
      <ContactSection />
    </main>
  );
}
