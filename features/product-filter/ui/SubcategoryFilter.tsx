"use client";

import React from "react";
import { RollSubcategory, SushiSubcategory } from "@/types";

interface SubcategoryFilterProps {
  subcategories: Array<{
    value: RollSubcategory | SushiSubcategory | "all";
    label: string;
  }>;
  selectedSubcategory?: RollSubcategory | SushiSubcategory | "all" | undefined;
  onSubcategoryChange: (
    subcategory: RollSubcategory | SushiSubcategory | "all"
  ) => void;
}

export default function SubcategoryFilter({
  subcategories,
  selectedSubcategory,
  onSubcategoryChange,
}: SubcategoryFilterProps) {
  if (!subcategories) return null;

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
