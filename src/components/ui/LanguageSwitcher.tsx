'use client';

import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const [isPending, setIsPending] = useState(false);

  const handleLocaleChange = (newLocale: 'en' | 'id') => {
    if (newLocale === locale || isPending) return;
    setIsPending(true);
    // Strip all locale prefixes, then prepend the new one
    const stripped = pathname.replace(/^(\/(?:en|id))+/, '') || '/';
    window.location.href = `/${newLocale}${stripped}`;
  };

  return (
    <div className="flex items-center">
      <div
        className="flex rounded-full overflow-hidden"
        style={{
          border: '1px solid var(--theme-border-glass)',
          background: 'var(--theme-social-hover-bg)',
        }}
      >
        <button
          onClick={() => handleLocaleChange('en')}
          disabled={isPending}
          className="cursor-pointer px-3 py-1.5 text-xs font-medium transition-all duration-300"
          style={{
            backgroundColor: locale === 'en' ? 'var(--theme-lang-active-bg)' : 'transparent',
            color: locale === 'en' ? 'var(--theme-lang-active-fg)' : 'var(--theme-lang-inactive-fg)',
          }}
          aria-label="Switch to English"
        >
          EN
        </button>
        <button
          onClick={() => handleLocaleChange('id')}
          disabled={isPending}
          className="cursor-pointer px-3 py-1.5 text-xs font-medium transition-all duration-300"
          style={{
            backgroundColor: locale === 'id' ? 'var(--theme-lang-active-bg)' : 'transparent',
            color: locale === 'id' ? 'var(--theme-lang-active-fg)' : 'var(--theme-lang-inactive-fg)',
          }}
          aria-label="Switch to Indonesian"
        >
          ID
        </button>
      </div>
    </div>
  );
}
