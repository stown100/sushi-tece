import { useMemo } from "react";
import { useTranslation } from "./useTranslation";
import { Category, RollSubcategory, SushiSubcategory } from "@/types";

export function useMainCategories() {
  const { t } = useTranslation();

  return useMemo(
    () => [
      { value: "all" as const, label: t("categories.all") },
      { value: "sets" as const, label: t("categories.sets") },
      { value: "rolls" as const, label: t("categories.rolls") },
      { value: "sushi" as const, label: t("categories.sushi") },
      { value: "tempura" as const, label: t("categories.tempura") },
      { value: "ramen" as const, label: t("categories.ramen") },
      { value: "wok" as const, label: t("categories.wok") },
      { value: "burgers" as const, label: t("categories.burgers") },
      { value: "mochi" as const, label: t("categories.mochi") },
      {
        value: "pasta-risotto" as const,
        label: t("categories.pasta-risotto"),
      },
      {
        value: "hot-dishes" as const,
        label: t("categories.hot-dishes"),
      },
    ],
    [t]
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
