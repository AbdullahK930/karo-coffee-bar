"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { menuCategories, flavourShots, addOns } from "@/lib/menu";

const easeOut = [0.16, 1, 0.3, 1] as const;

const revealParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const revealItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: easeOut } },
};

export function Menu() {
  const [activeId, setActiveId] = useState(menuCategories[0].id);
  const reduce = useReducedMotion();
  const active = menuCategories.find((c) => c.id === activeId)!;

  return (
    <section id="menu" className="bg-bg-elevated py-24 lg:py-32">
      <motion.div
        initial={reduce ? false : "hidden"}
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={reduce ? undefined : revealParent}
        className="mx-auto max-w-5xl px-6 lg:px-8"
      >
        <motion.h2
          variants={reduce ? undefined : revealItem}
          className="font-display text-3xl font-semibold tracking-tight text-text md:text-4xl"
        >
          The menu
        </motion.h2>
        <motion.p
          variants={reduce ? undefined : revealItem}
          className="mt-3 max-w-md text-text-muted"
        >
          New menu, all prices exclusive of tax.
        </motion.p>

        <motion.div
          variants={reduce ? undefined : revealItem}
          className="mt-10 flex flex-wrap gap-2"
        >
          {menuCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveId(cat.id)}
              className={`relative rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                cat.id === activeId
                  ? "text-[#15110c]"
                  : "text-text-muted hover:text-text"
              }`}
            >
              {cat.id === activeId && (
                <motion.span
                  layoutId="menu-tab-pill"
                  className="absolute inset-0 rounded-full"
                  style={{ background: "var(--gradient-brand)" }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                />
              )}
              <span className="relative">{cat.label}</span>
            </button>
          ))}
        </motion.div>

        <div className="mt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2"
            >
              {active.items.map((item) => (
                <div key={item.name} className="flex items-baseline gap-3 py-1">
                  <span className="whitespace-nowrap text-text">{item.name}</span>
                  <span className="mb-1 h-0 flex-1 border-b border-dotted border-text-muted/40" />
                  <span className="whitespace-nowrap font-mono text-sm text-text-muted">
                    Rs {item.price}
                  </span>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {active.note && (
            <p className="mt-6 text-sm italic text-text-muted">{active.note}</p>
          )}
        </div>

        <div className="mt-16 grid grid-cols-1 gap-10 border-t border-border pt-10 sm:grid-cols-2">
          <div>
            <h3 className="font-display text-sm font-semibold text-text">
              Flavours, hot or iced
            </h3>
            <p className="mt-3 text-sm text-text-muted">
              {flavourShots.join(" · ")}
            </p>
          </div>
          <div>
            <h3 className="font-display text-sm font-semibold text-text">
              Customize
            </h3>
            <ul className="mt-3 flex flex-col gap-1.5 text-sm text-text-muted">
              {addOns.map((a) => (
                <li key={a.name} className="flex justify-between gap-4">
                  <span>{a.name}</span>
                  <span className="font-mono">+Rs {a.price}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
