'use client';

import { useEffect } from 'react';

// This component ensures the theme is properly applied
export default function ForceTheme() {
  useEffect(() => {
    // Function to apply theme based on preference
    const applyTheme = (theme) => {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
      }
    };

    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem('theme');
    
    // If there's a saved theme, apply it
    if (savedTheme) {
      applyTheme(savedTheme);
    } else {
      // If no saved theme, default to light
      applyTheme('light');
      localStorage.setItem('theme', 'light');
    }

    // Create a MutationObserver to watch for class changes on the html element
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const htmlElement = document.documentElement;
          
          // Update localStorage based on current class
          if (htmlElement.classList.contains('dark')) {
            localStorage.setItem('theme', 'dark');
          } else if (htmlElement.classList.contains('light')) {
            localStorage.setItem('theme', 'light');
          }
        }
      });
    });

    // Start observing the html element for class changes
    observer.observe(document.documentElement, { attributes: true });

    // Cleanup observer on component unmount
    return () => observer.disconnect();
  }, []);

  return null;
}
