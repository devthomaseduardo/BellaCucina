import React, { useMemo } from "react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n/I18nProvider";

const GALLERY_SRC: { src: string; captionKey: string }[] = [
  {
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    captionKey: "1",
  },
  {
    src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80",
    captionKey: "2",
  },
  {
    src: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&q=80",
    captionKey: "3",
  },
  {
    src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80",
    captionKey: "4",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Ossobuco.jpg",
    captionKey: "5",
  },
  {
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    captionKey: "6",
  },
];

const GalleryStrip = () => {
  const { t } = useI18n();

  const items = useMemo(
    () =>
      GALLERY_SRC.map((row) => ({
        src: row.src,
        alt: t(`gallery.caption.${row.captionKey}`),
      })),
    [t],
  );

  return (
    <section className="w-full bg-background">
      <div className="container mx-auto max-w-full px-4">
        <div className="relative -mt-10 md:-mt-14">
          <div
            className={cn(
              "rounded-3xl border border-border/60",
              "bg-card/70 backdrop-blur-md",
              "shadow-[0_18px_50px_-30px_rgba(0,0,0,0.45)]",
              "p-3 md:p-4",
            )}
          >
            <p className="mb-3 px-1 text-center text-[11px] uppercase tracking-[0.28em] text-muted-foreground md:mb-4">
              {t("gallery.kicker")}
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-6">
              {items.map((it, idx) => (
                <figure
                  key={`${it.src}-${idx}`}
                  className={cn(
                    "relative overflow-hidden rounded-2xl",
                    "aspect-[4/3] lg:aspect-square",
                    "group",
                  )}
                >
                  <img
                    src={it.src}
                    alt={it.alt}
                    loading="lazy"
                    className={cn(
                      "h-full w-full object-cover",
                      "scale-[1.02] transition duration-500",
                      "group-hover:scale-[1.08]",
                    )}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0 opacity-90" />
                  <figcaption className="absolute bottom-2 left-2 right-2">
                    <div className="inline-flex max-w-full items-center rounded-full bg-black/40 px-2.5 py-1 text-[10px] text-white/95 backdrop-blur sm:text-[11px]">
                      <span className="line-clamp-2 leading-tight">{it.alt}</span>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GalleryStrip;
