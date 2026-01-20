"use client";

import { useEffect } from "react";

export default function MultilingualOGTags() {
  useEffect(() => {
    // Добавляем мультиязычные Open Graph метатеги в head
    const ogTags = [
      // Альтернативные локали
      { property: "og:locale:alternate", content: "ru_RU" },
      { property: "og:locale:alternate", content: "uk_UA" },
      { property: "og:locale:alternate", content: "en_US" },
      
      // Турецкий (основной)
      { property: "og:title:tr", content: "SUSHI YM - Mersin Tece Sushi Restoranı | Sushi ve Roll Sipariş" },
      { property: "og:description:tr", content: "Mersin Tece'de en iyi sushi ve roll siparişi. Taze sushi, roll, set, burger ve içecekler. Hızlı teslimat. Online sipariş verin!" },
      
      // Русский
      { property: "og:title:ru", content: "SUSHI YM - Доставка суши и роллов в Мерсине | Ресторан суши" },
      { property: "og:description:ru", content: "Лучшие суши, роллы, наборы, бургеры и напитки с доставкой в Мерсине, район Теце. Быстрая доставка. Заказывайте онлайн!" },
      
      // Украинский
      { property: "og:title:uk", content: "SUSHI YM - Доставка суші та ролів у Мерсіні | Ресторан суші" },
      { property: "og:description:uk", content: "Найкращі суші, роли, набори, бургери та напої з доставкою в Мерсіні, район Теце. Швидка доставка. Замовляйте онлайн!" },
      
      // Английский
      { property: "og:title:en", content: "SUSHI YM - Mersin Tece Sushi Restaurant | Sushi and Roll Delivery" },
      { property: "og:description:en", content: "Best sushi and rolls delivery in Mersin Tece. Fresh sushi, rolls, sets, burgers and drinks. Fast delivery. Order online!" },
    ];

    // Проверяем, не добавлены ли уже метатеги
    const existingTags = new Set<string>();
    document.querySelectorAll('meta[property^="og:"]').forEach((tag) => {
      const property = tag.getAttribute("property");
      if (property) existingTags.add(property);
    });

    // Добавляем только те метатеги, которых еще нет
    ogTags.forEach(({ property, content }) => {
      if (!existingTags.has(property)) {
        const meta = document.createElement("meta");
        meta.setAttribute("property", property);
        meta.setAttribute("content", content);
        document.head.appendChild(meta);
      }
    });

    // Очистка при размонтировании не требуется, так как метатеги должны оставаться в head
  }, []);

  return null;
}
