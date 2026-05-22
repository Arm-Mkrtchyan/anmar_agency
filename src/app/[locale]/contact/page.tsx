import { use } from "react";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { ContactForm } from "@/components/ContactForm";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("contactTitle"),
    description: t("contactDescription"),
  };
}

export default function ContactPage({ params }: PageProps) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("Contact");

  return (
    <section className="pt-28 sm:pt-36 pb-20 px-4 min-h-screen">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl leading-tight font-bold gradient-text mb-4 animate-fade-in-up">
            {t("title")}
          </h1>
          <p className="text-muted text-base sm:text-lg max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: "150ms" }}>
            {t("text")}
          </p>
        </div>

        {/* Form */}
        <div className="animate-fade-in-up" style={{ animationDelay: "300ms" }}>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
