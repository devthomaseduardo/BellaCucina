export type MenuCategoryId =
  | "appetizers"
  | "pasta"
  | "main-courses"
  | "pizza"
  | "desserts"
  | "drinks"
  | "specials"
  | "sides"
  | "sandwiches";

export interface MenuItemRecord {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: MenuCategoryId;
  featured?: boolean;
}
