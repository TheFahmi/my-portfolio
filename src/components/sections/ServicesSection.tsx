'use client';

import { motion } from 'framer-motion';
import { Link } from '../../../i18n/navigation';
import { useTranslations } from 'next-intl';
import { 
  Globe, 
  Smartphone, 
  ShoppingCart, 
  Rocket,
  Layout,
  Server,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const serviceIcons = [Globe, Layout, ShoppingCart, Smartphone, Server, Rocket];

export default function ServicesSection() {
  const t = useTranslations('services');

  const services = [
    {
      icon: serviceIcons[0],
      title: t('items.website.title'),
      description: t('items.website.description'),
      features: [
        t('items.website.features.0'),
        t('items.website.features.1'),
        t('items.website.features.2'),
      ],
    },
    {
      icon: serviceIcons[1],
      title: t('items.landingPage.title'),
      description: t('items.landingPage.description'),
      features: [
        t('items.landingPage.features.0'),
        t('items.landingPage.features.1'),
        t('items.landingPage.features.2'),
      ],
    },
    {
      icon: serviceIcons[2],
      title: t('items.ecommerce.title'),
      description: t('items.ecommerce.description'),
      features: [
        t('items.ecommerce.features.0'),
        t('items.ecommerce.features.1'),
        t('items.ecommerce.features.2'),
      ],
    },
    {
      icon: serviceIcons[3],
      title: t('items.webApp.title'),
      description: t('items.webApp.description'),
      features: [
        t('items.webApp.features.0'),
        t('items.webApp.features.1'),
        t('items.webApp.features.2'),
      ],
    },
    {
      icon: serviceIcons[4],
      title: t('items.api.title'),
      description: t('items.api.description'),
      features: [
        t('items.api.features.0'),
        t('items.api.features.1'),
        t('items.api.features.2'),
      ],
    },
    {
      icon: serviceIcons[5],
      title: t('items.maintenance.title'),
      description: t('items.maintenance.description'),
      features: [
        t('items.maintenance.features.0'),
        t('items.maintenance.features.1'),
        t('items.maintenance.features.2'),
      ],
    },
  ];

  return (
    <section id="services" className="py-24 md:py-32 px-6 relative overflow-hidden" style={{ borderTop: '1px solid var(--theme-divider)' }}>
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px] pointer-events-none" style={{ backgroundColor: 'var(--theme-sphere-glow)', opacity: 0.15 }} />
      
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4" style={{ color: 'var(--theme-fg)' }}>
            {t('title')}
          </h2>
          <p className="text-lg max-w-2xl leading-relaxed" style={{ color: 'var(--theme-fg-muted)' }}>
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--theme-fg)' }}>
                  {service.title}
                </h3>
                <p className="text-[15px] leading-relaxed mb-4" style={{ color: 'var(--theme-fg-muted)' }}>
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2">
                  {service.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-2 text-sm" style={{ color: 'var(--theme-fg-secondary)' }}>
                      <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--theme-check-color)' }} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 pt-16"
          style={{ borderTop: '1px solid var(--theme-divider)' }}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-lg" style={{ color: 'var(--theme-fg-muted)' }}>
              {t('cta.text')}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-colors"
              style={{
                backgroundColor: 'var(--theme-btn-primary-bg)',
                color: 'var(--theme-btn-primary-fg)',
              }}
            >
              <span>{t('cta.button')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
