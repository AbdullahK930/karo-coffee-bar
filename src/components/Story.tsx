"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { Coffee, Leaf, Storefront } from "@phosphor-icons/react";

const facts = [
  { icon: Coffee, label: "100% arabica coffee" },
  { icon: Leaf, label: "Ceremonial matcha" },
  { icon: Storefront, label: "Sector F, DHA Phase 1" },
];

export function Story() {
  const reduce = useReducedMotion();
  const frameRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section id="story" className="bg-bg py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
        <motion.div
          ref={frameRef}
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl lg:order-2"
        >
          <motion.div
            style={reduce ? undefined : { y: parallaxY }}
            className="absolute inset-[-10%]"
          >
            <Image
              src="/images/story-cup.webp"
              alt="Káro latte art on a coffee cup, resting on a dark wood table"
              fill
              sizes="(min-width: 1024px) 32vw, 90vw"
              className="object-cover"
            />
          </motion.div>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:order-1"
        >
          <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-text md:text-4xl">
            A small room, built for people who take their coffee seriously.
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-text-muted">
            Káro keeps the space quiet and the cup honest: single-origin
            arabica pulled with care, and matcha whisked the traditional way.
            No shortcuts, no clutter, just a counter, good light, and drinks
            worth sitting down for.
          </p>

          <ul className="mt-9 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-4">
            {facts.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2.5 text-sm text-text">
                <Icon size={18} weight="duotone" className="text-[#e85d9c]" />
                {label}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
