import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

interface Messages {
  navigation: {
    home: string;
    about: string;
    skills: string;
    projects: string;
    experience: string;
    contact: string;
    blog: string;
  };
  common: {
    loading: string;
    readMore: string;
    viewProject: string;
    viewCode: string;
    sendMessage: string;
    back: string;
    close: string;
    availableForWork: string;
  };
  about: {
    title: string;
    subtitle: string;
    paragraph1: string;
    paragraph2: string;
    downloadResume: string;
    education: string;
    skillsSection: string;
    story: string;
    skills: string;
    connect: string;
    experience: string;
  };
  hero: {
    badge: string;
    titlePrefix: string;
    ctaPrimary: string;
    ctaSecondary: string;
    description: string;
    whatIDo: string;
    whatIDoSubtitle: string;
    serviceFullStack: string;
    serviceFullStackDesc: string;
    serviceAPI: string;
    serviceAPIDesc: string;
    servicePerf: string;
    servicePerfDesc: string;
    ctaTitle1: string;
    ctaTitle2: string;
    ctaDescription: string;
    startProject: string;
    viewWork: string;
    stats: {
      yearsExperience: string;
      platforms: string;
      commitment: string;
      totalProjects: string;
    };
    currentStack: string;
  };
  work: {
    title: string;
    subtitle: string;
    featured: string;
    liveDemo: string;
    technicalArsenal: string;
    technicalArsenalDesc: string;
  };
  contact: {
    sectionLabel: string;
    heading: string;
    contactInfo: string;
    emailLabel: string;
    basedIn: string;
    phone: string;
    socialProfiles: string;
    sendMessage: string;
    nameLabel: string;
    namePlaceholder: string;
    emailFieldLabel: string;
    emailPlaceholder: string;
    subjectLabel: string;
    subjectPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitButton: string;
    submitting: string;
    successMessage: string;
    errorMessage: string;
    studioLabel: string;
    socialsLabel: string;
    getInTouch: string;
    title: string;
    subtitle: string;
    form: {
      name: { label: string; placeholder: string };
      email: { label: string; placeholder: string };
      subject: { label: string; placeholder: string };
      message: { label: string; placeholder: string };
      submit: string;
      submitting: string;
      success: string;
      error: string;
    };
  };
  footer: {
    tagline: string;
    madeWith: string;
  };
}

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as 'en' | 'id')) {
    locale = routing.defaultLocale;
  }

  const navigation = (await import(`../messages/${locale}/navigation.json`)).default;
  const common = (await import(`../messages/${locale}/common.json`)).default;
  const about = (await import(`../messages/${locale}/about.json`)).default;
  const hero = (await import(`../messages/${locale}/hero.json`)).default;
  const work = (await import(`../messages/${locale}/work.json`)).default;
  const contact = (await import(`../messages/${locale}/contact.json`)).default;
  const footer = (await import(`../messages/${locale}/footer.json`)).default;
  const messages = { ...navigation, ...common, ...about, ...hero, ...work, ...contact, ...footer } as Messages;

  const navigationFallback = (await import(`../messages/en/navigation.json`)).default;
  const commonFallback = (await import(`../messages/en/common.json`)).default;
  const aboutFallback = (await import(`../messages/en/about.json`)).default;
  const heroFallback = (await import(`../messages/en/hero.json`)).default;
  const workFallback = (await import(`../messages/en/work.json`)).default;
  const contactFallback = (await import(`../messages/en/contact.json`)).default;
  const footerFallback = (await import(`../messages/en/footer.json`)).default;
  const fallbackMessages = { ...navigationFallback, ...commonFallback, ...aboutFallback, ...heroFallback, ...workFallback, ...contactFallback, ...footerFallback } as Messages;

  return {
    locale,
    messages,
    fallbackLocale: 'en',
    onError: (error: any) => {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`[next-intl] ${error.message}`);
      }
    },
    getMessageFallback: ({ namespace, key }: { namespace?: string; key: string }) => {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`[next-intl] Missing translation for key: ${namespace ? `${namespace}.${key}` : key} (locale: ${locale}). Using English fallback.`);
      }
      
      if (namespace && namespace in fallbackMessages) {
        const ns = namespace as keyof Messages;
        const fallbackValue = (fallbackMessages[ns] as any)[key];
        return fallbackValue || `🌐 ${namespace}.${key}`;
      }
      
      const fallbackValue = (fallbackMessages as any)[key];
      return fallbackValue || `🌐 ${key}`;
    }
  };
});
