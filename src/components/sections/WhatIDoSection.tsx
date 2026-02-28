import { Code, Server, Zap } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function WhatIDoSection() {
  const t = useTranslations('about');
  
  const services = [
    {
      icon: <Code className="w-8 h-8 text-white mb-6" />,
      title: "Full-Stack Development",
      description: "Building scalable web applications with React, Next.js, and NestJS"
    },
    {
      icon: <Server className="w-8 h-8 text-white mb-6" />,
      title: "API Integration",
      description: "Designing and integrating robust RESTful and GraphQL APIs"
    },
    {
      icon: <Zap className="w-8 h-8 text-white mb-6" />,
      title: "Performance Optimization",
      description: "Enhancing application speed and improving user experience"
    }
  ];

  return (
    <section className="py-24 px-6 bg-black">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
          What I Do
        </h2>
        <p className="text-gray-500 text-center mb-16 max-w-2xl mx-auto">
          I specialize in building modern web applications with a focus on performance, 
          scalability, and exceptional user experiences.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-[#111]/80 border border-white/[0.08] rounded-xl p-8 text-center flex flex-col items-center transition-transform hover:-translate-y-1"
            >
              {service.icon}
              <h3 className="text-white text-xl font-semibold mt-4 mb-3">{service.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
