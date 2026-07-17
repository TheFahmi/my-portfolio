import type { Metadata } from 'next';
import siteConfig from '@/config/siteConfig';
import AboutClient from './AboutClient';

const SITE_URL = siteConfig.metadata.url;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isId = locale === 'id';

  const title = isId
    ? 'Tentang Saya | M Fahmi Hassan'
    : 'About | M Fahmi Hassan';
  const description = isId
    ? 'Pelajari tentang pengalaman 5+ tahun saya sebagai Full Stack Engineer — keahlian di Next.js, NestJS, dan arsitektur SaaS scalable.'
    : 'Learn about my 5+ years of experience as a Full Stack Engineer — specializing in Next.js, NestJS, and scalable SaaS architecture.';
  const ogImage = `${SITE_URL}/images/fahmi-og.jpg`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}/about`,
      siteName: 'M Fahmi Hassan',
      locale: locale === 'id' ? 'id_ID' : 'en_US',
      images: [{ url: ogImage, width: 800, height: 800, alt: 'M Fahmi Hassan - About' }],
    },
    twitter: {
      card: 'summary',
      title,
      description,
      creator: '@thefahmhassan',
      images: [ogImage],
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/about`,
      languages: {
        en: `${SITE_URL}/en/about`,
        id: `${SITE_URL}/id/about`,
        'x-default': `${SITE_URL}/en/about`,
      },
    },
  };
}

export default function AboutPage() {
  return <AboutClient />;
}
