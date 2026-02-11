import { useMemo } from "react";
import { useProducts } from "@/contexts/ProductsContext";
import { getLocalizedText } from "@/lib/utils";
import { useTranslation } from "./useTranslation";
import type {
  Category,
  RollSubcategory,
  SushiSubcategory,
  DrinkSubcategory,
} from "@/types";

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

export function useDrinkSubcategories() {
  const { t } = useTranslation();

  return useMemo(
    () => [
      { value: "all" as const, label: t("subcategories.all") },
      { value: "coffee" as const, label: t("subcategories.coffee") },
      {
        value: "milk-shakes" as const,
        label: t("subcategories.milk-shakes"),
      },
      { value: "tea" as const, label: t("subcategories.tea") },
      {
        value: "cold-drinks" as const,
        label: t("subcategories.cold-drinks"),
      },
      {
        value: "fresh-juice" as const,
        label: t("subcategories.fresh-juice"),
      },
      {
        value: "lemonade" as const,
        label: t("subcategories.lemonade"),
      },
      { value: "smoothie" as const, label: t("subcategories.smoothie") },
      { value: "energy" as const, label: t("subcategories.energy") },
      {
        value: "cocktails" as const,
        label: t("subcategories.cocktails"),
      },
    ],
    [t]
  );
}

export function useAvailableSubcategories(
  selectedCategory: Category | "all",
  rollSubcategories: Array<{ value: RollSubcategory | "all"; label: string }>,
  sushiSubcategories: Array<{ value: SushiSubcategory | "all"; label: string }>,
  drinkSubcategories?: Array<{ value: DrinkSubcategory | "all"; label: string }>
) {
  return useMemo(() => {
    if (selectedCategory === "rolls") {
      return rollSubcategories;
    } else if (selectedCategory === "sushi") {
      return sushiSubcategories;
    } else if (selectedCategory === "drinks" && drinkSubcategories) {
      return drinkSubcategories;
    }
    return null;
  }, [
    selectedCategory,
    rollSubcategories,
    sushiSubcategories,
    drinkSubcategories,
  ]);
}
