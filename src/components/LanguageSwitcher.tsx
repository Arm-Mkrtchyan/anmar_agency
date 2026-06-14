"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

const locales: Locale[] = ["am", "en"];

export function LanguageSwitcher() {
  const t = useTranslations("LanguageSwitcher");
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function handleSwitch(newLocale: Locale) {
    router.replace(pathname, { locale: newLocale });
  }

  return (
    <div className="flex items-center gap-1 rounded-lg border border-border p-1 bg-surface">
      {locales.map((locale) => (
        <button
          key={locale}
          onClick={() => handleSwitch(locale)}
          className={`px-2.5 py-1.5 rounded-md text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
            currentLocale === locale
              ? "bg-accent text-white shadow-sm"
              : "text-muted hover:text-foreground hover:bg-surface-hover"
          }`}
        >
          {t(locale)}
        </button>
      ))}
    </div>
  );
}
