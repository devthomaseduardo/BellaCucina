import React, { useEffect, useMemo, useState } from "react";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { useI18n } from "@/i18n/I18nProvider";

interface Category {
  id: string;
  name: string;
  icon?: React.ReactNode;
}

interface MenuCategoryFilterProps {
  categories?: Category[];
  activeCategory?: string;
  onCategoryChange?: (categoryId: string) => void;
}

const MenuCategoryFilter = ({
  categories,
  activeCategory = "all",
  onCategoryChange = () => {},
}: MenuCategoryFilterProps) => {
  const { t } = useI18n();
  const resolvedCategories = useMemo(
    () =>
      categories ?? [
        { id: "all", name: t("menu.category.all") },
        { id: "appetizers", name: t("menu.category.appetizers") },
        { id: "pasta", name: t("menu.category.pasta") },
        { id: "pizza", name: t("menu.category.pizza") },
        { id: "main-courses", name: t("menu.category.main-courses") },
        { id: "sides", name: t("menu.category.sides") },
        { id: "desserts", name: t("menu.category.desserts") },
        { id: "drinks", name: t("menu.category.drinks") },
        { id: "sandwiches", name: t("menu.category.sandwiches") },
        { id: "specials", name: t("menu.category.specials") },
      ],
    [categories, t],
  );

  const [selectedCategory, setSelectedCategory] = useState(activeCategory);

  useEffect(() => {
    setSelectedCategory(activeCategory);
  }, [activeCategory]);

  return (
    <ScrollArea className="w-full min-w-0 max-w-full">
      <div className="flex w-max min-w-full gap-1.5 pb-1 lg:justify-end">
        {resolvedCategories.map((category) => {
          const selected = selectedCategory === category.id;

          return (
            <Button
              key={category.id}
              variant="ghost"
              size="sm"
              onClick={() => {
                setSelectedCategory(category.id);
                onCategoryChange(category.id);
              }}
              className={
                selected
                  ? "h-9 shrink-0 rounded-full bg-primary px-4 text-xs font-semibold text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                  : "h-9 shrink-0 rounded-full px-3.5 text-xs font-medium text-muted-foreground hover:bg-muted/40 hover:text-foreground"
              }
            >
              {category.icon && <span className="mr-2">{category.icon}</span>}
              {category.name}
            </Button>
          );
        })}
      </div>
    </ScrollArea>
  );
};

export default MenuCategoryFilter;
