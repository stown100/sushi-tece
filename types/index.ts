export type Category =
  | "sets"
  | "rolls"
  | "sushi"
  | "tempura"
  | "ramen"
  | "wok"
  | "burgers"
  | "mochi"
  | "pasta-risotto"
  | "hot-dishes"
  | "pizza"
  | "utensils";

export type RollSubcategory =
  | "philadelphia"
  | "california"
  | "maki"
  | "futo-maki"
  | "baked-rolls";

export type SushiSubcategory = "nigiri" | "sushi-burger";

export type BadgeType = "hit" | "new" | "spicy" | "vegetarian" | "discount";

export interface Product {
  id: string;
  name: {
    ru: string;
    uk: string;
    tr: string;
    en: string;
  };
  description: {
    ru: string;
    uk: string;
    tr: string;
    en: string;
  };
  category: Category;
  subcategory?: RollSubcategory | SushiSubcategory;
  price: number;
  weight: number; // в граммах
  image: string;
  badge?: BadgeType;
  utensils?: "chopsticks" | "fork" | "none"; // автоматически добавляемые приборы
  recommendations?: string[]; // ID рекомендуемых товаров
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Promotion {
  id: string;
  title: {
    ru: string;
    uk: string;
    tr: string;
    en: string;
  };
  description: {
    ru: string;
    uk: string;
    tr: string;
    en: string;
  };
  image: string;
  link?: string;
}

export type Language = "ru" | "uk" | "tr" | "en";

export interface CustomerInfo {
  name: string;
  phone: string;
}
