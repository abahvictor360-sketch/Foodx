import Link from "next/link";
import { BUSINESS } from "@/lib/products";

export function Footer() {
  return (
    <footer className="doodle-bg relative overflow-hidden bg-cocoa-deep text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-6xl">FOODX</p>
          <p className="mt-3 max-w-sm font-mono text-xs leading-relaxed text-cream/70">
            Donuts, cupcakes, pastries, shakes and coffee — baked fresh every morning in {BUSINESS.area}, Lagos.
          </p>
        </div>
        <div>
          <p className="font-condensed text-lg uppercase tracking-wide">Visit</p>
          <p className="mt-3 font-mono text-xs leading-relaxed text-cream/70">
            {BUSINESS.street}
            <br />
            {BUSINESS.area}
            <br />
            {BUSINESS.city}
          </p>
          <p className="mt-3 font-mono text-xs text-cream/70">{BUSINESS.phone}</p>
        </div>
        <div>
          <p className="font-condensed text-lg uppercase tracking-wide">Explore</p>
          <ul className="mt-3 space-y-1.5 font-mono text-xs text-cream/70">
            {[
              ["/menu", "Menu"],
              ["/gallery", "Gallery"],
              ["/about", "Our story"],
              ["/contact", "Contact & partners"],
              ["/cart", "Checkout"],
            ].map(([h, l]) => (
              <li key={h}>
                <Link href={h} className="hover:text-cream">
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="pointer-events-none select-none text-center font-display text-[24vw] leading-[0.8] text-cream/5" aria-hidden>
        FOODX
      </div>
      <p className="absolute bottom-4 left-0 right-0 text-center font-mono text-[10px] text-cream/50">
        © {new Date().getFullYear()} Foodx · {BUSINESS.area}, Lagos
      </p>
    </footer>
  );
}
