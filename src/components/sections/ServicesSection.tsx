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
    <section id="services" className="py-24 md:py-32 px-6 bg-[#050510] relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-900/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="inline-block text-xs font-medium tracking-[0.2em] uppercase text-amber-500/80 mb-4">
            {t('label')}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              {t('title')}
            </span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group bg-[#0a0a1a]/80 border border-white/[0.06] rounded-2xl p-7 hover:border-white/[0.12] transition-all duration-500 hover:-translate-y-1"
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mb-5 group-hover:bg-white/[0.08] transition-colors duration-500">
                  <Icon className="w-5 h-5 text-gray-300" />
                </div>

                {/* Title & Description */}
                <h3 className="text-white text-lg font-semibold mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2">
                  {service.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-2 text-sm text-gray-400">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500/70 mt-0.5 flex-shrink-0" />
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
          className="mt-16 text-center"
        >
          <p className="text-gray-500 mb-6 text-lg">
            {t('cta.text')}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-colors"
          >
            <span>{t('cta.button')}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
