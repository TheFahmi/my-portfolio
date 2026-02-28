import type { MetadataRoute } from 'next';
import siteConfig from '@/config/siteConfig';

const SITE_URL = siteConfig.metadata.url;

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ['en', 'id'];
  const pages = ['', '/about', '/work', '/contact'];
  const lastModified = new Date();

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of pages) {
      entries.push({
        url: `${SITE_URL}/${locale}${page}`,
        lastModified,
        changeFrequency: page === '' ? 'weekly' : 'monthly',
        priority: page === '' ? 1.0 : page === '/work' ? 0.9 : 0.8,
        alternates: {
          languages: {
            en: `${SITE_URL}/en${page}`,
            id: `${SITE_URL}/id${page}`,
          },
        },
      });
    }
  }

  return entries;
}
