import type { MetadataRoute } from 'next';
import siteConfig from '@/config/siteConfig';

const SITE_URL = siteConfig.metadata.url;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
