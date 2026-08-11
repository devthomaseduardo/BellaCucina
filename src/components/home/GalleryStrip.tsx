import React, { useMemo } from "react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n/I18nProvider";
import { motion, useReducedMotion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const GALLERY_SRC: { src: string; captionKey: string; tone: string }[] = [
  {
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    captionKey: "1",
    tone: "Sala",
  },
  {
    src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80",
    captionKey: "2",
    tone: "Cozinha",
  },
  {
    src: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&q=80",
    captionKey: "3",
    tone: "Massa",
  },
  {
    src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80",
    captionKey: "4",
    tone: "Forno",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Ossobuco.jpg",
    captionKey: "5",
    tone: "Brasa",
  },
  {
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    captionKey: "6",
    tone: "Reserva",
  },
];

const filters = ["All", "Sala", "Cozinha", "Carta", "Reservas", "QR"];

const GalleryStrip = () => {
  const { t } = useI18n();
  const shouldReduceMotion = useReducedMotion();

  const items = useMemo(
    () =>
      GALLERY_SRC.map((row) => ({
        src: row.src,
        alt: t(`gallery.caption.${row.captionKey}`),
        tone: row.tone,
      })),
    [t],
  );

  return (
    <section id="featured" className="relative w-full overflow-hidden bg-background py-10 md:py-16">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 1, y: 24 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-2xl">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[hsl(var(--accent))]">
              {t("gallery.kicker")}
            </p>
            <h2 className="mt-3 font-display text-3xl text-foreground sm:text-4xl md:text-5xl">
              Frames da experiência
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              A narrativa continua em cenas: salão, cozinha, carta e reserva sem cara de template.
            </p>
          </div>

          <div className="scrollbar-hide flex gap-2 overflow-x-auto pb-1 md:max-w-xl">
            {filters.map((filter, index) => (
              <span
                key={filter}
                className={cn(
                  "shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold",
                  index === 0
                    ? "border-primary/40 bg-primary text-primary-foreground"
                    : "border-white/10 bg-white/[0.04] text-white/62",
                )}
              >
                {filter}
              </span>
            ))}
          </div>
        </motion.div>

        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 1, scale: 0.98 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.04] lg:order-2"
          >
            <Carousel
              opts={{ align: "start", loop: true }}
              className="h-full"
              aria-label="Cenas da experiência Bella Cucina"
            >
              <CarouselContent className="h-full">
                {items.slice(0, 4).map((item) => (
                  <CarouselItem key={item.src}>
                    <figure className="relative aspect-[16/12] min-h-[22rem] overflow-hidden sm:aspect-[16/10] lg:aspect-auto lg:h-[31rem]">
                      <img
                        src={item.src}
                        alt={item.alt}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-700 hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/86 via-black/22 to-transparent" />
                      <figcaption className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
                        <span className="inline-flex rounded-full border border-white/15 bg-white/[0.08] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/72 backdrop-blur">
                          {item.tone}
                        </span>
                        <p className="mt-4 max-w-lg font-display text-3xl leading-tight text-white sm:text-4xl">
                          {item.alt}
                        </p>
                      </figcaption>
                    </figure>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4 top-5 h-10 w-10 translate-y-0 border-white/15 bg-black/35 text-white backdrop-blur hover:bg-black/55" />
              <CarouselNext className="left-16 right-auto top-5 h-10 w-10 translate-y-0 border-white/15 bg-black/35 text-white backdrop-blur hover:bg-black/55" />
            </Carousel>
          </motion.div>

          <div className="hidden grid-cols-2 gap-4 sm:grid lg:order-1">
            {items.map((it, idx) => (
              <motion.figure
                key={`${it.src}-${idx}`}
                initial={shouldReduceMotion ? false : { opacity: 1, y: 18 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  delay: shouldReduceMotion ? 0 : idx * 0.04,
                  duration: 0.52,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]",
                  idx === 0 || idx === 5 ? "col-span-2 aspect-[16/8]" : "aspect-[4/5]",
                )}
              >
                <img
                  src={it.src}
                  alt={it.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/10 to-transparent" />
                <figcaption className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[hsl(var(--accent))]">
                    {it.tone}
                  </span>
                  <p className="mt-1 line-clamp-2 text-sm font-semibold leading-snug text-white">
                    {it.alt}
                  </p>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GalleryStrip;
