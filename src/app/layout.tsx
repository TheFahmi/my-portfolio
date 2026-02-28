import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "M Fahmi Hassan | Full Stack Engineer",
  description: "Full Stack Engineer & Team Lead with 5+ years of experience in NestJS, Next.js, React, TypeScript, and scalable SaaS architecture.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
