"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PRODUCTS } from "./products";

type CartState = {
  items: Record<string, number>;
  open: boolean;
  add: (id: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  setOpen: (open: boolean) => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: {},
      open: false,
      add: (id, qty = 1) =>
        set((s) => ({ items: { ...s.items, [id]: (s.items[id] ?? 0) + qty }, open: true })),
      setQty: (id, qty) =>
        set((s) => {
          const items = { ...s.items };
          if (qty <= 0) delete items[id];
          else items[id] = qty;
          return { items };
        }),
      remove: (id) =>
        set((s) => {
          const items = { ...s.items };
          delete items[id];
          return { items };
        }),
      clear: () => set({ items: {} }),
      setOpen: (open) => set({ open }),
    }),
    { name: "foodx-cart", partialize: (s) => ({ items: s.items }) }
  )
);

export const cartLines = (items: Record<string, number>) =>
  Object.entries(items)
    .map(([id, qty]) => ({ product: PRODUCTS.find((p) => p.id === id), qty }))
    .filter((l): l is { product: NonNullable<typeof l.product>; qty: number } => !!l.product);

export const DELIVERY_FEE = 1500;
