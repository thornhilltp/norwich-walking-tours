"use client";

// One-at-a-time photo carousel with prev/next arrows + dots — the same
// control language as the GuideReviews paper-card carousel, applied to
// the tour photos. Polaroid dress: white frame, tape, Caveat caption.

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface CarouselPhoto {
  src: string;
  alt: string;
  caption: string;
}

export function PhotoCarousel({ photos }: { photos: CarouselPhoto[] }) {
  const [i, setI] = useState(0);
  if (!photos || photos.length === 0) return null;

  const many = photos.length > 1;
  const photo = photos[i];
  const go = (d: 1 | -1) => setI((p) => (p + d + photos.length) % photos.length);

  return (
    <div className="w-full max-w-md mx-auto lg:mx-0">
      <div
        className="relative bg-white rounded-[4px] border border-[#EAE0D4] p-3 pb-14 shadow-[2px_10px_24px_-12px_rgba(90,70,40,0.55)]"
        style={{ rotate: "-1.2deg" }}
      >
        <span
          aria-hidden="true"
          className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#F5EBDA]/90 rotate-[-2deg] shadow-sm z-10"
        />
        <div className="relative aspect-[4/3] overflow-hidden rounded-[2px] bg-[#F5EBDA]">
          {/* All slides stay mounted so switching is instant; only the
              active one is visible. */}
          {photos.map((p, idx) => (
            <Image
              key={p.src}
              src={p.src}
              alt={idx === i ? p.alt : ""}
              fill
              className={`object-cover transition-opacity duration-300 ${
                idx === i ? "opacity-100" : "opacity-0"
              }`}
              sizes="(max-width: 1024px) 90vw, 440px"
              loading={idx === 0 ? undefined : "eager"}
              aria-hidden={idx !== i}
            />
          ))}
        </div>
        <p
          className="absolute bottom-3.5 left-0 right-0 text-center text-[24px] font-bold text-brand-text/80 px-4 truncate"
          style={{ fontFamily: "var(--font-caveat), cursive" }}
        >
          {photo.caption}
        </p>
      </div>

      {many && (
        <div className="mt-5 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous photo"
            className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-brand-accent/30 bg-white text-brand-accent hover:bg-brand-accent hover:text-white transition-colors duration-150"
          >
            <ChevronLeft className="w-5 h-5" aria-hidden="true" />
          </button>
          <div className="flex items-center gap-2">
            {photos.map((p, idx) => (
              <button
                key={p.src}
                type="button"
                onClick={() => setI(idx)}
                aria-label={`Photo ${idx + 1}: ${p.caption}`}
                aria-current={idx === i}
                className={`h-2 rounded-full transition-all duration-200 ${
                  idx === i
                    ? "w-6 bg-brand-accent"
                    : "w-2 bg-brand-text/20 hover:bg-brand-text/40"
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next photo"
            className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-brand-accent/30 bg-white text-brand-accent hover:bg-brand-accent hover:text-white transition-colors duration-150"
          >
            <ChevronRight className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
