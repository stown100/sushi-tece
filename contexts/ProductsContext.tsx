"use client";

import React, { createContext, useContext } from "react";
import type { CategoryItem, Product, Promotion } from "@/types";

interface ProductsContextType {
  products: Product[];
  promotions: Promotion[];
  categories: CategoryItem[];
}

const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined
);

export function ProductsProvider({
  children,
  products,
  promotions,
  categories,
}: {
  children: React.ReactNode;
  products: Product[];
  promotions: Promotion[];
  categories: CategoryItem[];
}) {
  return (
    <ProductsContext.Provider
      value={{ products, promotions, categories }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }
  return context;
}
