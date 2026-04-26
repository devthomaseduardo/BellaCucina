import React from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { Quote } from "lucide-react";

const CHEF_IMG =
  "https://upload.wikimedia.org/wikipedia/commons/c/c9/SERGIO_MARIA_TEUTONICO_chef_e_scrittore_italiano.jpg";
const KITCHEN_IMG =
  "https://upload.wikimedia.org/wikipedia/commons/3/3b/Chef_Joshua_Skenes_Inside_the_Chef%27s_Counter_Kitchen_2.jpg";
const BRIGADE_IMG =
  "https://upload.wikimedia.org/wikipedia/commons/c/c7/Chefs_Kitchen_Princetown_New_Jersey_picture.jpg";

export function ChefBrigadeSection() {
  const { t } = useI18n();

  return (
    <section id="cucina" className="scroll-mt-24 bg-background py-16 md:py-24">
      <div className="container mx-auto max-w-full px-4">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="relative lg:col-span-5">
            <div className="relative mx-auto max-w-md overflow-hidden rounded-[2rem] border border-border/60 shadow-lg">
              <img
                src={CHEF_IMG}
                alt={t("chef.imageChefAlt")}
                className="aspect-[3/4] w-full object-cover object-top"
                loading="lazy"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-6 pt-24 text-white">
                <p className="text-xs uppercase tracking-widest text-white/80">
                  {t("chef.role")}
                </p>
                <p className="font-display text-2xl">{t("chef.name")}</p>
              </div>
            </div>
            <div className="absolute -right-4 top-8 hidden w-40 overflow-hidden rounded-2xl border border-border/60 shadow-md md:block lg:-right-8">
              <img
                src={KITCHEN_IMG}
                alt={t("chef.imageKitchenAlt")}
                className="aspect-square h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          <div className="lg:col-span-7">
            <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
              {t("chef.kicker")}
            </p>
            <h2 className="mt-3 font-display text-3xl text-foreground sm:text-4xl md:text-5xl">
              {t("chef.title")}
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              {t("chef.p1")}
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              {t("chef.p2")}
            </p>

            <div className="mt-8 flex gap-4 rounded-2xl border border-primary/15 bg-primary/[0.04] p-5 md:p-6">
              <Quote className="mt-0.5 h-8 w-8 shrink-0 text-primary/70" aria-hidden />
              <div>
                <p className="text-sm italic leading-relaxed text-foreground md:text-base">
                  {t("chef.quote")}
                </p>
                <p className="mt-3 text-sm font-medium text-muted-foreground">
                  {t("chef.quoteBy")}
                </p>
              </div>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="overflow-hidden rounded-2xl border border-border/60">
                <img
                  src={KITCHEN_IMG}
                  alt={t("chef.imageKitchenAlt")}
                  className="aspect-video w-full object-cover md:hidden"
                  loading="lazy"
                />
                <img
                  src={BRIGADE_IMG}
                  alt={t("chef.imageBrigadeAlt")}
                  className="aspect-video w-full object-cover md:aspect-[16/10]"
                  loading="lazy"
                />
                <div className="border-t border-border/60 bg-card/80 px-4 py-3 text-xs text-muted-foreground backdrop-blur-sm">
                  {t("chef.brigadeCaption")}
                </div>
              </div>
              <div className="flex flex-col justify-center rounded-2xl border border-border/60 bg-card/60 p-6">
                <h3 className="font-display text-xl text-foreground">
                  {t("chef.valuesTitle")}
                </h3>
                <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-primary">✦</span>
                    {t("chef.value1")}
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">✦</span>
                    {t("chef.value2")}
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">✦</span>
                    {t("chef.value3")}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ChefBrigadeSection;
