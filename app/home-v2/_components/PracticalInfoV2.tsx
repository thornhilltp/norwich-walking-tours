"use client";

// PracticalInfoV2 — compact logistics band for /home-v2.
// Restores the meeting-point + duration + what-to-wear + schedule callouts
// that were in PracticalInfo on / but got lost when we moved to the lean
// /home-v2 layout. Currently those facts only appear scattered across
// 4 different FAQ entries + the Footer. This band surfaces them as a
// scannable strip just before the booking decision.

import { motion } from "framer-motion";
import { MapPin, Clock, Calendar, Footprints, Shirt, Globe } from "lucide-react";

const logistics = [
  {
    icon: MapPin,
    label: "Meeting point",
    value: "Outside The Forum, NR2 1TF",
  },
  {
    icon: Clock,
    label: "Duration",
    value: "1 hour 45 minutes",
  },
  {
    icon: Calendar,
    label: "Schedule",
    value: "Tours run daily, rain or shine",
  },
  {
    icon: Footprints,
    label: "Pace",
    value: "Relaxed, mostly flat",
  },
  {
    icon: Shirt,
    label: "What to wear",
    value: "Comfortable shoes, a light jacket",
  },
  {
    icon: Globe,
    label: "Language",
    value: "English",
  },
];

export function PracticalInfoV2() {
  return (
    <section className="section-padding bg-brand-accent-light/40 border-t border-brand-accent/10">
      <div className="brand-container">
        {/* Heading — Lora→Caveat pattern */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p
            className="text-brand-accent text-xs font-semibold tracking-[0.18em] uppercase mb-4"
            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
          >
            Before you come
          </p>
          <h2 className="leading-[1.0]">
            <span
              className="inline text-[clamp(36px,4.4vw,56px)] font-bold leading-[1.05] tracking-tight text-brand-text"
              style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
            >
              The practical
            </span>{" "}
            <span
              className="inline text-[clamp(48px,5.6vw,76px)] font-bold leading-[0.95] text-brand-accent"
              style={{ fontFamily: "var(--font-caveat), cursive" }}
            >
              stuff.
            </span>
          </h2>
        </motion.div>

        {/* Six logistics tiles — dense, scannable */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-4xl mx-auto">
          {logistics.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-white rounded-xl p-5 border border-brand-accent/12 shadow-sm flex items-start gap-3"
              >
                <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-brand-accent/10 flex items-center justify-center mt-0.5">
                  <Icon className="w-4 h-4 text-brand-accent" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <p
                    className="text-[12px] font-semibold tracking-wider uppercase text-brand-accent mb-1"
                    style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                  >
                    {item.label}
                  </p>
                  <p
                    className="text-sm font-medium text-brand-text leading-snug"
                    style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                  >
                    {item.value}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
