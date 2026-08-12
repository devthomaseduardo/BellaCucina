import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  backgroundImage?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  ctaText?: string;
  secondaryCtaText?: string;
  onCtaClick?: () => void;
  onSecondaryCtaClick?: () => void;
}

const heroMetrics = [
  { label: "Pedidos por QR", value: "Mesa" },
  { label: "Reservas online", value: "Hoje" },
  { label: "PT · EN · IT", value: "Menu" },
];

const heroHighlights = [
  { code: "CARTA", label: "italiana autoral" },
  { code: "QR", label: "pedido direto da mesa" },
  { code: "MESA", label: "reserva em poucos passos" },
];

const cinematicFrames = [
  {
    title: "Mesa em cena",
    type: "Dining room",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1100&q=85",
    className: "lg:row-span-2",
  },
  {
    title: "Massa fresca",
    type: "Primi",
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=900&q=85",
    className: "",
  },
  {
    title: "Forno a lenha",
    type: "Pizza",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=900&q=85",
    className: "",
  },
  {
    title: "Reserva noturna",
    type: "Booking",
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=900&q=85",
    className: "sm:col-span-2 lg:col-span-1",
  },
];

const HeroSection = ({
  backgroundImage = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80",
  eyebrow = "Fine dining",
  title = "Bem-vindo ao Nosso Restaurante",
  subtitle = "Experimente as melhores delícias culinárias com nosso cardápio cuidadosamente elaborado e serviço excepcional.",
  ctaText = "Ver Cardápio",
  secondaryCtaText = "Fazer Reserva",
  onCtaClick = () => {},
  onSecondaryCtaClick = () => {},
}: HeroSectionProps) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative w-full overflow-hidden bg-black">
      <div className="absolute inset-0 bella-grid-bg opacity-25" aria-hidden />
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black to-transparent" aria-hidden />

      <div className="relative z-10 mx-auto min-h-[100svh] max-w-[1520px] px-3 pb-8 pt-20 sm:px-5 md:px-6 md:pt-24 lg:px-8">
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1.42fr)_minmax(20rem,0.5fr)_minmax(18rem,0.58fr)] lg:gap-4">
          <motion.article
            initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="group relative min-h-[34rem] overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/[0.045] shadow-[0_30px_90px_-56px_rgba(0,0,0,0.95)] sm:min-h-[40rem] lg:min-h-[calc(100svh-8rem)]"
          >
            <img
              src={backgroundImage}
              alt="Fundo do restaurante"
              className="absolute inset-0 h-full w-full scale-[1.03] object-cover opacity-88 transition duration-1000 group-hover:scale-[1.06]"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,7,5,0.36)_0%,rgba(10,7,5,0.1)_34%,rgba(10,7,5,0.92)_100%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,7,5,0.74)_0%,rgba(10,7,5,0.28)_44%,rgba(10,7,5,0.62)_100%)]" />

            <div className="relative z-10 flex h-full min-h-[34rem] flex-col justify-between p-5 sm:min-h-[40rem] sm:p-7 lg:min-h-[calc(100svh-8rem)] lg:p-8">
              <div className="flex items-start justify-between gap-4">
                <span className="rounded-full border border-white/15 bg-black/28 px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] text-white/76 backdrop-blur-xl">
                  {eyebrow}
                </span>
                <span className="hidden rounded-full border border-white/15 bg-white/[0.08] px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white/70 backdrop-blur-xl sm:inline-flex">
                  cinematic dining
                </span>
              </div>

              <div>
                <h1 className="max-w-[12ch] font-display text-[clamp(3.6rem,11vw,9.6rem)] leading-[0.82] text-white">
                  Bella Cucina
                </h1>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-white/76 sm:text-lg">
                  {subtitle}
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Button
                    size="lg"
                    onClick={onCtaClick}
                    className="h-12 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-[0_18px_60px_-26px_hsl(var(--primary))] hover:bg-primary/90"
                  >
                    {ctaText}
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={onSecondaryCtaClick}
                    className="h-12 rounded-full border-white/20 bg-black/30 px-6 text-sm font-semibold text-white backdrop-blur-xl hover:bg-white/[0.12] hover:text-white"
                  >
                    {secondaryCtaText}
                  </Button>
                </div>
              </div>
            </div>
          </motion.article>

          <motion.aside
            initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="flex min-h-[22rem] flex-col justify-between rounded-[1.6rem] border border-white/10 bg-white/[0.08] p-5 backdrop-blur-xl lg:min-h-[calc(100svh-8rem)]"
          >
            <div>
              <p className="text-[11px] uppercase tracking-[0.24em] text-primary">
                Cinematic landing
              </p>
              <h2 className="mt-4 font-display text-4xl leading-[0.95] text-white md:text-5xl">
                {title}
              </h2>
              <p className="mt-5 pr-14 text-sm leading-relaxed text-white/62 sm:pr-0">
                Uma vitrine de restaurante com cara de filme: prato, mesa, reserva e pedido digital aparecendo como frames de uma noite.
              </p>
            </div>

            <div className="mt-8 space-y-3">
              {heroHighlights.map(({ code, label }) => (
                <div key={code} className="flex items-center justify-between border-t border-white/10 pt-3 text-sm">
                  <span className="font-semibold uppercase tracking-[0.16em] text-white/42">
                    {code}
                  </span>
                  <span className="text-right text-white/[0.78]">{label}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-3 overflow-hidden rounded-2xl border border-white/10">
              {heroMetrics.map((metric) => (
                <div key={metric.label} className="border-l border-white/10 px-3 py-3 first:border-l-0">
                  <p className="text-[9px] uppercase tracking-[0.16em] text-white/38">
                    {metric.label}
                  </p>
                  <p className="mt-2 font-display text-xl text-white">{metric.value}</p>
                </div>
              ))}
            </div>
          </motion.aside>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ delay: 0.16, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1"
          >
            {cinematicFrames.map((frame, index) => (
              <button
                key={frame.title}
                type="button"
                onClick={index === 0 ? onSecondaryCtaClick : onCtaClick}
                className={cn(
                  "group relative min-h-[13rem] overflow-hidden rounded-[1.35rem] border border-white/10 bg-white/[0.045] text-left shadow-[0_24px_70px_-54px_rgba(0,0,0,0.95)]",
                  "transition duration-300 hover:-translate-y-1 hover:border-primary/35",
                  frame.className,
                )}
              >
                <img
                  src={frame.image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.07]"
                  loading={index === 0 ? "eager" : "lazy"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/86 via-black/18 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[hsl(var(--accent))]">
                    {frame.type}
                  </p>
                  <h3 className="mt-1 font-display text-2xl leading-none text-white">
                    {frame.title}
                  </h3>
                </div>
              </button>
            ))}
          </motion.div>
        </div>

        <button
          type="button"
          onClick={() => document.getElementById("featured")?.scrollIntoView({ behavior: "smooth" })}
          className="mx-auto mt-5 hidden h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.06] text-white/65 backdrop-blur transition hover:bg-white/[0.12] hover:text-white md:grid"
          aria-label="Ver destaques"
        >
          <ChevronDown className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
