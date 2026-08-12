import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
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
import type { MenuCategoryId, MenuItemRecord } from "@/types/menu-item";
import { supabase } from "@/lib/supabase";

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
  const shouldReduceMotion = useReducedMotion();
  const resolvedTitle = title ?? t("menu.sectionTitle");
  const resolvedDescription = description ?? t("menu.sectionDescription");

  const [activeCategory, setActiveCategory] = React.useState("all");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [viewMode, setViewMode] = React.useState("grid");
  const [selectedItem, setSelectedItem] = React.useState<MenuItemType | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [dbItems, setDbItems] = React.useState<MenuItemType[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function loadMenu() {
      const hasSupabaseConfig = Boolean(
        import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY,
      );

      if (!hasSupabaseConfig) {
        setDbItems(items);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("menu_items")
          .select("*, menu_categories(name_en)"); // assuming menu_categories name_en has the old ID

        if (error) {
          console.error("Error fetching menu:", error);
          setDbItems(items); // fallback
          return;
        }

        if (data && data.length > 0) {
          const mappedItems: MenuItemType[] = data.map((d) => ({
            id: d.id,
            name: d.name_pt || d.name_en, // basic i18n fallback for demo
            description: d.description_pt || d.description_en,
            price: Number(d.price),
            image: d.image_url || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
            category: (d.menu_categories?.name_en?.toLowerCase() || "specials") as MenuCategoryId,
            featured: d.popular,
          }));
          setDbItems(mappedItems);
        } else {
          setDbItems(items); // fallback to static if empty
        }
      } catch (err) {
        console.error("Failed to load menu", err);
        setDbItems(items);
      } finally {
        setLoading(false);
      }
    }
    
    loadMenu();
  }, [items]);

  // Filter items based on category and search query using useMemo for performance
  const filteredItems = React.useMemo(() => {
    let result = dbItems;

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
  }, [activeCategory, searchQuery, dbItems]);

  // Get featured items for carousel
  const featuredItems = React.useMemo(
    () => dbItems.filter((item) => item.featured),
    [dbItems],
  );

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
    <div className="relative w-full min-w-0 overflow-hidden bg-background py-16 md:py-24">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 1, y: 24 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-9 flex flex-col items-stretch justify-between gap-6 md:flex-row md:items-end"
        >
          <div className="min-w-0 max-w-3xl">
            <p className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
              Cardápio digital
            </p>
            <h2 className="mt-4 font-display text-3xl text-foreground sm:text-4xl md:text-5xl">
              {resolvedTitle}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
              {resolvedDescription}
            </p>
          </div>

          {showQrCode && (
            <div className="flex w-full max-w-full flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.045] p-4 text-card-foreground shadow-[0_24px_70px_-54px_rgba(0,0,0,0.9)] sm:flex-row sm:items-center sm:gap-4 md:mt-0 md:w-auto md:max-w-md md:shrink-0">
              <div className="rounded-xl border border-primary/35 bg-white p-2">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://bella-cucina-demo.vercel.app/"
                  alt={t("menu.qrTitle")}
                  className="h-20 w-20"
                />
              </div>
              <div>
                <p className="text-lg font-semibold text-foreground">
                  {t("menu.qrTitle")}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {t("menu.qrDescription")}
                </p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Featured Items Carousel */}
        {featuredItems.length > 0 && (
          <div className="mb-12">
            <h3 className="mb-4 font-display text-2xl text-foreground">
              {t("menu.featuredTitle")}
            </h3>
            <Carousel
              opts={{ align: "start", loop: true }}
              className="w-full max-w-full min-w-0 px-0"
            >
              <CarouselContent>
                {featuredItems.map((item) => (
                  <CarouselItem
                    key={item.id}
                    className="md:basis-1/2 xl:basis-1/3"
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
              <CarouselPrevious className="left-2 top-1/2 h-10 w-10 -translate-y-1/2 border-white/15 bg-black/45 text-white shadow-sm backdrop-blur hover:bg-black/65 sm:-left-3" />
              <CarouselNext className="right-2 top-1/2 h-10 w-10 -translate-y-1/2 border-white/15 bg-black/45 text-white shadow-sm backdrop-blur hover:bg-black/65 sm:-right-3" />
            </Carousel>
          </div>
        )}

        {/* Search and Filter Controls */}
        <div className="mb-6 flex min-w-0 flex-col gap-3 sm:flex-row sm:items-stretch sm:gap-4">
          <div className="relative min-w-0 flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Buscar
            </span>
            <Input
              placeholder={t("menu.searchPlaceholder")}
              value={searchQuery}
              onChange={handleSearchChange}
              className="h-11 min-w-0 rounded-full border-white/10 bg-white/[0.045] pl-20 text-foreground placeholder:text-muted-foreground focus-visible:ring-primary/70"
            />
          </div>
          <div className="flex min-w-0 shrink-0 gap-2 sm:items-center">
            <Tabs
              defaultValue={viewMode}
              value={viewMode}
              onValueChange={setViewMode}
              className="min-w-0 flex-1 sm:w-[200px] sm:flex-none"
            >
              <TabsList className="grid h-11 w-full min-w-0 grid-cols-2 rounded-full border border-white/10 bg-white/[0.045] p-1">
                <TabsTrigger value="grid" className="truncate rounded-full px-2 text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground sm:text-sm">
                  {t("menu.viewGrid")}
                </TabsTrigger>
                <TabsTrigger value="list" className="truncate rounded-full px-2 text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground sm:text-sm">
                  {t("menu.viewList")}
                </TabsTrigger>
              </TabsList>
            </Tabs>
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
            {loading ? (
              <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-8 text-center text-muted-foreground">
                Carregando cardápio...
              </div>
            ) : filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
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
              <div className="rounded-2xl border border-white/10 bg-white/[0.045] py-12 text-center">
                <p className="text-muted-foreground">{t("menu.empty")}</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="list">
            {loading ? (
              <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-8 text-center text-muted-foreground">
                Carregando cardápio...
              </div>
            ) : filteredItems.length > 0 ? (
              <div className="space-y-4">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex min-w-0 flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.045] p-4 text-card-foreground md:flex-row"
                  >
                    <div className="h-52 w-full shrink-0 overflow-hidden rounded-xl sm:h-56 md:h-full md:min-h-[14rem] md:w-[min(100%,14rem)] md:max-w-[40%]">
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
                          <span className="mt-2 inline-block rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
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
                          className="gap-2 rounded-full"
                          onClick={() => handleAddToCart(item)}
                        >
                          {t("menu.addToOrder")}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-white/10 bg-white/[0.045] py-12 text-center">
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
