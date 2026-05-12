import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['am', 'ru', 'en'] as const,
  defaultLocale: 'am',
});

export type Locale = (typeof routing.locales)[number];
