import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import siteConfig from '@/config/siteConfig';

const SITE_URL = siteConfig.metadata.url;

const WorkClient = dynamic(() => import('./WorkClient'), { ssr: true });

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isId = locale === 'id';

  const title = isId ? 'Proyek' : 'Work';
  const description = isId
    ? 'Jelajahi proyek-proyek M Fahmi Hassan — dari platform SaaS, integrasi WhatsApp, hingga website korporat yang dibangun dari nol.'
    : 'Explore projects by M Fahmi Hassan — from SaaS platforms, WhatsApp integration, to corporate websites built from scratch.';

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${locale}/work`,
      languages: {
        'en': `${SITE_URL}/en/work`,
        'id': `${SITE_URL}/id/work`,
      },
    },
    openGraph: {
      title: `${title} | M Fahmi Hassan`,
      description,
      url: `${SITE_URL}/${locale}/work`,
      images: [
        {
          url: `${SITE_URL}/images/fahmi-profile.jpg`,
          width: 800,
          height: 800,
          alt: 'M Fahmi Hassan - Projects',
        },
      ],
    },
    twitter: {
      title: `${title} | M Fahmi Hassan`,
      description,
    },
  };
}

export default function WorkPage() {
  return <WorkClient />;
}
