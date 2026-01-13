"use client";

import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslation } from "@/lib/i18n";
import { products } from "@/data/products";
import { promotions } from "@/data/promotions";
import MenuGrid from "@/components/MenuGrid";
import Promotions from "@/components/Promotions";
import { Category } from "@/types";

export default function Home() {
  const { language } = useLanguage();
  const t = (key: string) => getTranslation(language, key);

  const [selectedCategory, setSelectedCategory] = useState<Category | "all">(
    "all"
  );
  const [searchQuery, setSearchQuery] = useState("");

  const categories: Array<{ value: Category | "all"; label: string }> = [
    { value: "all", label: t("categories.all") },
    { value: "sushi", label: t("categories.sushi") },
    { value: "rolls", label: t("categories.rolls") },
    { value: "sets", label: t("categories.sets") },
    { value: "burgers", label: t("categories.burgers") },
    { value: "drinks", label: t("categories.drinks") },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-500 to-primary-700 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-2">🍣 Sushi Tece</h1>
          <p className="text-lg mb-4">
            {language === "ru" && "Лучшие суши и роллы с доставкой"}
            {language === "uk" && "Найкращі суші та роли з доставкою"}
            {language === "tr" && "Teslimatlı en iyi suşi ve roll"}
            {language === "en" && "Best sushi and rolls with delivery"}
          </p>
          <a
            href="#menu"
            className="inline-block bg-white text-primary-600 font-semibold py-2 px-6 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {t("nav.menu")}
          </a>
        </div>
      </section>

      {/* Promotions */}
      <Promotions promotions={promotions} />

      {/* Menu Section */}
      <section id="menu" className="py-6">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-4">
            {t("nav.menu")}
          </h2>

          {/* Search */}
          <div className="max-w-md mx-auto mb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("search.placeholder")}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  selectedCategory === category.value
                    ? "bg-primary-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Menu Grid */}
          <MenuGrid
            products={products}
            selectedCategory={selectedCategory}
            searchQuery={searchQuery}
          />
        </div>
      </section>
    </>
  );
}
