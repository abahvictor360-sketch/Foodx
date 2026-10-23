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
      className="group flex h-full flex-col rounded-xl bg-cream p-2.5 text-ink shadow-[0_18px_40px_-20px_rgba(0,0,0,0.6)]"
    >
      <div className={`relative overflow-hidden rounded-lg bg-sand ${compact ? "aspect-[5/4]" : "aspect-square"}`}>
        {product.tag && (
          <span className="absolute left-2 top-2 z-10 rounded-full bg-cherry px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-cream">
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
      {/* Stack name over price on phones so long names never push the price off the card */}
      <div className="flex flex-col gap-0.5 px-1.5 pt-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-2">
        <h3 className={`font-condensed leading-tight ${compact ? "text-base" : "text-[17px] sm:text-lg md:text-xl"}`}>{product.name}</h3>
        <span className={`shrink-0 font-mono font-semibold ${compact ? "text-sm" : "text-sm sm:text-base"}`}>{formatNaira(product.price)}</span>
      </div>
      {!compact && <p className="line-clamp-3 px-1.5 pt-1 font-mono text-xs leading-relaxed text-ink/75 sm:line-clamp-none">{product.blurb}</p>}
      <div className="h-3 shrink-0" />
      <button
        onClick={() => add(product.id)}
        className={`btn mt-auto justify-center whitespace-nowrap !px-2 !tracking-[0.05em] sm:!px-5 sm:!tracking-[0.08em] ${accent ? "btn-cherry" : "btn-cocoa"} ${compact ? "py-2 text-[11px]" : ""}`}
      >
        Add to cart
      </button>
    </motion.article>
  );
}
