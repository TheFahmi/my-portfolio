import { Link } from '../../../i18n/navigation';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function CTASection() {
  const t = useTranslations('hero'); // Reuse translations if applicable
  
  return (
    <section className="py-32 px-6 bg-[#0a0a14] border-t border-white/[0.02]">
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center overflow-hidden">
        <div className="text-gray-500 mb-6 flex justify-center">
          <Sparkles className="w-8 h-8 opacity-60" />
        </div>
        
        <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-8 tracking-tight">
          <span className="text-white">{t('ctaTitle1')}</span>{' '}
          <span className="text-gray-600">{t('ctaTitle2')}</span>
        </h2>
        
        <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
          {t('ctaDescription')}
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <Link 
            href="/contact" 
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-colors w-full sm:w-auto"
          >
            <span>{t('startProject')}</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
          
          <Link 
            href="/work" 
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors w-full sm:w-auto"
          >
            <span>{t('viewWork')}</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
