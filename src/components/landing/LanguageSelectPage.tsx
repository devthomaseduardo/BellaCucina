import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/I18nProvider";
import type { SupportedLanguage } from "@/i18n/types";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

/** Mesa fine dining: iluminação baixa, elegante e neutra para texto claro por cima */
const HERO_BG =
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=2400&q=88";

const langButtonClass = cn(
  "group h-14 rounded-full border-white/15 bg-white/[0.07] text-base !text-white shadow-sm backdrop-blur-xl",
  "transition-all duration-300 hover:border-primary/45 hover:bg-white/[0.12] hover:!text-white",
  "focus-visible:ring-2 focus-visible:ring-primary/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black/50",
);

const LanguageSelectPage = () => {
  const navigate = useNavigate();
  const { setLanguage, t } = useI18n();
  const shouldReduceMotion = useReducedMotion();

  const pick = (lang: SupportedLanguage) => {
    setLanguage(lang);
    navigate("/menu", { replace: true });
  };

  return (
    <div className="relative min-h-[100dvh] overflow-hidden bg-black">
      <div className="absolute inset-0">
        <img
          src={HERO_BG}
          alt=""
          className="h-full w-full scale-105 object-cover object-center"
          fetchPriority="high"
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,6,4,0.96),rgba(8,6,4,0.68),rgba(8,6,4,0.92))]"
          aria-hidden
        />
        <div className="absolute inset-0 bella-grid-bg opacity-25" aria-hidden />
      </div>

      <div className="relative z-10 mx-auto grid min-h-[100dvh] max-w-7xl items-center gap-10 px-6 py-20 md:grid-cols-[1.1fr_0.9fr] md:py-24 lg:px-8">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 26 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="inline-flex rounded-full border border-white/15 bg-white/[0.07] px-3 py-1 text-[11px] uppercase tracking-[0.26em] text-white/68 backdrop-blur-xl">
            Bella Cucina
          </p>
          <h1 className="mt-5 max-w-3xl font-display text-[clamp(3rem,8vw,6.7rem)] leading-[0.92] text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.45)]">
          {t("languageSelect.title")}
        </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/76 md:text-lg">
          {t("languageSelect.subtitle")}
        </p>

          <p className="mt-10 max-w-md text-xs leading-relaxed text-white/45">
            {t("languageSelect.note")}
          </p>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.98 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
          transition={{ delay: 0.12, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="bella-panel rounded-[1.75rem] p-4 sm:p-6"
        >
          <div className="mb-5 flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.06] font-display text-lg text-primary">
              PT
            </span>
            <div>
              <p className="font-display text-2xl text-white">Escolha o idioma</p>
              <p className="text-sm text-white/52">Acesse o cardápio digital</p>
            </div>
          </div>

          <div className="grid w-full grid-cols-1 gap-3">
          <Button
            type="button"
            variant="outline"
            className={langButtonClass}
            onClick={() => pick("pt")}
          >
            Português
              <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" aria-hidden />
          </Button>
          <Button
            type="button"
            variant="outline"
            className={langButtonClass}
            onClick={() => pick("en")}
          >
            English
              <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" aria-hidden />
          </Button>
          <Button
            type="button"
            variant="outline"
            className={langButtonClass}
            onClick={() => pick("it")}
          >
            Italiano
              <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" aria-hidden />
          </Button>
        </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LanguageSelectPage;
