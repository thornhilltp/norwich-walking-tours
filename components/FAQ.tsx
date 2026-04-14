"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Plus, Minus } from "lucide-react";

// Exact copy from CLAUDE.md Section 6 — do not rewrite without instruction
const faqs = [
  {
    q: "Is it really free?",
    a: "Yes. There is no upfront cost to join. At the end, you pay what you think the experience was worth. Cards, Apple Pay, Google Pay and cash all accepted.",
  },
  {
    q: "What if it rains?",
    a: "The tour runs every single day, rain or shine. Norwich's covered Lanes and the Cathedral Close offer natural shelter along the route. Bring appropriate clothing.",
  },
  {
    q: "How fast do you walk?",
    a: "Relaxed pace throughout. This is a city walk, not a fitness class. If you need to stop, stop. The group moves together and nobody gets left behind.",
  },
  {
    q: "Is this suitable for all ages?",
    a: "Yes. The route is mostly flat and easy underfoot. Families, solo travellers, and people of all ages are all welcome.",
  },
  {
    q: "How is this different from other tours?",
    a: "Most tours run a fixed script designed for coach parties. This one is built around the stories that locals take pride in: the medieval history, the independent spirit of the city, the things that make Norwich genuinely special. It runs almost daily so you don't need to plan around a schedule.",
  },
  {
    q: "Where exactly do we meet?",
    a: "Outside The Forum on Millennium Plain, Norwich city centre. Check your email for the exact description of your guide.",
  },
  {
    q: "How do I book?",
    a: "Booking is required. Use the booking form on this page or visit the booking page. It's free to book. You pay what you think the tour was worth at the end.",
  },
  {
    q: "Is Norwich worth visiting for a day?",
    a: "Absolutely. A single day gets you Norwich Cathedral, Norwich Castle, the Lanes and Elm Hill, all within a 15-minute walk of each other. Add lunch at Norwich Market and you've seen one of the best-preserved medieval cities in England.",
  },
  {
    q: "What's the best month to visit Norwich?",
    a: "May to September gives you the longest days and the best chance of dry weather. September is our favourite. Fewer tourists, warmer stone, and the Cathedral looks incredible in low light. That said, Norwich has plenty of covered streets and good pubs, so any month works.",
  },
  {
    q: "How much should I tip a free walking tour guide in the UK?",
    a: "There's no fixed amount. Most guests on free walking tours in the UK pay between £15 and £20 per person depending on what they felt it was worth. Cards, Apple Pay, Google Pay and cash all accepted.",
  },
  {
    q: "Do I need to book in advance for the Norwich free walking tour?",
    a: "Yes, booking is required. It's still free to reserve. Booking ahead lets us know how many to expect and means we can contact you if anything changes with weather or timing. Use the booking form on this page or head to the booking page.",
  },
  {
    q: "What's the best walking tour in Norwich?",
    a: "Everyone has their pick. We're biased, but this is the only near-daily tour in the city built around the stories locals actually tell each other. You'll see Elm Hill, Norwich Cathedral, the Lanes, Norwich Market and Norwich Castle. No scripted coach-party routine. If you're after something more specific (ghost tours, literary tours, food tours), we know a few excellent niche operators and we're happy to point you their way. If you try our tour and don't think it was worth £15 to £20, you don't pay £15 to £20.",
  },
];

function FAQItem({
  q,
  a,
  index,
  isOpen,
  onToggle,
}: {
  q: string;
  a: string;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="border-b border-brand-accent/15 last:border-b-0"
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-4 py-5 text-left cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 rounded"
      >
        <h3 className="font-lora text-base md:text-lg font-semibold text-brand-text group-hover:text-brand-accent transition-colors duration-150">
          {q}
        </h3>
        <span className="shrink-0 w-7 h-7 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent transition-colors duration-150 group-hover:bg-brand-accent group-hover:text-white">
          {isOpen ? (
            <Minus className="w-3.5 h-3.5" aria-hidden="true" />
          ) : (
            <Plus className="w-3.5 h-3.5" aria-hidden="true" />
          )}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="font-lora text-muted-foreground leading-relaxed pb-5 pr-12">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} id="faq" className="section-padding bg-brand-bg">
      <div className="brand-container">
        <div className="max-w-2xl mx-auto">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="font-lora text-brand-accent text-sm font-semibold tracking-widest uppercase mb-3">
              FAQs
            </p>
            <h2 className="font-caveat text-4xl md:text-5xl font-bold text-brand-text">
              Everything you need to know
            </h2>
          </motion.div>

          {/* Accordion */}
          <div className="bg-white rounded-2xl px-6 md:px-8 border border-brand-accent/10 shadow-sm">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                q={faq.q}
                a={faq.a}
                index={index}
                isOpen={openIndex === index}
                onToggle={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
