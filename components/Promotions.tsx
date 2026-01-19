"use client";

import React from "react";
import Image from "next/image";
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {promotions.map((promo) => {
            const title = getLocalizedText(promo.title, language);
            const description = getLocalizedText(promo.description, language);

            const content = (
              <div key={promo.id} className="card overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
                <div className="relative h-40 bg-gradient-to-br from-primary-400 to-primary-600 overflow-hidden">
                  <Image
                    src={promo.image}
                    alt={title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2">
                    <h3 className="text-lg font-bold text-white drop-shadow-lg">
                      {title}
                    </h3>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-600 text-sm">{description}</p>
                </div>
              </div>
            );

            if (promo.link) {
              return (
                <a
                  key={promo.id}
                  href={promo.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  {content}
                </a>
              );
            }

            return content;
          })}
        </div>
      </div>
    </section>
  );
}
