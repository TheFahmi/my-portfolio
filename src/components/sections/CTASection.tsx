import { Link } from '../../../i18n/navigation';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function CTASection() {
  const t = useTranslations('hero');
  
  return (
    <section className="py-32 px-6" style={{ borderTop: '1px solid var(--theme-divider)' }}>
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight mb-6" style={{ color: 'var(--theme-fg)' }}>
          {t('ctaTitle1')}{' '}
          <span style={{ color: 'var(--theme-fg-muted)' }}>{t('ctaTitle2')}</span>
        </h2>
        
        <p className="text-lg mb-10 max-w-xl mx-auto leading-relaxed" style={{ color: 'var(--theme-fg-muted)' }}>
          {t('ctaDescription')}
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/contact" 
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-medium transition-colors w-full sm:w-auto"
            style={{
              backgroundColor: 'var(--theme-btn-primary-bg)',
              color: 'var(--theme-btn-primary-fg)',
            }}
          >
            <span>{t('startProject')}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          
          <Link 
            href="/work" 
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-medium transition-colors w-full sm:w-auto"
            style={{
              border: '1px solid var(--theme-btn-outline-border)',
              color: 'var(--theme-btn-outline-fg)',
            }}
          >
            <span>{t('viewWork')}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
