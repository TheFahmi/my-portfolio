import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import siteConfig from '@/config/siteConfig';

const SITE_URL = siteConfig.metadata.url;

const AboutClient = dynamic(() => import('./AboutClient'), { ssr: true });

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isId = locale === 'id';

  const title = isId ? 'Tentang Saya' : 'About Me';
  const description = isId
    ? 'Pelajari lebih lanjut tentang M Fahmi Hassan — Full Stack Engineer & Team Lead berpengalaman 5+ tahun di NestJS, Next.js, React, dan TypeScript.'
    : 'Learn more about M Fahmi Hassan — Full Stack Engineer & Team Lead with 5+ years of experience in NestJS, Next.js, React, and TypeScript.';

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${locale}/about`,
      languages: {
        'en': `${SITE_URL}/en/about`,
        'id': `${SITE_URL}/id/about`,
      },
    },
    openGraph: {
      title: `${title} | M Fahmi Hassan`,
      description,
      url: `${SITE_URL}/${locale}/about`,
      images: [
        {
          url: `${SITE_URL}/images/fahmi-profile.jpg`,
          width: 800,
          height: 800,
          alt: 'M Fahmi Hassan',
        },
      ],
    },
    twitter: {
      title: `${title} | M Fahmi Hassan`,
      description,
    },
  };
}

export default function AboutPage() {
  return <AboutClient />;
}
