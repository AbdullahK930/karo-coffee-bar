"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";

const easeOut = [0.16, 1, 0.3, 1] as const;

const images = [
  {
    src: "/images/gallery-storefront.webp",
    alt: "Káro Coffee Bar storefront glowing warmly at dusk, Sector F, DHA Phase 1",
    className: "sm:row-span-3 aspect-[4/5] sm:aspect-auto",
    x: -24,
  },
  {
    src: "/images/gallery-counter.webp",
    alt: "The espresso counter at Káro, warm wood and stone with shelving overhead",
    className: "aspect-[5/4] sm:aspect-auto",
    x: 24,
  },
  {
    src: "/images/gallery-lounge.webp",
    alt: "Lounge seating at Káro beneath the wall-mounted wordmark",
    className: "aspect-[5/4] sm:aspect-auto",
    x: 24,
  },
  {
    src: "/images/gallery-hallway.webp",
    alt: "View past the counter toward the hallway inside Káro",
    className: "aspect-[5/4] sm:aspect-auto",
    x: 24,
  },
];

export function Gallery() {
  const reduce = useReducedMotion();

  return (
    <section id="gallery" className="bg-bg py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="font-display text-3xl font-semibold tracking-tight text-text md:text-4xl">
          Inside Káro
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:grid-rows-3 sm:h-[680px] lg:h-[760px]">
          {images.map((img, i) => (
            <GalleryCell
              key={img.src}
              src={img.src}
              alt={img.alt}
              className={img.className}
              initialX={img.x}
              delay={i * 0.08}
              reduce={!!reduce}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function GalleryCell({
  src,
  alt,
  className,
  initialX,
  delay,
  reduce,
}: {
  src: string;
  alt: string;
  className: string;
  initialX: number;
  delay: number;
  reduce: boolean;
}) {
  const cellRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cellRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <motion.div
      ref={cellRef}
      initial={reduce ? false : { opacity: 0, x: initialX, y: 20 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay, ease: easeOut }}
      className={`relative overflow-hidden rounded-3xl ${className}`}
    >
      <motion.div
        style={reduce ? undefined : { y: parallaxY }}
        className="absolute inset-[-8%]"
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="object-cover"
        />
      </motion.div>
    </motion.div>
  );
}
