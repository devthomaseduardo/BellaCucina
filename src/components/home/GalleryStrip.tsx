import React, { useMemo } from "react";
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

const storyBeats = [
  {
    code: "01",
    title: "Chegada",
    body: "Luz baixa, mesa pronta e atendimento sem pressa.",
  },
  {
    code: "02",
    title: "Pass",
    body: "Massa fresca, forno aceso e pratos finalizados à vista.",
  },
  {
    code: "03",
    title: "Mesa",
    body: "Carta curta, vinho certo e pedido direto pelo celular.",
  },
];

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
    <section id="featured" className="relative w-full scroll-mt-24 overflow-hidden bg-background py-12 md:py-20">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 1, y: 24 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 grid gap-5 lg:grid-cols-[0.82fr_1fr] lg:items-end"
        >
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-[hsl(var(--accent))]">
              {t("gallery.kicker")}
            </p>
            <h2 className="mt-3 max-w-xl font-display text-3xl text-foreground sm:text-4xl md:text-5xl">
              Noite na Bella
            </h2>
          </div>

          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base lg:justify-self-end">
            Salão, cozinha aberta e mesa seguem a mesma cadência: receber bem,
            cozinhar com precisão e deixar o pedido fluir sem interromper a noite.
          </p>
        </motion.div>

        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.85fr)]">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 1, scale: 0.98 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.04]"
          >
            <Carousel
              opts={{ align: "start", loop: true }}
              className="h-full"
              aria-label="Cenas da experiência Bella Cucina"
            >
              <CarouselContent className="h-full">
                {items.slice(0, 4).map((item) => (
                  <CarouselItem key={item.src}>
                    <figure className="relative aspect-[16/12] min-h-[22rem] overflow-hidden sm:aspect-[16/10] lg:aspect-auto lg:h-[34rem]">
                      <img
                        src={item.src}
                        alt={item.alt}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-700 hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/86 via-black/22 to-transparent" />
                      <figcaption className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
                        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[hsl(var(--accent))]">
                          {item.tone}
                        </span>
                        <p className="mt-3 max-w-[18rem] break-words font-display text-2xl leading-tight text-white sm:max-w-xl sm:text-4xl">
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

          <motion.aside
            initial={shouldReduceMotion ? false : { opacity: 1, y: 18 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
            className="grid gap-4"
          >
            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.045] p-5 sm:p-6">
              <p className="text-[11px] uppercase tracking-[0.28em] text-[hsl(var(--accent))]">
                Ritual da noite
              </p>
              <p className="mt-4 pr-14 font-display text-2xl leading-tight text-foreground sm:pr-0 sm:text-3xl">
                A experiência começa antes do prato principal.
              </p>

              <div className="mt-6 grid gap-0 border-t border-white/10">
                {storyBeats.map((beat) => (
                  <div
                    key={beat.code}
                    className="grid grid-cols-[3.25rem_1fr] gap-4 border-b border-white/10 py-4 pr-16 last:border-b-0 sm:pr-0"
                  >
                    <span className="font-display text-2xl text-primary">{beat.code}</span>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{beat.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {beat.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <figure className="relative min-h-[12rem] overflow-hidden rounded-2xl">
              <img
                src={items[5]?.src}
                alt={items[5]?.alt}
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/12 to-transparent" />
              <figcaption className="absolute bottom-0 left-0 right-0 p-4">
                <span className="text-[10px] uppercase tracking-[0.22em] text-white/55">
                  Reserva
                </span>
                <p className="mt-1 text-sm font-semibold leading-snug text-white">
                  Serviço pensado para a noite acontecer sem ruído.
                </p>
              </figcaption>
            </figure>
          </motion.aside>
        </div>

        <div className="mt-4 hidden grid-cols-2 gap-4 sm:grid lg:grid-cols-4">
          {items.slice(1, 5).map((it, idx) => (
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
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] lg:aspect-[5/4]"
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
    </section>
  );
};

export default GalleryStrip;
