import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { routing } from '../../i18n/routing';

function detectLocale(acceptLanguage: string | null): string {
  if (!acceptLanguage) return routing.defaultLocale;
  const supported = routing.locales as readonly string[];
  const preferred = acceptLanguage.split(',').map((part) => part.trim().split(';')[0].trim().toLowerCase());
  for (const lang of preferred) {
    if (supported.includes(lang)) return lang;
    const base = lang.split('-')[0];
    if (supported.includes(base)) return base;
  }
  return routing.defaultLocale;
}

export default async function RootPage() {
  const headersStore = await headers();
  const acceptLanguage = headersStore.get('accept-language');
  const locale = detectLocale(acceptLanguage);
  redirect(`/${locale}`);
}
