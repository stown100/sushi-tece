"use client";

import React, { useState } from "react";
import { useProducts } from "@/contexts/ProductsContext";
import {
  Category,
  RollSubcategory,
  SushiSubcategory,
  DrinkSubcategory,
} from "@/types";
import { useTranslation } from "@/shared/hooks/useTranslation";
import {
  useMainCategories,
  useRollSubcategories,
  useSushiSubcategories,
  useDrinkSubcategories,
  useAvailableSubcategories,
} from "@/shared/hooks/useCategories";
import MenuGrid from "./MenuGrid";
import ProductSearch from "@/features/product-search/ui/ProductSearch";
import CategoryFilter from "@/features/product-filter/ui/CategoryFilter";
import SubcategoryFilter from "@/features/product-filter/ui/SubcategoryFilter";

export default function MenuSection() {
  const { t } = useTranslation();
  const { products } = useProducts();

  const [selectedCategory, setSelectedCategory] = useState<Category | "all">(
    "all"
  );
  const [selectedSubcategory, setSelectedSubcategory] = useState<
    RollSubcategory | SushiSubcategory | DrinkSubcategory | "all" | undefined
  >(undefined);
  const [searchQuery, setSearchQuery] = useState("");

  const mainCategories = useMainCategories();
  const rollSubcategories = useRollSubcategories();
  const sushiSubcategories = useSushiSubcategories();
  const drinkSubcategories = useDrinkSubcategories();
  const availableSubcategories: Array<{
    value: RollSubcategory | SushiSubcategory | DrinkSubcategory | "all";
    label: string;
  }> | null = useAvailableSubcategories(
    selectedCategory,
    rollSubcategories,
    sushiSubcategories,
    drinkSubcategories
  );

  const handleCategoryChange = (category: Category | "all") => {
    setSelectedCategory(category);
    if (
      category === "rolls" ||
      category === "sushi" ||
      category === "drinks"
    ) {
      setSelectedSubcategory("all");
    } else {
      setSelectedSubcategory(undefined);
    }
  };

  const handleSubcategoryChange = (
    subcategory: RollSubcategory | SushiSubcategory | DrinkSubcategory | "all"
  ) => {
    setSelectedSubcategory(subcategory);
  };

  return (
    <section id="menu" className="py-6">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-4">{t("nav.menu")}</h2>

        <ProductSearch value={searchQuery} onChange={setSearchQuery} />

        <CategoryFilter
          categories={mainCategories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />

        <SubcategoryFilter
          subcategories={availableSubcategories || []}
          selectedSubcategory={selectedSubcategory}
          onSubcategoryChange={handleSubcategoryChange}
        />

        <MenuGrid
          products={products.filter((p) => p.category !== "utensils")}
          selectedCategory={selectedCategory}
          selectedSubcategory={selectedSubcategory}
          searchQuery={searchQuery}
        />
      </div>
    </section>
  );
}
