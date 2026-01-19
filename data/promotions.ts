import { Promotion } from "@/types";

export const promotions: Promotion[] = [
  {
    id: "promo-1",
    title: {
      ru: "Скидка 200 ₺ за самовывоз",
      uk: "Знижка 200 ₺ за самовивіз",
      tr: "Kendin al için 200 ₺ indirim",
      en: "200 ₺ discount for pickup",
    },
    description: {
      ru: "Заберите заказ самостоятельно и получите скидку 200 ₺",
      uk: "Заберіть замовлення самостійно та отримайте знижку 200 ₺",
      tr: "Siparişinizi kendiniz alın ve 200 ₺ indirim kazanın",
      en: "Pick up your order yourself and get a 200 ₺ discount",
    },
    image: "/menu/delivery-banner.jpg",
  },
  {
    id: "promo-2",
    title: {
      ru: "10% скидка на день рождения",
      uk: "10% знижка на день народження",
      tr: "Doğum gününde %10 indirim",
      en: "10% discount on birthday",
    },
    description: {
      ru: "Покажите документ и получите скидку 10% в день рождения",
      uk: "Покажіть документ та отримайте знижку 10% у день народження",
      tr: "Belgenizi gösterin ve doğum gününüzde %10 indirim kazanın",
      en: "Show your ID and get a 10% discount on your birthday",
    },
    image: "/menu/IMG_0072.jpg",
  },
  {
    id: "promo-3",
    title: {
      ru: "Оформи заказ через Telegram бота",
      uk: "Оформи замовлення через Telegram бота",
      tr: "Telegram botu üzerinden sipariş verin",
      en: "Place an order through Telegram bot",
    },
    description: {
      ru: "Быстрое оформление заказа через нашего Telegram бота",
      uk: "Швидке оформлення замовлення через нашого Telegram бота",
      tr: "Telegram botumuz aracılığıyla hızlı sipariş",
      en: "Quick order placement through our Telegram bot",
    },
    image: "/menu/IMG_0078.jpg",
    link: "https://t.me/sushitece_bot",
  },
];
