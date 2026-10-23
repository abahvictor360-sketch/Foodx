import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { GalleryGrid } from "./GalleryGrid";

export const metadata: Metadata = { title: "Gallery", description: "A look at the treats coming out of the Foodx kitchen in Lekki Phase 1." };

export default function GalleryPage() {
  return (
    <>
      <PageHeader kicker="Straight from the kitchen" title="Gallery" image="/images/cupcake-lollipop.webp">
        Glaze, drips, sprinkles and swirls. Tap any photo to look closer.
      </PageHeader>
      <GalleryGrid />
    </>
  );
}
