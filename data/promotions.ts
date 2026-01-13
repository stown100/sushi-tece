import { Promotion } from "@/types";

export const promotions: Promotion[] = [
  {
    id: "promo-1",
    title: {
      ru: "Лучшая цена без скидок",
      uk: "Найкраща ціна без знижок",
      tr: "İndirimsiz en iyi fiyat",
      en: "Best price without discounts",
    },
    description: {
      ru: "Специальные предложения каждый день",
      uk: "Спеціальні пропозиції щодня",
      tr: "Her gün özel teklifler",
      en: "Special offers every day",
    },
    image: "/images/promo-best-price.jpg",
  },
  {
    id: "promo-2",
    title: {
      ru: "Новинки сезона",
      uk: "Новинки сезону",
      tr: "Sezon yenilikleri",
      en: "Season novelties",
    },
    description: {
      ru: "Попробуйте наши новые блюда",
      uk: "Спробуйте наші нові страви",
      tr: "Yeni yemeklerimizi deneyin",
      en: "Try our new dishes",
    },
    image: "/images/promo-new.jpg",
  },
];
