'use client';

interface BlogJsonLdProps {
  headline: string;
  description?: string;
  url?: string;
  datePublished?: string;
}

export default function BlogJsonLd({
  headline,
  description,
  url,
  datePublished,
}: BlogJsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    ...(description ? { description } : {}),
    ...(url ? { url } : {}),
    ...(datePublished ? { datePublished } : {}),
    author: {
      '@type': 'Person',
      name: 'M Fahmi Hassan',
    },
    publisher: {
      '@type': 'Organization',
      name: 'M Fahmi Hassan',
      logo: {
        '@type': 'ImageObject',
        url: 'https://mfah.me/images/fahmi-og.jpg',
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
