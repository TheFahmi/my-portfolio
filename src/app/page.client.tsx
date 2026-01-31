'use client';

import dynamic from 'next/dynamic';
import siteConfig from '@/config/siteConfig';
import PageTransition from '@/components/effects/PageTransition';
import { WaveSectionDivider } from '@/components/ui/SectionDivider';

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
      <main className="overflow-x-hidden">
        <HeroSection />
        
        <WaveSectionDivider 
          fromColor="#FFFFFF"
          toColor="#e8d5b5"
          animated={true}
        />
        
        <AboutSection />
        
        <WaveSectionDivider 
          fromColor="#e8d5b5"
          toColor="#FAF8F3"
          flip={true}
          animated={true}
        />
        
        <ExperienceSection />
        
        <WaveSectionDivider 
          fromColor="#FAF8F3"
          toColor="#F5F1E8"
          animated={true}
        />
        
        <SkillsSection />
        
        <WaveSectionDivider 
          fromColor="#F5F1E8"
          toColor="#FAF8F3"
          flip={true}
          animated={true}
        />
        
        {showProjects ? <ProjectsSection /> : <ProjectsComingSoon />}
        
        <WaveSectionDivider 
          fromColor="#FAF8F3"
          toColor="#F5F1E8"
          animated={true}
        />
        
        <ContactSection />
      </main>
    </PageTransition>
  );
}
