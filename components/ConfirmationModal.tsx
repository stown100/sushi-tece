"use client";

import React from "react";
import { useTranslation } from "@/shared/hooks/useTranslation";

interface ConfirmationModalProps {
  onClose: () => void;
}

export default function ConfirmationModal({ onClose }: ConfirmationModalProps) {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative text-center transform transition-all duration-300 scale-100">
        <div className="text-6xl mb-4">✅</div>
        <h2 className="text-2xl font-bold mb-4">
          {t("modal.confirmation.title")}
        </h2>
        <p className="text-gray-600 mb-6">{t("modal.confirmation.message")}</p>
        <button onClick={onClose} className="btn-primary w-full">
          {t("modal.confirmation.close")}
        </button>
      </div>
    </div>
  );
}
