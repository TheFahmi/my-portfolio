import type { Metadata } from "next";
import "../globals.css";
import dynamic from 'next/dynamic';
import { Playfair_Display, Merriweather } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

const ClientLayout = dynamic(() => import('../../components/layout/ClientLayout'), { ssr: true });

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-heading',
  display: 'swap',
});

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Muhammad Fahmi Hassan | Portfolio",
  description: "Frontend Engineer with 4+ years of experience in TypeScript, NuxtJs, TailwindCSS, ReactJs, Vue.js, and React Native",
};

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
    <html lang={locale} suppressHydrationWarning className={`${playfair.variable} ${merriweather.variable}`}>
      <head>
        <link rel="preload" href="/images/fahmi-profile.jpg" as="image" fetchPriority="high" />
        <link
          rel="preload"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          as="style"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function() {
              var link = document.createElement('link');
              link.rel = 'stylesheet';
              link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
              document.head.appendChild(link);
            })();
          `
          }}
        />
      </head>
      <body className={`${merriweather.className} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <ClientLayout>{children}</ClientLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
