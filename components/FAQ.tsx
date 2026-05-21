"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Plus, Minus } from "lucide-react";

// Exact copy from CLAUDE.md Section 6. Do not rewrite without instruction.
const faqs = [
  {
    q: "Is it really free?",
    a: "Risk-free, not just free. Nothing to pay upfront. At the end you pay what you think it was worth. £10 to £20 a person is the going rate. If it wasn't worth it, you don't pay. Cards, Apple Pay, Google Pay and cash all work.",
  },
  {
    q: "What happens on the day?",
    a: "Three steps. Book your spot online (free, no card needed). Meet your guide outside The Forum at your booked time — they'll be in a green t-shirt with a suspicious amount of local knowledge. Walk for 1 hour 45 minutes, relaxed pace, finishing near the Cathedral. At the end you tip what you thought it was worth. Card, Apple Pay, Google Pay or cash.",
  },
  {
    q: "What if it rains?",
    a: "We run every day, rain or shine. Norwich was built for weather: the Lanes are covered, the Cathedral Close has cover, and half the pubs on the route have been sheltering people since the 1400s. Bring a coat, not an excuse.",
  },
  {
    q: "How fast do you walk?",
    a: "Relaxed pace throughout. This is a city walk, not a fitness class. If you need to stop, stop. The group moves together and nobody gets left behind.",
  },
  {
    q: "Is this suitable for all ages?",
    a: "Yes. Mostly flat, mostly paved, mostly easy. We've had 6-year-olds and 86-year-olds on the same tour and both had a good time. Families, couples, friends, solo travellers, all welcome.",
  },
  {
    q: "How big is the group? Can I book a private one?",
    a: "Group is capped at 15 so the guide can actually talk to everyone. If you're a group of 10 or more, or you want a fully bespoke tour with your own start time and route, see the private tours page. Pricing on enquiry, suitable for corporates, families, hen and stag groups, school trips.",
  },
  {
    q: "Can I bring my dog?",
    a: "Yes, well-behaved dogs on a lead are welcome. The route is mostly pavement with a couple of cobbled stretches, so paws will be fine. Just flag it when you arrive so the guide knows.",
  },
  {
    q: "Is the tour accessible for wheelchairs, pushchairs, or limited mobility?",
    a: "Yes, with a little route-bending. A few of our stops are gloriously medieval, which is a polite way of saying cobbled (looking at you, Elm Hill). We can skip or go around the trickiest bits without missing the good stuff. Email ahead or grab your guide on arrival and we'll shape the walk around you. Pace is relaxed, stops are frequent, and nobody gets left behind.",
  },
  {
    q: "Are there toilets on the tour?",
    a: "Yes. We take a short comfort break roughly halfway, around St Andrews Hall and Elm Hill. Public toilets at St Andrews car park, plus cafes, pubs and restaurants right on the route.",
  },
  {
    q: "How is this different from other tours?",
    a: "Most tours run a fixed script designed for coach parties. This one is built around the stories that locals take pride in: the medieval history, the independent spirit of the city, the things that make Norwich genuinely special. It runs almost daily so you don't need to plan around a schedule.",
  },
  {
    q: "Where exactly do we meet?",
    a: "Outside The Forum on Millennium Plain, in the city centre. Your guide will be wearing a green t-shirt and carrying a suspicious amount of local knowledge. You'll get the full meeting description in your booking email.",
  },
  {
    q: "How do I book?",
    a: "Booking form on this page, or head to the booking page. It's free to reserve. You pay at the end, only if you enjoyed it.",
  },
  {
    q: "Is Norwich worth visiting for a day?",
    a: "Absolutely. The Sunday Times ranked Norwich the best place to live in the UK in March 2026, and a single day gets you Norwich Cathedral, Norwich Castle, the Lanes and Elm Hill, all within a 15-minute walk of each other. Add lunch at Norwich Market and you've seen one of the best-preserved medieval cities in England.",
  },
  {
    q: "What's the best month to visit Norwich?",
    a: "May to September gives you the longest days and the best chance of dry weather. September is our favourite. Fewer tourists, warmer stone, and the Cathedral looks incredible in low light. That said, Norwich has plenty of covered streets and good pubs, so any month works.",
  },
  {
    q: "How much should I tip a free walking tour guide in the UK?",
    a: "No fixed amount. On a good day, guests tip £10 to £20 per person. Some pay less, some pay more, some pay nothing. All fine. Our guides do this full time, so tips are how they eat. Cards, Apple Pay, Google Pay and cash all accepted.",
  },
  {
    q: "Do I need to book in advance for the Norwich free walking tour?",
    a: "Yes. Still free to reserve. The group is capped at 15 so we need to know how many are coming. Booking ahead also lets us send you a heads-up if anything changes with the weather or the meeting point. Same form as above.",
  },
  {
    q: "What's the best walking tour in Norwich?",
    a: "Everyone has their pick. We're biased, but this is the only near-daily tour in the city built around the stories locals actually tell each other. You'll see Elm Hill, Norwich Cathedral, the Lanes, Norwich Market and Norwich Castle. No scripted coach-party routine. If you're after something more specific (ghost tours, literary tours, food tours), we know a few excellent niche operators and we're happy to point you their way. If you try our tour and don't think it was worth £10 to £20, you don't pay £10 to £20.",
  },
];

const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
};

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

interface FAQProps {
  /** Optional custom heading element (e.g. Lora→Caveat inline pattern for /home-v2). */
  customHeading?: React.ReactNode;
}

// Number of FAQs always visible on mobile. The rest stay in the DOM
// (so FAQPage JSON-LD and Google's mobile-first index see them) but
// are CSS-hidden behind a 'Show all questions' button. Desktop is
// unaffected — always shows all FAQs.
const MOBILE_VISIBLE_COUNT = 8;

export function FAQ({ customHeading }: FAQProps = {}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [showAllMobile, setShowAllMobile] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
    />
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
            {customHeading ?? (
              <h2 className="font-caveat text-4xl md:text-5xl font-bold text-brand-text">
                Everything you need to know
              </h2>
            )}
          </motion.div>

          {/* Accordion */}
          <div className="bg-white rounded-2xl px-6 md:px-8 border border-brand-accent/10 shadow-sm">
            {faqs.map((faq, index) => {
              // Hide the tail end on mobile until user expands. Always
              // rendered in DOM for SEO (mobile-first index sees them).
              const isHiddenOnMobile =
                index >= MOBILE_VISIBLE_COUNT && !showAllMobile;
              return (
                <div
                  key={index}
                  className={isHiddenOnMobile ? "hidden md:block" : ""}
                >
                  <FAQItem
                    q={faq.q}
                    a={faq.a}
                    index={index}
                    isOpen={openIndex === index}
                    onToggle={() =>
                      setOpenIndex(openIndex === index ? null : index)
                    }
                  />
                </div>
              );
            })}
          </div>

          {/* Mobile-only 'Show more' button — desktop already shows
              every FAQ so it's hidden there. Disappears after expansion. */}
          {!showAllMobile && faqs.length > MOBILE_VISIBLE_COUNT && (
            <button
              type="button"
              onClick={() => setShowAllMobile(true)}
              className="md:hidden mt-6 w-full py-3 rounded-xl border border-brand-accent/20 bg-white text-brand-accent-text font-lora font-semibold text-sm hover:bg-brand-accent-light/30 transition-colors duration-150"
            >
              Show all {faqs.length} questions &darr;
            </button>
          )}
        </div>
      </div>
    </section>
    </>
  );
}
