"use client";

// Scrollable photo strip — same native scroll-snap + feathered-edge
// pattern as TourCarousel (the Peloton-style card scroller Tom liked),
// carrying the site's polaroid language: white frame, tape, tilt,
// Caveat caption.

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

export interface StripPhoto {
  src: string;
  alt: string;
  caption: string;
}

export function PhotoStrip({
  photos,
  framed = true,
}: {
  photos: StripPhoto[];
  /** false = plain rounded photos, no polaroid frame or caption. */
  framed?: boolean;
}) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setAtStart(track.scrollLeft <= 4);
    setAtEnd(track.scrollLeft + track.clientWidth >= track.scrollWidth - 4);
  }, []);

  useEffect(() => {
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, [sync]);

  const stops = [
    atStart ? "black 0" : "transparent 0, black 5%",
    atEnd ? "black 100%" : "black 95%, transparent 100%",
  ].join(", ");
  const mask =
    atStart && atEnd ? undefined : `linear-gradient(to right, ${stops})`;

  return (
    <ul
      ref={trackRef}
      onScroll={sync}
      className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 pt-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      style={{ maskImage: mask, WebkitMaskImage: mask }}
    >
      {photos.map((photo, i) => (
        <li
          key={photo.src}
          className="snap-start shrink-0 w-[72vw] sm:w-[320px]"
        >
          {!framed ? (
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#F5EBDA]">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 72vw, 320px"
                loading={i === 0 ? undefined : "eager"}
              />
            </div>
          ) : (
          <figure
            className="relative m-0 bg-white rounded-[4px] border border-[#EAE0D4] p-2.5 pb-11 shadow-[2px_8px_20px_-12px_rgba(90,70,40,0.5)]"
            style={{ rotate: i % 2 === 0 ? "-1.2deg" : "1.1deg" }}
          >
            <span
              aria-hidden="true"
              className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-20 h-5 bg-[#F5EBDA]/90 rotate-[-2deg] shadow-sm"
            />
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2px] bg-[#F5EBDA]">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 72vw, 320px"
                loading={i === 0 ? undefined : "eager"}
              />
            </div>
            <figcaption
              className="absolute bottom-3 left-0 right-0 text-center text-[21px] font-bold text-brand-text/75 px-3 truncate"
              style={{ fontFamily: "var(--font-caveat), cursive" }}
            >
              {photo.caption}
            </figcaption>
          </figure>
          )}
        </li>
      ))}
    </ul>
  );
}
