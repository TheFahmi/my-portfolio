'use client';

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "../ui/LanguageSwitcher";

const Navbar = () => {
  const t = useTranslations('navigation');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

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
    { href: "/#home", label: t('home') },
    { href: "/#about", label: t('about') },
    { href: "/#projects", label: t('projects') },
    { href: "/#skills", label: t('skills') },
    { href: "/#experience", label: t('experience') },
    { href: "/#contact", label: t('contact') },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? "bg-[#F5E6D3]/95 shadow-md py-4" 
            : "bg-[#F5E6D3]/80 py-6"
        } backdrop-blur-sm border-b border-[#704214]/10`}
      >
        <div className="container mx-auto px-4 md:px-8 max-w-7xl flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="font-serif font-bold text-2xl text-[#704214] tracking-tight hover:text-[#D4AF37] transition-colors">
            MFAH<span className="text-[#D4AF37]">.ME</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <nav>
              <ul className="flex items-center gap-8 text-sm font-medium font-serif text-[#704214]">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="relative hover:text-[#D4AF37] transition-colors group py-2"
                    >
                      {link.label}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            
            <div className="w-px h-6 bg-[#704214]/20 mx-2" />
            
            <LanguageSwitcher />
          </div>

          {/* Mobile Toggle */}
          <div className="flex md:hidden items-center gap-4">
            <LanguageSwitcher />
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-[#704214] hover:text-[#D4AF37] transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-[#F5E6D3] flex flex-col p-6 border-l-4 border-[#704214]"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="font-serif font-bold text-2xl text-[#704214]">Menu</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-[#704214] hover:text-[#D4AF37] transition-colors"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="flex flex-col gap-6 items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-serif text-3xl font-medium text-[#704214] hover:text-[#D4AF37] transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>

            <div className="mt-auto text-center">
              <div className="w-12 h-1 bg-[#704214]/20 mx-auto mb-6" />
              <p className="font-serif text-[#704214]/60 text-sm">© 2025 M Fahmi Hassan</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
