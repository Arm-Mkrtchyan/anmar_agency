import { useTranslations } from "next-intl";

const MISSION_ITEMS = [
  "marketingAndStrategy",
  "production",
  "smm",
  "analytics",
  "ownBuying",
  "clients",
] as const;

function FourPointStar({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M50 0 C52 38, 62 48, 100 50 C62 52, 52 62, 50 100 C48 62, 38 52, 0 50 C38 48, 48 38, 50 0Z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  );
}

function FourPointStarSmall({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M50 0 C52 38, 62 48, 100 50 C62 52, 52 62, 50 100 C48 62, 38 52, 0 50 C38 48, 48 38, 50 0Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function MissionSection() {
  const t = useTranslations("Mission");

  return (
    <section className="mission-section py-20 sm:py-28 px-4 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {t("title")}
          </h2>
          <div className="accent-divider mx-auto mb-8" />
          <p className="text-base sm:text-lg text-muted leading-relaxed max-w-3xl mx-auto">
            {t("text")}
          </p>
        </div>

        {/* 6 icons grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-12 lg:gap-16">
          {MISSION_ITEMS.map((key, i) => (
            <div
              key={key}
              className="mission-item group flex flex-col items-center text-center animate-fade-in-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {/* Star icon */}
              <div className="relative mb-4 sm:mb-6">
                {i === MISSION_ITEMS.length - 1 ?
                  <div className=" w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-end pointer-events-none">
                    <div className="w-16 h-[1px] bg-accent/40" />
                    <FourPointStarSmall className="w-3 h-3 text-accent" />
                  </div> :
                  <FourPointStar className="w-16 h-16 sm:w-20 sm:h-20 text-accent/70 transition-all duration-500 group-hover:text-accent group-hover:scale-110" />
                }
              </div>

              {/* Label */}
              <span className="text-sm sm:text-base text-foreground/80 font-medium leading-snug transition-colors duration-300 group-hover:text-foreground">
                {t(`items.${key}`)}
              </span>
            </div>
          ))}
        </div>

        {/* Decorative connector line with small star — "Clients" arrow */}
       {/* <div className="hidden sm:flex items-center justify-end mt-[-3rem] mr-[8%] pointer-events-none">
          <div className="w-16 h-[1px] bg-accent/40" />
        </div>*/}
      </div>
    </section>
  );
}
