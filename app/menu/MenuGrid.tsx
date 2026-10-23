"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { CATEGORIES, PRODUCTS, type Category } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { LiquidGlass } from "@/components/LiquidGlass";

export function MenuGrid() {
  const params = useSearchParams();
  const router = useRouter();
  const active = (params.get("c") as Category | null) ?? "all";
  const list = active === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === active);

  return (
    <section className="bg-cherry pb-24">
      <div className="sticky top-20 z-30 mx-auto max-w-6xl px-5 pt-6 md:top-24">
        <LiquidGlass dark className="flex gap-1 overflow-x-auto rounded-full p-1.5 [scrollbar-width:none]">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => router.replace(c.id === "all" ? "/menu" : `/menu?c=${c.id}`, { scroll: false })}
              className="relative shrink-0 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider"
            >
              {active === c.id && <motion.span layoutId="menu-pill" className="absolute inset-0 rounded-full bg-cream" />}
              <span className={`relative ${active === c.id ? "text-ink" : "text-cream"}`}>{c.label}</span>
            </button>
          ))}
        </LiquidGlass>
      </div>
      <motion.div layout className="mx-auto mt-10 grid max-w-6xl grid-cols-2 gap-4 px-5 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {list.map((p) => (
            <motion.div
              layout
              key={p.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <ProductCard product={p} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
