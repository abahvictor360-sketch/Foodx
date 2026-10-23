"use client";

import { useRef, type ComponentPropsWithoutRef, type ElementType, type PointerEvent } from "react";

type Props<T extends ElementType> = {
  as?: T;
  refract?: boolean;
  dark?: boolean;
} & ComponentPropsWithoutRef<T>;

/** Frosted, refracting glass surface whose specular highlight follows the pointer. */
export function LiquidGlass<T extends ElementType = "div">({
  as,
  refract = true,
  dark = false,
  className = "",
  onPointerMove,
  ...rest
}: Props<T>) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement>(null);

  const handleMove = (e: PointerEvent<HTMLElement>) => {
    const el = ref.current;
    if (el) {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--gx", `${((e.clientX - r.left) / r.width) * 100}%`);
      el.style.setProperty("--gy", `${((e.clientY - r.top) / r.height) * 100}%`);
    }
    onPointerMove?.(e);
  };

  return (
    <Tag
      ref={ref}
      onPointerMove={handleMove}
      className={`liquid-glass ${refract ? "refract" : ""} ${dark ? "dark" : ""} ${className}`}
      {...rest}
    />
  );
}

/** SVG displacement filter referenced by `.liquid-glass.refract` via backdrop-filter. */
export function LiquidGlassFilter() {
  return (
    <svg aria-hidden width="0" height="0" style={{ position: "absolute" }}>
      <filter id="liquid-glass" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.008 0.012" numOctaves="2" seed="7" result="noise" />
        <feGaussianBlur in="noise" stdDeviation="2" result="soft" />
        <feDisplacementMap in="SourceGraphic" in2="soft" scale="10" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
  );
}
