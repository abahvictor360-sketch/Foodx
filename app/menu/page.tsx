import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/PageHeader";
import { MenuGrid } from "./MenuGrid";

export const metadata: Metadata = { title: "Menu", description: "Donuts, cupcakes, pastries, shakes and coffee from Foodx, Lekki Phase 1." };

export default function MenuPage() {
  return (
    <>
      <PageHeader kicker="Baked today in Lekki" title="The Menu" image="/images/donut-trio.webp">
        Everything is made the same morning it&apos;s sold. Order for pickup on Admiralty Way, or delivery anywhere in Lekki Phase 1,
        Oniru and Ikate.
      </PageHeader>
      <Suspense>
        <MenuGrid />
      </Suspense>
    </>
  );
}
