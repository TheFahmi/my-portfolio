import type { Metadata } from 'next';
import siteConfig, { getLocalizedConfig } from '@/config/siteConfig';
import ProjectJsonLd from '@/components/seo/ProjectJsonLd';
import CaseStudyClient from './CaseStudyClient';

const SITE_URL = siteConfig.metadata.url;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale, id } = await params;
  const isId = locale === 'id';
  const projectId = Number(id);
  const config = getLocalizedConfig(locale);
  const project = config.projects.find((p) => p.id === projectId);

  const title = project
    ? `${project.title} | M Fahmi Hassan`
    : 'Project Not Found | M Fahmi Hassan';
  const description = project
    ? project.description
    : 'Project case study by M Fahmi Hassan.';
  const ogImage = `${SITE_URL}/images/fahmi-og.jpg`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}/work/${id}`,
      siteName: 'M Fahmi Hassan',
      locale: locale === 'id' ? 'id_ID' : 'en_US',
      images: [{ url: ogImage, width: 800, height: 800, alt: `${project?.title ?? 'Project'} - M Fahmi Hassan` }],
    },
    twitter: {
      card: 'summary',
      title,
      description,
      creator: '@thefahmhassan',
      images: [ogImage],
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/work/${id}`,
      languages: {
        en: `${SITE_URL}/en/work/${id}`,
        id: `${SITE_URL}/id/work/${id}`,
        'x-default': `${SITE_URL}/en/work/${id}`,
      },
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const projectId = Number(id);
  const config = getLocalizedConfig(locale);
  const project = config.projects.find((p) => p.id === projectId);

  return (
    <>
      {project && (
        <ProjectJsonLd
          name={project.title}
          description={project.description}
          url={`${SITE_URL}/${locale}/work/${project.id}`}
          technologies={project.technologies}
          dateCreated="2024"
        />
      )}
      <CaseStudyClient />
    </>
  );
}
