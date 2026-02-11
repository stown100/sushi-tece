"use client";

import React from "react";
import {
  RollSubcategory,
  SushiSubcategory,
  DrinkSubcategory,
} from "@/types";

type Subcategory = RollSubcategory | SushiSubcategory | DrinkSubcategory | "all";

interface SubcategoryFilterProps {
  subcategories: Array<{ value: Subcategory; label: string }>;
  selectedSubcategory?: Subcategory | undefined;
  onSubcategoryChange: (subcategory: Subcategory) => void;
}

export default function SubcategoryFilter({
  subcategories,
  selectedSubcategory,
  onSubcategoryChange,
}: SubcategoryFilterProps) {
  if (!subcategories || subcategories.length === 0) return null;

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-4">
      {subcategories.map((subcategory) => (
        <button
          key={subcategory.value}
          onClick={() => onSubcategoryChange(subcategory.value)}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            selectedSubcategory === subcategory.value
              ? "bg-primary-500 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {subcategory.label}
        </button>
      ))}
    </div>
  );
}
