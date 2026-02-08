"use client";

import React from "react";
import Image from "next/image";
import { useProducts } from "@/contexts/ProductsContext";
import Promotions from "@/components/Promotions";
import MenuSection from "@/widgets/menu/ui/MenuSection";

export default function Home() {
  const { promotions } = useProducts();

  // Структурированные данные для ресторана (JSON-LD)
  const restaurantSchema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "SUSHI YM",
    image: "/menu/preview.jpg",
    address: {
      "@type": "PostalAddress",
      streetAddress: "DENIZ MAH. 49257 SK. NO:9B/TIC4",
      addressLocality: "MEZITLI",
      addressRegion: "MERSIN",
      addressCountry: "TR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "36.8121",
      longitude: "34.6415",
    },
    telephone: "+905010101089",
    priceRange: "$$",
    servesCuisine: "Japanese",
    menu: "https://sushi-ym.com/#menu",
    acceptsReservations: "False",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "10:00",
        closes: "23:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "150",
    },
    sameAs: [
      "https://www.instagram.com/sushi_ym_mersin",
      "https://t.me/SushiYmBot",
    ],
  };

  return (
    <>
      {/* Структурированные данные для SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }}
      />

      {/* Hero Section */}
      <section className="relative w-full h-[110px] xs:h-[110px] sm:h-[220px] md:h-[260px] lg:h-[320px] xl:h-[320px] 2xl:h-[320px]">
        <Image
          src="/menu/preview.jpg"
          alt="SUSHI YM - Mersin Tece'de En İyi Sushi ve Roll Restoranı"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </section>

      {/* Promotions */}
      <Promotions promotions={promotions} />

      {/* Menu Section */}
      <MenuSection />
    </>
  );
}
