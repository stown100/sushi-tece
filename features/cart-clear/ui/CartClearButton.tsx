"use client";

import React, { useState } from "react";
import { useTranslation } from "@/shared/hooks/useTranslation";

interface CartClearButtonProps {
  onClear: () => void;
}

export default function CartClearButton({ onClear }: CartClearButtonProps) {
  const { t } = useTranslation();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleClick = () => {
    if (showConfirm) {
      onClear();
      setShowConfirm(false);
    } else {
      setShowConfirm(true);
    }
  };

  if (showConfirm) {
    return (
      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
        <p className="text-sm text-yellow-800 mb-2">{t("cart.clearConfirm")}</p>
        <div className="flex space-x-2">
          <button
            onClick={handleClick}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded text-sm"
          >
            {t("cart.yes")}
          </button>
          <button
            onClick={() => setShowConfirm(false)}
            className="flex-1 bg-gray-200 hover:bg-gray-300 py-1 px-3 rounded text-sm"
          >
            {t("cart.no")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={handleClick}
      className="mt-4 w-full text-red-500 hover:text-red-700 py-2 text-sm font-semibold"
    >
      {t("cart.clear")}
    </button>
  );
}
