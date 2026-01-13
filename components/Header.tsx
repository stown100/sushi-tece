"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCart } from "@/contexts/CartContext";
import { getTranslation } from "@/lib/i18n";

export default function Header() {
  const { language, setLanguage } = useLanguage();
  const { getTotalItems, openCart } = useCart();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  const t = (key: string) => getTranslation(language, key);
  const totalItems = getTotalItems();

  const languages = [
    { code: "ru" as const, label: "RU" },
    { code: "uk" as const, label: "UK" },
    { code: "tr" as const, label: "TR" },
    { code: "en" as const, label: "EN" },
  ];

  const currentLanguage =
    languages.find((lang) => lang.code === language) || languages[0];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-2">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-primary-600">
              🍣 Sushi Tece
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              {t("nav.menu")}
            </Link>
            <Link
              href="#promotions"
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              {t("nav.promotions")}
            </Link>
            <Link
              href="#about"
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              {t("nav.about")}
            </Link>
            <Link
              href="#contacts"
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              {t("nav.contacts")}
            </Link>
          </nav>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Language Selector Dropdown */}
            <div className="hidden sm:block relative border-r pr-3">
              <button
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <span className="text-lg">🌍</span>
                <span className="text-xs font-medium">
                  {currentLanguage.label}
                </span>
                <span className="text-xs">▼</span>
              </button>

              {showLanguageMenu && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowLanguageMenu(false)}
                  />
                  <div className="absolute right-0 mt-2 w-24 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setShowLanguageMenu(false);
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

            {/* Contact Info */}
            <div className="hidden lg:flex flex-col text-sm">
              <div className="text-gray-600">
                <span className="font-semibold">{t("header.phone")}:</span> +7
                (800) 333-33-23
              </div>
              <div className="text-gray-600">
                <span className="font-semibold">{t("header.address")}:</span>{" "}
                Москва, ул. Примерная, д. 1
              </div>
            </div>

            {/* Telegram Link */}
            <a
              href="https://t.me/sushitece_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center space-x-1 text-blue-500 hover:text-blue-600 transition-colors"
            >
              <span className="text-xl">📱</span>
              <span className="text-sm">{t("header.telegram")}</span>
            </a>

            {/* Cart Button */}
            <button
              onClick={openCart}
              className="relative flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <span>🛒</span>
              <span className="hidden sm:inline">{t("header.cart")}</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden text-gray-700 hover:text-primary-600"
            >
              {showMobileMenu ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className="md:hidden">
        {/* Overlay */}
        {showMobileMenu && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
            onClick={() => setShowMobileMenu(false)}
          />
        )}

        {/* Mobile Menu */}
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
            showMobileMenu
              ? "translate-x-0"
              : "translate-x-full pointer-events-none"
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-bold text-lg">{t("header.mobileMenu")}</h3>
              <button
                onClick={() => setShowMobileMenu(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto p-4 space-y-2">
              <Link
                href="/"
                onClick={() => setShowMobileMenu(false)}
                className="block text-gray-700 hover:text-primary-600 py-2 transition-colors"
              >
                {t("nav.menu")}
              </Link>
              <Link
                href="#promotions"
                onClick={() => setShowMobileMenu(false)}
                className="block text-gray-700 hover:text-primary-600 py-2 transition-colors"
              >
                {t("nav.promotions")}
              </Link>
              <Link
                href="#about"
                onClick={() => setShowMobileMenu(false)}
                className="block text-gray-700 hover:text-primary-600 py-2 transition-colors"
              >
                {t("nav.about")}
              </Link>
              <Link
                href="#contacts"
                onClick={() => setShowMobileMenu(false)}
                className="block text-gray-700 hover:text-primary-600 py-2 transition-colors"
              >
                {t("nav.contacts")}
              </Link>

              {/* Language Selector */}
              <div className="pt-4 border-t mt-4">
                <div className="text-xs text-gray-500 mb-2">
                  {t("header.language")}
                </div>
                <div className="space-y-1">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                      }}
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
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
