import { Product } from "@/types";

export const utensilsProducts: Product[] = [
  {
    id: "utensils-chopsticks",
    name: {
      ru: "Палочки для суши",
      uk: "Палички для суші",
      tr: "Suşi Çubukları",
      en: "Sushi Chopsticks",
    },
    description: {
      ru: "Одноразовые палочки для суши",
      uk: "Одноразові палички для суші",
      tr: "Tek kullanımlık suşi çubukları",
      en: "Disposable sushi chopsticks",
    },
    category: "utensils",
    price: 0, // Бесплатно
    weight: 10,
    image: "/images/chopsticks.jpg",
    utensils: "none",
  },
  {
    id: "utensils-fork",
    name: {
      ru: "Вилка",
      uk: "Вилка",
      tr: "Çatal",
      en: "Fork",
    },
    description: {
      ru: "Одноразовая вилка",
      uk: "Одноразова виделка",
      tr: "Tek kullanımlık çatal",
      en: "Disposable fork",
    },
    category: "utensils",
    price: 0,
    weight: 5,
    image: "/images/fork.jpg",
    utensils: "none",
  },
];
