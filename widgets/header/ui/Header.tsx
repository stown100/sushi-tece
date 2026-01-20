"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";
import { useTranslation } from "@/shared/hooks/useTranslation";
import TelegramIcon from "@/shared/ui/TelegramIcon";
import InstagramIcon from "@/shared/ui/InstagramIcon";
import LanguageSelector from "@/features/language-selector/ui/LanguageSelector";
import MobileMenu from "@/features/mobile-menu/ui/MobileMenu";

export default function Header() {
  const { getTotalItems, openCart } = useCart();
  const { t } = useTranslation();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const totalItems = getTotalItems();

  const handleMenuClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const menuSection = document.getElementById("menu");
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-2">
          {/* Logo */}
          <Link href="/" className="flex items-center" aria-label="SUSHI YM Ana Sayfa">
            <div className="relative h-12 w-12 rounded-full overflow-hidden">
              <Image
                src="/sushiymlogo.png"
                alt="SUSHI YM - Mersin Tece Sushi Restoranı Logo"
                className="object-cover"
                priority
                width={48}
                height={48}
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a
              href="#menu"
              onClick={handleMenuClick}
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              {t("nav.menu")}
            </a>
            <Link
              href="#promotions"
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              {t("nav.promotions")}
            </Link>
          </nav>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            <LanguageSelector variant="desktop" />

            {/* Contact Info */}
            <div className="hidden lg:flex flex-col text-xs">
              <div className="text-gray-600 text-xs">
                <span className="font-semibold">{t("header.phone")}: </span>
                <span className="text-[10px] leading-tight">
                  +90 50 101010 89
                </span>
              </div>
              <div className="text-gray-600 text-xs">
                <span className="font-semibold">{t("header.address")}: </span>
                <span className="text-[10px] leading-tight">
                  DENIZ MAH. 49257
                  <br />
                  SK. NO:9B/TIC4 MEZITLI MERSIN TURKIYE
                </span>
              </div>
            </div>

            {/* Social Links */}
            <div className="hidden md:flex items-center space-x-2">
              <a
                href="https://t.me/SushiYmBot"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
              >
                <TelegramIcon size="md" />
              </a>
              <a
                href="https://www.instagram.com/sushi_ym_mersin"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <InstagramIcon size="md" />
              </a>
            </div>

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

      <MobileMenu
        isOpen={showMobileMenu}
        onClose={() => setShowMobileMenu(false)}
      />
    </header>
  );
}
