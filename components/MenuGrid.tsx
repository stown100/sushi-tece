"use client";

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getLocalizedText } from "@/lib/utils";
import { Product, Category } from "@/types";
import ProductCard from "./ProductCard";

interface MenuGridProps {
  products: Product[];
  selectedCategory: Category | "all";
  selectedSubcategory?: string;
  searchQuery: string;
}

export default function MenuGrid({
  products,
  selectedCategory,
  selectedSubcategory,
  searchQuery,
}: MenuGridProps) {
  const { language } = useLanguage();

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesSubcategory =
      !selectedSubcategory ||
      selectedSubcategory === "all" ||
      product.subcategory === selectedSubcategory;
    const productName = getLocalizedText(product.name, language);
    const productDescription = getLocalizedText(product.description, language);
    const matchesSearch =
      searchQuery === "" ||
      productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      productDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSubcategory && matchesSearch;
  });

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center text-gray-500 py-12">
        <p className="text-lg">Товары не найдены</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
