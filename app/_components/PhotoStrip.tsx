"use client";

// PhotoStrip — homepage photo gallery. Signed off by Tom 2026-09-26.
// Short "Photo gallery" heading in the house Lora + Caveat style. One full-width row of polaroids,
// arrows either side to step through, swipe on phones. No autoplay: the
// reviews carousel above already moves, two moving rows is noise.
// Mixes Morrie's evening shoot with the older sunny-day phone photos, which
// shows the tour in different light and weather.

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const photos = [
  { src: "/images/tour/tom-tombland-talk.jpg", alt: "Tom mid-story in Tombland with a tour group listening in front of a pink cottage", caption: "Tombland", paper: "#FFFFFF" },
  { src: "/images/tour/group-cathedral-lawn.jpg", alt: "A big tour group on the lawn in front of Norwich Cathedral on a sunny day", caption: "Cathedral Close", paper: "#E8F0E4" },
  { src: "/images/tour/holly-market.jpg", alt: "Guide finishing the tour at Norwich Market with City Hall's clock tower behind", caption: "Norwich Market, where we finish", paper: "#F5EBDA" },
  { src: "/images/tour/walking-ertherberts-arch.jpg", alt: "Tour group walking through the Erpingham Gate into the Cathedral Close", caption: "Erpingham Gate", paper: "#FFFFFF" },
  { src: "/images/tour/group-forum-flag.jpg", alt: "A tour group posing with their guides and the green flag in the grounds of Norwich Cathedral", caption: "Look for the green flag", paper: "#E8F0E4" },
  { src: "/images/tour/dog-erpingham-gate.jpg", alt: "A dog in a Walk with a Local t-shirt at the Erpingham Gate. Well-behaved dogs are welcome on the tour", caption: "Dogs welcome", paper: "#F5EBDA" },
  { src: "/images/tour/tom-tombland.jpg", alt: "Guide telling a story in Tombland beside the timber-framed Augustine Steward House", caption: "Augustine Steward House", paper: "#FFFFFF" },
  { src: "/images/tour/group-britons-arms.jpg", alt: "Tour group gathered outside the Britons Arms on Elm Hill", caption: "Elm Hill", paper: "#E8F0E4" },
  { src: "/images/tour/elm-hill-group.jpg", alt: "Guide telling a story to a tour group on a cobbled Norwich street", caption: "", paper: "#F5EBDA" },
  { src: "/images/tour/guide-norwich-market.jpg", alt: "Guide pointing out the stalls at Norwich Market to a tour group", caption: "The market", paper: "#FFFFFF" },
  { src: "/images/tour/group-forum-standing.jpg", alt: "Tour group and guides together in the grounds of Norwich Cathedral", caption: "", paper: "#E8F0E4" },
  { src: "/images/tour/group-fye-bridge.jpg", alt: "Tour group listening to their guide by the river at Fye Bridge", caption: "Fye Bridge", paper: "#F5EBDA" },
] as const;

const tilts = ["-1.4deg", "1.1deg", "-0.8deg", "1.3deg", "-1.1deg", "0.9deg"];

