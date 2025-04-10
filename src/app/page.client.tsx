'use client';

import dynamic from 'next/dynamic';

// Import all sections
const HeroSection = dynamic(() => import('@/components/sections/HeroSection'), { ssr: false });
const AboutSection = dynamic(() => import('@/components/sections/AboutSection'), { ssr: false });
const SkillsSection = dynamic(() => import('@/components/sections/SkillsSection'), { ssr: false });
const ProjectsSection = dynamic(() => import('@/components/sections/ProjectsSection'), { ssr: false });
const ContactSection = dynamic(() => import('@/components/sections/ContactSection'), { ssr: false });

export default function HomeClient() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
}
