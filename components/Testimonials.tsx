"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const QUOTES = [
  { q: "The pink sprinkle donut is honestly unfair. Soft, fresh and still warm when the rider got to my place on Admiralty Way.", a: "Tolu A.", w: "Lekki Phase 1" },
  { q: "Ordered 40 cupcakes for my daughter's birthday. Every single one looked like the photo. The lollipop ones vanished first.", a: "Chiamaka O.", w: "Ikate" },
  { q: "My 3pm iced latte has become a personal problem. Strong coffee, not too sweet, and they actually use real ice.", a: "Femi B.", w: "Oniru" },
];

export function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % QUOTES.length), 6000);
    return () => clearInterval(t);
  }, []);
  const go = (d: number) => setI((x) => (x + d + QUOTES.length) % QUOTES.length);

  return (
    <div className="relative mx-auto max-w-3xl rounded-3xl bg-cocoa px-12 py-12 text-center text-cream md:px-20">
      <span className="font-display text-6xl leading-none text-cream/90">“</span>
      <div className="relative min-h-[150px] md:min-h-[120px]">
        <AnimatePresence mode="wait">
          <motion.figure
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4 }}
          >
            <blockquote className="font-mono text-sm leading-relaxed">{QUOTES[i].q}</blockquote>
            <figcaption className="mt-4 font-condensed text-lg uppercase tracking-wide">
              {QUOTES[i].a} <span className="text-cream/60">· {QUOTES[i].w}</span>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>
      <button onClick={() => go(-1)} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-2xl" aria-label="Previous review">
        ‹
      </button>
      <button onClick={() => go(1)} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-2xl" aria-label="Next review">
        ›
      </button>
      <div className="mt-6 flex justify-center gap-2">
        {QUOTES.map((_, k) => (
          <span key={k} className={`h-1.5 rounded-full transition-all ${k === i ? "w-6 bg-cream" : "w-1.5 bg-cream/40"}`} />
        ))}
      </div>
    </div>
  );
}
