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
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all"
            aria-label="Open menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#030014]/95 backdrop-blur-xl flex flex-col"
          >
            {/* Close button */}
            <div className="flex justify-end p-6">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-full border border-white/10 text-white hover:bg-white/10 transition-all"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 flex flex-col justify-center px-12 gap-2">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.08, duration: 0.5 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="group flex items-center gap-4 py-4 border-b border-white/5 hover:border-white/30 transition-all"
                  >
                    <span className="text-gray-400 font-mono text-sm w-8">
                      0{idx + 1}
                    </span>
                    <span className="text-3xl font-bold text-white group-hover:text-gray-300 transition-colors">
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="px-12 pb-12">
              <LanguageSwitcher />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
