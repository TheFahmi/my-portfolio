'use client';

import { useEffect } from 'react';

interface ProjectJsonLdProps {
  name: string;
  description: string;
  url: string;
  technologies: string[];
  dateCreated?: string;
}

export default function ProjectJsonLd({
  name,
  description,
  url,
  technologies,
  dateCreated,
}: ProjectJsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name,
    description,
    url,
    author: {
      '@type': 'Person',
      name: 'M Fahmi Hassan',
    },
    technologies,
    ...(dateCreated ? { dateCreated } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
