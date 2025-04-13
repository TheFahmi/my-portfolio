'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

export const useThemeDetector = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Set mounted state when component mounts
  useEffect(() => {
    setMounted(true);
    
    // Initial check for dark mode
    const htmlElement = document.documentElement;
    const hasDarkClass = htmlElement.classList.contains('dark');
    setIsDarkMode(hasDarkClass);
    
    // Tambahan fallback check untuk dark mode
    if (resolvedTheme === 'dark' || theme === 'dark') {
      setIsDarkMode(true);
    }
    
    // Create a MutationObserver to watch for class changes on the html element
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const hasDarkClass = htmlElement.classList.contains('dark');
          setIsDarkMode(hasDarkClass);
        }
      });
    });

    // Start observing the html element for class changes
    observer.observe(htmlElement, { attributes: true });

    // Cleanup observer on component unmount
    return () => observer.disconnect();
  }, [resolvedTheme, theme]);

  // Update isDarkMode when theme changes
  useEffect(() => {
    if (mounted) {
      const currentTheme = resolvedTheme || theme;
      const newIsDarkMode = currentTheme === 'dark';
      
      if (isDarkMode !== newIsDarkMode) {
        setIsDarkMode(newIsDarkMode);
        
        // Force update the DOM to match the theme state
        if (newIsDarkMode) {
          document.documentElement.classList.add('dark');
          document.documentElement.classList.remove('light');
        } else {
          document.documentElement.classList.remove('dark');
          document.documentElement.classList.add('light');
        }
      }
    }
  }, [theme, resolvedTheme, mounted, isDarkMode]);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setTheme(newTheme);
    
    // Memaksa update isDarkMode segera untuk komponen yang menggunakan hook ini
    setIsDarkMode(!isDarkMode);
    
    // Force update DOM juga
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  };

  return { isDarkMode, toggleTheme, mounted };
};
