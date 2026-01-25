"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useTheme } from "next-themes";

const ThemeToggle = ({ className = "" }: { className?: string }) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={`w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 ${className}`} />;
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`relative flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-cyan-500 dark:hover:text-cyan-400 transition-all shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md hover:border-cyan-200 dark:hover:border-cyan-900 overflow-hidden ${className}`}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ rotate: -90, scale: 0, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: 90, scale: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {isDark ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </motion.div>
      </AnimatePresence>
    </button>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (logoClicks > 0) {
      const timer = setTimeout(() => setLogoClicks(0), 500);
      return () => clearTimeout(timer);
    }
  }, [logoClicks]);

  if (!mounted) return null;

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 py-6"
      >
        <div className="container mx-auto px-4 md:px-8 max-w-7xl flex items-center justify-between">
          {/* Logo Left */}
          <Link href="/" className="group flex items-center gap-2" onClick={(e) => {
             setLogoClicks(c => c + 1);
          }}>
            <motion.div 
              animate={logoClicks >= 3 ? { 
                rotate: [0, 360, 720, 1080], 
                scale: [1, 1.5, 1.5, 1],
                color: ["#fff", "#22d3ee", "#f472b6", "#fff"]
              } : {}}
              transition={{ duration: 1 }}
              className="w-8 h-8 rounded-full bg-slate-900 dark:bg-white flex items-center justify-center text-white dark:text-slate-900 font-bold text-lg shadow-lg transition-all group-hover:scale-110"
            >
              M
            </motion.div>
            <span className="font-bold text-xl tracking-tight text-slate-800 dark:text-white">
              MFAH<span className="text-cyan-500 dark:text-cyan-400">.ME</span>
            </span>
          </Link>

          {/* Center Floating Pill Nav */}
          <div className={`hidden md:flex items-center px-8 py-3 rounded-full border border-slate-200/60 dark:border-slate-800/60 shadow-lg backdrop-blur-xl transition-all duration-300 ${scrolled ? "bg-white/90 dark:bg-slate-950/90 shadow-xl" : "bg-white/70 dark:bg-slate-950/70"
            }`}>
            <nav>
              <ul className="flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Right Side: Theme + Action */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <Link href="#contact" className="px-5 py-2.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-medium text-sm hover:shadow-lg hover:shadow-cyan-500/20 transition-all hover:-translate-y-0.5 active:translate-y-0">
              Hire Me →
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-4">
            <ThemeToggle />

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-slate-600 dark:text-slate-300 focus:outline-none cursor-pointer"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-white dark:bg-slate-950 flex flex-col p-6"
          >
            <div className="flex justify-between items-center mb-8">
              <span className="font-bold text-2xl text-slate-900 dark:text-white">Menu</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 cursor-pointer"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-semibold text-slate-800 dark:text-slate-200 hover:text-cyan-500 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="mt-auto">
              <p className="text-slate-500 dark:text-slate-400 text-sm">© 2025 M Fahmi Hassan</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
