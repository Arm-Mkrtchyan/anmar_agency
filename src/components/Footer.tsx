"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="border-t border-border bg-background/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between py-8 gap-4">
          {/* Left - Copyright */}
          <p className="text-muted text-sm">{t("copyright")}</p>

          {/* Right - Contact */}
          <Link
            href="/contact"
            className="text-sm font-medium text-foreground hover:text-accent transition-colors duration-200 border border-border rounded-lg px-5 py-2.5 hover:border-accent/30"
          >
            {t("contact")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
