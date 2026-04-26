import React from "react";
import { Star } from "lucide-react";
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
  const resolvedTitle = title ?? t("featured.title");
  const resolvedSubtitle = subtitle ?? t("featured.subtitle");
  return (
    <section className="w-full bg-background py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="mb-2 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {resolvedTitle}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {resolvedSubtitle}
          </p>
        </div>

        <div className="relative px-0 sm:px-6 md:px-10 lg:px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-full min-w-0"
          >
            <CarouselContent>
              {items.map((item) => (
                <CarouselItem
                  key={item.id}
                  className="md:basis-1/2 lg:basis-1/3"
                >
                  <Card className="group flex h-full flex-col overflow-hidden border transition-shadow hover:shadow-md">
                    <div className="relative aspect-[4/3] min-h-[12.5rem] w-full shrink-0 overflow-hidden sm:aspect-[5/4] sm:min-h-[14rem] md:min-h-[15.5rem]">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.04]"
                      />
                      <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full">
                        {t(`menu.category.${item.category}`)}
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-2">
                        <h3 className="min-w-0 text-lg font-semibold leading-snug text-foreground transition-colors group-hover:text-primary sm:text-xl">
                          {item.name}
                        </h3>
                        <span className="shrink-0 text-base font-bold text-primary sm:text-lg">
                          R$ {item.price.toFixed(2)}
                        </span>
                      </div>
                      <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
                        {item.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-muted-foreground">
                          <Star className="mr-1 h-4 w-4 fill-amber-400/90 text-amber-500" />
                          <span className="text-sm font-medium text-foreground/90">
                            {(item.rating ?? 4.8).toFixed(1)}
                          </span>
                        </div>
                        <Button size="sm" className="text-sm">
                          {t("featured.orderNow")}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-1 top-1/2 h-9 w-9 -translate-y-1/2 border border-border/60 bg-card/95 text-foreground shadow-sm sm:-left-2 md:-left-4" />
            <CarouselNext className="right-1 top-1/2 h-9 w-9 -translate-y-1/2 border border-border/60 bg-card/95 text-foreground shadow-sm sm:-right-2 md:-right-4" />
          </Carousel>
        </div>

        <div className="mt-8 text-center">
          <Button
            variant="outline"
            size="lg"
            className="mt-4"
            type="button"
            onClick={() =>
              document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            {t("featured.ctaFull")}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedItems;
