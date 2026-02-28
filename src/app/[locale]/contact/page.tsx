import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import siteConfig from '@/config/siteConfig';

const SITE_URL = siteConfig.metadata.url;

const ContactClient = dynamic(() => import('./ContactClient'), { ssr: true });

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isId = locale === 'id';

  const title = isId ? 'Kontak' : 'Contact';
  const description = isId
    ? 'Hubungi M Fahmi Hassan untuk kolaborasi proyek, konsultasi teknis, atau peluang kerja sama.'
    : 'Get in touch with M Fahmi Hassan for project collaboration, technical consultation, or partnership opportunities.';

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${locale}/contact`,
      languages: {
        'en': `${SITE_URL}/en/contact`,
        'id': `${SITE_URL}/id/contact`,
      },
    },
    openGraph: {
      title: `${title} | M Fahmi Hassan`,
      description,
      url: `${SITE_URL}/${locale}/contact`,
    },
    twitter: {
      title: `${title} | M Fahmi Hassan`,
      description,
    },
  };
}

export default function ContactPage() {
  return <ContactClient />;
}
