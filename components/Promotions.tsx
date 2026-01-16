"use client";

import React from "react";
import { getLocalizedText } from "@/lib/utils";
import { useTranslation } from "@/shared/hooks/useTranslation";
import { Promotion } from "@/types";

interface PromotionsProps {
  promotions: Promotion[];
}

export default function Promotions({ promotions }: PromotionsProps) {
  const { language } = useTranslation();

  return (
    <section
      id="promotions"
      className="py-6 bg-gradient-to-r from-primary-50 to-primary-100"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {promotions.map((promo) => {
            const title = getLocalizedText(promo.title, language);
            const description = getLocalizedText(promo.description, language);

            return (
              <div key={promo.id} className="card overflow-hidden">
                <div className="h-32 bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                  <span className="text-4xl">🎉</span>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-1">{title}</h3>
                  <p className="text-gray-600 text-sm">{description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
