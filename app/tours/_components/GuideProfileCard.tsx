"use client";

// Guide card that opens into a full profile, adapted from Watermelon UI's
// ExpandableProfileCard (ui.watermelon.sh). Card = photo + name; tap to
// expand into a panel with the guide's own words and links. framer-motion
// in place of motion/react; next/image; Escape and backdrop close it.

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

const lora = { fontFamily: "var(--font-lora), Georgia, serif" } as const;
const caveat = { fontFamily: "var(--font-caveat), cursive" } as const;

export function GuideProfileCard({
  name,
  image,
  focal = "50% 30%",
  eyebrow,
  blurb,
  handle,
}: {
  name: string;
  image: string;
  focal?: string;
  eyebrow: string;
  blurb: string;
  handle?: { label: string; href: string };
}) {
  const [open, setOpen] = useState(false);
  const id = `guide-${name}`;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <motion.button
        type="button"
        layoutId={id}
        onClick={() => setOpen(true)}
        whileHover="hover"
        aria-label={`Meet ${name}`}
        className="group relative block h-[420px] w-full max-w-[340px] overflow-hidden rounded-3xl text-left shadow-lg"
      >
        <motion.div
          layoutId={`${id}-img`}
          className="absolute inset-0"
          variants={{ hover: { scale: 1.05 } }}
        >
          <Image
            src={image}
            alt={`Portrait of ${name}`}
            fill
            className="object-cover"
            style={{ objectPosition: focal }}
            sizes="340px"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-[#5AE19E] text-[12px] font-semibold tracking-[0.16em] uppercase mb-1" style={lora}>
            {eyebrow}
          </p>
          <p className="text-white text-[40px] font-bold leading-none" style={caveat}>
            {name}
          </p>
          <p className="text-white/80 text-[13px] mt-2" style={lora}>
            Tap to meet {name}
          </p>
        </div>
      </motion.button>

      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-brand-text/60 backdrop-blur-md"
            />
            <motion.div
              layoutId={id}
              role="dialog"
              aria-modal="true"
              aria-label={`About ${name}`}
              className="relative z-10 flex w-full max-w-3xl max-h-[85vh] flex-col md:flex-row overflow-hidden rounded-3xl bg-white shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/85 text-brand-text shadow hover:bg-white"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
              <motion.div layoutId={`${id}-img`} className="relative h-64 w-full shrink-0 md:h-auto md:w-1/2">
                <Image
                  src={image}
                  alt={`Portrait of ${name}`}
                  fill
                  className="object-cover"
                  style={{ objectPosition: focal }}
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.15 }}
                className="flex w-full flex-col overflow-y-auto p-7 md:w-1/2 md:p-9"
              >
                <p className="text-brand-accent text-[12px] font-semibold tracking-[0.16em] uppercase mb-2" style={lora}>
                  {eyebrow}
                </p>
                <p className="text-brand-text text-[44px] font-bold leading-none mb-5" style={caveat}>
                  {name}
                </p>
                <p className="text-[17px] text-brand-text/80 leading-relaxed mb-6" style={lora}>
                  &ldquo;{blurb}&rdquo;
                </p>
                <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-2" style={lora}>
                  {handle && (
                    <a
                      href={handle.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-accent font-semibold hover:underline"
                    >
                      {handle.label}
                    </a>
                  )}
                  <a
                    href="/our-guides"
                    className="text-brand-text/70 italic underline underline-offset-4 decoration-brand-text/30 hover:decoration-brand-text"
                  >
                    meet all our guides
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
