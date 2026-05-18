"use client";

// BookingSectionV2 — dedicated booking section for /home-v2.
// Sits between StopsAndMap and FAQ as a second booking surface.
// Layout per Tom's reference image #2: text-left (eyebrow + Caveat→Lora
// heading + lede + 3 check bullets + foot italic quote), real
// BookingFrame iframe on the right.

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { BookingFrame } from "@/components/BookingFrame";

const bullets = [
  // Bullet 1 replaced — "No card needed / Booking holds your spot. Pay at
  // the end if you liked it." was restating the model that's already in
  // the H2 + Hero badge + foot quote. Useless. Replaced with something
  // that actually reduces friction at the booking → arriving step:
  // visitors often worry about tickets, barcodes, where to find the guide.
  {
    title: "Just turn up",
    body: "Your guide is at The Forum from 10.45, wearing a green t-shirt. No tickets to print, no barcode to scan.",
  },
  {
    title: "£10 to £20 per person",
    body: "That's what guests have tipped, on average. No pressure.",
  },
  {
    title: "Change or cancel anytime",
    body: "Up to an hour before the tour. We'd rather know.",
  },
];

export function BookingSectionV2() {
  return (
    <section
      id="book-section"
      className="section-padding bg-brand-accent-light/30 border-t border-brand-accent/10 border-b border-brand-accent/10"
    >
      <div className="brand-container">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-start">
          {/* Left: copy + bullets */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <p
              className="text-brand-accent-text text-xs font-semibold tracking-[0.18em] uppercase mb-4"
              style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
            >
              Pick a date
            </p>
            {/* H2 order swapped — Lora→Caveat to match every other H2 on
                the page. Green Caveat lands on the punchline ("Tip what it
                was worth") rather than the prosaic "Free to book". */}
            <h2 className="leading-[1.0] mb-5">
              <span
                className="block text-[clamp(36px,4.4vw,56px)] font-bold leading-[1.05] tracking-tight text-brand-text"
                style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
              >
                Free to book.
              </span>
              <span
                className="block text-[clamp(48px,5.6vw,76px)] font-bold leading-[0.95] text-brand-accent"
                style={{ fontFamily: "var(--font-caveat), cursive" }}
              >
                Tip what it was worth.
              </span>
            </h2>
            {/* Inline "what is a free tour?" explainer — catches first-time
                visitors who don't know the model. Links to the full
                explainer at /what-is-a-free-tour for the longer read. */}
            <p
              className="text-base text-muted-foreground leading-relaxed mb-4"
              style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
            >
              <strong className="text-brand-text font-semibold">Never done a free walking tour?</strong> Book free, walk 1h 45m with a local guide, tip what you thought it was worth at the end. No catch.{" "}
              <a
                href="/what-is-a-free-tour"
                className="text-brand-accent-text font-semibold hover:underline underline-offset-2"
              >
                Full explainer &rarr;
              </a>
            </p>
            {/* Tom feedback: the "Tours leave The Forum daily..." line was
                redundant with the free-tour explainer above + the bullets
                below + the Hero badge + the ScrollTrail. Dropped to avoid
                repeating the same facts in adjacent paragraphs. */}

            <ul className="mb-8">
              {bullets.map((bullet, idx) => (
                <li
                  key={bullet.title}
                  className={`flex items-start gap-3.5 py-3.5 ${
                    idx < bullets.length - 1 ? "border-b border-dashed border-brand-accent/15" : ""
                  }`}
                >
                  <span className="flex-shrink-0 text-brand-accent mt-0.5">
                    <Check className="w-[18px] h-[18px]" strokeWidth={3} aria-hidden="true" />
                  </span>
                  <div>
                    <p
                      className="font-bold text-[15px] text-brand-text mb-1"
                      style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                    >
                      {bullet.title}
                    </p>
                    <p
                      className="text-sm text-muted-foreground leading-relaxed"
                      style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                    >
                      {bullet.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <p
              className="italic text-sm text-muted-foreground leading-relaxed max-w-md"
              style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
            >
              Call it merit-based. If the tour earned it, you tip. If it didn&apos;t, you walk off. Honest deal.
            </p>
          </motion.div>

          {/* Right: real booking widget iframe */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="w-full rounded-2xl overflow-hidden shadow-xl border border-brand-accent/15 bg-white"
          >
            <BookingFrame
              height={560}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
