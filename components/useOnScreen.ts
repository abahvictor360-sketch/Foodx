"use client";

import { useEffect, useState, type RefObject } from "react";

/** True while the element is in (or near) the viewport — used to pause WebGL off-screen. */
export function useOnScreen(ref: RefObject<Element | null>, rootMargin = "200px") {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting), { rootMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, rootMargin]);
  return on;
}
