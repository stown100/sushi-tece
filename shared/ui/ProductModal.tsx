"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { getLocalizedText } from "@/lib/utils";
import { useTranslation } from "@/shared/hooks/useTranslation";
import { useCart } from "@/contexts/CartContext";
import { Product } from "@/types";
import ProductButton from "@/shared/ui/ProductButton";

interface ProductModalProps {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function ProductModal({
    product,
    isOpen,
    onClose,
}: ProductModalProps) {
    const { t, language } = useTranslation();
    const { items } = useCart();

    // Закрытие по Escape
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "unset";
        };
    }, [isOpen, onClose]);

    if (!isOpen || !product) return null;

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

    const cartItem = items.find((item) => item.id === product.id);
    const quantityInCart = cartItem?.quantity || 0;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fadeIn"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative transform transition-all duration-300 scale-100"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
                    aria-label="Close"
                >
                    <span className="text-1xl leading-none">×</span>
                </button>

                {/* Image */}
                <div className="relative h-64 md:h-80 bg-gray-200 overflow-hidden">
                    <Image
                        src={product.image}
                        alt={productName}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 768px"
                        priority
                    />

                    {/* Badge */}
                    {product.badge && (
                        <div
                            className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-sm font-semibold z-10 ${getBadgeColor(
                                product.badge
                            )}`}
                        >
                            {getBadgeText(product.badge)}
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-6">
                    {/* Title */}
                    <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900">
                        {productName}
                    </h2>

                    {/* Description */}
                    <p className="text-gray-600 text-base mb-6 leading-relaxed">
                        {productDescription}
                    </p>

                    {/* Weight and Price */}
                    <div className="flex items-center mb-6 pb-6 border-b border-gray-200">
                        {product.weight > 0 && (
                            <div className="flex items-center gap-4">
                                <span className="font-semibold text-gray-900">
                                    {product.weight} {t("product.weight")}
                                </span>
                            </div>
                        )}
                        <div className="text-right ml-auto">
                            <span className="text-2xl md:text-3xl font-bold text-primary-600">
                                {product.price} {t("product.price")}
                            </span>
                        </div>
                    </div>

                    {/* Add to Cart Button */}
                    <div className="space-y-3">
                        <ProductButton product={product} />
                        {quantityInCart > 0 && (
                            <p className="text-center text-sm text-gray-500">
                                {t("product.inCart")}: {quantityInCart} {t("product.pieces")}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div >
    );
}
