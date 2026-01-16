"use client";

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Product, Category, RollSubcategory, SushiSubcategory } from "@/types";
import { useProductFilter } from "@/shared/hooks/useProductFilter";
import ProductCard from "@/shared/ui/ProductCard";
import EmptyState from "@/shared/ui/EmptyState";

interface MenuGridProps {
  products: Product[];
  selectedCategory: Category | "all";
  selectedSubcategory?: RollSubcategory | SushiSubcategory | "all" | undefined;
  searchQuery: string;
}

export default function MenuGrid({
  products,
  selectedCategory,
  selectedSubcategory,
  searchQuery,
}: MenuGridProps) {
  const { language } = useLanguage();

  const filteredProducts = useProductFilter({
    products,
    selectedCategory,
    selectedSubcategory,
    searchQuery,
    language,
  });

  if (filteredProducts.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
