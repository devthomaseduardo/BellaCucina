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
  const resolvedCategories = useMemo(() => {
    return (
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
      ]
    );
  }, [categories, t]);

  const [selectedCategory, setSelectedCategory] = useState(activeCategory);

  useEffect(() => {
    setSelectedCategory(activeCategory);
  }, [activeCategory]);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    onCategoryChange(categoryId);
  };

  return (
    <div className="w-full min-w-0 max-w-full bg-background border-b border-border py-2">
      <ScrollArea className="w-full max-w-full min-w-0">
        <div className="flex space-x-2 px-4 pb-2">
          {resolvedCategories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => handleCategoryClick(category.id)}
              className="whitespace-nowrap transition-colors"
            >
              {category.icon && <span className="mr-2">{category.icon}</span>}
              {category.name}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default MenuCategoryFilter;
