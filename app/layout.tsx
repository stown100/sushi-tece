import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { CartProvider } from "@/contexts/CartContext";
import { ProductsProvider } from "@/contexts/ProductsContext";
import Header from "@/widgets/header/ui/Header";
import Footer from "@/widgets/footer/ui/Footer";
import Cart from "@/widgets/cart/ui/Cart";
import MultilingualOGTags from "@/components/MultilingualOGTags";
import {
  fetchCategories,
  fetchProducts,
  fetchPromotions,
} from "@/lib/sanity/fetch";
import "./globals.css";

// Обновлять данные из Sanity (меню, акции) не реже чем раз в 60 секунд
export const revalidate = 60;

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: {
    default: "SUSHI YM - Mersin Tece Sushi Restoranı | Sushi ve Roll Sipariş",
    template: "%s | SUSHI YM",
  },
  description:
    "Mersin Tece'de en iyi sushi ve roll siparişi. SUSHI YM - taze sushi, roll, set, burger ve içecekler. Hızlı teslimat. Online sipariş verin! Adres: DENIZ MAH. 49257 SK. NO:9B/TIC4 MEZITLI, MERSIN TURKIYE",
  keywords: [
    "sushi mersin",
    "roll mersin",
    "sushi tece",
    "mersin sushi restoran",
    "tece sushi",
    "sushi sipariş mersin",
    "japon yemekleri mersin",
    "sushi teslimat",
    "roll sipariş",
    "mersin sushi",
    "sushi ym",
    "sushi mersin tece",
    "sushi restoran mersin",
    "sushi delivery mersin",
    "суши мерсин",
    "роллы мерсин",
    "доставка суши мерсин",
  ],
  authors: [{ name: "SUSHI YM" }],
  creator: "SUSHI YM",
  publisher: "SUSHI YM",
  formatDetection: {
    email: false,
    address: false,
    telephone: true,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://sushi-ym.com"),
  alternates: {
    canonical: "/",
    languages: {
      "tr-TR": "/tr",
      "ru-RU": "/ru",
      "uk-UA": "/uk",
      "en-US": "/en",
    },
  },
  other: {
    "geo.region": "TR-33",
    "geo.placename": "Mersin, Tece",
    "geo.position": "36.8121;34.6415",
    ICBM: "36.8121, 34.6415",
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    alternateLocale: ["ru_RU", "uk_UA", "en_US"],
    url: "/",
    siteName: "SUSHI YM",
    title: "SUSHI YM - Mersin Tece Sushi Restoranı | Sushi ve Roll Sipariş",
    description:
      "Mersin Tece'de en iyi sushi ve roll siparişi. Taze sushi, roll, set, burger ve içecekler. Hızlı teslimat.",
    images: [
      {
        url: "/menu/preview.jpg",
        width: 1200,
        height: 630,
        alt: "SUSHI YM - Mersin Tece Sushi Restoranı",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SUSHI YM - Mersin Tece Sushi Restoranı",
    description: "Mersin Tece'de en iyi sushi ve roll siparişi. Hızlı teslimat.",
    images: ["/menu/preview.jpg"],
    creator: "@sushi_ym_mersin",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/sushiymlogo.png", type: "image/png", sizes: "any" },
    ],
    apple: [{ url: "/sushiymlogo.png", type: "image/png" }],
  },
  verification: {
    // Добавьте здесь коды верификации для Google Search Console и Yandex Webmaster
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [products, promotions, categories] = await Promise.all([
    fetchProducts(),
    fetchPromotions(),
    fetchCategories(),
  ]);

  return (
    <html lang="tr">
      <body className={inter.className}>
        <MultilingualOGTags />
        <LanguageProvider>
          <ProductsProvider
            products={products}
            promotions={promotions}
            categories={categories}
          >
            <CartProvider>
              <Header />
              <main>{children}</main>
              <Footer />
              <Cart />
            </CartProvider>
          </ProductsProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
