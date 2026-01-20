"use client";

import React from "react";
import Image from "next/image";
import { promotions } from "@/data/promotions";
import Promotions from "@/components/Promotions";
import MenuSection from "@/widgets/menu/ui/MenuSection";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full h-[300px] md:h-[300px]">
        <Image
          src="/menu/preview.jpg"
          alt="SUSHI YM"
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
