import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Checkout } from "./Checkout";

export const metadata: Metadata = { title: "Checkout" };

export default function CartPage() {
  return (
    <>
      <PageHeader kicker="Almost there" title="Your Box" image="/images/cupcake-strawberry.webp">
        Delivery across Lekki Phase 1, Oniru and Ikate, or pick up from Admiralty Way. Orders are confirmed on WhatsApp.
      </PageHeader>
      <Checkout />
    </>
  );
}
