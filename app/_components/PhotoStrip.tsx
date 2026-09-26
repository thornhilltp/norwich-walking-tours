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

  // Carousel navigator (Watermelon UI "Carousel Navigator" pattern, rebuilt
  // by hand): bottom bar with prev/next, a thumbnail per photo (dots on
  // phones), and an "n / total" counter. Replaces the side arrows, which
  // clashed with the ScrollTrail dots on the right edge.
  const [active, setActive] = useState(0);
  const cards = () => Array.from(rowRef.current?.querySelectorAll("figure") ?? []) as HTMLElement[];
  const goTo = (i: number) => {
    const row = rowRef.current;
    const list = cards();
    if (!row || !list.length) return;
    const t = Math.max(0, Math.min(list.length - 1, i));
    row.scrollTo({ left: list[t].offsetLeft - list[0].offsetLeft, behavior: "smooth" });
    setActive(t);
  };
  const step = (dir: 1 | -1) => goTo(active + dir);
  const onRowScroll = () => {
    const row = rowRef.current;
    const list = cards();
    if (!row || list.length < 2) return;
    const w = list[1].offsetLeft - list[0].offsetLeft;
    const atEnd = row.scrollLeft + row.clientWidth >= row.scrollWidth - 4;
    setActive(atEnd ? list.length - 1 : Math.round(row.scrollLeft / w));
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
      {/* lg:mr-20 keeps the row clear of the ScrollTrail dots on the right edge. */}
      <div className="brand-container">
      <div className="relative lg:mr-20">
        <div
          ref={rowRef}
          onScroll={onRowScroll}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-px-2 py-6 px-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="region"
          aria-label="Photos from the tour. Use the bar below or scroll sideways for more."
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

        <div className="flex justify-center mt-4">
          <div className="inline-flex items-center gap-2 sm:gap-3 rounded-full bg-white border border-brand-accent/15 shadow-md px-2 py-1.5">
            <button
              type="button"
              aria-label="Previous photo"
              onClick={() => step(-1)}
              disabled={active === 0}
              className="w-10 h-10 rounded-full flex items-center justify-center text-brand-accent hover:bg-brand-accent-light disabled:opacity-30 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            </button>

            {/* Thumbnails from sm up, dots on phones. */}
            <div className="hidden sm:flex items-center gap-1.5">
              {photos.map((ph, i) => (
                <button
                  key={ph.src}
                  type="button"
                  aria-label={`Show photo ${i + 1}`}
                  aria-current={i === active}
                  onClick={() => goTo(i)}
                  className="relative overflow-hidden rounded-md transition-all duration-300"
                  style={{
                    width: i === active ? 44 : 30,
                    height: 30,
                    opacity: i === active ? 1 : 0.55,
                    boxShadow: i === active ? "0 0 0 2px #2DA96B" : "none",
                  }}
                >
                  <Image src={ph.src} alt="" fill className="object-cover" sizes="44px" />
                </button>
              ))}
            </div>
            <div className="flex sm:hidden items-center gap-1.5">
              {photos.map((ph, i) => (
                <button
                  key={ph.src}
                  type="button"
                  aria-label={`Show photo ${i + 1}`}
                  aria-current={i === active}
                  onClick={() => goTo(i)}
                  className="h-2 rounded-full transition-all duration-300"
                  style={{ width: i === active ? 18 : 8, backgroundColor: i === active ? "#2DA96B" : "rgba(45,169,107,0.3)" }}
                />
              ))}
            </div>

            <span className="font-lora text-xs text-brand-text/60 tabular-nums w-12 text-center" aria-live="polite">
              {active + 1} / {n}
            </span>

            <button
              type="button"
              aria-label="Next photo"
              onClick={() => step(1)}
              disabled={active === n - 1}
              className="w-10 h-10 rounded-full flex items-center justify-center text-brand-accent hover:bg-brand-accent-light disabled:opacity-30 transition-colors"
            >
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>
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
