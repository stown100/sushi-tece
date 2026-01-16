"use client";

import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/shared/hooks/useTranslation";
import { Language } from "@/types";

interface LanguageSelectorProps {
  variant?: "desktop" | "mobile";
}

const languages: Array<{ code: Language; label: string }> = [
  { code: "ru", label: "RU" },
  { code: "uk", label: "UK" },
  { code: "tr", label: "TR" },
  { code: "en", label: "EN" },
];

export default function LanguageSelector({
  variant = "desktop",
}: LanguageSelectorProps) {
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation();
  const [showMenu, setShowMenu] = useState(false);

  const currentLanguage =
    languages.find((lang) => lang.code === language) || languages[0];

  if (variant === "mobile") {
    return (
      <div className="pt-4 border-t mt-4">
        <div className="text-xs text-gray-500 mb-2">{t("header.language")}</div>
        <div className="space-y-1">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`w-full text-left px-3 py-2 text-sm rounded hover:bg-gray-100 transition-colors ${
                language === lang.code
                  ? "bg-primary-50 text-primary-600 font-semibold"
                  : "text-gray-700"
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="hidden sm:block relative border-r pr-3">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 transition-colors"
      >
        <span className="text-lg">🌍</span>
        <span className="text-xs font-medium">{currentLanguage.label}</span>
        <span className="text-xs">▼</span>
      </button>

      {showMenu && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShowMenu(false)}
          />
          <div className="absolute right-0 mt-2 w-24 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setShowMenu(false);
                }}
                className={`w-full text-left px-3 py-2 text-xs hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg transition-colors ${
                  language === lang.code
                    ? "bg-primary-50 text-primary-600 font-semibold"
                    : "text-gray-700"
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
