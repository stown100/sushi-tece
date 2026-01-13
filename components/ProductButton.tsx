"use client";

import React, { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslation } from "@/lib/i18n";
import { Product } from "@/types";

interface ProductButtonProps {
  product: Product;
}

export default function ProductButton({ product }: ProductButtonProps) {
  const { addToCart, items } = useCart();
  const { language } = useLanguage();
  const t = (key: string) => getTranslation(language, key);
  const [isAnimating, setIsAnimating] = useState(false);

  const cartItem = items.find((item) => item.id === product.id);
  const isInCart = !!cartItem;

  const handleAddToCart = () => {
    addToCart(product);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 600);
  };

  return (
    <button
      onClick={handleAddToCart}
      className={`w-full btn-primary relative overflow-hidden ${
        isAnimating ? "animate-pulse" : ""
      } ${isInCart ? "bg-green-600 hover:bg-green-700" : ""}`}
    >
      {isInCart ? (
        <span className="flex items-center justify-center gap-2">
          <span>✓</span>
          <span>
            {t("product.addToCart")} ({cartItem.quantity})
          </span>
        </span>
      ) : (
        t("product.addToCart")
      )}
    </button>
  );
}
