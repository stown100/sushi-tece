"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslation } from "@/lib/i18n";

export default function Footer() {
  const { language } = useLanguage();
  const t = (key: string) => getTranslation(language, key);

  return (
    <footer className="bg-gray-900 text-white mt-8">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-2">🍣 Sushi Tece</h3>
            <p className="text-gray-400 text-xs">
              {language === "ru" && "Лучшие суши и роллы с доставкой"}
              {language === "uk" && "Найкращі суші та роли з доставкою"}
              {language === "tr" && "Teslimatlı en iyi suşi ve roll"}
              {language === "en" && "Best sushi and rolls with delivery"}
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-2 text-sm">{t("footer.about")}</h4>
            <ul className="space-y-1 text-xs text-gray-400">
              <li>
                <Link
                  href="#about"
                  className="hover:text-white transition-colors"
                >
                  {t("footer.about")}
                </Link>
              </li>
              <li>
                <Link
                  href="#delivery"
                  className="hover:text-white transition-colors"
                >
                  {t("footer.delivery")}
                </Link>
              </li>
              <li>
                <Link
                  href="#loyalty"
                  className="hover:text-white transition-colors"
                >
                  {t("footer.loyalty")}
                </Link>
              </li>
              <li>
                <Link
                  href="#vacancies"
                  className="hover:text-white transition-colors"
                >
                  {t("footer.vacancies")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-semibold mb-2 text-sm">
              {t("footer.contacts")}
            </h4>
            <ul className="space-y-1 text-xs text-gray-400">
              <li>
                <Link
                  href="#allergens"
                  className="hover:text-white transition-colors"
                >
                  {t("footer.allergens")}
                </Link>
              </li>
              <li className="hover:text-white transition-colors">
                {t("header.phone")}: +7 (800) 333-33-23
              </li>
              <li className="hover:text-white transition-colors">
                {t("header.address")}: Москва, ул. Примерная, д. 1
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-2 text-sm">{t("footer.social")}</h4>
            <div className="flex space-x-2">
              <a
                href="https://t.me/sushitece_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <span className="text-2xl">📱</span>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <span className="text-2xl">📘</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-4 pt-4 text-center text-xs text-gray-400">
          <p>{t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
