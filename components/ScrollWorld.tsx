"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useRef } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "framer-motion";
import { LiquidGlass } from "./LiquidGlass";
import { useOnScreen } from "./useOnScreen";

const ScrollWorldScene = dynamic(() => import("./three/ScrollWorldScene"), { ssr: false });

const CHAPTERS = [
  { n: "01", title: "Dough at dawn", body: "Every batch is proofed overnight and fried before 7am in our Lekki Phase 1 kitchen. Nothing sits on a shelf till tomorrow." },
  { n: "02", title: "Glazed by hand", body: "Strawberry, Ghanaian cocoa, salted caramel. Every donut is dipped and sprinkled one at a time." },
  { n: "03", title: "Cupcakes that party", body: "Buttercream piped tall, ganache drips, lollies on top. Birthdays, office treats, or a Tuesday." },
  { n: "04", title: "Shakes & cold coffee", body: "Double-shot iced lattes, boba frappes and thick strawberry shakes for the Lagos heat." },
];

function Chapter({ i, progress, chapter }: { i: number; progress: MotionValue<number>; chapter: (typeof CHAPTERS)[number] }) {
  const span = 0.76 / CHAPTERS.length;
  const start = 0.05 + i * span;
  const opacity = useTransform(progress, [start, start + span * 0.15, start + span * 0.85, start + span], [0, 1, 1, 0]);
  const y = useTransform(progress, [start, start + span], [60, -60]);
  return (
    <motion.div style={{ opacity, y }} className={`absolute inset-x-4 bottom-10 md:inset-x-auto md:bottom-auto md:top-1/2 md:-translate-y-1/2 ${i % 2 ? "md:right-12" : "md:left-12"}`}>
      <LiquidGlass dark className="max-w-sm rounded-3xl p-6 md:p-7">
        <p className="font-mono text-xs text-cream/85">{chapter.n} / 04</p>
        <h3 className="mt-2 font-condensed text-4xl font-bold uppercase leading-none md:text-5xl">{chapter.title}</h3>
        <p className="mt-3 font-mono text-sm leading-relaxed text-cream">{chapter.body}</p>
      </LiquidGlass>
    </motion.div>
  );
}

export function ScrollWorld() {
  const ref = useRef<HTMLElement>(null);
  const progressRef = useRef(0);
  const onScreen = useOnScreen(ref, "0px");
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => (progressRef.current = v));

  const finaleOpacity = useTransform(scrollYProgress, [0.84, 0.94], [0, 1]);
  const introOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={ref} className="relative h-[400vh]" aria-label="Fly through the Foodx kitchen">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0">
          <ScrollWorldScene progress={progressRef} active={onScreen} />
        </div>

        <motion.div style={{ opacity: introOpacity }} className="pointer-events-none absolute inset-0 grid place-items-center text-center">
          <div>
            <p className="text-shadow-soft font-mono text-xs uppercase tracking-[0.3em] text-cream">Scroll to step inside</p>
            <h2 className="text-shadow-soft mt-3 font-display text-6xl uppercase leading-none md:text-8xl">The Foodx World</h2>
          </div>
        </motion.div>

        {CHAPTERS.map((c, i) => (
          <Chapter key={c.n} i={i} chapter={c} progress={scrollYProgress} />
        ))}

        <motion.div style={{ opacity: finaleOpacity }} className="absolute inset-x-0 bottom-12 flex flex-col items-center gap-4 px-4 text-center">
          <h3 className="text-shadow-soft font-display text-5xl uppercase leading-none text-cream md:text-7xl">Now come taste it</h3>
          <Link href="/menu" className="btn btn-cream">
            See the full menu »
          </Link>
        </motion.div>

        <div className="absolute bottom-0 left-0 h-1 w-full bg-cream/10">
          <motion.div style={{ width: bar }} className="h-full bg-cream" />
        </div>
      </div>
    </section>
  );
}
