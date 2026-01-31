'use client';

import { ThemeProvider } from 'next-themes';
import type { ReactNode } from 'react';

export interface VintageThemeProviderProps {
  children: ReactNode;
  defaultTheme?: 'light' | 'dark' | 'system';
}

export function VintageThemeProvider({
  children,
  defaultTheme = 'system',
}: VintageThemeProviderProps) {
  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme={defaultTheme}
      enableSystem
      disableTransitionOnChange={false}
    >
      {children}
    </ThemeProvider>
  );
}
