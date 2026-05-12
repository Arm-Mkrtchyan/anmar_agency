"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header() {
  const t = useTranslations("Header");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border backdrop-blur-xl bg-background/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-accent to-purple-500 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                className="text-white"
              >
                <path
                  d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="text-lg font-bold tracking-widest text-foreground">
              {t("logo")}
            </span>
          </Link>

          {/* Right Side */}
          <div className="flex items-center gap-4 sm:gap-6">
            <LanguageSwitcher />
            <Link href="/contact" className="btn-cta hidden sm:inline-flex">
              {t("cta")}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
