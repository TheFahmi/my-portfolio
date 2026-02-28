'use client';

import dynamic from 'next/dynamic';

import PageTransition from '@/components/effects/PageTransition';

import HeroSection from '@/components/sections/HeroSection';
import WhatIDoSection from '@/components/sections/WhatIDoSection';
import CTASection from '@/components/sections/CTASection';

export default function HomeClient() {

  return (
    <PageTransition>
      <main className="overflow-x-hidden">
        <HeroSection />
        <WhatIDoSection />
        <CTASection />
      </main>
    </PageTransition>
  );
}
