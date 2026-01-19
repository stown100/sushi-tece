import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { CartProvider } from "@/contexts/CartContext";
import Header from "@/widgets/header/ui/Header";
import Footer from "@/widgets/footer/ui/Footer";
import Cart from "@/widgets/cart/ui/Cart";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "SUSHI YM - Доставка суши и роллов",
  description:
    "Лучшие суши, роллы, наборы, бургеры и напитки с доставкой. Заказывайте онлайн!",
  keywords: "суши, роллы, доставка, еда, японская кухня",
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/sushiymlogo.png", type: "image/png", sizes: "any" },
    ],
    apple: [{ url: "/sushiymlogo.png", type: "image/png" }],
  },
  openGraph: {
    title: "SUSHI YM - Доставка суши и роллов",
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
