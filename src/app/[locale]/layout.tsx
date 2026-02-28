import type { Metadata } from "next";
import "../globals.css";
import dynamic from 'next/dynamic';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import siteConfig from '@/config/siteConfig';

const ClientLayout = dynamic(() => import('../../components/layout/ClientLayout'), { ssr: true });

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-mono',
  display: 'swap',
});

const SITE_URL = siteConfig.metadata.url;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isId = locale === 'id';

  const title = isId
    ? 'M Fahmi Hassan | Full Stack Engineer'
    : 'M Fahmi Hassan | Full Stack Engineer';
  const description = isId
    ? 'Full Stack Engineer & Team Lead berpengalaman 5+ tahun di NestJS, Next.js, React, TypeScript, dan arsitektur SaaS scalable.'
    : 'Full Stack Engineer & Team Lead with 5+ years of experience in NestJS, Next.js, React, TypeScript, and scalable SaaS architecture.';

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: '%s | M Fahmi Hassan',
    },
    description,
    keywords: [
      'Full Stack Engineer', 'NestJS', 'Next.js', 'React', 'TypeScript',
      'Portfolio', 'Jakarta', 'Indonesia', 'SaaS', 'Web Developer',
      'Team Lead', 'Node.js', 'PostgreSQL',
    ],
    authors: [{ name: 'M Fahmi Hassan', url: SITE_URL }],
    creator: 'M Fahmi Hassan',
    publisher: 'M Fahmi Hassan',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        'en': `${SITE_URL}/en`,
        'id': `${SITE_URL}/id`,
        'x-default': `${SITE_URL}/en`,
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'id' ? 'id_ID' : 'en_US',
      alternateLocale: locale === 'id' ? 'en_US' : 'id_ID',
      url: `${SITE_URL}/${locale}`,
      siteName: 'M Fahmi Hassan',
      title,
      description,
      images: [
        {
          url: `${SITE_URL}/images/fahmi-profile.jpg`,
          width: 800,
          height: 800,
          alt: 'M Fahmi Hassan - Full Stack Engineer',
          type: 'image/jpeg',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@thefahmhassan',
      images: [`${SITE_URL}/images/fahmi-profile.jpg`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      // Add these when you have them:
      // google: 'your-google-verification-code',
    },
  };
}

// JSON-LD Structured Data
function JsonLd({ locale }: { locale: string }) {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'M Fahmi Hassan',
    url: SITE_URL,
    image: `${SITE_URL}/images/fahmi-profile.jpg`,
    jobTitle: 'Full Stack Engineer & Team Lead',
    worksFor: {
      '@type': 'Organization',
      name: 'Freelance',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Jakarta',
      addressCountry: 'ID',
    },
    sameAs: [
      siteConfig.social.github,
      siteConfig.social.linkedin,
      siteConfig.social.twitter,
    ],
    knowsAbout: ['NestJS', 'Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'SaaS Architecture'],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'M Fahmi Hassan Portfolio',
    url: SITE_URL,
    inLanguage: [locale === 'id' ? 'id-ID' : 'en-US'],
    author: {
      '@type': 'Person',
      name: 'M Fahmi Hassan',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="preload" href="/images/fahmi-profile.jpg" as="image" fetchPriority="high" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="theme-color" content="#000000" />
        <JsonLd locale={locale} />
      </head>
      <body className={`${inter.className} antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ClientLayout>{children}</ClientLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
