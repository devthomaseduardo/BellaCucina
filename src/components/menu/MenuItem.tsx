import * as React from "react";
import { Button } from "@/components/ui/button";
import AddToCartModal from "./AddToCartModal";
import { useI18n } from "@/i18n/I18nProvider";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

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
  price = 0,
  image,
  category,
  rating: initialRating,
  className,
}: MenuItemProps & { className?: string }) => {
  const { t } = useI18n();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const rating = React.useMemo(() => initialRating ?? getStableRating(id), [id, initialRating]);
  const categoryLabel = t(`menu.category.${category}`);

  return (
    <>
      <motion.article
        whileHover={{ y: -3 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className={className}
      >
        <div
          role="button"
          tabIndex={0}
          className="group flex h-full w-full cursor-pointer flex-col overflow-hidden bg-muted/20 text-card-foreground transition duration-300 hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
          onClick={() => setIsModalOpen(true)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              setIsModalOpen(true);
            }
          }}
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
            <img
              src={image}
              alt={name}
              loading="lazy"
              className="h-full w-full object-cover object-center transition duration-700 group-hover:scale-[1.035]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-transparent to-black/10" />

            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
              <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/72">
                {categoryLabel}
              </span>
              <span className="font-display text-2xl text-white">R$ {price.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex flex-1 flex-col p-5">
            <div className="flex items-start justify-between gap-4">
              <h3 className="max-w-[14ch] font-display text-2xl leading-tight text-foreground">
                {name}
              </h3>
              <span className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">
                {rating.toFixed(1)} / 5
              </span>
            </div>

            <p className="mt-3 line-clamp-3 flex-1 text-sm leading-6 text-muted-foreground">
              {description}
            </p>

            <div className="mt-5 flex items-center justify-between gap-3">
              <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                {t("menu.detailsHint")}
              </span>
              <Button
                size="sm"
                className="h-9 rounded-full px-4 text-xs"
                onClick={(event) => {
                  event.stopPropagation();
                  setIsModalOpen(true);
                }}
              >
                <Plus className="mr-1.5 h-3.5 w-3.5" aria-hidden />
                {t("menu.addToOrder")}
              </Button>
            </div>
          </div>
        </div>
      </motion.article>

      <AddToCartModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        item={{ id, name, description, price, image, category, rating }}
      />
    </>
  );
};

export default MenuItem;
