"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { Product, CartItem } from "@/types";
import { utensilsProducts } from "@/lib/utensils";
import { useProducts } from "@/contexts/ProductsContext";

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  addRecommendation: (productId: string) => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { products } = useProducts();
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Загружаем корзину из localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Error loading cart from localStorage", e);
      }
    }
  }, []);

  // Сохраняем корзину в localStorage при изменении
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem("cart", JSON.stringify(items));
    } else {
      localStorage.removeItem("cart");
    }
  }, [items]);

  const addToCart = useCallback((product: Product) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      const newItem: CartItem = { ...product, quantity: 1 };
      const updatedItems = [...prevItems, newItem];

      // Вилка: WOK, Рамен, Паста и ризотто, Горячие блюда
      // Палочки: Сеты, Роллы, Суши, Темпура
      const forkCategories = ["wok", "ramen", "pasta-risotto", "hot-dishes"];
      const chopsticksCategories = ["sets", "rolls", "sushi", "tempura"];
      const utensilsType = forkCategories.includes(product.category)
        ? "fork"
        : chopsticksCategories.includes(product.category)
          ? "chopsticks"
          : null;

      if (utensilsType) {
        const utensilsId =
          utensilsType === "chopsticks"
            ? "utensils-chopsticks"
            : "utensils-fork";
        const utensilsProduct = utensilsProducts.find((p) => p.id === utensilsId);

        if (utensilsProduct) {
          const existingUtensils = prevItems.find(
            (item) => item.id === utensilsId
          );
          if (!existingUtensils) {
            return [...updatedItems, { ...utensilsProduct, quantity: 1 }];
          }
        }
      }

      return updatedItems;
    });
  }, [products]);

  const removeFromCart = useCallback((productId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  }, []);

  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(productId);
        return;
      }

      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    },
    [removeFromCart]
  );

  const clearCart = useCallback(() => {
    setItems([]);
    localStorage.removeItem("cart");
  }, []);

  const getTotalPrice = useCallback(() => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [items]);

  const getTotalItems = useCallback(() => {
    return items.reduce((total, item) => total + item.quantity, 0);
  }, [items]);

  const addRecommendation = useCallback(
    (productId: string) => {
      const product = products.find((p) => p.id === productId);
      if (product) {
        addToCart(product);
      }
    },
    [addToCart, products]
  );

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getTotalItems,
        addRecommendation,
        isOpen,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
