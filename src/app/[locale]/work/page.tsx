import type { Metadata } from 'next';
import siteConfig from '@/config/siteConfig';
import WorkClient from './WorkClient';

const SITE_URL = siteConfig.metadata.url;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isId = locale === 'id';

  const title = isId
    ? 'Pekerjaan Saya | M Fahmi Hassan'
    : 'My Work | M Fahmi Hassan';
  const description = isId
    ? 'Lihat proyek-proyek yang saya kerjakan, termasuk platform SaaS, e-commerce, dan aplikasi web full-stack.'
    : 'Explore projects I\'ve built — SaaS platforms, e-commerce systems, and full-stack web applications.';
  const ogImage = `${SITE_URL}/images/fahmi-og.jpg`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}/work`,
      siteName: 'M Fahmi Hassan',
      locale: locale === 'id' ? 'id_ID' : 'en_US',
      images: [{ url: ogImage, width: 800, height: 800, alt: 'M Fahmi Hassan - My Work' }],
    },
    twitter: {
      card: 'summary',
      title,
      description,
      creator: '@thefahmhassan',
      images: [ogImage],
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/work`,
      languages: {
        en: `${SITE_URL}/en/work`,
        id: `${SITE_URL}/id/work`,
        'x-default': `${SITE_URL}/en/work`,
      },
    },
  };
}

export default function WorkPage() {
  return <WorkClient />;
}
