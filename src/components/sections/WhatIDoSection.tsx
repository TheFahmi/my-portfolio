import { Code, Server, Zap } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function WhatIDoSection() {
  const t = useTranslations('hero');
  
  const services = [
    {
      icon: <Code className="w-6 h-6" style={{ color: 'var(--theme-fg)' }} />,
      title: t('serviceFullStack'),
      description: t('serviceFullStackDesc')
    },
    {
      icon: <Server className="w-6 h-6" style={{ color: 'var(--theme-fg)' }} />,
      title: t('serviceAPI'),
      description: t('serviceAPIDesc')
    },
    {
      icon: <Zap className="w-6 h-6" style={{ color: 'var(--theme-fg)' }} />,
      title: t('servicePerf'),
      description: t('servicePerfDesc')
    }
  ];

  return (
    <section className="py-24 px-6" style={{ backgroundColor: 'var(--theme-bg)' }}>
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {services.map((service, index) => (
            <div 
              key={index}
              className="text-left"
            >
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                style={{ 
                  backgroundColor: 'var(--theme-social-hover-bg)',
                }}
              >
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--theme-fg)' }}>
                {service.title}
              </h3>
              <p className="text-[15px] leading-relaxed" style={{ color: 'var(--theme-fg-muted)' }}>
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
