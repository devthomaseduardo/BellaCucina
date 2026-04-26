import React from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

const cards = [
  {
    key: "carta" as const,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/c/cc/Tagliatelle_rag%C3%B9_bolognese_01.jpg",
  },
  {
    key: "degustacao" as const,
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80",
  },
  {
    key: "aperitivo" as const,
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&q=80",
  },
];

export function MenuExperiences() {
  const { t } = useI18n();

  const scrollToMenu = () => {
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="esperienze"
      className="scroll-mt-24 border-y border-border/60 bg-gradient-to-b from-muted/30 to-background py-16 md:py-20"
    >
      <div className="container mx-auto max-w-full px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
            {t("experiences.kicker")}
          </p>
          <h2 className="mt-3 font-display text-3xl text-foreground sm:text-4xl">
            {t("experiences.title")}
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            {t("experiences.subtitle")}
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {cards.map((c) => (
            <button
              key={c.key}
              type="button"
              onClick={scrollToMenu}
              className={cn(
                "group relative overflow-hidden rounded-3xl border border-border/60 text-left shadow-sm transition-all",
                "hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              )}
            >
              <div className="aspect-[4/5] w-full sm:aspect-[3/4]">
                <img
                  src={c.image}
                  alt=""
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/75 transition-colors group-hover:text-white/90">
                  Bella Cucina
                </p>
                <h3 className="mt-1 font-display text-xl text-white transition-colors group-hover:text-[hsl(42_70%_92%)] sm:text-2xl">
                  {t(`experiences.cards.${c.key}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/85 transition-colors group-hover:text-white">
                  {t(`experiences.cards.${c.key}.body`)}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-white/95 underline-offset-4 transition-colors group-hover:text-[hsl(42_70%_92%)] group-hover:underline">
                  {t("experiences.cta")}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default MenuExperiences;
