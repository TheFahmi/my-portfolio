import type { Metadata } from "next";
import "./globals.css";
import dynamic from 'next/dynamic';
import ForceTheme from './force-theme';

// Use dynamic import for client components
const ClientLayout = dynamic(() => import('../components/layout/ClientLayout'), { ssr: true });

export const metadata: Metadata = {
  title: "Muhammad Fahmi Hassan | Portfolio",
  description: "Frontend Engineer with 4+ years of experience in TypeScript, NuxtJs, TailwindCSS, ReactJs, Vue.js, and React Native",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased">
        <ForceTheme />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
