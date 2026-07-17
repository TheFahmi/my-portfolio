import type { Metadata } from 'next';
import siteConfig from '@/config/siteConfig';
import BlogPageClient from './BlogPageClient';

const SITE_URL = siteConfig.metadata.url;

export async function generateMetadata(): Promise<Metadata> {
  const title = 'Blog | M Fahmi Hassan';
  const description = 'Articles and insights on web development, technology, and engineering by M Fahmi Hassan.';
  const ogImage = `${SITE_URL}/images/fahmi-og.jpg`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/blog`,
      siteName: 'M Fahmi Hassan',
      locale: 'en_US',
      images: [{ url: ogImage, width: 800, height: 800, alt: 'Blog - M Fahmi Hassan' }],
    },
    twitter: {
      card: 'summary',
      title,
      description,
      creator: '@thefahmhassan',
      images: [ogImage],
    },
    alternates: {
      canonical: `${SITE_URL}/blog`,
      languages: {
        en: `${SITE_URL}/blog`,
        id: `${SITE_URL}/blog`,
        'x-default': `${SITE_URL}/blog`,
      },
    },
  };
}

export default function BlogPage() {
  return <BlogPageClient />;
}
