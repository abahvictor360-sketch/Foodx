"use client";

import { useState, type FormEvent } from "react";
import { BUSINESS } from "@/lib/products";

/** Sends the enquiry to the shop's WhatsApp so there is no backend to run. */
export function PartnerForm({ title = "Let's be partners" }: { title?: string }) {
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const text = [
      `Hello Foodx! ${title} enquiry`,
      `Name: ${f.get("name")}`,
      `Phone: ${f.get("phone")}`,
      `Email: ${f.get("email")}`,
      `Brand: ${f.get("brand") || "-"}`,
      `Note: ${f.get("note") || "-"}`,
    ].join("\n");
    window.open(`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
    setSent(true);
  };

  return (
    <form onSubmit={submit} className="grid gap-3 sm:grid-cols-2">
      <input required name="name" placeholder="Your full name" className="field" />
      <input required name="phone" type="tel" placeholder="Your phone number" className="field" />
      <input required name="email" type="email" placeholder="Your email" className="field" />
      <input name="brand" placeholder="Your brand / event" className="field" />
      <textarea name="note" rows={4} placeholder="Tell us what you need — office trays, event orders, stocking our treats…" className="field sm:col-span-2" />
      <div className="flex items-center gap-4 sm:col-span-2">
        <button className="btn btn-cherry">Submit now</button>
        {sent && <span className="font-mono text-xs text-ink/80">Opening WhatsApp — we reply within the hour.</span>}
      </div>
    </form>
  );
}
