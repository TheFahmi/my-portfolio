"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import siteConfig from "@/config/siteConfig";
import ToggleableAboutImage from "@/components/ui/ToggleableAboutImage";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import RetroCard from "@/components/ui/RetroCard";
import { useTranslations } from "next-intl";

const AboutSection = () => {
  const t = useTranslations('about');
  const tCommon = useTranslations('common');
  const { personalInfo, education } = siteConfig;
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 5]);

  return (
    <section id="about" className="py-24 md:py-32 relative bg-[#e8d5b5] dark:bg-[#1a1612] overflow-hidden" ref={containerRef}>
      {/* Vintage Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/textures/paper-texture.png')] mix-blend-multiply dark:mix-blend-overlay opacity-50" />
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20 items-start mb-16">
          
          <ScrollReveal 
            className="lg:col-span-5 relative order-1 lg:order-1"
            variant="slideLeft"
            duration={0.8}
          >
            <div className="relative group">
              {/* Photo Frame Effect */}
              <div className="absolute -inset-2 bg-[#f4e4bc] dark:bg-[#2c241b] border border-[#4a3b2a]/20 dark:border-[#d4c5a5]/20 shadow-xl transform -rotate-2 group-hover:-rotate-3 transition-transform duration-500" />
              <div className="absolute -inset-2 bg-[#f4e4bc] dark:bg-[#2c241b] border border-[#4a3b2a]/20 dark:border-[#d4c5a5]/20 shadow-xl transform rotate-1 group-hover:rotate-2 transition-transform duration-500" />
              
              <RetroCard variant="photo" className="transform transition-transform duration-500 hover:scale-[1.01]">
                <div className="relative aspect-[4/5] overflow-hidden border-4 border-white dark:border-[#1a1612] shadow-inner sepia-[0.2]">
                  <ToggleableAboutImage 
                    className="w-full h-full object-cover filter contrast-[1.1] brightness-[0.95]"
                    imageUrl={personalInfo.profileImage}
                    alt={personalInfo.name}
                  />
                  
                  {/* Vintage Photo Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#4a3b2a]/40 to-transparent mix-blend-multiply pointer-events-none" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_50%,rgba(0,0,0,0.2)_100%)] pointer-events-none" />
                  
                  <div className="absolute bottom-4 left-4 right-4 p-4 bg-[#f4e4bc]/90 dark:bg-[#2c241b]/90 backdrop-blur-sm border border-[#4a3b2a]/10 dark:border-[#d4c5a5]/10 shadow-lg transform rotate-1">
                    <p className="font-mono text-xs tracking-[0.2em] uppercase text-[#8c6b4a] dark:text-[#a89070] mb-1 text-center">
                      {personalInfo.location}
                    </p>
                    <p className="font-serif font-bold text-lg text-[#4a3b2a] dark:text-[#d4c5a5] text-center border-t border-[#4a3b2a]/20 dark:border-[#d4c5a5]/20 pt-2 mt-1">
                      {personalInfo.experienceYears} Years Exp.
                    </p>
                  </div>
                </div>
              </RetroCard>
            </div>
          </ScrollReveal>

          <div className="lg:col-span-7 flex flex-col space-y-8 order-2 lg:order-2 pt-8">
            <ScrollReveal variant="slideUp">
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-[#4a3b2a] dark:text-[#d4c5a5] mb-6 font-serif">
                {t('title').split(' ')[0]} <span className="text-[#8c6b4a] dark:text-[#a89070] italic decoration-4 underline decoration-[#8c6b4a]/30">{t('title').split(' ')[1]}</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal variant="slideUp" delay={0.1} className="relative pl-8 border-l-4 border-[#8c6b4a] dark:border-[#a89070]">
              <p className="text-xl md:text-2xl font-medium leading-relaxed text-[#5c4a35] dark:text-[#c0b090] italic font-serif">
                "{personalInfo.role} {t('subtitle')}"
              </p>
            </ScrollReveal>

            <ScrollReveal variant="slideUp" delay={0.2} className="space-y-6 text-lg text-[#6b5842] dark:text-[#b0a088] leading-relaxed font-serif">
              <p>
                <span className="text-[#4a3b2a] dark:text-[#d4c5a5] font-bold text-xl float-left mr-2 text-4xl leading-[0.8] mt-[-6px] font-serif">
                  {t('paragraph1').charAt(0)}
                </span>
                {t('paragraph1').slice(1)}
              </p>
              <p>{t('paragraph2')}</p>
            </ScrollReveal>

            <ScrollReveal variant="slideUp" delay={0.3} className="pt-8 border-t-2 border-dashed border-[#4a3b2a]/20 dark:border-[#d4c5a5]/20 flex flex-wrap gap-6 items-center">
              <motion.a
                href={personalInfo.resumeUrl}
                target="_blank"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-8 py-3 bg-[#4a3b2a] dark:bg-[#d4c5a5] text-[#f4e4bc] dark:text-[#2c241b] font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all border-2 border-[#2c241b] dark:border-[#f4e4bc]"
              >
                <span className="tracking-wide uppercase text-sm">{t('downloadResume')}</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </motion.a>
              
              <div className="flex gap-4">
                {[
                  { href: siteConfig.social.github, icon: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" },
                  { href: siteConfig.social.linkedin, icon: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" }
                ].map((social, idx) => (
                  <motion.a 
                    key={idx}
                    href={social.href} 
                    target="_blank"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 bg-[#f4e4bc] dark:bg-[#2c241b] text-[#4a3b2a] dark:text-[#d4c5a5] border-2 border-[#4a3b2a] dark:border-[#d4c5a5] shadow-[3px_3px_0px_0px_rgba(74,59,42,1)] dark:shadow-[3px_3px_0px_0px_rgba(212,197,165,1)] hover:shadow-[1px_1px_0px_0px_rgba(74,59,42,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d={social.icon}/></svg>
                  </motion.a>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>

        <ScrollReveal 
          className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t-2 border-[#4a3b2a]/10 dark:border-[#d4c5a5]/10"
          variant="slideUp"
          delay={0.4}
        >
          <div className="space-y-8">
             <h3 className="text-3xl font-bold text-[#4a3b2a] dark:text-[#d4c5a5] flex items-center gap-3 font-serif">
               <span className="w-12 h-1 bg-[#8c6b4a] dark:bg-[#a89070]"></span>
               {t('education')}
             </h3>
             <div className="space-y-6">
               {education && education.map((edu, idx) => (
                 <RetroCard key={idx} className="!p-4 bg-white/50 dark:bg-black/20 group">
                   <div className="flex gap-4">
                     <div className="mt-1.5 w-2 h-2 border border-[#4a3b2a] dark:border-[#d4c5a5] bg-[#8c6b4a] dark:bg-[#a89070] rotate-45 shrink-0" />
                     <div>
                       <h4 className="text-lg font-bold text-[#4a3b2a] dark:text-[#d4c5a5] font-serif">{edu.degree}</h4>
                       <p className="text-sm font-mono text-[#6b5842] dark:text-[#b0a088] uppercase tracking-wider">{edu.institution}</p>
                       <p className="text-xs text-[#8c6b4a] dark:text-[#a89070] mt-1 font-bold">{edu.year}</p>
                     </div>
                   </div>
                 </RetroCard>
               ))}
             </div>
          </div>

          <div className="space-y-6">
<h3 className="text-3xl font-bold text-[#4a3b2a] dark:text-[#d4c5a5] flex items-center gap-3 font-serif">
                <span className="w-12 h-1 bg-[#8c6b4a] dark:bg-[#a89070]"></span>
                {t('skillsSection')}
              </h3>
             <div className="flex flex-wrap gap-3">
               {["JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Vue.js", "TailwindCSS"].map((skill, idx) => (
                 <motion.span 
                  key={skill} 
                  whileHover={{ scale: 1.05, rotate: idx % 2 === 0 ? 1 : -1 }}
                  className="px-4 py-2 bg-[#f4e4bc] dark:bg-[#2c241b] text-[#4a3b2a] dark:text-[#d4c5a5] border border-[#4a3b2a] dark:border-[#d4c5a5] shadow-[2px_2px_0px_0px_rgba(74,59,42,0.5)] dark:shadow-[2px_2px_0px_0px_rgba(212,197,165,0.5)] font-mono text-sm font-bold cursor-default"
                 >
                   {skill}
                 </motion.span>
               ))}
             </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};

export default AboutSection;
