import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { ScrollWorld } from "@/components/ScrollWorld";
import { Marquee } from "@/components/Marquee";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { SectionTitle } from "@/components/SectionTitle";
import { Testimonials } from "@/components/Testimonials";
import { PartnerForm } from "@/components/PartnerForm";
import { BEST_SELLERS, PREMIUM } from "@/lib/products";

export default function Home() {
  return (
    <>
      <Hero />

      {/* Premium products */}
      <section className="bg-cherry py-20">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <SectionTitle>Our premium picks</SectionTitle>
            <Link href="/menu" className="btn btn-cream">
              View all products »
            </Link>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
            {PREMIUM.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.08}>
                <ProductCard product={p} accent={i === 1} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Marquee />

      <ScrollWorld />

      {/* Feature split */}
      <section className="bg-cream py-20 text-ink">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 md:grid-cols-2">
          <Reveal>
            <div className="relative flex aspect-[4/3.4] items-center justify-between overflow-hidden rounded-2xl bg-cocoa px-4 md:px-8">
              <span className="font-display text-6xl uppercase text-cream [writing-mode:vertical-rl] rotate-180 md:text-8xl">Sweet</span>
              <Image
                src="/images/shake-strawberry.webp"
                alt="Strawberry crunch milkshake"
                width={470}
                height={900}
                className="animate-floaty h-[88%] w-auto object-contain drop-shadow-[0_30px_30px_rgba(0,0,0,0.45)]"
              />
              <span className="font-display text-6xl uppercase text-cream [writing-mode:vertical-rl] md:text-8xl">Creamy</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <SectionTitle className="text-ink">
              The magic of a <br /> Foodx shake in <br /> your hand
            </SectionTitle>
            <p className="mt-5 max-w-md font-mono text-sm leading-relaxed text-ink/80">
              Real strawberries, proper vanilla ice cream and a groundnut crunch that sticks around till the last sip. Built thick
              enough for a spoon, cold enough for a Lekki afternoon.
            </p>
            <Link href="/menu?c=drinks" className="btn btn-cherry mt-6">
              Shop now
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Best sellers */}
      <section className="bg-cherry py-20">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <SectionTitle>Best sellers</SectionTitle>
            <Link href="/menu" className="btn btn-cream">
              View all »
            </Link>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            {BEST_SELLERS.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.08}>
                <ProductCard product={p} compact accent />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-sand py-20 text-ink">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <SectionTitle className="mb-10 text-center text-ink">
              Trusted, loved and shared <br /> across Lekki
            </SectionTitle>
          </Reveal>
          <Reveal delay={0.1}>
            <Testimonials />
          </Reveal>
        </div>
      </section>

      {/* Partners */}
      <section className="relative overflow-hidden bg-cream py-20 text-ink">
        <Image
          src="/images/cinnamon-rolls.webp"
          alt=""
          width={662}
          height={574}
          className="pointer-events-none absolute -bottom-10 -right-16 hidden w-80 rotate-[-12deg] drop-shadow-2xl lg:block"
        />
        <Image
          src="/images/coffee-beans.webp"
          alt=""
          width={487}
          height={450}
          className="pointer-events-none absolute -left-10 top-10 hidden w-56 opacity-90 lg:block"
        />
        <div className="relative mx-auto max-w-2xl px-5 text-center">
          <Reveal>
            <SectionTitle className="text-ink">Let&apos;s be partners</SectionTitle>
            <p className="mx-auto mt-4 max-w-md font-mono text-sm leading-relaxed text-ink/80">
              Office trays, weddings, birthdays, cafés that want to stock Foodx — tell us what you&apos;re planning.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mt-8 text-left">
            <PartnerForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
