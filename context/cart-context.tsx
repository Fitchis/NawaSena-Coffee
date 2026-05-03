"use client";

import { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  product_id: string;
  name: string;
  price: number;
  quantity: number;
  image_url?: string | null;
  // optional customization
  options?: {
    sugar?: string;
    ice?: string;
  };
  addons?: { id?: string; name: string; price: number }[];
  // unique line key
  key?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (itemKey: string) => void;
  updateQuantity: (itemKey: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "nawasena_cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setItems(JSON.parse(stored));
      } catch (error) {
        console.error("[v0] Error loading cart:", error);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, isLoaded]);

  const addItem = (newItem: CartItem) => {
    setItems((prev) => {
      // ensure newItem has a unique key representing product + options + addons
      const key = `${newItem.product_id}|${JSON.stringify(newItem.options || {})}|${JSON.stringify(newItem.addons || [])}`;
      newItem.key = key;

      // merge only when same key
      const existingIndex = prev.findIndex((item) => item.key === key);

      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + newItem.quantity,
        };
        return updated;
      }

      return [...prev, newItem];
    });
  };

  const removeItem = (itemKey: string) => {
    setItems((prev) => prev.filter((item) => item.key !== itemKey));
  };

  const updateQuantity = (itemKey: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemKey);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.key === itemKey ? { ...item, quantity } : item)),
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  // calculate total including add-ons per item
  const total = items.reduce((sum, item) => {
    const addonsSum = (item.addons || []).reduce(
      (a, b) => a + (b.price || 0),
      0,
    );
    return sum + (item.price + addonsSum) * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
