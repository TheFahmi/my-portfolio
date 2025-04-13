'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useThemeDetector } from '@/hooks/useThemeDetector';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [animationActive, setAnimationActive] = useState(false);
  const { isDarkMode } = useThemeDetector();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Only check theme after component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Effect for theme change ripple animation
  const toggleTheme = () => {
    setAnimationActive(true);
    setTimeout(() => {
      setTheme(theme === 'dark' ? 'light' : 'dark');
      setTimeout(() => {
        setAnimationActive(false);
      }, 500);
    }, 150);
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (mobileMenuOpen && !target.closest('.mobile-menu') && !target.closest('.mobile-menu-toggle')) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [mobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  if (!mounted) return null;

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Projects' },
    { href: '#skills', label: 'Skills' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? `py-2 ${isDarkMode ? 'bg-gray-900/95 shadow-lg' : 'bg-white/95 shadow-md'}`
          : `py-4 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`
      }`}
      style={{
        overflowX: 'hidden',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <div className="container mx-auto px-4 max-w-screen-xl relative" style={{
        width: '100%',
        boxSizing: 'border-box',
        position: 'relative'
      }}>
        <nav className="flex justify-between items-center" style={{ position: 'relative' }}>
        {/* Logo */}
          <Link href="/" className="flex-shrink-0" style={{ minWidth: '120px' }}>
            <span className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Fahmi<span className="text-ocean-500">Hassan</span>
            </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
            <ul className="flex space-x-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                    className={`text-sm font-medium hover:text-ocean-500 transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

            {/* Theme Toggle - Desktop */}
            <motion.button
            onClick={toggleTheme}
              className={`relative flex items-center justify-center rounded-full w-10 h-10 ${isDarkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} transition-colors duration-300 z-[70] cursor-pointer`}
            aria-label="Toggle dark mode"
              whileTap={{ scale: 0.9 }}
              initial={false}
              style={{ flexShrink: 0, width: '40px', height: '40px' }}
            >
              {/* Theme toggle ripple effect */}
              <AnimatePresence mode="wait">
                {animationActive && (
                  <motion.div
                    className={`absolute rounded-full ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
                    initial={{ width: 0, height: 0, opacity: 1 }}
                    animate={{ width: 1000, height: 1000, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    style={{ x: "-50%", y: "-50%", left: "50%", top: "50%" }}
                  />
                )}
              </AnimatePresence>

              {/* Sun/Moon Icon */}
              <AnimatePresence mode="wait">
            {isDarkMode ? (
                  <motion.svg
                    key="moon"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    initial={{ scale: 0.5, rotate: -90, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    exit={{ scale: 0.5, rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </motion.svg>
                ) : (
                  <motion.svg
                    key="sun"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    initial={{ scale: 0.5, rotate: 90, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    exit={{ scale: 0.5, rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      clipRule="evenodd"
                    />
                  </motion.svg>
                )}
              </AnimatePresence>
            </motion.button>
        </div>

          {/* Mobile Menu Button and Theme Toggle - Mobile */}
          <div className="flex items-center md:hidden justify-end gap-2" style={{ width: '88px', flexShrink: 0 }}>
            <motion.button
            onClick={toggleTheme}
              className={`relative flex items-center justify-center rounded-full w-10 h-10 ${isDarkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} transition-colors duration-300 z-[70] cursor-pointer`}
            aria-label="Toggle dark mode"
              whileTap={{ scale: 0.9 }}
              initial={false}
              style={{
                flexShrink: 0,
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}
            >
              {/* Theme toggle ripple effect */}
              <AnimatePresence mode="wait">
                {animationActive && (
                  <motion.div
                    className={`absolute rounded-full ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
                    initial={{ width: 0, height: 0, opacity: 1 }}
                    animate={{ width: 1000, height: 1000, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    style={{ x: "-50%", y: "-50%", left: "50%", top: "50%" }}
                  />
                )}
              </AnimatePresence>

              {/* Sun/Moon Icon */}
              <AnimatePresence mode="wait">
            {isDarkMode ? (
                  <motion.svg
                    key="moon"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    initial={{ scale: 0.5, rotate: -90, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    exit={{ scale: 0.5, rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </motion.svg>
                ) : (
                  <motion.svg
                    key="sun"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    initial={{ scale: 0.5, rotate: 90, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    exit={{ scale: 0.5, rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      clipRule="evenodd"
                    />
                  </motion.svg>
                )}
              </AnimatePresence>
            </motion.button>

            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`mobile-menu-toggle flex items-center justify-center rounded-full w-10 h-10 ${isDarkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} transition-colors duration-300`}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
              style={{
                flexShrink: 0,
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}
              whileTap={{ scale: 0.9 }}
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" xmlns="http://www.w3.org/2000/svg">
                {!mobileMenuOpen ? (
                  <path
                    d="M4 6H20M4 12H20M4 18H20"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                ) : (
                  <path
                    d="M6 18L18 6M6 6l12 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}
              </svg>
            </motion.button>
            </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className={`mobile-menu md:hidden fixed inset-0 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} z-40 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{
              overflowX: 'hidden',
              width: '100vw',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              position: 'fixed',
              boxSizing: 'border-box'
            }}
          >
            {/* Header bar - same height as navbar */}
            <div className={`w-full ${scrolled ? 'py-2' : 'py-4'} border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}
              style={{ position: 'relative', boxSizing: 'border-box' }}
            >
              <div className="container mx-auto px-4 max-w-screen-xl">
                <div className="flex justify-between items-center">
                  <h2 className={`text-xl font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>Menu</h2>
                  <div className="flex justify-end items-center" style={{ width: '88px', flexShrink: 0 }}>
                    <motion.button
                  onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-center rounded-full w-10 h-10 ${isDarkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} transition-colors duration-300`}
                  aria-label="Close menu"
                      style={{
                        flexShrink: 0,
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative'
                      }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M6 18L18 6M6 6l12 12"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                  </svg>
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>

            {/* Menu content */}
            <div className="container mx-auto px-4 py-6 max-w-screen-xl">
              <ul className="flex flex-col space-y-6">
                {navLinks.map((link) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * navLinks.indexOf(link) }}
                  >
                    <Link
                      href={link.href}
                      className={`text-xl font-medium ${isDarkMode ? 'text-gray-200 hover:text-blue-400' : 'text-gray-800 hover:text-blue-600'} block py-2 transition-colors duration-300`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
