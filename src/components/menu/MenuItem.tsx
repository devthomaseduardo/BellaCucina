import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AddToCartModal from "./AddToCartModal";
import { useI18n } from "@/i18n/I18nProvider";
import { motion } from "framer-motion";

interface MenuItemProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating?: number;
}

function getStableRating(id: string) {
  const seed = id.split("").reduce((total, char) => total + char.charCodeAt(0), 0);
  return 4.4 + (seed % 7) * 0.08;
}

const MenuItem = ({
  id,
  name,
  description,
  price = 0, // Default value to prevent undefined price
  image,
  category,
  rating: initialRating,
  className,
}: MenuItemProps & { className?: string }) => {
  const { t } = useI18n();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const rating = React.useMemo(() => initialRating ?? getStableRating(id), [
    id,
    initialRating,
  ]);

  const categoryLabel = t(`menu.category.${category}`);

  return (
    <>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className={className}
      >
        <Card
          role="button"
          tabIndex={0}
          className="group flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-[1.35rem] border-white/10 bg-white/[0.045] text-card-foreground shadow-[0_24px_80px_-56px_rgba(0,0,0,0.9)] transition duration-300 hover:border-primary/30 hover:bg-white/[0.065] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
          onClick={() => setIsModalOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setIsModalOpen(true);
            }
          }}
        >
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <img
            src={image}
            alt={name}
              className="h-full w-full object-cover object-center transition duration-700 group-hover:scale-[1.06]"
          />
            <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/12 to-transparent" />
            <div className="absolute right-3 top-3 rounded-full border border-white/15 bg-black/35 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
            {categoryLabel}
          </div>
            <div className="absolute bottom-3 left-3 rounded-full border border-white/15 bg-black/45 px-2.5 py-1 text-xs text-white backdrop-blur">
              <span className="font-semibold tracking-[0.12em] text-[hsl(var(--accent))]">
                {rating.toFixed(1)}
              </span>
          </div>
            <div className="absolute bottom-3 right-3 rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-xs text-white backdrop-blur-sm">
            {t("menu.detailsHint")}
          </div>
        </div>
          <CardContent className="flex flex-1 flex-col p-5">
            <div className="mb-3 flex items-start justify-between gap-3">
              <h3 className="line-clamp-2 text-lg font-semibold leading-snug text-foreground transition-colors group-hover:text-primary sm:text-xl">
              {name}
            </h3>
              <span className="shrink-0 rounded-full bg-primary/10 px-3 py-1 text-sm font-bold text-primary">
              R$ {price.toFixed(2)}
            </span>
          </div>
            <p className="mb-5 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
          <Button
            size="sm"
              className="mt-auto self-end gap-2 rounded-full px-5"
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(true);
            }}
          >
            {t("menu.addToOrder")}
          </Button>
        </CardContent>
      </Card>
      </motion.div>

      <AddToCartModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        item={{ id, name, description, price, image, category, rating }}
      />
    </>
  );
};

export default MenuItem;