export function PhotoStrip() {
  const rowRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<number | null>(null);
  const n = photos.length;
  const go = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + n) % n)), [n]);

  // Lightbox: Esc closes, arrow keys flick, page behind doesn't scroll.
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, go]);

  const step = (dir: 1 | -1) => {
    const row = rowRef.current;
    if (!row) return;
    const card = row.querySelector("figure");
    const by = card ? card.getBoundingClientRect().width + 24 : row.clientWidth * 0.8;
    row.scrollBy({ left: dir * by, behavior: "smooth" });
  };

  const arrow =
    "absolute top-1/2 -translate-y-1/2 z-10 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/95 shadow-lg border border-brand-accent/20 flex items-center justify-center text-brand-accent hover:bg-brand-accent hover:text-white transition-colors";

  return (
    <section id="photos" className="py-10 md:py-14 bg-white border-t border-brand-accent/10 overflow-hidden">
      <div className="brand-container mb-2 md:mb-4">
        <p
          className="text-brand-accent-text text-xs font-semibold tracking-[0.18em] uppercase mb-3"
          style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
        >
          Photo gallery
        </p>
        <h2 className="leading-[1.0]">
          <span
            className="inline text-[clamp(32px,3.8vw,48px)] font-semibold leading-[1.05] tracking-[-0.02em] text-brand-text"
            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
          >
            Snaps from
          </span>{" "}
          <span
            className="inline text-[clamp(42px,5vw,64px)] font-semibold leading-[0.95] text-brand-accent"
            style={{ fontFamily: "var(--font-caveat), cursive" }}
          >
            our tours.
          </span>
        </h2>
      </div>
      <div className="relative">
        <button type="button" aria-label="Previous photos" onClick={() => step(-1)} className={`${arrow} left-2 md:left-6`}>
          <ChevronLeft className="w-6 h-6" aria-hidden="true" />
        </button>
        <button type="button" aria-label="Next photos" onClick={() => step(1)} className={`${arrow} right-2 md:right-6`}>
          <ChevronRight className="w-6 h-6" aria-hidden="true" />
        </button>

        <div
          ref={rowRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-px-6 py-6 px-6 md:px-20 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="region"
          aria-label="Photos from the tour. Use the arrows or scroll sideways for more."
          tabIndex={0}
        >
          {photos.map((photo, idx) => (
            <figure
              key={photo.src}
              role="button"
              tabIndex={0}
              aria-label={`Open photo: ${photo.caption || photo.alt}`}
              onClick={() => setOpen(idx)}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpen(idx); } }}
              className="cursor-zoom-in relative flex-none snap-start w-[76vw] sm:w-[340px] lg:w-[380px] p-2.5 pb-9 shadow-lg border border-brand-text/5 m-0"
              style={{ backgroundColor: photo.paper, transform: `rotate(${tilts[idx % tilts.length]})` }}
            >
              <span
                aria-hidden="true"
                className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 rounded-sm shadow-sm"
                style={{
                  backgroundColor: "rgba(241, 225, 161, 0.75)",
                  borderTop: "1px solid rgba(241, 225, 161, 0.95)",
                  borderBottom: "1px solid rgba(0, 0, 0, 0.04)",
                }}
              />
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image src={photo.src} alt={photo.alt} fill className="object-cover" sizes="(max-width: 640px) 76vw, 380px" />
              </div>
              <figcaption
                className="absolute bottom-1.5 left-3 text-[20px] italic font-bold text-brand-text"
                style={{ fontFamily: "var(--font-caveat), cursive" }}
              >
                {photo.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={photos[open].caption || photos[open].alt}
          style={{ backgroundColor: "rgba(10,10,10,0.96)" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-4 md:p-10"
          onClick={() => setOpen(null)}
        >
          <button type="button" aria-label="Close" onClick={() => setOpen(null)} className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20">
            <X className="w-6 h-6" aria-hidden="true" />
          </button>
          <div className="relative w-full h-[75vh] max-w-6xl" onClick={(e) => e.stopPropagation()}>
            <Image src={photos[open].src} alt={photos[open].alt} fill className="object-contain" sizes="100vw" priority />
          </div>
          <p className="mt-4 text-white text-2xl" style={{ fontFamily: "var(--font-caveat), cursive" }} onClick={(e) => e.stopPropagation()}>
            {photos[open].caption} <span className="text-white/50 text-base ml-2" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>{open + 1} / {n}</span>
          </p>
          <button type="button" aria-label="Previous photo" onClick={(e) => { e.stopPropagation(); go(-1); }} className={`${arrow} left-3 md:left-8`}>
            <ChevronLeft className="w-6 h-6" aria-hidden="true" />
          </button>
          <button type="button" aria-label="Next photo" onClick={(e) => { e.stopPropagation(); go(1); }} className={`${arrow} right-3 md:right-8`}>
            <ChevronRight className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>
      )}
    </section>
  );
}
