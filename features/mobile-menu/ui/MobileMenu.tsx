"use client";

import React from "react";
import Link from "next/link";
import { useTranslation } from "@/shared/hooks/useTranslation";
import LanguageSelector from "@/features/language-selector/ui/LanguageSelector";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { t } = useTranslation();

  const handleMenuClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClose();
    const menuSection = document.getElementById("menu");
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full pointer-events-none"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="font-bold text-lg">{t("header.mobileMenu")}</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            <a
              href="#menu"
              onClick={handleMenuClick}
              className="block text-gray-700 hover:text-primary-600 py-2 transition-colors"
            >
              {t("nav.menu")}
            </a>
            <Link
              href="#promotions"
              onClick={onClose}
              className="block text-gray-700 hover:text-primary-600 py-2 transition-colors"
            >
              {t("nav.promotions")}
            </Link>

            {/* Language Selector */}
            <LanguageSelector variant="mobile" />
          </nav>
        </div>
      </div>
    </>
  );
}
