"use client";

import React from "react";
import Link from "next/link";
import { useTranslation } from "@/shared/hooks/useTranslation";
import TelegramIcon from "@/shared/ui/TelegramIcon";
import InstagramIcon from "@/shared/ui/InstagramIcon";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-900 text-white mt-8">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-2">🍣 SUSHI YM</h3>
            <p className="text-gray-400 text-xs">{t("hero.description")}</p>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-semibold mb-2 text-sm">
              {t("footer.contacts")}
            </h4>
            <ul className="space-y-1 text-xs text-gray-400">
              <li className="hover:text-white transition-colors">
                {t("header.phone")}: +90 50 101010 89
              </li>
              <li className="hover:text-white transition-colors text-[10px] leading-tight">
                <span className="font-semibold">{t("header.address")}:</span>
                <br />
                DENIZ MAH. 49257 SK. NO:9B/TIC4 MEZITLI
                <br />
                MERSIN TURKIYE
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
                aria-label="Telegram"
              >
                <TelegramIcon size="lg" />
              </a>
              <a
                href="https://www.instagram.com/sushi_ym_mersin"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <InstagramIcon size="lg" />
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
