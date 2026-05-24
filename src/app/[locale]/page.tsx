import { use } from "react";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { ServiceCard } from "@/components/ServiceCard";
import { MissionSection } from "@/components/MissionSection";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default function HomePage({ params }: PageProps) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations();

  const cards = (["card1", "card2", "card3", "card4"] as const).map((key) => ({
    title: t(`Services.${key}.title`),
    subtitle: t(`Services.${key}.subtitle`),
    items: t.raw(`Services.${key}.items`) as string[],
    footerLeft: t(`Services.${key}.footerLeft`),
    footerRight: t(`Services.${key}.footerRight`),
  }));

  return (
    <>
      {/* ——— HERO ——— */}
      <section className="hero-gradient noise-overlay relative min-h-screen flex items-center justify-center pt-20 pb-16 px-4 overflow-hidden">
        {/* Decorative orb */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[120px] animate-float pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight gradient-text leading-tight animate-fade-in-up">
            {t("Hero.title")}
          </h1>
          <p className="mt-6 sm:mt-8 text-base sm:text-lg text-muted max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            {t("Hero.text")}
          </p>
        </div>
      </section>

      {/* ——— ABOUT ——— */}
      <section className="py-20 sm:py-28 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {t("About.title")}
          </h2>
          <div className="accent-divider mx-auto mb-8" />
          <p className="text-base sm:text-lg text-muted leading-relaxed max-w-3xl mx-auto">
            {t("About.text")}
          </p>
        </div>
      </section>

      {/* ——— MISSION ——— */}
      <MissionSection />

      {/* ——— SERVICES ——— */}
      <section className="py-20 sm:py-28 px-4 relative">
        {/* Subtle bg glow */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {cards.map((card, i) => (
              <ServiceCard key={card.title} {...card} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
