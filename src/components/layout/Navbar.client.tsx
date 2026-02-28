'use client';

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from '../../../i18n/navigation';
import { usePathname } from 'next/navigation';
import { useTranslations } from "next-intl";
import LanguageSwitcher from "../ui/LanguageSwitcher";

const Navbar = () => {
  const t = useTranslations('navigation');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  const navLinks = [
    { href: "/", label: t('home'), icon: "◉" },
    { href: "/about", label: t('about'), icon: "◈" },
    { href: "/work", label: t('projects'), icon: "◊" },
    { href: "/contact", label: t('contact'), icon: "◍" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-auto"
      >
        <div
          className={`flex items-center gap-1 px-2 py-2 rounded-full transition-all duration-500 ${scrolled
              ? "bg-[#030014]/80 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(255,255,255,0.05)]"
              : "bg-[#030014]/50 backdrop-blur-lg border border-white/5"
            }`}
        >
          {/* Logo */}
          <Link
            href="/"
            className="px-4 py-2 rounded-full font-bold text-sm tracking-tight text-white hover:text-gray-300 transition-colors"
          >
            <span className="text-gray-400">{'</>'}</span>{' '}MFH
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => {
              // Remove locale prefix from pathname to check active state
              const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}(\/|$)/, '/') || '/';
              // Handle root path specially, otherwise check if path starts with link href
              const isActive = link.href === '/' 
                ? pathWithoutLocale === '/'
                : pathWithoutLocale.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${isActive
                      ? "text-black"
                      : "text-gray-400 hover:text-white"
                    }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNav"
                      className="absolute inset-0 rounded-full bg-white"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    <span className="text-[10px] opacity-60">{link.icon}</span>
                    {link.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-1 ml-1">
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
            className="fixed top-[88px] left-1/2 -translate-x-1/2 z-[40] w-[90%] max-w-sm bg-[#141414] border border-white/[0.08] rounded-[24px] overflow-hidden flex flex-col md:hidden shadow-2xl"
          >
            <nav className="flex flex-col p-2 gap-1">
              {navLinks.map((link) => {
                // Remove locale prefix from pathname to check active state
                const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}(\/|$)/, '/') || '/';
                const isActive = link.href === '/' 
                  ? pathWithoutLocale === '/'
                  : pathWithoutLocale.startsWith(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      isActive 
                        ? "bg-[#1f1f1f] text-white font-medium" 
                        : "text-gray-500 font-normal hover:bg-white/5"
                    }`}
                  >
                    <span className={`text-[12px] flex items-center justify-center ${isActive ? "text-white" : "text-gray-500"}`}>
                      {link.icon}
                    </span>
                    <span className="text-lg">
                      {link.label}
                    </span>
                  </Link>
                );
              })}
              
              <div className="mx-4 my-2 border-t border-white/[0.08]"></div>
              
              <div className="px-4 py-2 pb-3">
                <LanguageSwitcher />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
