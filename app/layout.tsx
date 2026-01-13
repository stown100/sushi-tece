import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { CartProvider } from "@/contexts/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Cart from "@/components/Cart";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "Sushi Tece - Доставка суши и роллов",
  description:
    "Лучшие суши, роллы, наборы, бургеры и напитки с доставкой. Заказывайте онлайн!",
  keywords: "суши, роллы, доставка, еда, японская кухня",
  openGraph: {
    title: "Sushi Tece - Доставка суши и роллов",
    description: "Лучшие суши, роллы, наборы, бургеры и напитки с доставкой",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <LanguageProvider>
          <CartProvider>
            <Header />
            <main>{children}</main>
            <Footer />
            <Cart />
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
