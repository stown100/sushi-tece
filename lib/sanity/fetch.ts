import { createImageUrlBuilder } from "@sanity/image-url";
import { client } from "@/lib/sanity";
import { PRODUCTS_QUERY, PROMOTIONS_QUERY } from "./queries";
import type { Product, Promotion } from "@/types";

const imageBuilder = createImageUrlBuilder(client);

function getSlug(
  slug: { current?: string } | string | undefined,
  fallback: string
): string {
  return typeof slug === "string" ? slug : slug?.current || fallback;
}

function buildLocalized(
  obj: { ru?: string; uk?: string; tr?: string; en?: string } | null | undefined
): { ru: string; uk: string; tr: string; en: string } {
  if (!obj) return { ru: "", uk: "", tr: "", en: "" };
  return {
    ru: obj.ru || "",
    uk: obj.uk || "",
    tr: obj.tr || "",
    en: obj.en || "",
  };
}

function toImageUrl(
  source: { _ref?: string; asset?: { _ref?: string } } | null | undefined
): string {
  if (!source) return "";
  try {
    return imageBuilder.image(source).url();
  } catch {
    return "";
  }
}

interface SanityProduct {
  _id: string;
  slug: { current?: string } | string;
  name?: { ru?: string; uk?: string; tr?: string; en?: string } | null;
  description?: { ru?: string; uk?: string; tr?: string; en?: string } | null;
  category: string;
  subcategory?: string;
  price: number;
  weight: number;
  image?: { _ref?: string; asset?: { _ref?: string } } | null;
  badge?: string;
  utensils?: string;
  recommendations?: string[];
}

export async function fetchProducts(): Promise<Product[]> {
  try {
    const raw = await client.fetch<SanityProduct[]>(PRODUCTS_QUERY);
    if (!raw?.length) return [];

    return raw.map((item) => ({
      id: getSlug(item.slug, item._id),
      name: buildLocalized(item.name),
      description: buildLocalized(item.description),
      category: item.category as Product["category"],
      subcategory: item.subcategory as Product["subcategory"],
      price: item.price ?? 0,
      weight: item.weight ?? 0,
      image: toImageUrl(item.image),
      badge: item.badge as Product["badge"],
      utensils: item.utensils as Product["utensils"],
      recommendations: item.recommendations?.filter(Boolean),
    }));
  } catch {
    return [];
  }
}

interface SanityPromotion {
  _id: string;
  slug: { current?: string } | string;
  title?: { ru?: string; uk?: string; tr?: string; en?: string } | null;
  description?: { ru?: string; uk?: string; tr?: string; en?: string } | null;
  image?: { _ref?: string; asset?: { _ref?: string } } | null;
  link?: string;
}

export async function fetchPromotions(): Promise<Promotion[]> {
  try {
    const raw = await client.fetch<SanityPromotion[]>(PROMOTIONS_QUERY);
    if (!raw?.length) return [];

    return raw.map((item) => ({
      id: getSlug(item.slug, item._id),
      title: buildLocalized(item.title),
      description: buildLocalized(item.description),
      image: toImageUrl(item.image),
      link: item.link,
    }));
  } catch {
    return [];
  }
}
