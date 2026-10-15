"use client";

// The guide's Reel on a tour page (Tom 2026-10-15, option A): plays silently
// on loop while it's on screen (captions are burned in), tap for sound.
// Self-hosted, not an Instagram embed: faster, no Meta cookies, and nobody
// gets pulled off the page. No autoplay under prefers-reduced-motion.

import { useEffect, useRef, useState } from "react";
import { Play, Volume2, VolumeX } from "lucide-react";
import { trackEvent } from "@/lib/tracking";

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function StorytellerReel({
  src,
  poster,
  label,
  trackingLocation,
}: {
  src: string;
  poster: string;
  label: string;
  trackingLocation: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [reduced, setReduced] = useState(false);
  const tracked = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const still = prefersReducedMotion();
    setReduced(still);
    if (still) return;
    // Play muted while at least half of it is on screen; pause when it leaves.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.5 }
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  function track() {
    if (tracked.current) return;
    tracked.current = true;
    trackEvent("reel_play", { location: trackingLocation });
  }

  // First tap: sound on from the start. After that, the button toggles sound.
  function handleTap() {
    const video = videoRef.current;
    if (!video) return;
    if (muted || !playing) {
      video.muted = false;
      setMuted(false);
      if (muted) video.currentTime = 0;
      video.play().catch(() => {});
      track();
    } else {
      video.muted = true;
      setMuted(true);
    }
  }

  return (
    <div className="relative w-[270px] md:w-[320px] aspect-[9/16] rounded-2xl overflow-hidden shadow-[0_18px_40px_rgba(0,0,0,0.6)] ring-2 ring-[#F5EBDA]/10 bg-[#121211]">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        aria-label={label}
        className="absolute inset-0 w-full h-full object-cover"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      {reduced && !playing && (
        <span
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-[76px] w-[76px] items-center justify-center rounded-full bg-[#121211]/60 border-2 border-[#F5EBDA]/80"
        >
          <Play className="h-8 w-8 translate-x-[2px] fill-[#F5EBDA] text-[#F5EBDA]" />
        </span>
      )}
      <button
        type="button"
        onClick={handleTap}
        aria-label={muted ? "Play with sound" : "Mute"}
        className="absolute inset-0 flex items-end justify-end p-3 cursor-pointer"
      >
        <span className="flex items-center gap-1.5 rounded-full bg-[#121211]/75 px-3 py-1.5 text-[13px] font-semibold text-[#F5EBDA]">
          {muted ? <VolumeX className="h-4 w-4" aria-hidden /> : <Volume2 className="h-4 w-4" aria-hidden />}
          {muted ? "Tap for sound" : "Sound on"}
        </span>
      </button>
    </div>
  );
}
