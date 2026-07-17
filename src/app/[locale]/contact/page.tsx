import type { Metadata } from 'next';
import siteConfig from '@/config/siteConfig';
import ContactClient from './ContactClient';

const SITE_URL = siteConfig.metadata.url;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isId = locale === 'id';

  const title = isId
    ? 'Hubungi Saya | M Fahmi Hassan'
    : 'Contact | M Fahmi Hassan';
  const description = isId
    ? 'Hubungi M Fahmi Hassan untuk proyek web development, konsultasi teknis, atau kolaborasi bisnis. Tersedia untuk freelance dan full-time.'
    : 'Get in touch with M Fahmi Hassan for web development projects, technical consulting, or business collaboration. Available for freelance and full-time.';
  const ogImage = `${SITE_URL}/images/fahmi-og.jpg`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}/contact`,
      siteName: 'M Fahmi Hassan',
      locale: locale === 'id' ? 'id_ID' : 'en_US',
      images: [{ url: ogImage, width: 800, height: 800, alt: 'M Fahmi Hassan - Contact' }],
    },
    twitter: {
      card: 'summary',
      title,
      description,
      creator: '@thefahmhassan',
      images: [ogImage],
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/contact`,
      languages: {
        en: `${SITE_URL}/en/contact`,
        id: `${SITE_URL}/id/contact`,
        'x-default': `${SITE_URL}/en/contact`,
      },
    },
  };
}

export default function ContactPage() {
  return <ContactClient />;
}
