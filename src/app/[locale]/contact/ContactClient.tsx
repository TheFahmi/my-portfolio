'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import siteConfig from '@/config/siteConfig';
import { useTranslations } from 'next-intl';
import PageTransition from '@/components/effects/PageTransition';
import { Mail, MapPin, Github, Linkedin, Twitter, Send, Loader2, CheckCircle, AlertCircle, MessageSquare, Smartphone, Globe, ArrowUpRight } from 'lucide-react';

// Turnstile widget component
function TurnstileWidget({ 
  onVerify, 
  onError,
  onExpire 
}: { 
  onVerify: (token: string) => void;
  onError?: () => void;
  onExpire?: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const scriptLoadedRef = useRef(false);

  const renderWidget = useCallback(() => {
    if (!containerRef.current || !window.turnstile) return;
    
    if (widgetIdRef.current !== null) {
      try {
        window.turnstile.remove(widgetIdRef.current);
      } catch {
        // Widget may already be removed
      }
    }

    try {
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
        theme: 'auto',
        size: 'normal',
        callback: onVerify,
        'error-callback': onError,
        'expired-callback': onExpire,
      });
    } catch (e) {
      console.error('Turnstile render failed:', e);
    }
  }, [onVerify, onError, onExpire]);

  useEffect(() => {
    const loadAndRender = () => {
      if (window.turnstile) {
        renderWidget();
        return;
      }
      if (document.querySelector('script[src*="turnstile"]')) {
        // Script already added, wait for it
        const check = setInterval(() => {
          if (window.turnstile) {
            clearInterval(check);
            renderWidget();
          }
        }, 100);
        return () => clearInterval(check);
      }
      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      script.onload = () => {
        scriptLoadedRef.current = true;
        renderWidget();
      };
      document.head.appendChild(script);
    };

    loadAndRender();

    return () => {
      if (widgetIdRef.current !== null && window.turnstile) {
        try { window.turnstile.remove(widgetIdRef.current); } catch {}
      }
    };
  }, []);

  return <div ref={containerRef} className="flex justify-center" />;
}

// Declare Turnstile types on window
declare global {
  interface Window {
    turnstile: {
      render: (container: HTMLElement, options: Record<string, unknown>) => string;
      remove: (widgetId: string) => void;
      reset: (widgetId: string) => void;
    };
  }
}

