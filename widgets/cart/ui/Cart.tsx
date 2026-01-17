"use client";

import React, { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useTranslation } from "@/shared/hooks/useTranslation";
import OrderModal from "@/components/OrderModal";
import ConfirmationModal from "@/components/ConfirmationModal";
import CartItem from "@/shared/ui/CartItem";
import CartClearButton from "@/features/cart-clear/ui/CartClearButton";

export default function Cart() {
  const { items, isOpen, closeCart, clearCart, getTotalPrice } = useCart();
  const { t } = useTranslation();
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleCheckout = () => {
    setShowOrderModal(true);
  };

  const handleOrderSubmit = () => {
    setShowOrderModal(false);
    setShowConfirmationModal(true);
    clearCart();
  };

  const totalPrice = getTotalPrice();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={closeCart}
        />
      )}

      {/* Cart Sidebar */}
      <div
        className={`fixed right-0 top-0 h-full w-full md:w-96 bg-white shadow-2xl z-50 flex flex-col transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full pointer-events-none"
          }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b">
          <h2 className="text-lg font-bold">{t("cart.title")}</h2>
          <button
            onClick={closeCart}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-3">
          {items.length === 0 ? (
            <div className="text-center text-gray-500 mt-8">
              {t("cart.empty")}
            </div>
          ) : (
            <>
              {/* Items */}
              <div className="space-y-4">
                {items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>

              <CartClearButton onClear={clearCart} />
            </>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t p-4 bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">{t("cart.total")}:</span>
              <span className="text-xl font-bold text-primary-600">
                {totalPrice} {t("product.price")}
              </span>
            </div>
            <button onClick={handleCheckout} className="w-full btn-primary">
              {t("cart.checkout")}
            </button>
          </div>
        )}
      </div>

      {/* Modals */}
      {showOrderModal && (
        <OrderModal
          onClose={() => setShowOrderModal(false)}
          onSubmit={handleOrderSubmit}
        />
      )}
      {showConfirmationModal && (
        <ConfirmationModal onClose={() => setShowConfirmationModal(false)} />
      )}
    </>
  );
}
