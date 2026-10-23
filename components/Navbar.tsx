"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/lib/cart";
import { LiquidGlass } from "./LiquidGlass";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "Our Story" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const items = useCart((s) => s.items);
  const setOpen = useCart((s) => s.setOpen);
  const [mounted, setMounted] = useState(false);
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenu(false), [pathname]);

  const count = mounted ? Object.values(items).reduce((a, b) => a + b, 0) : 0;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-4">
      <LiquidGlass
        dark={scrolled}
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-2.5 transition-[background] duration-500 md:px-6 ${
          scrolled ? "" : "!bg-transparent !shadow-none before:!opacity-0 after:!opacity-0 !backdrop-blur-none"
        }`}
      >
        <Link href="/" className="font-display text-3xl tracking-wide text-cream">
          FOODX
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`relative text-xs font-semibold uppercase tracking-[0.14em] transition-colors hover:text-white ${
                pathname === l.href ? "text-white" : "text-cream/90"
              }`}
            >
              {l.label}
              {pathname === l.href && (
                <motion.span layoutId="nav-dot" className="absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-cream" />
              )}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button onClick={() => setOpen(true)} className="btn btn-cream relative !px-3.5 !py-2" aria-label="Open cart">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M6 7h12l-1 13H7L6 7Z" />
              <path d="M9 7a3 3 0 0 1 6 0" />
            </svg>
            <span className="hidden sm:inline">Cart</span>
            {count > 0 && (
              <span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-cherry px-1 text-[11px] text-cream">
                {count}
              </span>
            )}
          </button>
          <button
            className="grid h-9 w-9 place-items-center rounded-md text-cream md:hidden"
            onClick={() => setMenu((m) => !m)}
            aria-label="Toggle menu"
            aria-expanded={menu}
          >
            <div className="space-y-1.5">
              <span className={`block h-0.5 w-6 bg-current transition ${menu ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`block h-0.5 w-6 bg-current transition ${menu ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-6 bg-current transition ${menu ? "-translate-y-2 -rotate-45" : ""}`} />
            </div>
          </button>
        </div>
      </LiquidGlass>

      <AnimatePresence>
        {menu && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden"
          >
            <LiquidGlass dark className="mx-auto mt-2 flex max-w-6xl flex-col rounded-2xl !bg-cocoa-deep/95 p-3">
              {LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`rounded-lg px-3 py-3 font-condensed text-2xl uppercase ${pathname === l.href ? "bg-cream/15" : ""}`}
                >
                  {l.label}
                </Link>
              ))}
            </LiquidGlass>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
