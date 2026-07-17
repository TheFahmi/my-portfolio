import type { MetadataRoute } from 'next';
import siteConfig from '@/config/siteConfig';

const SITE_URL = siteConfig.metadata.url;

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ['en', 'id'];
  const pages = ['', '/about', '/work', '/contact'];
  const lastModified = new Date();

  const entries: MetadataRoute.Sitemap = [];

  // Locale pages: /, /about, /work, /contact
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

  // Individual project pages: /{locale}/work/{id}
  for (const locale of locales) {
    for (const project of siteConfig.projects) {
      entries.push({
        url: `${SITE_URL}/${locale}/work/${project.id}`,
        lastModified,
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: {
          languages: {
            en: `${SITE_URL}/en/work/${project.id}`,
            id: `${SITE_URL}/id/work/${project.id}`,
          },
        },
      });
    }
  }

  // Blog index
  entries.push({
    url: `${SITE_URL}/blog`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.6,
  });

  return entries;
}
