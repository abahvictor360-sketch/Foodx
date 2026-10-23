import type { ReactNode } from "react";

export function SectionTitle({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <h2 className={`font-condensed text-4xl font-bold uppercase leading-[0.95] tracking-tight md:text-6xl ${className}`}>{children}</h2>;
}
