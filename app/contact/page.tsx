import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { SectionTitle } from "@/components/SectionTitle";
import { PartnerForm } from "@/components/PartnerForm";
import { LiquidGlass } from "@/components/LiquidGlass";
import { BUSINESS } from "@/lib/products";

export const metadata: Metadata = { title: "Contact", description: "Visit Foodx in Lekki Phase 1, Lagos, or get in touch for events and partnerships." };

export default function ContactPage() {
  const mapQuery = encodeURIComponent(`${BUSINESS.street}, ${BUSINESS.area}, Lagos`);
  return (
    <>
      <PageHeader kicker="Come say hi" title="Find Us" image="/images/iced-coffee.webp">
        {BUSINESS.street}, {BUSINESS.area}, {BUSINESS.city}. Pickup, dine-in and delivery across Lekki.
      </PageHeader>

      <section className="bg-cherry py-16">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 lg:grid-cols-[1fr_1.4fr]">
          <div className="grid gap-4">
            <Reveal>
              <LiquidGlass className="rounded-2xl p-6">
                <p className="font-mono text-xs uppercase tracking-widest text-cream/85">Address</p>
                <p className="mt-2 font-condensed text-2xl uppercase leading-tight">
                  {BUSINESS.street}
                  <br />
                  {BUSINESS.area}, Lagos
                </p>
                <a href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`} target="_blank" rel="noopener" className="btn btn-cream mt-4">
                  Get directions »
                </a>
              </LiquidGlass>
            </Reveal>
            <Reveal delay={0.08}>
              <LiquidGlass className="rounded-2xl p-6">
                <p className="font-mono text-xs uppercase tracking-widest text-cream/85">Opening hours</p>
                <ul className="mt-3 space-y-2 font-mono text-sm">
                  {BUSINESS.hours.map((h) => (
                    <li key={h.d} className="flex justify-between border-b border-cream/15 pb-2">
                      <span>{h.d}</span>
                      <span>{h.h}</span>
                    </li>
                  ))}
                </ul>
              </LiquidGlass>
            </Reveal>
            <Reveal delay={0.16}>
              <LiquidGlass className="flex flex-wrap gap-3 rounded-2xl p-6">
                <a href={`tel:${BUSINESS.phone.replace(/\s/g, "")}`} className="btn btn-cream">
                  Call
                </a>
                <a href={`https://wa.me/${BUSINESS.whatsapp}`} target="_blank" rel="noopener" className="btn btn-cream">
                  WhatsApp
                </a>
                <a href={`mailto:${BUSINESS.email}`} className="btn border border-cream/40 hover:bg-cream/10">
                  {BUSINESS.email}
                </a>
              </LiquidGlass>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="min-h-[380px] overflow-hidden rounded-2xl bg-cocoa">
            <iframe
              title="Foodx location map, Lekki Phase 1"
              src={`https://maps.google.com/maps?q=${mapQuery}&z=15&output=embed`}
              className="h-full min-h-[380px] w-full grayscale-[30%] sepia-[25%]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Reveal>
        </div>
      </section>

      <section className="bg-cream py-20 text-ink">
        <div className="mx-auto max-w-2xl px-5">
          <Reveal className="text-center">
            <SectionTitle className="text-ink">Events &amp; partners</SectionTitle>
            <p className="mx-auto mt-4 max-w-md font-mono text-sm leading-relaxed text-ink/80">
              Birthday towers, office breakfast trays, wedding dessert tables, or stocking Foodx in your café.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mt-8">
            <PartnerForm title="Events & partners" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
