"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { useMounted } from "@/lib/useMounted";
import { lockScroll, unlockScroll } from "@/lib/lenisLock";

export function PageLoader() {
  const reduce = useReducedMotion();
  const mounted = useMounted();
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(
    () => typeof document !== "undefined" && document.readyState === "complete",
  );
  const [fadingOut, setFadingOut] = useState(false);
  const [unmounted, setUnmounted] = useState(false);
  const [entered, setEntered] = useState(false);

  // Skip only decides true once mounted, so server and first client paint
  // always render the same (full loader) tree — no hydration mismatch.
  const skip = mounted && reduce;

  useEffect(() => {
    if (skip) return;

    document.documentElement.style.overflow = "hidden";
    lockScroll();

    // setInterval rather than requestAnimationFrame: rAF is fully suspended
    // in a hidden tab (e.g. opened in the background, or the user alt-tabs
    // away mid-load), which would freeze progress indefinitely. Timers are
    // only throttled, never suspended, so this keeps converging regardless
    // of tab visibility.
    const start = performance.now();
    let last = start;
    const interval = setInterval(() => {
      const now = performance.now();
      const elapsed = now - start;
      const dt = (now - last) / 1000;
      last = now;
      const ceiling = loaded ? 100 : Math.min(88, (elapsed / 2200) * 88);
      // Time-based (not per-tick) exponential approach, so convergence
      // stays bounded in wall-clock time regardless of tick rate.
      setProgress((p) => {
        const next = ceiling - (ceiling - p) * Math.exp(-6 * dt);
        return next > 99.3 ? 100 : next;
      });
    }, 80);

    const onLoad = () => setLoaded(true);
    if (!loaded) {
      window.addEventListener("load", onLoad);
    }

    return () => {
      clearInterval(interval);
      window.removeEventListener("load", onLoad);
      document.documentElement.style.overflow = "";
      unlockScroll();
    };
  }, [skip, loaded]);

  useEffect(() => {
    if (skip || progress < 100) return;
    const timeout = setTimeout(() => {
      setFadingOut(true);
      document.documentElement.style.overflow = "";
      unlockScroll();
    }, 350);
    return () => clearTimeout(timeout);
  }, [progress, skip]);

  // Plain CSS transition + setTimeout-driven unmount rather than a
  // Motion AnimatePresence exit: Motion's exit-completion tracking relies on
  // requestAnimationFrame, which — like the progress ticker above — is
  // suspended in a hidden tab and would leave the overlay stuck. setTimeout
  // keeps firing regardless, so the fade always finishes and unmounts.
  useEffect(() => {
    if (!fadingOut) return;
    const timeout = setTimeout(() => setUnmounted(true), 650);
    return () => clearTimeout(timeout);
  }, [fadingOut]);

  // Two-step mount so the entrance transition actually runs (the browser
  // needs a frame between the initial "not entered" paint and toggling the
  // transitioned classes) — a native setTimeout(0), not rAF, so it's
  // unaffected by tab-visibility throttling.
  useEffect(() => {
    if (skip) return;
    const timeout = setTimeout(() => setEntered(true), 0);
    return () => clearTimeout(timeout);
  }, [skip]);

  if (skip || unmounted) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg transition-opacity duration-[600ms] ease-out ${
        fadingOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div
        className={`h-20 w-20 transition-all duration-700 ease-out ${
          entered ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/logo-mark.png"
          alt="Káro Coffee Bar"
          className="h-full w-full rounded-full object-contain"
        />
      </div>

      <div className="mt-8 h-px w-40 overflow-hidden rounded-full bg-border">
        <div
          className="h-full rounded-full"
          style={{ width: `${progress}%`, background: "var(--gradient-brand)" }}
        />
      </div>

      <p className="mt-4 font-mono text-[11px] tracking-[0.2em] text-text-muted">
        {Math.round(progress)}%
      </p>
    </div>
  );
}
