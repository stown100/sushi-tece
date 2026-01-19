"use client";

import React, { useState } from "react";
import Image from "next/image";
import { getLocalizedText } from "@/lib/utils";
import { useTranslation } from "@/shared/hooks/useTranslation";
import { Product } from "@/types";
import ProductButton from "@/shared/ui/ProductButton";
import ProductModal from "@/shared/ui/ProductModal";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { t, language } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const productName = getLocalizedText(product.name, language);
  const productDescription = getLocalizedText(product.description, language);

  const getBadgeText = (badge?: string) => {
    if (!badge) return null;
    return t(`badges.${badge}`);
  };

  const getBadgeColor = (badge?: string) => {
    switch (badge) {
      case "hit":
        return "bg-red-500 text-white";
      case "new":
        return "bg-green-500 text-white";
      case "spicy":
        return "bg-orange-500 text-white";
      case "vegetarian":
        return "bg-purple-500 text-white";
      case "discount":
        return "bg-yellow-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <>
      <div
        className="card group cursor-pointer flex flex-col"
        onClick={() => setIsModalOpen(true)}
      >
        {/* Image */}
        <div className="relative h-40 bg-gray-200 overflow-hidden">
          <Image
            src={product.image}
            alt={productName}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          />

          {/* Badge */}
          {product.badge && (
            <div
              className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-semibold z-10 ${getBadgeColor(
                product.badge
              )}`}
            >
              {getBadgeText(product.badge)}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-3 flex flex-col flex-1">
          <h3 className="font-bold text-base mb-1 line-clamp-1">
            {productName}
          </h3>
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">
            {productDescription}
          </p>

          <div className="flex items-center mb-2">
            {product.weight > 0 && (
              <span className="text-gray-500 text-xs">
                {product.weight} {t("product.weight")}
              </span>
            )}
            <span className="font-bold text-base text-primary-600 ml-auto">
              {product.price} {t("product.price")}
            </span>
          </div>

          <div className="mt-auto" onClick={(e) => e.stopPropagation()}>
            <ProductButton product={product} />
          </div>
        </div>
      </div>

      <ProductModal
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
