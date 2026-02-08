"use client";

import React, { createContext, useContext } from "react";
import type { Product, Promotion } from "@/types";

interface ProductsContextType {
  products: Product[];
  promotions: Promotion[];
}

const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined
);

export function ProductsProvider({
  children,
  products,
  promotions,
}: {
  children: React.ReactNode;
  products: Product[];
  promotions: Promotion[];
}) {
  return (
    <ProductsContext.Provider value={{ products, promotions }}>
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
