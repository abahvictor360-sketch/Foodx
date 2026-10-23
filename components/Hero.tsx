"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { LiquidGlass } from "./LiquidGlass";
import { useOnScreen } from "./useOnScreen";

const HeroScene = dynamic(() => import("./three/HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full place-items-center">
      <div className="h-56 w-36 animate-pulse rounded-b-[2.5rem] rounded-t-lg border-4 border-cream/20" />
    </div>
  ),
});

const BREWS = [
  { name: "Iced Latte", img: "/images/iced-coffee.webp", brew: { coffee: "#3a1d0f", milk: "#ead6b6", drizzle: "#3b1d10" } },
  { name: "Caramel Cream", img: "/images/boba-frappe.webp", brew: { coffee: "#5a3016", milk: "#f2d9a6", drizzle: "#c9813a" } },
  { name: "Mocha", img: "/images/coffee-beans.webp", brew: { coffee: "#24110a", milk: "#a87a58", drizzle: "#2a1209" } },
  { name: "Strawberry Cream", img: "/images/shake-strawberry.webp", brew: { coffee: "#4a2414", milk: "#f4c3cf", drizzle: "#c2273f" } },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const [brew, setBrew] = useState(0);
  const canvasWrap = useRef<HTMLDivElement>(null);
  const onScreen = useOnScreen(canvasWrap);
  return (
    <section className="doodle-bg relative min-h-[100svh] overflow-hidden bg-cocoa pt-28 md:pt-32">
      <div className="mx-auto max-w-6xl px-5">
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease }}
          className="text-center font-display text-[min(17vw,24vh)] uppercase leading-[0.95] text-cream md:leading-[0.85] md:text-[min(9.5rem,24vh)]"
        >
          Coffee &amp; Cream
        </motion.h1>
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-6 px-5 md:grid-cols-[1fr_1.3fr_1fr]">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.3, ease }} className="order-2 md:order-1">
          <p className="font-condensed text-4xl leading-[1.05] md:text-4xl lg:text-5xl">
            Smiles, poured
            <br />
            one cup at a time
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

        <div ref={canvasWrap} className="order-1 h-[46vh] min-h-[320px] md:order-2 md:h-[min(520px,62vh)]">
          <HeroScene brew={BREWS[brew].brew} active={onScreen} />
        </div>

        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.45, ease }} className="order-3 space-y-5 pb-10 md:pb-0">
          <LiquidGlass refract dark className="inline-flex items-center gap-3 rounded-full px-4 py-2">
            <span className="flex -space-x-2">
              {["#ead6b6", "#c9813a", "#3a1d0f"].map((c) => (
                <span key={c} className="h-6 w-6 rounded-full border-2 border-cream" style={{ background: c }} />
              ))}
            </span>
            <span>
              <span className="block text-xs tracking-wider text-yellow-300">★★★★★ 4.9</span>
              <span className="block font-mono text-[11px] text-cream/90">2,400+ happy Lekki orders</span>
            </span>
          </LiquidGlass>
          <p className="max-w-xs font-mono text-sm leading-relaxed text-cream/90">
            Double-shot espresso, cold milk and slow-poured cream — made to order on Admiralty Way, Lekki Phase 1. Pick a drink and watch it pour.
          </p>
          <div className="flex gap-2" role="radiogroup" aria-label="Choose a drink">
            {BREWS.map((f, i) => (
              <button
                key={f.name}
                role="radio"
                aria-checked={brew === i}
                aria-label={f.name}
                onClick={() => setBrew(i)}
                className={`relative h-14 w-14 overflow-hidden rounded-xl bg-cream transition ${
                  brew === i ? "ring-2 ring-cream ring-offset-2 ring-offset-cocoa" : "opacity-80 hover:opacity-100"
                }`}
              >
                <Image src={f.img} alt="" fill sizes="56px" className="object-contain p-1.5" />
              </button>
            ))}
          </div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-cream/75">Pouring: {BREWS[brew].name}</p>
        </motion.div>
      </div>
    </section>
  );
}
