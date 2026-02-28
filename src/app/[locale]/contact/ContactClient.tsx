'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import siteConfig from '@/config/siteConfig';
import { useTranslations } from 'next-intl';
import PageTransition from '@/components/effects/PageTransition';

export default function ContactClient() {
  const t = useTranslations('contact');
  const { personalInfo, social } = siteConfig;
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <PageTransition>
      <main className="min-h-screen bg-black text-gray-400">
        {/* Page Header */}
        <section className="pt-32 pb-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent"
            >
              {t('title') || 'Get in Touch'}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg leading-relaxed max-w-2xl mx-auto"
            >
              {t('subtitle') || "Have a project in mind? Let's talk about how I can help bring your ideas to life."}
            </motion.p>
          </div>
        </section>

        {/* Contact Layout */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left Column: Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-white mb-8">{t('contactInfo')}</h2>
              
              <a href={`mailto:${personalInfo.email}`} className="group flex items-center gap-6 p-6 bg-[#111]/80 border border-white/[0.08] rounded-xl hover:bg-white/5 hover:border-white/[0.15] transition-all">
                <div className="w-14 h-14 rounded-full bg-[#1a1a1a] flex items-center justify-center shrink-0 border border-white/[0.05] group-hover:scale-110 transition-transform">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <span className="block text-xs font-medium text-gray-500 uppercase tracking-widest mb-1">{t('emailLabel')}</span>
                  <span className="font-medium text-white text-lg">{personalInfo.email}</span>
                </div>
              </a>

              <div className="flex items-center gap-6 p-6 bg-[#111]/80 border border-white/[0.08] rounded-xl">
                <div className="w-14 h-14 rounded-full bg-[#1a1a1a] flex items-center justify-center shrink-0 border border-white/[0.05]">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <div>
                  <span className="block text-xs font-medium text-gray-500 uppercase tracking-widest mb-1">{t('basedIn')}</span>
                  <span className="font-medium text-white text-lg">{personalInfo.location}</span>
                </div>
              </div>

              {personalInfo.phone && (
                <div className="flex items-center gap-6 p-6 bg-[#111]/80 border border-white/[0.08] rounded-xl">
                  <div className="w-14 h-14 rounded-full bg-[#1a1a1a] flex items-center justify-center shrink-0 border border-white/[0.05]">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.48-4.18-7.076-7.076l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-xs font-medium text-gray-500 uppercase tracking-widest mb-1">{t('phone')}</span>
                    <span className="font-medium text-white text-lg">{personalInfo.phone}</span>
                  </div>
                </div>
              )}

              <div className="pt-8">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-6">{t('socialProfiles')}</h3>
                <div className="flex gap-4">
                  {[
                    { key: 'github', url: social.github, label: 'GitHub' },
                    { key: 'linkedin', url: social.linkedin, label: 'LinkedIn' },
                    { key: 'twitter', url: social.twitter, label: 'Twitter' },
                  ].map((s) => (
                    <a
                      key={s.key}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 rounded-full text-sm font-medium text-white bg-[#111]/80 border border-white/[0.08] hover:bg-white/10 hover:border-white/[0.2] transition-all"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Column: Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-[#111]/80 border border-white/[0.08] rounded-2xl p-8 lg:p-10"
            >
              <h2 className="text-2xl font-bold text-white mb-8">{t('sendMessage')}</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-xs font-medium text-gray-500 uppercase tracking-widest mb-2">{t('nameLabel')}</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-3.5 rounded-xl bg-[#0a0a0a] border border-white/[0.08] text-white placeholder-gray-600 focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/30 transition-all"
                      placeholder={t('namePlaceholder')}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-medium text-gray-500 uppercase tracking-widest mb-2">{t('emailFieldLabel')}</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-3.5 rounded-xl bg-[#0a0a0a] border border-white/[0.08] text-white placeholder-gray-600 focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/30 transition-all"
                      placeholder={t('emailPlaceholder')}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-medium text-gray-500 uppercase tracking-widest mb-2">{t('subjectLabel')}</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-3.5 rounded-xl bg-[#0a0a0a] border border-white/[0.08] text-white placeholder-gray-600 focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/30 transition-all"
                    placeholder={t('subjectPlaceholder')}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-medium text-gray-500 uppercase tracking-widest mb-2">{t('messageLabel')}</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-5 py-3.5 rounded-xl bg-[#0a0a0a] border border-white/[0.08] text-white placeholder-gray-600 focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/30 transition-all resize-none"
                    placeholder={t('messagePlaceholder')}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-8 rounded-xl bg-white text-black font-bold text-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>{t('submitting')}</span>
                    </>
                  ) : (
                    t('submitButton')
                  )}
                </button>

                {submitStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl border border-green-500/30 bg-green-500/10 text-green-400 font-medium text-center"
                  >
                    {t('successMessage')}
                  </motion.div>
                )}
                {submitStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 font-medium text-center"
                  >
                    {t('errorMessage')}
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>
        </section>
      </main>
    </PageTransition>
  );
}
