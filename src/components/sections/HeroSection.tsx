"use client";

import { motion } from "framer-motion";
import { Link } from "../../../i18n/navigation";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import siteConfig from "@/config/siteConfig";


const AnimatedSphere = dynamic(() => import('@/components/three/AnimatedSphere'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-64 h-64 rounded-full bg-white/5 animate-pulse" />
    </div>
  ),
});

const HeroSection = () => {
  const t = useTranslations("hero");
  const { hero } = siteConfig;



  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* 3D Sphere: absolute positioned, centered, behind text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatedSphere className="w-[600px] h-[600px] md:w-[700px] md:h-[700px] lg:w-[800px] lg:h-[800px]" />
      </div>

      {/* Sphere glow effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[400px] h-[400px] bg-amber-900/20 rounded-full blur-[120px]" />
      </div>

      {/* Text content: centered, on top of sphere */}
      <div className="relative z-10 text-center max-w-3xl mx-auto px-6 mt-16">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-8xl font-bold mb-6 tracking-tight leading-[1.1]"
        >
          <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            {hero.titleHighlight}
          </span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-white/60 text-lg md:text-xl mb-8 leading-relaxed max-w-2xl mx-auto"
        >
          {hero.description}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex justify-center"
        >
          <Link href="/work" className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-colors">
            {t('ctaSecondary')}
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
