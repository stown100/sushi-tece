"use client";

import React from "react";
import { useTranslation } from "@/shared/hooks/useTranslation";
import { promotions } from "@/data/promotions";
import Promotions from "@/components/Promotions";
import MenuSection from "@/widgets/menu/ui/MenuSection";

export default function Home() {
  const { t } = useTranslation();

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-500 to-primary-700 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-2">🍣 SUSHI YM</h1>
          <p className="text-lg mb-4">{t("hero.description")}</p>
          <a
            href="#menu"
            className="inline-block bg-white text-primary-600 font-semibold py-2 px-6 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              const menuSection = document.getElementById("menu");
              if (menuSection) {
                menuSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            {t("nav.menu")}
          </a>
        </div>
      </section>

      {/* Promotions */}
      <Promotions promotions={promotions} />

      {/* Menu Section */}
      <MenuSection />
    </>
  );
}
