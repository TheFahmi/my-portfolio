'use client';

import dynamic from 'next/dynamic';

import PageTransition from '@/components/effects/PageTransition';

import HeroSection from '@/components/sections/HeroSection';
import WhatIDoSection from '@/components/sections/WhatIDoSection';
import ServicesSection from '@/components/sections/ServicesSection';
import CTASection from '@/components/sections/CTASection';
import AvailabilitySection from '@/components/sections/AvailabilitySection';

export default function HomeClient() {

  return (
    <PageTransition>
      <main className="overflow-x-hidden">
        <HeroSection />
        <WhatIDoSection />
        <ServicesSection />
        <AvailabilitySection />
        <CTASection />
      </main>
    </PageTransition>
  );
}
