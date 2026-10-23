import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { SectionTitle } from "@/components/SectionTitle";
import { Marquee } from "@/components/Marquee";
import { LiquidGlass } from "@/components/LiquidGlass";

export const metadata: Metadata = { title: "Our Story", description: "How Foodx started baking donuts and shakes in Lekki Phase 1, Lagos." };

const STATS = [
  { n: "5am", l: "First batch out the fryer" },
  { n: "13", l: "Treats on the daily menu" },
  { n: "30min", l: "Average delivery in Lekki Phase 1" },
  { n: "4.9★", l: "From 2,400+ orders" },
];

const VALUES = [
  { t: "Made the same day", d: "If it wasn't baked this morning, it isn't on the counter. Leftovers go to local shelters at closing." },
  { t: "Real ingredients", d: "Butter, fresh strawberries, Ghanaian cocoa and Nigerian groundnuts. No mystery powders." },
  { t: "Built for Lagos", d: "Shakes thick enough to survive the drive, boxes that keep the glaze where it belongs." },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader kicker="Since day one on Admiralty Way" title="Our Story" image="/images/donut-float.webp">
        Foodx started as a weekend donut stall for friends in Lekki Phase 1. Now it&apos;s a full kitchen, but the dough is still
        proofed overnight by hand.
      </PageHeader>

      <section className="bg-cream py-20 text-ink">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 md:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
              <Image src="/images/cake-float.jpg" alt="Layer cake slices with strawberries and honey" fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover" />
              <LiquidGlass dark className="absolute bottom-4 left-4 right-4 rounded-2xl p-4 text-cream">
                <p className="font-condensed text-2xl uppercase">From a weekend stall</p>
                <p className="font-mono text-xs text-cream/90">to Lekki&apos;s favourite sweet stop</p>
              </LiquidGlass>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <SectionTitle className="text-ink">Sweet things, made properly</SectionTitle>
            <div className="mt-6 space-y-4 font-mono text-sm leading-relaxed text-ink/75">
              <p>
                We wanted a place in Lekki where a donut tasted like it was made that morning — because it was. So we built a small
                kitchen on Admiralty Way, started frying at 5am, and kept the menu short enough to get every item right.
              </p>
              <p>
                Today the counter holds donuts, tall cupcakes, cinnamon swirls, thick shakes and iced coffee. Our riders cover Lekki
                Phase 1, Oniru and Ikate, and the glaze still gets there in one piece.
              </p>
            </div>
            <Link href="/menu" className="btn btn-cherry mt-8">
              Taste the menu
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="bg-cherry py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-5 md:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.l} delay={i * 0.08}>
              <LiquidGlass className="rounded-2xl p-6 text-center">
                <p className="font-display text-5xl">{s.n}</p>
                <p className="mt-2 font-mono text-xs text-cream/90">{s.l}</p>
              </LiquidGlass>
            </Reveal>
          ))}
        </div>
      </section>

      <Marquee />

      <section className="bg-sand py-20 text-ink">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <SectionTitle className="text-ink">What we stand on</SectionTitle>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {VALUES.map((v, i) => (
              <Reveal key={v.t} delay={i * 0.1}>
                <div className="h-full rounded-2xl bg-cocoa p-7 text-cream">
                  <p className="font-mono text-xs text-cream/75">0{i + 1}</p>
                  <h3 className="mt-2 font-condensed text-3xl uppercase">{v.t}</h3>
                  <p className="mt-3 font-mono text-sm leading-relaxed text-cream/90">{v.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