export default function ContactClient() {
  const t = useTranslations('contact');
  const { personalInfo, social } = siteConfig;
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error' | 'rate-limited' | 'captcha-failed'>('idle');
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleTurnstileVerify = useCallback((token: string) => {
    setTurnstileToken(token);
  }, []);

  const handleTurnstileError = useCallback(() => {
    setTurnstileToken(null);
  }, []);

  const handleTurnstileExpire = useCallback(() => {
    setTurnstileToken(null);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          turnstileToken,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTurnstileToken(null);
        // Reset turnstile widget
        if (window.turnstile) {
          // The widget will auto-reset on new render
        }
      } else if (response.status === 429) {
        setSubmitStatus('rate-limited');
      } else if (response.status === 403) {
        setSubmitStatus('captcha-failed');
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <PageTransition>
      <main className="min-h-screen transition-colors duration-300" style={{ backgroundColor: 'var(--theme-bg)', color: 'var(--theme-fg-secondary)' }}>
        {/* Page Header */}
        <section className="relative pt-32 pb-16 px-6 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px] pointer-events-none" style={{ backgroundColor: 'var(--theme-sphere-glow)', opacity: 0.1 }} />
          
          <div className="max-w-4xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="text-xs font-medium uppercase tracking-widest" style={{ color: 'var(--theme-fg-dim)' }}>
                {t('sectionLabel') || 'Contact'}
              </span>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mt-4 mb-6"
                style={{ color: 'var(--theme-fg)' }}
              >
                {t('heading') || "Let's work together."}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg max-w-2xl mx-auto leading-relaxed"
                style={{ color: 'var(--theme-fg-muted)' }}
              >
                {t('subtitle') || 'Have a project in mind? Let\'s talk about how I can help bring your ideas to life.'}
              </motion.p>
            </motion.div>

            {/* Contact Info Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <a
                href={`mailto:${personalInfo.email}`}
                className="group relative rounded-2xl p-6 md:p-8 transition-all duration-300 hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.2)]"
                style={{
                  backgroundColor: 'var(--theme-card-bg)',
                  border: '1px solid var(--theme-border-glass)',
                }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors"
                  style={{
                    backgroundColor: 'var(--theme-social-hover-bg)',
                    color: 'var(--theme-fg)',
                  }}
                >
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--theme-fg)' }}>
                  {t('emailLabel') || 'Email'}
                </h3>
                <p className="text-sm transition-colors group-hover:text-[var(--theme-fg)]" style={{ color: 'var(--theme-fg-muted)' }}>
                  {personalInfo.email}
                </p>
              </a>

              <a
                href={`https://wa.me/${personalInfo.phone?.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative rounded-2xl p-6 md:p-8 transition-all duration-300 hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.2)]"
                style={{
                  backgroundColor: 'var(--theme-card-bg)',
                  border: '1px solid var(--theme-border-glass)',
                }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors"
                  style={{
                    backgroundColor: 'var(--theme-social-hover-bg)',
                    color: 'var(--theme-fg)',
                  }}
                >
                  <Smartphone className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--theme-fg)' }}>
                  {t('phone') || 'Phone / WhatsApp'}
                </h3>
                <p className="text-sm transition-colors group-hover:text-[var(--theme-fg)]" style={{ color: 'var(--theme-fg-muted)' }}>
                  {personalInfo.phone}
                </p>
              </a>

              <div
                className="group relative rounded-2xl p-6 md:p-8 transition-all duration-300 hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.2)]"
                style={{
                  backgroundColor: 'var(--theme-card-bg)',
                  border: '1px solid var(--theme-border-glass)',
                }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    backgroundColor: 'var(--theme-social-hover-bg)',
                    color: 'var(--theme-fg)',
                  }}
                >
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--theme-fg)' }}>
                  {t('basedIn') || 'Based in'}
                </h3>
                <p className="text-sm" style={{ color: 'var(--theme-fg-muted)' }}>
                  {personalInfo.location}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-16 px-6" style={{ borderTop: '1px solid var(--theme-divider)' }}>
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-center mb-10" style={{ color: 'var(--theme-fg)' }}>
                {t('sendMessage') || 'Send a Message'}
              </h2>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6" noValidate>
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2" style={{ color: 'var(--theme-fg)' }}>
                    {t('form.name.label') || 'NAME'}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl px-4 py-3.5 text-base transition-all"
                    style={{
                      backgroundColor: 'var(--theme-input-bg)',
                      border: '1px solid var(--theme-input-border)',
                      color: 'var(--theme-fg)',
                      outline: 'none',
                    }}
                    placeholder={t('form.name.placeholder') || 'John Doe'}
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: 'var(--theme-fg)' }}>
                    {t('form.email.label') || 'EMAIL'}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl px-4 py-3.5 text-base transition-all"
                    style={{
                      backgroundColor: 'var(--theme-input-bg)',
                      border: '1px solid var(--theme-input-border)',
                      color: 'var(--theme-fg)',
                      outline: 'none',
                    }}
                    placeholder={t('form.email.placeholder') || 'john@example.com'}
                  />
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2" style={{ color: 'var(--theme-fg)' }}>
                    {t('form.subject.label') || 'SUBJECT'}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl px-4 py-3.5 text-base transition-all"
                    style={{
                      backgroundColor: 'var(--theme-input-bg)',
                      border: '1px solid var(--theme-input-border)',
                      color: 'var(--theme-fg)',
                      outline: 'none',
                    }}
                    placeholder={t('form.subject.placeholder') || 'Project Inquiry'}
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2" style={{ color: 'var(--theme-fg)' }}>
                    {t('form.message.label') || 'MESSAGE'}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full rounded-xl px-4 py-3.5 text-base transition-all resize-none"
                    style={{
                      backgroundColor: 'var(--theme-input-bg)',
                      border: '1px solid var(--theme-input-border)',
                      color: 'var(--theme-fg)',
                      outline: 'none',
                    }}
                    placeholder={t('form.message.placeholder') || 'Tell me about your project...'}
                  />
                </div>

                {/* Turnstile Captcha */}
                <div className="pt-2">
                  <TurnstileWidget
                    onVerify={handleTurnstileVerify}
                    onError={handleTurnstileError}
                    onExpire={handleTurnstileExpire}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto rounded-full px-8 py-3.5 font-medium transition-all flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: 'var(--theme-btn-primary-bg)',
                    color: 'var(--theme-btn-primary-fg)',
                    opacity: isSubmitting ? 0.7 : 1,
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>{t('form.submitting') || 'Sending...'}</span>
                    </>
                  ) : (
                    <>
                      <span>{t('form.submit') || 'Send Message'}</span>
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>

                {/* Status Messages */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-sm"
                >
                  {submitStatus === 'success' && (
                    <div className="flex items-center justify-center gap-2 text-green-500 dark:text-green-400">
                      <CheckCircle className="w-5 h-5" />
                      <span>{t('form.success') || 'Message sent successfully! I\'ll be in touch soon.'}</span>
                    </div>
                  )}
                  {submitStatus === 'error' && (
                    <div className="flex items-center justify-center gap-2 text-red-500 dark:text-red-400">
                      <AlertCircle className="w-5 h-5" />
                      <span>{t('form.error') || 'Something went wrong. Please try again later.'}</span>
                    </div>
                  )}
                  {submitStatus === 'rate-limited' && (
                    <div className="flex items-center justify-center gap-2 text-orange-500 dark:text-orange-400">
                      <AlertCircle className="w-5 h-5" />
                      <span>{t('form.rateLimit') || 'You\'ve sent too many messages. Please try again in an hour.'}</span>
                    </div>
                  )}
                  {submitStatus === 'captcha-failed' && (
                    <div className="flex items-center justify-center gap-2 text-red-500 dark:text-red-400">
                      <AlertCircle className="w-5 h-5" />
                      <span>{t('form.captchaFailed') || 'Security verification failed. Please refresh the page and try again.'}</span>
                    </div>
                  )}
                </motion.div>
              </form>
            </motion.div>
          </div>
        </section>

        {/* Social Links Footer Section */}
        <section className="py-24 px-6" style={{ borderTop: '1px solid var(--theme-divider)' }}>
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4" style={{ color: 'var(--theme-fg)' }}>
                {t('socialProfiles') || 'Social Profiles'}
              </h2>
              <p className="max-w-2xl mx-auto" style={{ color: 'var(--theme-fg-muted)' }}>
                {t('socialDesc') || 'Follow my work and connect with me on these platforms.'}
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: Github, label: 'GitHub', href: social.github, color: 'hover:text-white hover:bg-gray-900 dark:hover:bg-white dark:hover:text-black' },
                { icon: Linkedin, label: 'LinkedIn', href: social.linkedin, color: 'hover:text-white hover:bg-blue-700' },
                { icon: Twitter, label: 'Twitter', href: social.twitter, color: 'hover:text-white hover:bg-sky-500' },
              ].map((item, idx) => (
                <motion.a
                  key={idx}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="group relative rounded-2xl p-8 text-center transition-all duration-300"
                  style={{
                    backgroundColor: 'var(--theme-card-bg)',
                    border: '1px solid var(--theme-border-glass)',
                  }}
                >
                  <item.icon 
                    className="w-8 h-8 mx-auto mb-4 transition-all group-hover:scale-110" 
                    style={{ color: 'var(--theme-fg-muted)' }}
                  />
                  <h3 className="font-semibold" style={{ color: 'var(--theme-fg)' }}>
                    {item.label}
                  </h3>
                  <div className="absolute inset-0 rounded-2xl opacity-0 transition-opacity" style={{ backgroundColor: 'var(--theme-sphere-glow)' }} />
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-32 px-6" style={{ backgroundColor: 'var(--theme-bg-section-alt)' }}>
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight mb-6"
              style={{ color: 'var(--theme-fg)' }}
            >
              {t('ctaTitle1') || "Let's Build"} <span style={{ color: 'var(--theme-fg-muted)' }}>{t('ctaTitle2') || 'Something Great'}</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg mb-10 max-w-xl mx-auto leading-relaxed"
              style={{ color: 'var(--theme-fg-muted)' }}
            >
              {t('ctaDescription') || 'Whether you need a new platform, a custom web app, or a reliable development partner — I\'m ready to help turn your vision into reality.'}
            </motion.p>
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              href="/en/work"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-medium transition-colors"
              style={{
                backgroundColor: 'var(--theme-btn-primary-bg)',
                color: 'var(--theme-btn-primary-fg)',
              }}
            >
              <span>{t('viewWork') || 'View My Work'}</span>
              <ArrowUpRight className="w-4 h-4" />
            </motion.a>
          </div>
        </section>
      </main>
    </PageTransition>
  );
}