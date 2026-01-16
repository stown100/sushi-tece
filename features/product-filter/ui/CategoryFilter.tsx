"use client";

import React from "react";
import { Category, RollSubcategory, SushiSubcategory } from "@/types";

interface CategoryFilterProps {
  categories: Array<{ value: Category | "all"; label: string }>;
  selectedCategory: Category | "all";
  onCategoryChange: (category: Category | "all") => void;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-4">
      {categories.map((category) => (
        <button
          key={category.value}
          onClick={() => onCategoryChange(category.value)}
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
  );
}
