"use client";

// HeroVideo — muted looping film behind a hero, in place of HeroSlideshow.
// Phones get the tall cut, wider screens the wide one (<source media>).
// The poster paints first, so there is never an empty box. Users with
// prefers-reduced-motion get the poster only: the film never starts.
// If the phone blocks autoplay (iPhone Low Power Mode, data saver), the video
// hides so the still shows, never a play button, and it starts on the first
// tap anywhere on the page (a tap is allowed to start it).
// A pause / play button sits bottom left (moving content that plays on its
// own needs one); pausing also stills the Pick your walk cards' drift.

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Pause, Play } from "lucide-react";

/** Window event: the visitor paused or resumed the page's motion. */
export const MOTION_EVENT = "nfwt:motion";

export type HeroFilm = {
  wide: { src: string; poster: string };
  tall: { src: string; poster: string };
  /** Who made the film, shown small in the corner as "Film: A / B". */
  credit?: { name: string; href: string }[];
};

export function HeroVideo({ film }: { film: HeroFilm }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLVideoElement>(null);
  const [blocked, setBlocked] = useState(false);
  const [playing, setPlaying] = useState(false);
  // The visitor pressed pause: never restart on their behalf.
  const held = useRef(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    // React doesn't write `muted` into the HTML; phones only autoplay muted.
    v.muted = true;
    v.defaultMuted = true;
    v.setAttribute("muted", "");
    if (reduce) {
      v.pause();
      return;
    }
    const tryPlay = () =>
      v.play().then(
        () => setBlocked(false),
        () => setBlocked(true)
      );
    tryPlay();
    const onTap = () => {
      if (v.paused && !held.current) tryPlay();
    };
    window.addEventListener("touchend", onTap, { passive: true });
    window.addEventListener("click", onTap);
    const onPlaying = () => {
      setBlocked(false);
      setPlaying(true);
    };
    const onPause = () => setPlaying(false);
    v.addEventListener("playing", onPlaying);
    v.addEventListener("pause", onPause);
    // Autoplay may have started before these listeners existed.
    if (!v.paused) setPlaying(true);
    return () => {
      v.removeEventListener("playing", onPlaying);
      v.removeEventListener("pause", onPause);
      window.removeEventListener("touchend", onTap);
      window.removeEventListener("click", onTap);
    };
  }, [reduce]);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    const pause = !v.paused;
    held.current = pause;
    if (pause) v.pause();
    else v.play().catch(() => setBlocked(true));
    window.dispatchEvent(new CustomEvent(MOTION_EVENT, { detail: { paused: pause } }));
  };

  return (
    <>
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        {/* Posters behind the video, so the right crop shows before it plays. */}
        <picture>
          <source media="(max-width: 767px)" srcSet={film.tall.poster} />
          {/* The still is the header's first paint: fetch it before anything else. */}
          <img src={film.wide.poster} alt="" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
        </picture>
        <video
          ref={ref}
          className={`hero-film absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${blocked ? "opacity-0" : "opacity-100"}`}
          muted
          loop
          playsInline
          autoPlay={!reduce}
          preload="metadata"
          disablePictureInPicture
        >
          <source media="(max-width: 767px)" src={film.tall.src} type="video/mp4" />
          <source src={film.wide.src} type="video/mp4" />
        </video>
      </div>
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause the film" : "Play the film"}
        className="absolute bottom-1.5 left-2 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/35 text-white ring-1 ring-white/30 backdrop-blur-sm transition hover:bg-black/55 focus-visible:outline-2 focus-visible:outline-white"
      >
        {playing ? <Pause className="h-4 w-4" fill="currentColor" aria-hidden /> : <Play className="ml-0.5 h-4 w-4" fill="currentColor" aria-hidden />}
      </button>
      {film.credit && film.credit.length > 0 && (
        <p className="absolute bottom-1 right-2 z-10 m-0 text-[11px] leading-none text-white/65" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.6)" }}>
          Film:{" "}
          {film.credit.map((c, i) => (
            <span key={c.href}>
              {i > 0 && " / "}
              <a href={c.href} target="_blank" rel="noopener noreferrer" className="inline-block py-1.5 underline decoration-white/30 underline-offset-2 hover:text-white">
                {c.name}
              </a>
            </span>
          ))}
        </p>
      )}
    </>
  );
}
