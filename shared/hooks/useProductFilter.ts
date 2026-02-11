import { useMemo } from "react";
import {
  Product,
  Category,
  RollSubcategory,
  SushiSubcategory,
  DrinkSubcategory,
} from "@/types";
import { getLocalizedText } from "@/lib/utils";
import { Language } from "@/types";

interface UseProductFilterProps {
  products: Product[];
  selectedCategory: Category | "all";
  selectedSubcategory?:
    | RollSubcategory
    | SushiSubcategory
    | DrinkSubcategory
    | "all"
    | undefined;
  searchQuery: string;
  language: Language;
}

export function useProductFilter({
  products,
  selectedCategory,
  selectedSubcategory,
  searchQuery,
  language,
}: UseProductFilterProps) {
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      const matchesSubcategory =
        !selectedSubcategory ||
        selectedSubcategory === "all" ||
        product.subcategory === selectedSubcategory;
      const productName = getLocalizedText(product.name, language);
      const productDescription = getLocalizedText(
        product.description,
        language
      );
      const matchesSearch =
        searchQuery === "" ||
        productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        productDescription.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSubcategory && matchesSearch;
    });
  }, [products, selectedCategory, selectedSubcategory, searchQuery, language]);

  return filteredProducts;
}
