import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/I18nProvider";
import type { SupportedLanguage } from "@/i18n/types";
import { cn } from "@/lib/utils";

/** Mesa fine dining: iluminação baixa, elegante e neutra para texto claro por cima */
const HERO_BG =
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=2400&q=88";

const langButtonClass = cn(
  "h-14 rounded-2xl border-white/25 bg-white/[0.07] text-base !text-white shadow-sm backdrop-blur-md",
  "transition-all duration-300 hover:border-white/45 hover:bg-white/[0.14] hover:!text-white",
  "focus-visible:ring-2 focus-visible:ring-[hsl(42_45%_52%)]/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black/50",
);

const LanguageSelectPage = () => {
  const navigate = useNavigate();
  const { setLanguage, t } = useI18n();

  const pick = (lang: SupportedLanguage) => {
    setLanguage(lang);
    navigate("/menu#menu", { replace: true });
  };

  return (
    <div className="relative min-h-[100dvh] overflow-hidden bg-black">
      <div className="absolute inset-0">
        <img
          src={HERO_BG}
          alt=""
          className="h-full w-full scale-105 object-cover object-center"
          fetchpriority="high"
        />
        {/* Leitura: vinheta + gradiente borgonha suave */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/50 to-black/85"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_0%,rgba(60,15,25,0.35),transparent_55%)]"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(0,0,0,0.55),transparent_50%)]"
          aria-hidden
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-3xl flex-col justify-center px-6 py-20 text-center md:py-24">
        <p className="text-[11px] uppercase tracking-[0.32em] text-white/55">
          Bella Cucina
        </p>
        <h1 className="mt-5 font-display text-4xl leading-[1.08] text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.45)] md:text-6xl">
          {t("languageSelect.title")}
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-white/80 md:text-lg">
          {t("languageSelect.subtitle")}
        </p>

        <div className="mx-auto mt-12 grid w-full max-w-xl grid-cols-1 gap-3 sm:grid-cols-3">
          <Button
            type="button"
            variant="outline"
            className={langButtonClass}
            onClick={() => pick("pt")}
          >
            Português
          </Button>
          <Button
            type="button"
            variant="outline"
            className={langButtonClass}
            onClick={() => pick("en")}
          >
            English
          </Button>
          <Button
            type="button"
            variant="outline"
            className={langButtonClass}
            onClick={() => pick("it")}
          >
            Italiano
          </Button>
        </div>

        <p className="mx-auto mt-12 max-w-md text-xs leading-relaxed text-white/45">
          {t("languageSelect.note")}
        </p>
      </div>
    </div>
  );
};

export default LanguageSelectPage;
