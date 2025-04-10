'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';

const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  // After mounting, we can safely show the UI
  useEffect(() => setMounted(true), []);

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  if (!mounted) return null;

  return (
    <nav className="navbar">
      <div className="navbar-container container">
        <div className="navbar-brand">Portfolio</div>

        <ul className={`navbar-nav ${mobileMenuOpen ? 'show' : ''}`}>
          <li>
            <Link href="#home" className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link href="#about" className="nav-link">
              About
            </Link>
          </li>
          <li>
            <Link href="#projects" className="nav-link">
              Projects
            </Link>
          </li>
          <li>
            <Link href="#skills" className="nav-link">
              Skills
            </Link>
          </li>
          <li>
            <Link href="#contact" className="nav-link">
              Contact
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-6">
          <button
            onClick={toggleTheme}
            className="bg-transparent border-none text-gray-700 dark:text-gray-300 text-xl cursor-pointer transition-colors duration-300"
            aria-label="Toggle dark mode"
          >
            {theme === 'dark' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          <button
            onClick={toggleMenu}
            className="mobile-menu-toggle"
            aria-label="Toggle menu"
          >
            <span className={`bg-gray-800 dark:bg-gray-200 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${mobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
            <span className={`bg-gray-800 dark:bg-gray-200 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`bg-gray-800 dark:bg-gray-200 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${mobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
