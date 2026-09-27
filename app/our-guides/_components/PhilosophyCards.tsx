"use client";

// Our philosophy — Watermelon UI "Expandable Profile Card" pattern, rebuilt
// by hand. Three photo cards with the heading and a one-line takeaway on the
// photo; tap one and it grows into a photo-left / text-right panel with the
// full line and a book button. Replaces the taped note cards (tape was
// everywhere on the page). The full paragraph is also in the card as
// sr-only text, so search engines and screen readers get it without a tap.

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Plus, X } from "lucide-react";
import { TrackedBookLink } from "@/components/TrackedBookLink";

type Point = {
  h: string;
  teaser: string;
  p: string;
  img: string;
  alt: string;
  focal?: string;
};

const points: Point[] = [
  {
    h: "A conversation, not a lecture",
    teaser: "You'll talk to us, and to each other.",
    p: "We tell stories and ask questions, we don't reel off dates. **You'll talk to us, and to each other.** That's the bit people remember.",
    img: "/images/tour/tom-tombland-talk.jpg",
    alt: "Tom mid-story in Tombland with a tour group listening",
  },
  {
    h: "Built around you",
    teaser: "Nobody gets quite the same walk.",
    p: "We read the group. Where you're from, what you're into, how much history you actually want. **Nobody gets quite the same walk.**",
    img: "/images/tour/group-street-laughing.jpg",
    alt: "Guests laughing with their guide on a Norwich street",
  },
  {
    h: "More than history",
    teaser: "Where to eat, what to see next.",
    p: "Where to eat, what to see next, what locals actually do. We want you making the most of **the whole trip**, not just the two hours with us.",
    img: "/images/tour/group-britons-arms.jpg",
    alt: "Tom with a tour group outside the Britons Arms coffee house on Elm Hill",
    focal: "50% 62%",
  },
];

function renderBold(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="font-semibold text-brand-text">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

const plain = (t: string) => t.replace(/\*\*/g, "");

export function PhilosophyCards() {
  const [active, setActive] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);

  // Esc closes, page behind doesn't scroll, focus goes to the close button
  // and back to the card that opened it.
  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      openerRef.current?.focus();
    };
  }, [active]);

  const pt = active !== null ? points[active] : null;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 max-w-5xl mx-auto mt-12 text-left">
        {points.map((x, i) => (
          <div key={x.h}>
            <motion.button
              type="button"
              layoutId={`ph-card-${i}`}
              onClick={(e) => { openerRef.current = e.currentTarget; setActive(i); }}
              aria-haspopup="dialog"
              className="group relative block w-full aspect-[4/3] md:aspect-[4/5] overflow-hidden rounded-2xl text-left shadow-[0_14px_30px_-18px_rgba(60,40,20,0.6)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-accent"
              style={{ borderRadius: 16 }}
            >
              <motion.div layoutId={`ph-img-${i}`} className="absolute inset-0">
                <Image
                  src={x.img}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  style={{ objectPosition: x.focal ?? "50% 50%" }}
                  sizes="(max-width: 768px) 92vw, 330px"
                />
              </motion.div>
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent"
              />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <motion.h3
                  layoutId={`ph-h-${i}`}
                  className="font-caveat text-4xl font-bold text-white leading-none mb-2"
                >
                  {x.h}
                </motion.h3>
                <p className="font-lora text-white/85 text-[0.95rem] leading-snug pr-12">{x.teaser}</p>
              </div>
              <span
                aria-hidden="true"
                className="absolute bottom-5 right-5 w-9 h-9 rounded-full bg-white/90 text-brand-text flex items-center justify-center shadow transition-transform duration-300 group-hover:rotate-90"
              >
                <Plus className="w-4 h-4" />
              </span>
            </motion.button>
            <p className="sr-only">{plain(x.p)}</p>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {pt && active !== null && (
          <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6 text-left">
            <motion.div
              aria-hidden="true"
              className="absolute inset-0 bg-[#1A1A1A]/55 backdrop-blur-[3px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActive(null)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby={`ph-title-${active}`}
              layoutId={`ph-card-${active}`}
              className="relative w-full max-w-3xl max-h-[88vh] overflow-y-auto overflow-x-hidden bg-brand-bg shadow-2xl grid grid-cols-1 md:grid-cols-2"
              style={{ borderRadius: 16 }}
            >
              <motion.div
                layoutId={`ph-img-${active}`}
                className="relative aspect-[4/3] md:aspect-auto md:min-h-[440px]"
              >
                <Image src={pt.img} alt={pt.alt} fill className="object-cover" sizes="(max-width: 768px) 92vw, 384px" />
              </motion.div>

              <div className="relative p-6 md:p-8 flex flex-col">
                <button
                  ref={closeRef}
                  type="button"
                  onClick={() => setActive(null)}
                  aria-label="Close"
                  className="absolute top-3 right-3 w-11 h-11 rounded-full flex items-center justify-center text-brand-text/70 hover:bg-brand-accent-light hover:text-brand-text transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <p className="font-lora text-xs font-semibold tracking-[0.18em] uppercase text-brand-accent-text mb-2">
                  Our philosophy
                </p>
                <motion.h3
                  id={`ph-title-${active}`}
                  layoutId={`ph-h-${active}`}
                  className="font-caveat text-4xl md:text-5xl font-bold text-brand-accent leading-none pr-10"
                >
                  {pt.h}
                </motion.h3>
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 0.15 } }}
                  exit={{ opacity: 0, transition: { duration: 0.1 } }}
                  className="flex flex-col flex-1"
                >
                  <div className="h-px bg-brand-text/10 my-5" />
                  <p className="font-lora text-lg text-brand-text/80 leading-relaxed">{renderBold(pt.p)}</p>
                  <div className="mt-auto pt-8">
                    <TrackedBookLink
                      location="about_us_philosophy"
                      className="btn-cta inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-accent text-white rounded-xl hover:bg-brand-accent/90 transition-colors duration-150 shadow-md"
                    >
                      Book your spot (free)
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </TrackedBookLink>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
