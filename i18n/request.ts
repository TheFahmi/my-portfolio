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
  };
}

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as 'en' | 'id')) {
    locale = routing.defaultLocale;
  }

  const messages = (await import(`../messages/${locale}.json`)).default as Messages;
  const fallbackMessages = (await import(`../messages/en.json`)).default as Messages;

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
