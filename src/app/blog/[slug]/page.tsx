import type { Metadata } from 'next';
import siteConfig from '@/config/siteConfig';
import BlogJsonLd from '@/components/seo/BlogJsonLd';
import BlogPostClient from './BlogPostClient';

const SITE_URL = siteConfig.metadata.url;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const title = `${slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())} | M Fahmi Hassan`;
  const description = `Read about ${slug.replace(/-/g, ' ')} by M Fahmi Hassan.`;
  const ogImage = `${SITE_URL}/images/fahmi-og.jpg`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/blog/${slug}`,
      siteName: 'M Fahmi Hassan',
      locale: 'en_US',
      type: 'article',
      images: [{ url: ogImage, width: 800, height: 800, alt: `${slug} - M Fahmi Hassan` }],
    },
    twitter: {
      card: 'summary',
      title,
      description,
      creator: '@thefahmhassan',
      images: [ogImage],
    },
    alternates: {
      canonical: `${SITE_URL}/blog/${slug}`,
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const headline = slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <>
      <BlogJsonLd headline={headline} />
      <BlogPostClient slug={slug} />
    </>
  );
}
