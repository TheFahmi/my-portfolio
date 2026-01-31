import type { Metadata } from "next";
import "./globals.css";
import dynamic from 'next/dynamic';
import { Plus_Jakarta_Sans, Playfair_Display } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

// Use dynamic import for client components
const ClientLayout = dynamic(() => import('../components/layout/ClientLayout'), { ssr: true });

// Optimize font loading
const jakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  preload: true,
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
  preload: true,
});

export const metadata: Metadata = {
  title: "Muhammad Fahmi Hassan | Portfolio",
  description: "Frontend Engineer with 4+ years of experience in TypeScript, NuxtJs, TailwindCSS, ReactJs, Vue.js, and React Native",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();

  return (
    <html lang="en" suppressHydrationWarning className={`${jakartaSans.variable} ${playfair.variable}`}>
      <head>
        {/* Preload critical LCP image for faster paint */}
        <link rel="preload" href="/images/fahmi-profile.jpg" as="image" fetchPriority="high" />

        {/* Load Font Awesome asynchronously to avoid render-blocking */}
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
      <body className={`${jakartaSans.className} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <ClientLayout>{children}</ClientLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
