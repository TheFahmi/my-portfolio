"use client";

import { motion } from "framer-motion";
import { Link } from "../../../i18n/navigation";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import siteConfig from "@/config/siteConfig";


const AnimatedSphere = dynamic(() => import('@/components/three/AnimatedSphere'), {
  ssr: true,
});

const HeroSection = () => {
  const t = useTranslations("hero");
  const { hero } = siteConfig;



  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ backgroundColor: 'var(--theme-bg)' }}>
      {/* 3D Sphere: absolute positioned, centered, behind text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatedSphere className="w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] xl:w-[700px] xl:h-[700px]" />
      </div>

      {/* Sphere glow effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[400px] h-[400px] rounded-full blur-[120px]" style={{ backgroundColor: 'var(--theme-sphere-glow)' }} />
      </div>

      {/* Text content: centered, on top of sphere */}
      <div className="relative z-10 text-center max-w-3xl mx-auto px-6 mt-16 pointer-events-none" style={{ mixBlendMode: 'difference' }}>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-8xl font-bold mb-6 tracking-tight leading-[1.1]"
        >
          <span className="text-white">
            {hero.titleHighlight}
          </span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg md:text-xl mb-8 leading-relaxed max-w-2xl mx-auto text-white"
        >
          {t('description')}
        </motion.p>

        {/* CTA button: inside text flow but isolated from mix-blend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex justify-center"
          style={{ isolation: 'isolate', mixBlendMode: 'normal' }}
        >
          <Link
            href="/work"
            className="pointer-events-auto inline-flex items-center justify-center px-8 py-3 rounded-full font-semibold transition-colors"
            style={{
              backgroundColor: 'var(--theme-btn-primary-bg)',
              color: 'var(--theme-btn-primary-fg)',
            }}
          >
            {t('ctaSecondary')}
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
