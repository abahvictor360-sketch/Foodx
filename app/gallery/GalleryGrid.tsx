"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LiquidGlass } from "@/components/LiquidGlass";

type Shot = { src: string; alt: string; w: number; h: number; cutout?: string };

const SHOTS: Shot[] = [
  { src: "/images/cake-float.jpg", alt: "Strawberry vanilla layer cake mid-air with honey drizzle", w: 736, h: 1308 },
  { src: "/images/donut-pink.webp", alt: "Pink sprinkle donut", w: 624, h: 491, cutout: "#f3b9cb" },
  { src: "/images/cheesecake.jpg", alt: "Blueberry cheesecake slice", w: 736, h: 1104 },
  { src: "/images/iced-coffee.webp", alt: "Iced latte splash", w: 650, h: 900, cutout: "#6b5550" },
  { src: "/images/cupcake-strawberry-scene.jpg", alt: "Chocolate strawberry cupcakes", w: 600, h: 900 },
  { src: "/images/donut-choco.webp", alt: "Chocolate crunch donut", w: 649, h: 615, cutout: "#efe2b9" },
  { src: "/images/cupcake-lollipop-scene.jpg", alt: "Lollipop party cupcake", w: 736, h: 1042 },
  { src: "/images/boba-frappe.webp", alt: "Caramel boba frappe", w: 508, h: 750, cutout: "#921c1f" },
  { src: "/images/cupcake-vanilla-scene.jpg", alt: "Vanilla funfetti cupcakes", w: 736, h: 1104 },
  { src: "/images/donut-drip.webp", alt: "Chocolate drip donut", w: 503, h: 864, cutout: "#ead9c3" },
  { src: "/images/iced-coffee-scene.jpg", alt: "Iced coffee with cream swirl", w: 736, h: 1104 },
  { src: "/images/cinnamon-rolls.webp", alt: "Cinnamon swirls", w: 662, h: 574, cutout: "#f6eecf" },
  { src: "/images/milkshake-trio.webp", alt: "Three milkshakes", w: 589, h: 605, cutout: "#f3b9cb" },
  { src: "/images/donut-float.webp", alt: "Pink glazed donut", w: 653, h: 792, cutout: "#921c1f" },
  { src: "/images/grilled-cheese-scene.jpg", alt: "Bacon grilled cheese sandwich", w: 736, h: 1104 },
  { src: "/images/cupcake-berry.webp", alt: "Strawberry cloud cupcake", w: 624, h: 665, cutout: "#f3b9cb" },
  { src: "/images/cream-horns-scene.jpg", alt: "Vanilla cream horns dusted with icing sugar", w: 736, h: 981 },
  { src: "/images/banoffee-scene.jpg", alt: "Banoffee cheesecake slice", w: 526, h: 577 },
  { src: "/images/pain-au-chocolat-scene.jpg", alt: "Pain au chocolat", w: 600, h: 900 },
  { src: "/images/shortcake-scene.jpg", alt: "Strawberry shortcake slice", w: 700, h: 1010 },
];

export function GalleryGrid() {
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((i) => (i === null ? i : (i + 1) % SHOTS.length));
      if (e.key === "ArrowLeft") setOpen((i) => (i === null ? i : (i - 1 + SHOTS.length) % SHOTS.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <section className="bg-cream py-16">
      <div className="mx-auto max-w-6xl columns-2 gap-4 px-5 md:columns-3 [&>*]:mb-4">
        {SHOTS.map((s, i) => (
          <motion.button
            key={s.src}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
            onClick={() => setOpen(i)}
            className="group relative block w-full overflow-hidden rounded-2xl"
            style={s.cutout ? { background: s.cutout } : undefined}
            aria-label={`Open ${s.alt}`}
          >
            <Image
              src={s.src}
              alt={s.alt}
              width={s.w}
              height={s.h}
              sizes="(max-width: 768px) 50vw, 33vw"
              className={`h-auto w-full transition-transform duration-700 group-hover:scale-105 ${s.cutout ? "p-8 drop-shadow-[0_20px_20px_rgba(0,0,0,0.3)]" : ""}`}
            />
            <span className="absolute inset-x-3 bottom-3 translate-y-4 opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
              <LiquidGlass className="rounded-xl px-3 py-2 text-left font-mono text-[11px] text-cream">{s.alt}</LiquidGlass>
            </span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            className="fixed inset-0 z-[80] grid place-items-center bg-ink/80 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            role="dialog"
            aria-modal
            aria-label={SHOTS[open].alt}
          >
            <motion.div
              key={open}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative max-h-[85vh] overflow-hidden rounded-3xl"
              style={SHOTS[open].cutout ? { background: SHOTS[open].cutout } : undefined}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={SHOTS[open].src}
                alt={SHOTS[open].alt}
                width={SHOTS[open].w}
                height={SHOTS[open].h}
                className={`max-h-[85vh] w-auto object-contain ${SHOTS[open].cutout ? "p-10" : ""}`}
              />
            </motion.div>
            <LiquidGlass dark className="absolute bottom-6 flex items-center gap-2 rounded-full p-1.5" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
              <button className="h-10 w-10 rounded-full text-xl hover:bg-cream/15" onClick={() => setOpen((open - 1 + SHOTS.length) % SHOTS.length)} aria-label="Previous">
                ‹
              </button>
              <span className="px-2 font-mono text-xs">
                {open + 1} / {SHOTS.length}
              </span>
              <button className="h-10 w-10 rounded-full text-xl hover:bg-cream/15" onClick={() => setOpen((open + 1) % SHOTS.length)} aria-label="Next">
                ›
              </button>
              <button className="h-10 w-10 rounded-full text-xl hover:bg-cream/15" onClick={() => setOpen(null)} aria-label="Close">
                ×
              </button>
            </LiquidGlass>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
