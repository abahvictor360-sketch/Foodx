"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { LiquidGlass } from "./LiquidGlass";

const HeroScene = dynamic(() => import("./three/HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full place-items-center">
      <div className="h-40 w-40 animate-pulse rounded-full border-[28px] border-cream/20" />
    </div>
  ),
});

const FLAVOURS = [
  { name: "Strawberry", icing: "#f29ab8", img: "/images/donut-pink.webp" },
  { name: "Cocoa", icing: "#4a2414", img: "/images/donut-drip.webp" },
  { name: "Vanilla", icing: "#f6eecf", img: "/images/cupcake-vanilla.webp" },
  { name: "Caramel", icing: "#c9813a", img: "/images/cinnamon-rolls.webp" },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const [flavour, setFlavour] = useState(0);
  return (
    <section className="doodle-bg relative min-h-[100svh] overflow-hidden bg-cocoa pt-24">
      <div className="mx-auto max-w-6xl px-5">
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease }}
          className="text-center font-display text-[17vw] uppercase leading-[0.85] text-cream md:text-[9.5rem]"
        >
          Bake &amp; Shake
        </motion.h1>
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-6 px-5 md:grid-cols-[1fr_1.3fr_1fr]">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.3, ease }} className="order-2 md:order-1">
          <p className="font-condensed text-4xl leading-[1.05] md:text-5xl">
            Baking smiles one
            <br />
            donut at a time
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/menu" className="btn btn-cream">
              See our menu
            </Link>
            <Link href="/contact" className="btn border border-cream/40 text-cream hover:bg-cream/10">
              Find us
            </Link>
          </div>
        </motion.div>

        <div className="order-1 h-[46vh] min-h-[320px] md:order-2 md:h-[520px]">
          <HeroScene icing={FLAVOURS[flavour].icing} />
        </div>

        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.45, ease }} className="order-3 space-y-5 pb-10 md:pb-0">
          <LiquidGlass className="inline-flex items-center gap-3 rounded-full px-4 py-2">
            <span className="flex -space-x-2">
              {["#f29ab8", "#c9813a", "#4a2414"].map((c) => (
                <span key={c} className="h-6 w-6 rounded-full border-2 border-cream" style={{ background: c }} />
              ))}
            </span>
            <span>
              <span className="block text-[11px] tracking-wider text-yellow-300">★★★★★ 4.9</span>
              <span className="block font-mono text-[10px] text-cream/80">2,400+ happy Lekki orders</span>
            </span>
          </LiquidGlass>
          <p className="max-w-xs font-mono text-xs leading-relaxed text-cream/80">
            Fresh brioche donuts, tall cupcakes and thick shakes — made every morning on Admiralty Way, Lekki Phase 1. Pick a glaze and watch it change.
          </p>
          <div className="flex gap-2" role="radiogroup" aria-label="Choose a glaze">
            {FLAVOURS.map((f, i) => (
              <button
                key={f.name}
                role="radio"
                aria-checked={flavour === i}
                aria-label={f.name}
                onClick={() => setFlavour(i)}
                className={`relative h-14 w-14 overflow-hidden rounded-xl bg-cream transition ${
                  flavour === i ? "ring-2 ring-cream ring-offset-2 ring-offset-cocoa" : "opacity-80 hover:opacity-100"
                }`}
              >
                <Image src={f.img} alt="" fill sizes="56px" className="object-contain p-1.5" />
              </button>
            ))}
          </div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-cream/60">Glaze: {FLAVOURS[flavour].name}</p>
        </motion.div>
      </div>
    </section>
  );
}
