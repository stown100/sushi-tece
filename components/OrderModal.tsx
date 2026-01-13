"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslation } from "@/lib/i18n";
import { CustomerInfo } from "@/types";

interface OrderModalProps {
  onClose: () => void;
  onSubmit: () => void;
}

export default function OrderModal({ onClose, onSubmit }: OrderModalProps) {
  const { language } = useLanguage();
  const t = (key: string) => getTranslation(language, key);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Сохраняем данные в localStorage
    localStorage.setItem("customerInfo", JSON.stringify(formData));
    onSubmit();
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

          <div className="flex space-x-2 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 btn-secondary"
            >
              {t("modal.order.cancel")}
            </button>
            <button type="submit" className="flex-1 btn-primary">
              {t("modal.order.submit")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
