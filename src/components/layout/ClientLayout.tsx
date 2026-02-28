"use client";

import Navbar from "./Navbar.client";
import Footer from "./Footer";

import ScrollToTopButton from "../ui/ScrollToTopButton";
import { useKonamiCode } from "@/hooks/useKonamiCode";
import { EasterEgg } from "@/components/ui/EasterEgg";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const konamiTriggered = useKonamiCode();

  return (
    <div className="relative min-h-screen w-full flex flex-col bg-black text-[#f1f5f9]">
      <EasterEgg triggered={konamiTriggered} />
      <Navbar />

      <main className="relative z-10 flex-grow">
        {children}
      </main>

      <Footer />


      <ScrollToTopButton />
    </div>
  );
}
