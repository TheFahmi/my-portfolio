"use client";

import { useState, useEffect } from "react";
import { ThemeProvider, useTheme } from "next-themes";
import Navbar from "./Navbar.client";
import Footer from "./Footer.client";
import LoadingScreen from "@/components/ui/LoadingScreen";
import { BackgroundBeams } from "@/components/ui/BackgroundBeams";
import ScrollToTopButton from "../ui/ScrollToTopButton";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <PremiumLayout>{children}</PremiumLayout>
      )}
    </ThemeProvider>
  );
}

function PremiumLayout({ children }: { children: React.ReactNode }) {
  const { theme, resolvedTheme } = useTheme();
  return (
    <div className="relative min-h-screen w-full flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Background - Only show beams in Dark Mode for maximum effect, or subtle in light */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {(resolvedTheme === 'dark' || theme === 'dark') ? (
          <BackgroundBeams />
        ) : (
          <div className="absolute inset-0 bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        )}
      </div>

      <Navbar />

      <main className="relative z-10 flex-grow pt-20">
        {children}
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
      <ScrollToTopButton />
    </div>
  );
}
