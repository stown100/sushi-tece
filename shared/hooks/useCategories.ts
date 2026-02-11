import { useMemo } from "react";
import { useProducts } from "@/contexts/ProductsContext";
import { getLocalizedText } from "@/lib/utils";
import { useTranslation } from "./useTranslation";
import type { Category, RollSubcategory, SushiSubcategory } from "@/types";

export function useMainCategories() {
  const { t, language } = useTranslation();
  const { categories } = useProducts();

  return useMemo(
    () => [
      { value: "all" as const, label: t("categories.all") },
      ...categories
        .filter((c) => c.slug !== "utensils")
        .map((c) => ({
          value: c.slug as Category,
          label: getLocalizedText(c.name, language),
        })),
    ],
    [categories, t, language]
  );
}

export function useRollSubcategories() {
  const { t } = useTranslation();

  return useMemo(
    () => [
      { value: "all" as const, label: t("subcategories.all") },
      {
        value: "philadelphia" as const,
        label: t("subcategories.philadelphia"),
      },
      {
        value: "california" as const,
        label: t("subcategories.california"),
      },
      { value: "maki" as const, label: t("subcategories.maki") },
      {
        value: "futo-maki" as const,
        label: t("subcategories.futo-maki"),
      },
      {
        value: "baked-rolls" as const,
        label: t("subcategories.baked-rolls"),
      },
    ],
    [t]
  );
}

export function useSushiSubcategories() {
  const { t } = useTranslation();

  return useMemo(
    () => [
      { value: "all" as const, label: t("subcategories.all") },
      { value: "nigiri" as const, label: t("subcategories.nigiri") },
      {
        value: "sushi-burger" as const,
        label: t("subcategories.sushi-burger"),
      },
    ],
    [t]
  );
}

export function useAvailableSubcategories(
  selectedCategory: Category | "all",
  rollSubcategories: Array<{ value: RollSubcategory | "all"; label: string }>,
  sushiSubcategories: Array<{ value: SushiSubcategory | "all"; label: string }>
) {
  return useMemo(() => {
    if (selectedCategory === "rolls") {
      return rollSubcategories;
    } else if (selectedCategory === "sushi") {
      return sushiSubcategories;
    }
    return null;
  }, [selectedCategory, rollSubcategories, sushiSubcategories]);
}
