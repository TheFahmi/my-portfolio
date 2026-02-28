'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '../../../i18n/navigation';
import { useTransition } from 'react';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleLocaleChange = (newLocale: 'en' | 'id') => {
    if (newLocale === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
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
