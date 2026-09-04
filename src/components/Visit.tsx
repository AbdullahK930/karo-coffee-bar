"use client";

import { motion, useReducedMotion } from "motion/react";
import { MapPin, Phone, Clock, InstagramLogo } from "@phosphor-icons/react";
import { site, mapsDirectionsUrl, mapsEmbedUrl } from "@/lib/site";

const easeOut = [0.16, 1, 0.3, 1] as const;

const details = [
  { icon: MapPin, label: "Address", value: site.address },
  { icon: Clock, label: "Hours", value: site.hours },
  { icon: Phone, label: "Phone", value: site.phone, href: site.phoneHref },
];

const revealParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
const revealItem = {
  hidden: { opacity: 0, x: -16 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: easeOut } },
};

export function Visit() {
  const reduce = useReducedMotion();

  return (
    <section id="visit" className="bg-bg-elevated py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: easeOut }}
        >
          <h2 className="font-display text-3xl font-semibold tracking-tight text-text md:text-4xl">
            Come find us
          </h2>

          <motion.dl
            initial={reduce ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={reduce ? undefined : revealParent}
            className="mt-9 flex flex-col gap-6"
          >
            {details.map(({ icon: Icon, label, value, href }) => (
              <motion.div
                key={label}
                variants={reduce ? undefined : revealItem}
                className="flex gap-4"
              >
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-bg-elevated-2 text-[#e85d9c]">
                  <Icon size={18} weight="duotone" />
                </span>
                <div>
                  <dt className="text-xs uppercase tracking-[0.14em] text-text-muted">
                    {label}
                  </dt>
                  {href ? (
                    <dd>
                      <a href={href} className="text-text transition-colors hover:text-[#f2994a]">
                        {value}
                      </a>
                    </dd>
                  ) : (
                    <dd className="max-w-xs text-text">{value}</dd>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.dl>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={mapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#f5efe4] px-7 py-3.5 text-sm font-medium text-[#15110c] transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
            >
              Get Directions
            </a>
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-medium text-text transition-colors hover:border-text-muted active:scale-[0.98]"
            >
              <InstagramLogo size={17} />
              {site.instagramHandle}
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.15, ease: easeOut }}
          className="relative min-h-[360px] overflow-hidden rounded-3xl border border-border"
        >
          <iframe
            title="Káro Coffee Bar location"
            src={mapsEmbedUrl}
            className="absolute inset-0 h-full w-full grayscale-[40%] contrast-[1.05]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </div>
    </section>
  );
}
