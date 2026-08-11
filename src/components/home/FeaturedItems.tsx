import React from "react";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/I18nProvider";
import { FEATURED_HIGHLIGHT_ITEMS } from "@/data/italian-menu";

interface FeaturedItem {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  rating?: number;
  category: string;
}

interface FeaturedItemsProps {
  items?: FeaturedItem[];
  title?: string;
  subtitle?: string;
}

const DEFAULT_FEATURED: FeaturedItem[] = FEATURED_HIGHLIGHT_ITEMS.map(
  (item, i) => ({
    ...item,
    rating: Number((4.55 + (i % 6) * 0.07).toFixed(2)),
  }),
);

const FeaturedItems = ({
  items = DEFAULT_FEATURED,
  title,
  subtitle,
}: FeaturedItemsProps) => {
  const { t } = useI18n();
  const shouldReduceMotion = useReducedMotion();
  const resolvedTitle = title ?? t("featured.title");
  const resolvedSubtitle = subtitle ?? t("featured.subtitle");

  return (
    <section className="w-full overflow-hidden bg-background py-14 md:py-20">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 1, y: 24 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-2xl">
            <p className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
              Destaques da cozinha
            </p>
            <h2 className="mt-4 font-display text-3xl text-foreground sm:text-4xl md:text-5xl">
            {resolvedTitle}
          </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
            {resolvedSubtitle}
          </p>
          </div>

          <Button
            variant="outline"
            size="lg"
            className="w-full rounded-full border-white/15 bg-white/[0.04] text-foreground hover:bg-white/[0.08] sm:w-fit"
            type="button"
            onClick={() =>
              document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            {t("featured.ctaFull")}
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
          </Button>
        </motion.div>

        <div className="relative -mx-2 px-2 sm:mx-0 sm:px-0">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-full min-w-0"
          >
            <CarouselContent>
              {items.map((item, index) => (
                <CarouselItem
                  key={item.id}
                  className="md:basis-1/2 xl:basis-1/3"
                >
                  <motion.div
                    initial={shouldReduceMotion ? false : { opacity: 1, y: 24 }}
                    whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{
                      delay: shouldReduceMotion ? 0 : (index % 3) * 0.06,
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="h-full"
                  >
                    <Card className="group flex h-full flex-col overflow-hidden rounded-[1.35rem] border-white/10 bg-white/[0.045] shadow-[0_24px_80px_-52px_rgba(0,0,0,0.85)] transition duration-300 hover:-translate-y-1 hover:border-primary/35 hover:bg-white/[0.065]">
                    <div className="relative aspect-[4/3] min-h-[15rem] w-full shrink-0 overflow-hidden sm:aspect-[5/4] md:min-h-[17rem]">
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        className="h-full w-full object-cover object-center transition duration-700 group-hover:scale-[1.06]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/12 to-transparent" />
                      <div className="absolute right-3 top-3 rounded-full border border-white/15 bg-black/35 px-3 py-1 text-xs font-bold text-white backdrop-blur">
                        {t(`menu.category.${item.category}`)}
                      </div>
                      <div className="absolute bottom-3 left-3 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-white backdrop-blur">
                        <span className="text-xs font-semibold tracking-[0.12em] text-[hsl(var(--accent))]">
                          {(item.rating ?? 4.8).toFixed(1)} / 5
                        </span>
                      </div>
                    </div>
                    <CardContent className="flex flex-1 flex-col p-5">
                      <div className="mb-3 flex items-start justify-between gap-3">
                        <h3 className="min-w-0 text-xl font-semibold leading-snug text-foreground transition-colors group-hover:text-primary sm:text-2xl">
                          {item.name}
                        </h3>
                        <span className="shrink-0 rounded-full bg-primary/10 px-3 py-1 text-sm font-bold text-primary sm:text-base">
                          R$ {item.price.toFixed(2)}
                        </span>
                      </div>
                      <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                      <div className="mt-auto flex items-center justify-between">
                        <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                          assinatura
                        </span>
                        <Button size="sm" className="h-9 rounded-full px-4 text-xs">
                          {t("featured.orderNow")}
                          <ArrowRight className="ml-1.5 h-3.5 w-3.5" aria-hidden />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-3 top-1/2 h-10 w-10 -translate-y-1/2 border-white/15 bg-black/45 text-white shadow-sm backdrop-blur hover:bg-black/65 sm:-left-3" />
            <CarouselNext className="right-3 top-1/2 h-10 w-10 -translate-y-1/2 border-white/15 bg-black/45 text-white shadow-sm backdrop-blur hover:bg-black/65 sm:-right-3" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default FeaturedItems;
