export interface NavigationKeys {
  home: string;
  about: string;
  skills: string;
  projects: string;
  experience: string;
  contact: string;
  blog: string;
}

export interface CommonKeys {
  loading: string;
  readMore: string;
  viewProject: string;
  viewCode: string;
  sendMessage: string;
  back: string;
  close: string;
  availableForWork: string;
}

export interface AboutKeys {
  title: string;
  subtitle: string;
  paragraph1: string;
  paragraph2: string;
  downloadResume: string;
  education: string;
  skillsSection: string;
}

export interface Messages {
  navigation: NavigationKeys;
  common: CommonKeys;
  about: AboutKeys;
}

export type Locale = 'en' | 'id';

type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}${'' extends P ? '' : '.'}${P}`
    : never
  : never;

type Paths<T> = T extends object
  ? {
      [K in keyof T]-?: K extends string | number
        ? `${K}` | Join<K, Paths<T[K]>>
        : never;
    }[keyof T]
  : '';

export type TranslationKey = Paths<Messages>;