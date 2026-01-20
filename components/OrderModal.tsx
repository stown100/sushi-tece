"use client";

import React, { useState, useEffect } from "react";
import { useTranslation } from "@/shared/hooks/useTranslation";
import { CustomerInfo, CartItem } from "@/types";

interface OrderModalProps {
  onClose: () => void;
  onSubmit: () => void;
  items: CartItem[];
  totalPrice: number;
}

export default function OrderModal({ onClose, onSubmit, items, totalPrice }: OrderModalProps) {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<CustomerInfo>({
    name: "",
    phone: "",
  });

  // Загружаем данные из localStorage
  useEffect(() => {
    const savedInfo = localStorage.getItem("customerInfo");
    if (savedInfo) {
      try {
        setFormData(JSON.parse(savedInfo));
      } catch (e) {
        console.error("Error loading customer info", e);
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      // Сохраняем данные в localStorage
      localStorage.setItem("customerInfo", JSON.stringify(formData));

      // Генерируем ID заказа на основе timestamp
      const orderId = Date.now();

      // Отправляем заказ на сервер
      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerInfo: formData,
          items,
          totalPrice,
          orderId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || t("modal.order.error"));
      }

      // Если успешно, вызываем onSubmit
      onSubmit();
    } catch (err) {
      console.error("Error submitting order:", err);
      setError(err instanceof Error ? err.message : t("modal.order.error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative transform transition-all duration-300 scale-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
        >
          ×
        </button>

        <h2 className="text-xl font-bold mb-3">{t("modal.order.title")}</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {t("modal.order.name")}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder={t("modal.order.name")}
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {t("modal.order.phone")}
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="+7 (999) 123-45-67"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded text-red-800 text-sm">
              {error}
            </div>
          )}

          <div className="flex space-x-2 pt-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t("modal.order.cancel")}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? t("modal.order.submitting") : t("modal.order.submit")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
