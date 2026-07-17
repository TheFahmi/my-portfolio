'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';
import siteConfig from '@/config/siteConfig';

export default function AvailabilitySection() {
  const t = useTranslations('availability');
  const { availability } = siteConfig;
  const isAvailable = availability.status === 'available';

  return (
    <section className="py-24 px-6" style={{ backgroundColor: 'var(--theme-bg)' }}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl p-8 md:p-12 relative overflow-hidden"
          style={{
            backgroundColor: 'var(--theme-card-bg)',
            border: '1px solid var(--theme-border-glass)',
          }}
        >
          <div className="flex flex-col md:flex-row gap-8 items-center justify-between relative z-10">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-3 h-3 rounded-full ${isAvailable ? 'bg-green-500' : 'bg-yellow-500'}`} />
                <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: 'var(--theme-fg-muted)' }}>
                  {isAvailable ? t('available') : t('busy')}
                </span>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-semibold mb-8" style={{ color: 'var(--theme-fg)' }}>
                {t('headline')}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-center gap-4 p-4 rounded-xl" style={{ backgroundColor: 'var(--theme-social-hover-bg)' }}>
                  <Calendar className="w-6 h-6 text-[#0071e3]" />
                  <div>
                    <p className="text-xs font-medium" style={{ color: 'var(--theme-fg-muted)' }}>{t('nextAvailable')}</p>
                    <p className="font-medium" style={{ color: 'var(--theme-fg)' }}>{availability.nextAvailable}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 rounded-xl" style={{ backgroundColor: 'var(--theme-social-hover-bg)' }}>
                  <Clock className="w-6 h-6 text-[#0071e3]" />
                  <div>
                    <p className="text-xs font-medium" style={{ color: 'var(--theme-fg-muted)' }}>{t('responseTime')}</p>
                    <p className="font-medium" style={{ color: 'var(--theme-fg)' }}>{availability.responseTime}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden md:block w-px h-32" style={{ backgroundColor: 'var(--theme-divider)' }} />

            <div className="flex-1 text-center md:text-left flex flex-col items-center md:items-start gap-6">
              <p className="text-lg font-medium" style={{ color: 'var(--theme-fg)' }}>
                {t('ready')}
              </p>
              <a
                href={siteConfig.social.email}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium transition-colors w-full sm:w-auto"
                style={{
                  backgroundColor: '#0071e3',
                  color: 'white',
                }}
              >
                <Mail className="w-4 h-4" />
                <span>{t('getInTouch')}</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
