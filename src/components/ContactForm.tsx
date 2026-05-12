"use client";

import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";

const checkboxKeys = [
  "cinema",
  "web3",
  "sport",
  "inapp",
  "web",
  "smarttv",
] as const;

type CheckboxKey = (typeof checkboxKeys)[number];

function createContactSchema(errors: {
  emailRequired: string;
  emailInvalid: string;
  phoneRequired: string;
  phoneInvalid: string;
  interestsRequired: string;
}) {
  return z.object({
    interests: z
      .array(z.string())
      .min(1, { message: errors.interestsRequired }),
    email: z
      .string()
      .min(1, { message: errors.emailRequired })
      .email({ message: errors.emailInvalid }),
    phone: z
      .string()
      .min(1, { message: errors.phoneRequired })
      .regex(/^[+]?[\d\s\-().]{7,20}$/, { message: errors.phoneInvalid }),
    message: z.string().optional(),
  });
}

type ContactFormData = z.infer<ReturnType<typeof createContactSchema>>;

export function ContactForm() {
  const t = useTranslations("Contact");
  const [submitted, setSubmitted] = useState(false);

  const schema = createContactSchema({
    emailRequired: t("errors.emailRequired"),
    emailInvalid: t("errors.emailInvalid"),
    phoneRequired: t("errors.phoneRequired"),
    phoneInvalid: t("errors.phoneInvalid"),
    interestsRequired: t("errors.interestsRequired"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      interests: [],
      email: "",
      phone: "",
      message: "",
    },
  });

  const selectedInterests = watch("interests");

  function toggleInterest(key: CheckboxKey) {
    const current = selectedInterests || [];
    const updated = current.includes(key)
      ? current.filter((k) => k !== key)
      : [...current, key];
    setValue("interests", updated, { shouldValidate: true });
  }

  function onSubmit(data: ContactFormData) {
    console.log("Form submitted:", data);
    setSubmitted(true);
    reset();
  }

  if (submitted) {
    return (
      <div className="glass-card p-10 text-center animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            className="text-accent"
          >
            <path
              d="M20 6L9 17l-5-5"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <p className="text-lg font-semibold text-foreground">{t("success")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-8">
      {/* Checkboxes */}
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {checkboxKeys.map((key) => (
            <label key={key} className="custom-checkbox">
              <input
                type="checkbox"
                checked={selectedInterests?.includes(key) ?? false}
                onChange={() => toggleInterest(key)}
              />
              <span className="text-sm font-medium text-foreground/90">
                {t(`checkboxes.${key}`)}
              </span>
            </label>
          ))}
        </div>
        {errors.interests && (
          <p className="mt-2 text-sm text-error animate-fade-in">
            {errors.interests.message}
          </p>
        )}
      </div>

      {/* Email & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-email" className="block text-sm font-medium text-muted mb-2">
            {t("email")}
          </label>
          <input
            id="contact-email"
            type="email"
            {...register("email")}
            className={`form-input ${errors.email ? "error" : ""}`}
            placeholder="hello@company.com"
          />
          {errors.email && (
            <p className="mt-1.5 text-sm text-error animate-fade-in">
              {errors.email.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="contact-phone" className="block text-sm font-medium text-muted mb-2">
            {t("phone")}
          </label>
          <input
            id="contact-phone"
            type="tel"
            {...register("phone")}
            className={`form-input ${errors.phone ? "error" : ""}`}
            placeholder="+1 (555) 000-0000"
          />
          {errors.phone && (
            <p className="mt-1.5 text-sm text-error animate-fade-in">
              {errors.phone.message}
            </p>
          )}
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-muted mb-2">
          {t("message")}
        </label>
        <textarea
          id="contact-message"
          rows={5}
          {...register("message")}
          className="form-input resize-none"
          placeholder={t("messagePlaceholder")}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-cta w-full sm:w-auto min-w-[180px] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          t("submit")
        )}
      </button>
    </form>
  );
}
