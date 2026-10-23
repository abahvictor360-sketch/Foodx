"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { cartLines, DELIVERY_FEE, useCart } from "@/lib/cart";
import { BUSINESS, formatNaira } from "@/lib/products";

export function Checkout() {
  const { items, setQty, remove, clear } = useCart();
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState<"delivery" | "pickup">("delivery");
  const [done, setDone] = useState(false);
  useEffect(() => setMounted(true), []);

  const lines = mounted ? cartLines(items) : [];
  const subtotal = lines.reduce((s, l) => s + l.product.price * l.qty, 0);
  const fee = mode === "delivery" && lines.length ? DELIVERY_FEE : 0;
  const total = subtotal + fee;

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const text = [
      "Hello Foodx! New order:",
      ...lines.map((l) => `• ${l.qty} × ${l.product.name} — ${formatNaira(l.product.price * l.qty)}`),
      `${mode === "delivery" ? `Delivery: ${formatNaira(fee)}` : "Pickup at Admiralty Way"}`,
      `Total: ${formatNaira(total)}`,
      "",
      `Name: ${f.get("name")}`,
      `Phone: ${f.get("phone")}`,
      mode === "delivery" ? `Address: ${f.get("address")}` : "",
      f.get("note") ? `Note: ${f.get("note")}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    window.open(`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
    clear();
    setDone(true);
  };

  if (done) {
    return (
      <section className="bg-cream py-24 text-center text-ink">
        <h2 className="font-display text-6xl uppercase">Order sent!</h2>
        <p className="mx-auto mt-4 max-w-sm font-mono text-xs text-ink/80">We&apos;ll confirm on WhatsApp in a few minutes. Get the plates ready.</p>
        <Link href="/menu" className="btn btn-cherry mt-8">
          Back to the menu
        </Link>
      </section>
    );
  }

  return (
    <section className="bg-cream py-16 text-ink">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <h2 className="font-condensed text-3xl font-bold uppercase">Items</h2>
          {lines.length === 0 && (
            <p className="mt-6 font-mono text-sm text-ink/75">
              Nothing here yet.{" "}
              <Link href="/menu" className="text-cherry underline">
                Browse the menu
              </Link>
              .
            </p>
          )}
          <ul className="mt-6 divide-y divide-ink/10">
            {lines.map(({ product, qty }) => (
              <li key={product.id} className="flex items-center gap-4 py-4">
                <div className="relative h-20 w-20 shrink-0 rounded-xl bg-sand">
                  <Image src={product.image} alt="" fill sizes="80px" className="object-contain p-2" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-condensed text-xl leading-tight">{product.name}</p>
                  <p className="font-mono text-xs text-ink/75">{formatNaira(product.price)} each</p>
                  <button onClick={() => remove(product.id)} className="mt-1 font-mono text-xs text-cherry underline">
                    Remove
                  </button>
                </div>
                <div className="flex items-center gap-1 rounded-full bg-sand p-1">
                  <button className="h-8 w-8 rounded-full hover:bg-butter" onClick={() => setQty(product.id, qty - 1)} aria-label="Decrease">
                    −
                  </button>
                  <span className="w-6 text-center font-mono text-sm">{qty}</span>
                  <button className="h-8 w-8 rounded-full hover:bg-butter" onClick={() => setQty(product.id, qty + 1)} aria-label="Increase">
                    +
                  </button>
                </div>
                <p className="w-24 text-right font-mono text-sm font-semibold">{formatNaira(product.price * qty)}</p>
              </li>
            ))}
          </ul>
        </div>

        <form onSubmit={submit} className="h-fit rounded-3xl bg-cocoa p-6 text-cream md:p-8">
          <h2 className="font-condensed text-3xl font-bold uppercase">Details</h2>
          <div className="mt-5 grid grid-cols-2 gap-1 rounded-full bg-ink/30 p-1">
            {(["delivery", "pickup"] as const).map((m) => (
              <button
                type="button"
                key={m}
                onClick={() => setMode(m)}
                className={`rounded-full py-2 text-xs font-semibold uppercase tracking-wider transition ${mode === m ? "bg-cream text-ink" : ""}`}
              >
                {m}
              </button>
            ))}
          </div>
          <div className="mt-5 grid gap-3">
            <input required name="name" placeholder="Full name" className="field" />
            <input required name="phone" type="tel" placeholder="Phone number" className="field" />
            {mode === "delivery" && <input required name="address" placeholder="Delivery address in Lekki" className="field" />}
            <textarea name="note" rows={2} placeholder="Note (e.g. 'Happy birthday' on the box)" className="field" />
          </div>
          <dl className="mt-6 space-y-2 font-mono text-sm">
            <div className="flex justify-between">
              <dt>Subtotal</dt>
              <dd>{formatNaira(subtotal)}</dd>
            </div>
            <div className="flex justify-between text-cream/85">
              <dt>{mode === "delivery" ? "Delivery (Lekki)" : "Pickup"}</dt>
              <dd>{fee ? formatNaira(fee) : "Free"}</dd>
            </div>
            <div className="flex justify-between border-t border-cream/20 pt-2 text-base font-semibold">
              <dt>Total</dt>
              <dd>{formatNaira(total)}</dd>
            </div>
          </dl>
          <button disabled={!lines.length} className="btn btn-cream mt-6 w-full justify-center disabled:opacity-50">
            Order on WhatsApp »
          </button>
        </form>
      </div>
    </section>
  );
}
