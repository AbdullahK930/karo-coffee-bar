"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useMounted } from "@/lib/useMounted";

const easeOut = [0.16, 1, 0.3, 1] as const;

export function PageLoader() {
  const reduce = useReducedMotion();
  const mounted = useMounted();
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(
    () => typeof document !== "undefined" && document.readyState === "complete",
  );
  const [done, setDone] = useState(false);

  // Skip only decides true once mounted, so server and first client paint
  // always render the same (full loader) tree — no hydration mismatch.
  const skip = mounted && reduce;

  useEffect(() => {
    if (skip) return;

    document.body.style.overflow = "hidden";

    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const ceiling = loaded ? 100 : Math.min(88, (elapsed / 2200) * 88);
      setProgress((p) => {
        const next = p + (ceiling - p) * 0.12;
        return next > 99.3 ? 100 : next;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onLoad = () => setLoaded(true);
    if (!loaded) {
      window.addEventListener("load", onLoad);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("load", onLoad);
      document.body.style.overflow = "";
    };
  }, [skip, loaded]);

  useEffect(() => {
    if (skip || progress < 100) return;
    const timeout = setTimeout(() => {
      setDone(true);
      document.body.style.overflow = "";
    }, 350);
    return () => clearTimeout(timeout);
  }, [progress, skip]);

  if (skip) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: easeOut }}
            className="h-20 w-20"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo-mark.png"
              alt="Káro Coffee Bar"
              className="h-full w-full rounded-full object-contain"
            />
          </motion.div>

          <div className="mt-8 h-px w-40 overflow-hidden rounded-full bg-border">
            <motion.div
              className="h-full rounded-full"
              style={{ width: `${progress}%`, background: "var(--gradient-brand)" }}
              transition={{ ease: "linear" }}
            />
          </div>

          <p className="mt-4 font-mono text-[11px] tracking-[0.2em] text-text-muted">
            {Math.round(progress)}%
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
