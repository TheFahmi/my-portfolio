'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useTransition } from 'react';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleLocaleChange = (newLocale: string) => {
    if (newLocale === locale) return;
    
    // Split pathname to replace the locale segment
    // Assuming route structure: /[locale]/...
    const segments = pathname.split('/');
    if (segments.length > 1) {
      segments[1] = newLocale;
    } else {
        // Fallback if path is just /
        segments.push(newLocale);
    }
    const newPath = segments.join('/');

    startTransition(() => {
      router.replace(newPath);
    });
  };

  return (
    <div className="flex items-center">
      <div className="flex rounded-md overflow-hidden border border-[#704214]">
        <button
          onClick={() => handleLocaleChange('en')}
          disabled={isPending}
          className={`px-4 py-1.5 text-sm font-serif font-medium transition-all duration-300 ${
            locale === 'en'
              ? 'bg-[#704214] text-[#F5E6D3]'
              : 'bg-transparent text-[#704214] hover:bg-[#704214]/10'
          }`}
          aria-label="Switch to English"
        >
          EN
        </button>
        <div className="w-px bg-[#704214]"></div>
        <button
          onClick={() => handleLocaleChange('id')}
          disabled={isPending}
          className={`px-4 py-1.5 text-sm font-serif font-medium transition-all duration-300 ${
            locale === 'id'
              ? 'bg-[#704214] text-[#F5E6D3]'
              : 'bg-transparent text-[#704214] hover:bg-[#704214]/10'
          }`}
          aria-label="Switch to Indonesian"
        >
          ID
        </button>
      </div>
    </div>
  );
}
