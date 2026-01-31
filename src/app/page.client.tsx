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
        
        <div className="w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1440 120" className="relative block w-full h-16 md:h-24 fill-white dark:fill-slate-950" preserveAspectRatio="none">
            <path d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,85.3C672,75,768,85,864,101.3C960,117,1056,139,1152,133.3C1248,128,1344,96,1392,80L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" className="fill-slate-50 dark:fill-slate-900"/>
          </svg>
        </div>
        
        <AboutSection />
        
        <div className="w-full overflow-hidden leading-none rotate-180">
          <svg viewBox="0 0 1440 120" className="relative block w-full h-16 md:h-24" preserveAspectRatio="none">
            <path d="M0,96L48,90.7C96,85,192,75,288,80C384,85,480,107,576,112C672,117,768,107,864,90.7C960,75,1056,53,1152,48C1248,43,1344,53,1392,58.7L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" className="fill-slate-100 dark:fill-slate-800"/>
          </svg>
        </div>
        
        <ExperienceSection />
        
        <div className="w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1440 60" className="relative block w-full h-12 md:h-16" preserveAspectRatio="none">
            <polygon points="0,60 1440,0 1440,60 0,60" className="fill-slate-50 dark:fill-slate-900"/>
          </svg>
        </div>
        
        <SkillsSection />
        
        <div className="w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1440 120" className="relative block w-full h-16 md:h-24" preserveAspectRatio="none">
            <path d="M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,42.7C960,43,1056,53,1152,58.7C1248,64,1344,64,1392,64L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" className="fill-slate-50 dark:fill-slate-950"/>
          </svg>
        </div>
        
        {showProjects ? <ProjectsSection /> : <ProjectsComingSoon />}
        
        <div className="w-full h-16 md:h-24 bg-gradient-to-b from-slate-50 dark:from-slate-950 to-slate-100 dark:to-slate-900"/>
        
        <ContactSection />
      </main>
    </PageTransition>
  );
}
