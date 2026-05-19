"use client";

// WhatHowWho — 3-column 'what you'll see / how it works / who runs it'
// summary block that sits between Hero and PhotoShowcase on /home-v2.
//
// Why exists: the /home-v2 Hero H1 ('See Norwich with someone who lives
// here') is outcome-shaped, not keyword-shaped. This block restores
// keyword density immediately below the fold — entity-rich (Cathedral,
// Castle, Elm Hill, Market, Lanes, Guildhall, etc.) for non-branded
// 'Norwich walking tour' / 'Norwich free walking tour' search intent.
//
// Slightly different copy from the equivalent block on /tour to avoid
// near-duplicate content penalty.

import { motion } from "framer-motion";

const columns = [
  {
    heading: "What you'll see",
    body: "Twelve stops through the medieval city. Norwich Cathedral, Norwich Castle, Elm Hill, Norwich Market, the Norwich Lanes, the Guildhall, St Andrews Hall, Tombland. Nearly a thousand years of stories, all within a quarter-mile of each other on foot.",
  },
  {
    heading: "How it works",
    body: "Reserve free in thirty seconds. Meet at The Forum, Norwich. Walk for 1h 45m at a relaxed pace. At the end, tip what you thought it was worth. Card or cash. Most guests tip £10 to £20 per person.",
  },
  {
    heading: "Who runs it",
    body: "Tom Thornhill, a Norwich local who came for a history degree thirteen years ago and never left. Walks the route most days. Not a script-reader or a costume-wearer. Just someone who loves this city and wants to show you why.",
  },
];

export function WhatHowWho() {
  return (
    <section className="py-12 md:py-16 bg-brand-bg border-b border-brand-accent/10">
      <div className="brand-container max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {columns.map((col, i) => (
            <motion.div
              key={col.heading}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <h2 className="font-caveat text-2xl md:text-3xl font-bold text-brand-text mb-3">
                {col.heading}
              </h2>
              <p className="font-lora text-base text-muted-foreground leading-relaxed">
                {col.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
