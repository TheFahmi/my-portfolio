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
      <div className="flex rounded-full overflow-hidden border border-white/10 bg-white/5">
        <button
          onClick={() => handleLocaleChange('en')}
          disabled={isPending}
          className={`px-3 py-1.5 text-xs font-medium transition-all duration-300 ${locale === 'en'
              ? 'bg-white text-black'
              : 'bg-transparent text-gray-400 hover:text-white'
            }`}
          aria-label="Switch to English"
        >
          EN
        </button>
        <button
          onClick={() => handleLocaleChange('id')}
          disabled={isPending}
          className={`px-3 py-1.5 text-xs font-medium transition-all duration-300 ${locale === 'id'
              ? 'bg-white text-black'
              : 'bg-transparent text-gray-400 hover:text-white'
            }`}
          aria-label="Switch to Indonesian"
        >
          ID
        </button>
      </div>
    </div>
  );
}
