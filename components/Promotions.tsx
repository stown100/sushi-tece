"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { getLocalizedText } from "@/lib/utils";
import { useTranslation } from "@/shared/hooks/useTranslation";
import { Promotion } from "@/types";

interface PromotionsProps {
  promotions: Promotion[];
}

export default function Promotions({ promotions }: PromotionsProps) {
  const { language } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Определяем, нужно ли автопрокручивание
  const shouldAutoPlay = isMobile || promotions.length > 3;

  // Определяем количество видимых элементов
  const itemsPerView = isMobile ? 1 : 3;
  // На мобильных - один слайд = один элемент, на десктопе - один слайд = один элемент (если элементов больше 3)
  const totalSlides = isMobile
    ? promotions.length
    : promotions.length > 3
      ? promotions.length - itemsPerView + 1
      : 1;

  useEffect(() => {
    // Определяем размер экрана
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // Сбрасываем индекс при изменении размера экрана
      setCurrentIndex(0);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
    if (!shouldAutoPlay) return;

    // Очищаем предыдущий интервал
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Устанавливаем новый интервал
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    }, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [shouldAutoPlay, totalSlides]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    // Сбрасываем таймер при ручной навигации
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    }, 5000);
  };

  const renderPromoCard = (promo: Promotion) => {
    const title = getLocalizedText(promo.title, language);
    const description = getLocalizedText(promo.description, language);

    const content = (
      <div className="card overflow-hidden cursor-pointer hover:shadow-lg transition-shadow h-full">
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
          className="block h-full"
        >
          {content}
        </a>
      );
    }

    return <div key={promo.id}>{content}</div>;
  };

  return (
    <section
      id="promotions"
      className="py-6 bg-gradient-to-r from-primary-50 to-primary-100"
    >
      <div className="container mx-auto px-4">
        <div className="relative">
          {/* Слайдер */}
          <div className="overflow-hidden">
            {isMobile ? (
              // Мобильная версия - горизонтальный слайдер
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                }}
              >
                {promotions.map((promo) => (
                  <div key={promo.id} className="min-w-full px-2">
                    {renderPromoCard(promo)}
                  </div>
                ))}
              </div>
            ) : (
              // Десктопная версия
              shouldAutoPlay ? (
                // Если нужно автопрокручивание - показываем слайдер
                <div className="overflow-hidden">
                  <div
                    className="flex transition-transform duration-500 ease-in-out gap-4"
                    style={{
                      transform: `translateX(calc(-${currentIndex} * ((100% - ${(itemsPerView - 1) * 1}rem) / ${itemsPerView} + 1rem)))`,
                    }}
                  >
                    {promotions.map((promo) => (
                      <div
                        key={promo.id}
                        className="flex-shrink-0"
                        style={{
                          width: `calc((100% - ${(itemsPerView - 1) * 1}rem) / ${itemsPerView})`,
                        }}
                      >
                        {renderPromoCard(promo)}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                // Если автопрокручивание не нужно - обычная сетка
                <div className="grid grid-cols-2 gap-4">
                  {promotions.map((promo) => renderPromoCard(promo))}
                </div>
              )
            )}
          </div>

          {/* Индикаторы */}
          {shouldAutoPlay && totalSlides > 1 && (
            <div className="flex justify-center gap-2 mt-4">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all ${index === currentIndex
                      ? "bg-primary-600 w-8"
                      : "bg-gray-300 w-2 hover:bg-gray-400"
                    }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
