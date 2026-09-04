"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Star, Clock, MapPin, ArrowDown } from "@phosphor-icons/react";
import { LogoMark } from "./Logo";
import { site, mapsDirectionsUrl } from "@/lib/site";
import { useMounted } from "@/lib/useMounted";

const FRAME_COUNT = 121;
const frameSrc = (frame: number) =>
  `/frames/beans/frame-${String(frame).padStart(4, "0")}.jpg`;

const easeOut = [0.16, 1, 0.3, 1] as const;

export function PinnedVideoHero() {
  const reduce = useReducedMotion();
  const mounted = useMounted();

  // Render the scrubbing tree on the server and on first client paint so
  // hydration always matches; only swap to the static tree after mount,
  // once the real prefers-reduced-motion value is safe to read.
  return mounted && reduce ? <StaticHero /> : <ScrubbingHero />;
}

function ScrubbingHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const [ready, setReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Content is visible immediately on load (no scroll required to see it)
  // and only dissolves near the end of the pin, as the next section arrives.
  const contentOpacity = useTransform(scrollYProgress, [0, 0.78, 0.95], [1, 1, 0]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.05, 0.15], [1, 1, 0]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const drawFrame = (frame: number) => {
      const img = imagesRef.current[frame];
      if (!ctx || !img || !img.complete || img.naturalWidth === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cw = canvas.clientWidth;
      const ch = canvas.clientHeight;
      if (canvas.width !== cw * dpr || canvas.height !== ch * dpr) {
        canvas.width = cw * dpr;
        canvas.height = ch * dpr;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = cw / ch;
      let drawW: number;
      let drawH: number;
      if (imgRatio > canvasRatio) {
        drawH = ch;
        drawW = ch * imgRatio;
      } else {
        drawW = cw;
        drawH = cw / imgRatio;
      }
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, (cw - drawW) / 2, (ch - drawH) / 2, drawW, drawH);
    };

    const closestLoaded = (target: number) => {
      for (let d = 0; d < FRAME_COUNT; d++) {
        const lo = target - d;
        const hi = target + d;
        if (lo >= 0 && imagesRef.current[lo]?.complete) return lo;
        if (hi < FRAME_COUNT && imagesRef.current[hi]?.complete) return hi;
      }
      return -1;
    };

    let cancelled = false;
    const images: HTMLImageElement[] = [];
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new window.Image();
      img.decoding = "async";
      img.src = frameSrc(i + 1);
      img.onload = () => {
        if (cancelled) return;
        if (i === 0) {
          setReady(true);
          drawFrame(0);
        } else if (currentFrameRef.current === i) {
          drawFrame(i);
        }
      };
      images.push(img);
    }
    imagesRef.current = images;

    const handleResize = () => drawFrame(currentFrameRef.current);
    window.addEventListener("resize", handleResize);

    const unsubscribe = scrollYProgress.on("change", (v) => {
      const target = Math.min(
        FRAME_COUNT - 1,
        Math.max(0, Math.floor(v * FRAME_COUNT)),
      );
      const available = imagesRef.current[target]?.complete
        ? target
        : closestLoaded(target);
      if (available === -1 || available === currentFrameRef.current) return;
      currentFrameRef.current = available;
      drawFrame(available);
    });

    return () => {
      cancelled = true;
      window.removeEventListener("resize", handleResize);
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <section id="top" ref={containerRef} className="relative h-[320vh]">
        <div className="sticky top-0 h-[100dvh] w-full overflow-hidden bg-bg">
          <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/15 to-bg/50" />

          <motion.div
            initial={{ y: 16 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, ease: easeOut }}
            style={{ opacity: contentOpacity }}
            className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
          >
            <HeroContent />
          </motion.div>

          <motion.div
            style={{ opacity: cueOpacity }}
            className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-text-muted"
          >
            <ArrowDown size={20} />
          </motion.div>

          {!ready && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-bg">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-text-muted/30 border-t-text" />
            </div>
          )}
        </div>
      </section>

      <InfoStrip />
    </>
  );
}

function StaticHero() {
  return (
    <section id="top" className="relative flex min-h-[100dvh] flex-col overflow-hidden bg-bg">
      <div className="relative flex-1">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={frameSrc(61)}
          alt="Coffee beans cascading at Káro Coffee Bar"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/15 to-bg/50" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <HeroContent />
        </div>
      </div>
      <InfoStrip />
    </section>
  );
}

function HeroContent() {
  return (
    <>
      <LogoMark className="mb-8 h-12 w-12" />
      <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight text-text md:text-6xl lg:text-7xl">
        Minimal space.
        <br />
        Maximum flavour.
      </h1>
      <p className="mt-6 max-w-md text-lg text-text-muted">
        Specialty arabica coffee and ceremonial matcha in Sector F, DHA Phase
        1. Open daily until 1am.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <a
          href={mapsDirectionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-[#f5efe4] px-7 py-3.5 text-sm font-medium text-[#15110c] transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
        >
          Get Directions
        </a>
        <a
          href="#menu"
          className="rounded-full border border-border px-7 py-3.5 text-sm font-medium text-text transition-colors hover:border-text-muted active:scale-[0.98]"
        >
          View Menu
        </a>
      </div>
    </>
  );
}

function InfoStrip() {
  return (
    <div className="relative z-10 border-t border-border bg-bg-elevated">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-4 divide-y divide-border px-6 py-5 text-sm text-text-muted sm:flex-row sm:items-center sm:justify-center sm:divide-x sm:divide-y-0 lg:px-8">
        <span className="flex items-center gap-2 pt-4 sm:pt-0 sm:pr-6">
          <Star size={16} weight="fill" className="text-[#f2994a]" />
          {site.rating} rating · {site.reviewCount} Google reviews
        </span>
        <span className="flex items-center gap-2 pt-4 sm:pt-0 sm:px-6">
          <Clock size={16} />
          {site.hours}
        </span>
        <span className="flex items-center gap-2 pt-4 sm:pt-0 sm:pl-6">
          <MapPin size={16} />
          Sector F, DHA Phase 1, Rawalpindi
        </span>
      </div>
    </div>
  );
}
