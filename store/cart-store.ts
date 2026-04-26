"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, Product, PlatformPrice } from "@/types/product";

interface CartState {
  items: CartItem[];
  addItem: (product: Product, platform?: PlatformPrice["platform"]) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  updatePlatform: (productId: string, platform: PlatformPrice["platform"]) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getCheapestTotal: () => { total: number; savings: number; suggestions: { productId: string; platform: PlatformPrice["platform"]; price: number }[] };
}

const getCheapestPlatform = (product: Product): PlatformPrice["platform"] => {
  const availablePrices = product.prices.filter((p) => p.inStock && p.price > 0);
  if (availablePrices.length === 0) return "amazon";
  const cheapest = availablePrices.reduce((min, p) => (p.price < min.price ? p : min));
  return cheapest.platform;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, platform) => {
        const selectedPlatform = platform || getCheapestPlatform(product);
        set((state) => {
          const existingItem = state.items.find((item) => item.product.id === product.id);
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }
          return {
            items: [...state.items, { product, quantity: 1, selectedPlatform }],
          };
        });
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        }));
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        }));
      },

      updatePlatform: (productId, platform) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId ? { ...item, selectedPlatform: platform } : item
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => {
          const price = item.product.prices.find((p) => p.platform === item.selectedPlatform);
          return total + (price?.price || 0) * item.quantity;
        }, 0);
      },

      getCheapestTotal: () => {
        const items = get().items;
        const suggestions: { productId: string; platform: PlatformPrice["platform"]; price: number }[] = [];
        let total = 0;
        let currentTotal = 0;

        items.forEach((item) => {
          const currentPrice = item.product.prices.find((p) => p.platform === item.selectedPlatform);
          currentTotal += (currentPrice?.price || 0) * item.quantity;

          const availablePrices = item.product.prices.filter((p) => p.inStock && p.price > 0);
          if (availablePrices.length > 0) {
            const cheapest = availablePrices.reduce((min, p) => (p.price < min.price ? p : min));
            total += cheapest.price * item.quantity;
            suggestions.push({
              productId: item.product.id,
              platform: cheapest.platform,
              price: cheapest.price,
            });
          }
        });

        return {
          total,
          savings: currentTotal - total,
          suggestions,
        };
      },
    }),
    {
      name: "seeandpack-cart",
    }
  )
);
