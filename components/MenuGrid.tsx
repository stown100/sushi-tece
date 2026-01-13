"use client";

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslation } from "@/lib/i18n";
import { getLocalizedText } from "@/lib/utils";
import { Product, Category } from "@/types";
import ProductButton from "./ProductButton";

interface MenuGridProps {
  products: Product[];
  selectedCategory: Category | "all";
  searchQuery: string;
}

export default function MenuGrid({
  products,
  selectedCategory,
  searchQuery,
}: MenuGridProps) {
  const { language } = useLanguage();
  const t = (key: string) => getTranslation(language, key);

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const productName = getLocalizedText(product.name, language);
    const productDescription = getLocalizedText(product.description, language);
    const matchesSearch =
      searchQuery === "" ||
      productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      productDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getBadgeText = (badge?: string) => {
    if (!badge) return null;
    return t(`badges.${badge}`);
  };

  const getBadgeColor = (badge?: string) => {
    switch (badge) {
      case "hit":
        return "bg-red-500 text-white";
      case "new":
        return "bg-green-500 text-white";
      case "spicy":
        return "bg-orange-500 text-white";
      case "vegetarian":
        return "bg-purple-500 text-white";
      case "discount":
        return "bg-yellow-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center text-gray-500 py-12">
        <p className="text-lg">Товары не найдены</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {filteredProducts.map((product) => {
        const productName = getLocalizedText(product.name, language);
        const productDescription = getLocalizedText(
          product.description,
          language
        );

        return (
          <div key={product.id} className="card group">
            {/* Image */}
            <div className="relative h-40 bg-gray-200 overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-5xl">
                🍣
              </div>

              {/* Badge */}
              {product.badge && (
                <div
                  className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-semibold ${getBadgeColor(
                    product.badge
                  )}`}
                >
                  {getBadgeText(product.badge)}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-3">
              <h3 className="font-bold text-base mb-1 line-clamp-1">
                {productName}
              </h3>
              <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                {productDescription}
              </p>

              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-500 text-xs">
                  {product.weight} {t("product.weight")}
                </span>
                <span className="font-bold text-base text-primary-600">
                  {product.price} {t("product.price")}
                </span>
              </div>

              <ProductButton product={product} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
