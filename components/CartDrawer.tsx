"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cartLines, useCart } from "@/lib/cart";
import { formatNaira } from "@/lib/products";
import { LiquidGlass } from "./LiquidGlass";

export function CartDrawer() {
  const { items, open, setOpen, setQty } = useCart();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setOpen]);

  if (!mounted) return null;
  const lines = cartLines(items);
  const subtotal = lines.reduce((s, l) => s + l.product.price * l.qty, 0);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[60] bg-ink/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
          <motion.aside
            className="fixed inset-y-0 right-0 z-[70] w-full max-w-md p-3"
            initial={{ x: "105%" }}
            animate={{ x: 0 }}
            exit={{ x: "105%" }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            aria-label="Shopping cart"
            data-lenis-prevent
          >
            <LiquidGlass dark className="flex h-full flex-col rounded-3xl !bg-cocoa-deep/95 p-5">
              <div className="flex items-center justify-between">
                <h2 className="font-condensed text-3xl font-bold uppercase">Your box</h2>
                <button onClick={() => setOpen(false)} className="grid h-9 w-9 place-items-center rounded-full bg-cream/15 text-xl" aria-label="Close cart">
                  ×
                </button>
              </div>
              <div className="mt-5 flex-1 space-y-3 overflow-y-auto pr-1">
                {lines.length === 0 && (
                  <p className="mt-10 text-center font-mono text-sm text-cream/85">Your box is empty. Go pick something sweet.</p>
                )}
                {lines.map(({ product, qty }) => (
                  <div key={product.id} className="flex items-center gap-3 rounded-2xl bg-cream/10 p-2.5">
                    <div className="relative h-16 w-16 shrink-0 rounded-xl bg-cream/90">
                      <Image src={product.image} alt="" fill sizes="64px" className="object-contain p-1.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-condensed text-lg leading-tight">{product.name}</p>
                      <p className="font-mono text-xs text-cream/85">{formatNaira(product.price)}</p>
                    </div>
                    <div className="flex items-center gap-1 rounded-full bg-ink/40 p-1">
                      <button className="h-7 w-7 rounded-full hover:bg-cream/20" onClick={() => setQty(product.id, qty - 1)} aria-label="Decrease">
                        −
                      </button>
                      <span className="w-5 text-center font-mono text-sm">{qty}</span>
                      <button className="h-7 w-7 rounded-full hover:bg-cream/20" onClick={() => setQty(product.id, qty + 1)} aria-label="Increase">
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 border-t border-cream/20 pt-4">
                <div className="flex justify-between font-mono text-sm">
                  <span>Subtotal</span>
                  <span>{formatNaira(subtotal)}</span>
                </div>
                <Link
                  href="/cart"
                  onClick={() => setOpen(false)}
                  className={`btn btn-cream mt-4 w-full justify-center ${lines.length ? "" : "pointer-events-none opacity-50"}`}
                >
                  Checkout »
                </Link>
              </div>
            </LiquidGlass>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
