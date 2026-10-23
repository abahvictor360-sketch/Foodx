"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useCart } from "@/lib/cart";
import { formatNaira, type Product } from "@/lib/products";

export function ProductCard({ product, compact = false, accent = false }: { product: Product; compact?: boolean; accent?: boolean }) {
  const add = useCart((s) => s.add);
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group flex flex-col rounded-xl bg-cream p-2.5 text-ink shadow-[0_18px_40px_-20px_rgba(0,0,0,0.6)]"
    >
      <div className={`relative overflow-hidden rounded-lg bg-sand ${compact ? "aspect-[5/4]" : "aspect-square"}`}>
        {product.tag && (
          <span className="absolute left-2 top-2 z-10 rounded-full bg-cherry px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-cream">
            {product.tag}
          </span>
        )}
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-contain p-4 drop-shadow-[0_18px_18px_rgba(60,20,10,0.35)] transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3"
        />
      </div>
      <div className="flex items-baseline justify-between gap-2 px-1.5 pt-3">
        <h3 className={`font-condensed leading-tight ${compact ? "text-base" : "text-lg md:text-xl"}`}>{product.name}</h3>
        <span className={`shrink-0 font-mono font-semibold ${compact ? "text-sm" : "text-base"}`}>{formatNaira(product.price)}</span>
      </div>
      {!compact && <p className="px-1.5 pt-1 font-mono text-[11px] leading-relaxed text-ink/60">{product.blurb}</p>}
      <button
        onClick={() => add(product.id)}
        className={`btn mt-3 justify-center ${accent ? "btn-cherry" : "btn-cocoa"} ${compact ? "py-2 text-[10px]" : ""}`}
      >
        Add to cart
      </button>
    </motion.article>
  );
}
