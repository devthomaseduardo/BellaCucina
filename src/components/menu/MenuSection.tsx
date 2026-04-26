import * as React from "react";
import { Search, Filter, PlusCircle } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MenuCategoryFilter from "./MenuCategoryFilter";
import MenuItem from "./MenuItem";
import AddToCartModal from "./AddToCartModal";
import { useI18n } from "@/i18n/I18nProvider";
import { ITALIAN_MENU_ITEMS } from "@/data/italian-menu";
import type { MenuItemRecord } from "@/types/menu-item";

type MenuItemType = MenuItemRecord;

interface MenuSectionProps {
  items?: MenuItemType[];
  title?: string;
  description?: string;
  showQrCode?: boolean;
}

const MenuSection = ({
  items = ITALIAN_MENU_ITEMS,

  title,
  description,
  showQrCode = true,
}: MenuSectionProps) => {
  const { t } = useI18n();
  const resolvedTitle = title ?? t("menu.sectionTitle");
  const resolvedDescription = description ?? t("menu.sectionDescription");

  const [activeCategory, setActiveCategory] = React.useState("all");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [viewMode, setViewMode] = React.useState("grid");
  const [selectedItem, setSelectedItem] = React.useState<MenuItemType | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  // Filter items based on category and search query using useMemo for performance
  const filteredItems = React.useMemo(() => {
    let result = items;

    // Apply category filter
    if (activeCategory !== "all") {
      result = result.filter(
        (item) => item.category.toLowerCase() === activeCategory.toLowerCase(),
      );
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query),
      );
    }

    return result;
  }, [activeCategory, searchQuery, items]);

  // Get featured items for carousel
  const featuredItems = items.filter((item) => item.featured);

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleAddToCart = (item: MenuItemType) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  return (
    <div className="w-full min-w-0 bg-muted/25 py-12">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col items-stretch justify-between gap-6 md:flex-row md:items-center">
          <div className="min-w-0 max-w-2xl">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {resolvedTitle}
            </h2>
            <p className="mt-2 text-muted-foreground">{resolvedDescription}</p>
          </div>

          {showQrCode && (
            <div className="flex w-full max-w-full flex-col gap-3 rounded-lg border border-border/60 bg-card p-4 text-card-foreground shadow-sm sm:flex-row sm:items-center sm:gap-4 md:mt-0 md:w-auto md:max-w-md md:shrink-0">
              <div className="rounded-md border-2 border-primary bg-background p-2">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://bella-cucina-demo.vercel.app/"
                  alt={t("menu.qrTitle")}
                  className="h-20 w-20"
                />
              </div>
              <div>
                <p className="text-lg font-medium text-foreground">{t("menu.qrTitle")}</p>
                <p className="text-sm text-muted-foreground">
                  {t("menu.qrDescription")}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Featured Items Carousel */}
        {featuredItems.length > 0 && (
          <div className="mb-12">
            <h3 className="mb-4 text-xl font-semibold text-foreground">
              {t("menu.featuredTitle")}
            </h3>
            <Carousel className="w-full max-w-full min-w-0 px-0">
              <CarouselContent>
                {featuredItems.map((item) => (
                  <CarouselItem
                    key={item.id}
                    className="md:basis-1/2 lg:basis-1/3"
                  >
                    <div className="p-1 sm:p-2">
                      <MenuItem
                        id={item.id}
                        name={item.name}
                        description={item.description}
                        price={item.price}
                        image={item.image}
                        category={item.category}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-0 top-1/2 h-9 w-9 -translate-y-1/2 border border-border/60 bg-card/95 text-foreground shadow-sm sm:-left-2" />
              <CarouselNext className="right-0 top-1/2 h-9 w-9 -translate-y-1/2 border border-border/60 bg-card/95 text-foreground shadow-sm sm:-right-2" />
            </Carousel>
          </div>
        )}

        {/* Search and Filter Controls */}
        <div className="mb-6 flex min-w-0 flex-col gap-3 sm:flex-row sm:items-stretch sm:gap-4">
          <div className="relative min-w-0 flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t("menu.searchPlaceholder")}
              value={searchQuery}
              onChange={handleSearchChange}
              className="min-w-0 pl-9"
            />
          </div>
          <div className="flex min-w-0 shrink-0 gap-2 sm:items-center">
            <Tabs
              defaultValue={viewMode}
              value={viewMode}
              onValueChange={setViewMode}
              className="min-w-0 flex-1 sm:w-[200px] sm:flex-none"
            >
              <TabsList className="grid h-10 w-full min-w-0 grid-cols-2">
                <TabsTrigger value="grid" className="truncate px-2 text-xs sm:text-sm">
                  {t("menu.viewGrid")}
                </TabsTrigger>
                <TabsTrigger value="list" className="truncate px-2 text-xs sm:text-sm">
                  {t("menu.viewList")}
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <Button variant="outline" size="icon" className="h-10 w-10 shrink-0" type="button">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Category Filter */}
        <MenuCategoryFilter
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />

        {/* Menu Items Display */}
        <Tabs
          defaultValue={viewMode}
          value={viewMode}
          onValueChange={setViewMode}
          className="mt-6 w-full min-w-0 max-w-full"
        >
          <TabsContent value="grid">
            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 sm:justify-items-stretch lg:grid-cols-3 xl:grid-cols-4">
                {filteredItems.map((item) => (
                  <MenuItem
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                    image={item.image}
                    category={item.category}
                    className="h-full"
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">{t("menu.empty")}</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="list">
            {filteredItems.length > 0 ? (
              <div className="space-y-4">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex min-w-0 flex-col gap-4 rounded-lg border border-border/60 bg-card p-4 text-card-foreground md:flex-row"
                  >
                    <div className="h-52 w-full shrink-0 overflow-hidden rounded-lg sm:h-56 md:h-full md:min-h-[14rem] md:w-[min(100%,14rem)] md:max-w-[40%]">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                        <div className="min-w-0">
                          <h3 className="text-lg font-semibold sm:text-xl">
                            {item.name}
                          </h3>
                          <span className="mt-1 inline-block rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">
                            {t(`menu.category.${item.category}`)}
                          </span>
                        </div>
                        <p className="shrink-0 text-lg font-semibold text-primary">
                          R$ {item.price.toFixed(2)}
                        </p>
                      </div>
                      <p className="mt-2 flex-1 break-words text-muted-foreground">
                        {item.description}
                      </p>
                      <div className="mt-4">
                        <Button
                          className="gap-2"
                          onClick={() => handleAddToCart(item)}
                        >
                          <PlusCircle size={18} />
                          {t("menu.addToOrder")}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">{t("menu.empty")}</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Add to Cart Modal */}
      {selectedItem && (
        <AddToCartModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          item={selectedItem}
        />
      )}
    </div>
  );
};

export default MenuSection;
