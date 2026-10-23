"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function PageHeader({ kicker, title, image, children }: { kicker: string; title: string; image?: string; children?: React.ReactNode }) {
  return (
    <section className="doodle-bg relative overflow-hidden bg-cocoa pb-16 pt-32 md:pb-20 md:pt-40">
      <div className="mx-auto grid max-w-6xl items-end gap-8 px-5 md:grid-cols-[1.4fr_1fr]">
        <div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-mono text-xs uppercase tracking-[0.3em] text-cream/85">
            {kicker}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3 font-display text-7xl uppercase leading-[0.85] md:text-8xl lg:text-9xl"
          >
            {title}
          </motion.h1>
          {children && <div className="mt-5 max-w-md font-mono text-sm leading-relaxed text-cream/90">{children}</div>}
        </div>
        {image && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto hidden h-64 w-64 md:block"
          >
            <Image src={image} alt="" fill priority sizes="256px" className="animate-floaty object-contain drop-shadow-[0_30px_30px_rgba(0,0,0,0.45)]" />
          </motion.div>
        )}
      </div>
    </section>
  );
}
