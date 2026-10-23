const WORDS = ["Donuts", "Cupcakes", "Cinnamon Swirls", "Milkshakes", "Iced Coffee", "Cheesecake", "Boba", "Lekki Phase 1"];

export function Marquee({ className = "" }: { className?: string }) {
  const row = [...WORDS, ...WORDS];
  return (
    <div className={`overflow-hidden bg-cherry py-3 ${className}`} aria-hidden>
      <div className="animate-marquee flex w-max gap-6 whitespace-nowrap font-condensed text-4xl font-semibold uppercase text-cream md:text-5xl">
        {[...row, ...row].map((w, i) => (
          <span key={i} className="flex items-center gap-6">
            {w}
            <span className="text-2xl text-butter">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
