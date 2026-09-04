"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { frame, cancelFrame, useReducedMotion } from "motion/react";
import { registerLenis, unregisterLenis } from "@/lib/lenisLock";

export function SmoothScroll() {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    });
    registerLenis(lenis);

    function update(data: { timestamp: number }) {
      lenis.raf(data.timestamp);
    }
    frame.update(update, true);

    return () => {
      cancelFrame(update);
      unregisterLenis();
      lenis.destroy();
    };
  }, [reduce]);

  return null;
}
