import type { Metadata, Viewport } from "next";
import { Anton, Oswald, IBM_Plex_Mono, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { LiquidGlassFilter } from "@/components/LiquidGlass";

const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton" });
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });
const plexMono = IBM_Plex_Mono({ weight: ["400", "600"], subsets: ["latin"], variable: "--font-plex-mono" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: { default: "Foodx — Bakery & Shakes in Lekki Phase 1", template: "%s · Foodx" },
  description:
    "Foodx is a bakery and dessert bar in Lekki Phase 1, Lagos. Donuts, cupcakes, cinnamon swirls, milkshakes and iced coffee — baked fresh daily, delivered across Lekki.",
};

export const viewport: Viewport = { themeColor: "#6b5550" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${anton.variable} ${oswald.variable} ${plexMono.variable} ${inter.variable}`}>
      <body>
        <LiquidGlassFilter />
        <SmoothScroll />
        <Navbar />
        <CartDrawer />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
