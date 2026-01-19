"use client";

import React from "react";
import { useCart } from "@/contexts/CartContext";
import { getLocalizedText } from "@/lib/utils";
import { useTranslation } from "@/shared/hooks/useTranslation";
import { products } from "@/data/products";
import { CartItem as CartItemType } from "@/types";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart, addRecommendation } = useCart();
  const { t, language } = useTranslation();

  const productName = getLocalizedText(item.name, language);
  const productDescription = getLocalizedText(item.description, language);

  // Находим рекомендации
  const recommendations =
    item.recommendations?.map((id) => products.find((p) => p.id === id)) || [];

  return (
    <div className="border-b pb-4">
      <div className="flex items-start space-x-3">
        <div className="flex-1">
          <h3 className="font-semibold">{productName}</h3>
          <p className="text-sm text-gray-600">{productDescription}</p>
          <p className="text-sm text-gray-500 mt-1">
            {item.weight > 0 && `${item.weight}г • `}
            {item.price} {t("product.price")}
          </p>

          {/* Quantity Controls */}
          <div className="flex items-center space-x-2 mt-2">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="bg-gray-200 hover:bg-gray-300 w-8 h-8 rounded flex items-center justify-center"
            >
              -
            </button>
            <span className="w-8 text-center font-semibold">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="bg-gray-200 hover:bg-gray-300 w-8 h-8 rounded flex items-center justify-center"
            >
              +
            </button>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-500 hover:text-red-700 ml-4 text-sm"
            >
              {t("cart.delete")}
            </button>
          </div>

          {/* Recommendations */}
          {recommendations.length > 0 && (
            <div className="mt-3 pt-3 border-t">
              <p className="text-xs text-gray-600 mb-2">
                {t("cart.recommendations")}:
              </p>
              <div className="flex flex-wrap gap-2">
                {recommendations.map((rec) => {
                  if (!rec) return null;
                  return (
                    <button
                      key={rec.id}
                      onClick={() => addRecommendation(rec.id)}
                      className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded hover:bg-primary-200 transition-colors"
                    >
                      + {getLocalizedText(rec.name, language)}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        <div className="text-right">
          <p className="font-semibold">
            {item.price * item.quantity} {t("product.price")}
          </p>
        </div>
      </div>
    </div>
  );
}
