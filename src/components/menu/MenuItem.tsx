import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Star } from "lucide-react";
import AddToCartModal from "./AddToCartModal";
import { useI18n } from "@/i18n/I18nProvider";

interface MenuItemProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating?: number;
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
  const [isHovered, setIsHovered] = React.useState(false);

  const rating = React.useMemo(() => initialRating ?? Math.random() * (5 - 4) + 4, [
    initialRating,
  ]);

  const categoryLabel = t(`menu.category.${category}`);

  return (
    <>
      <Card
        role="button"
        tabIndex={0}
        className={`group flex w-full cursor-pointer flex-col overflow-hidden bg-card text-card-foreground shadow-sm transition-all duration-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 ${className || ""}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
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
            className={`h-full w-full object-cover object-center transition-transform duration-500 ${isHovered ? "scale-[1.06]" : "scale-100"}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/5" />
          <div className="absolute top-2 right-2 bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
            {categoryLabel}
          </div>
          <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full flex items-center">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
            <span>{rating.toFixed(1)}</span>
          </div>
          <div className="absolute bottom-2 right-2 bg-white/10 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
            {t("menu.detailsHint")}
          </div>
        </div>
        <CardContent className="flex flex-col flex-1 p-4">
          <div className="mb-2 flex items-start justify-between gap-2">
            <h3 className="line-clamp-2 text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
              {name}
            </h3>
            <span className="shrink-0 font-bold text-primary">
              R$ {price.toFixed(2)}
            </span>
          </div>
          <p className="mb-4 line-clamp-3 flex-1 text-sm text-muted-foreground">
            {description}
          </p>
          <Button
            size="sm"
            className="mt-auto self-end gap-2 px-6 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(true);
            }}
          >
            <PlusCircle size={16} />
            {t("menu.addToOrder")}
          </Button>
        </CardContent>
      </Card>

      <AddToCartModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        item={{ id, name, description, price, image, category, rating }}
      />
    </>
  );
};

export default MenuItem;
