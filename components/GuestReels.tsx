"use client";

// Creators' videos of the free tour, as taped polaroids (Tom 2026-10-16,
// prototype). Light cousin of the Dark History StorytellerReel: self-hosted,
// no TikTok embed or cookies. Nothing autoplays here, because two or three
// clips looping at once is noise and ~4 MB each: tap to play with sound, and
// starting one pauses the others. Phones get a swipe row, desktop a line.

import { useRef, useState } from "react";
import { Play, Pause } from "lucide-react";
import { trackEvent } from "@/lib/tracking";
import type { GuestReel as Reel } from "@/lib/guestReels";

const tapes = ["#F4C26B", "#9FD6B8", "#F2A7A0"];

function GuestReel({
  reel,
  idx,
  onStart,
  trackingLocation,
  compact,
}: {
  reel: Reel;
  idx: number;
  onStart: (v: HTMLVideoElement) => void;
  trackingLocation: string;
  compact?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const tracked = useRef(false);

  function toggle() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      onStart(video);
      video.play().catch(() => {});
      if (!tracked.current) {
        tracked.current = true;
        trackEvent("reel_play", { location: `${trackingLocation}_${reel.id}` });
      }
    } else {
      video.pause();
    }
  }

  return (
    <figure
      className={`relative bg-white border border-[#EAE0D4] rounded-[4px] shadow-[2px_9px_20px_-10px_rgba(90,70,40,0.55)] ${
        compact ? "w-full md:w-[270px] p-2 pb-1.5 md:p-3 md:pb-2" : "shrink-0 snap-center w-[250px] md:w-[270px] p-3 pb-2"
      }`}
      style={{ transform: `rotate(${idx % 2 === 0 ? "-1.5deg" : "1.2deg"})` }}
    >
      <span
        aria-hidden="true"
        className="absolute -top-[10px] left-1/2 w-16 h-5 rounded-[3px] z-10"
        style={{
          transform: "translateX(-50%) rotate(-2deg)",
          backgroundColor: tapes[idx % tapes.length],
          boxShadow: "0 1px 3px rgba(0,0,0,0.18)",
        }}
      />
      <div className="relative overflow-hidden aspect-[9/16] bg-[#1A1A1A] rounded-[2px]">
        <video
          ref={videoRef}
          src={reel.src}
          poster={reel.poster}
          playsInline
          preload="none"
          aria-label={reel.label}
          className="absolute inset-0 w-full h-full object-cover"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
        />
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pause video" : "Play video with sound"}
          className="absolute inset-0 z-[2] flex items-center justify-center cursor-pointer"
        >
          {!playing && (
            <span className="flex h-[52px] w-[52px] md:h-[64px] md:w-[64px] items-center justify-center rounded-full bg-black/45 border-2 border-white/90 backdrop-blur-[2px]">
              <Play className="h-7 w-7 translate-x-[2px] fill-white text-white" aria-hidden />
            </span>
          )}
          {playing && (
            <span className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-[13px] font-semibold text-white">
              <Pause className="h-4 w-4" aria-hidden /> Pause
            </span>
          )}
        </button>
      </div>
      <figcaption className="pt-2 text-center">
        
        <span className="block text-[13px] text-muted-foreground" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
          Filmed by{" "}
          <a href={reel.profile} target="_blank" rel="noopener noreferrer" className="underline decoration-brand-accent/40 underline-offset-2 hover:text-brand-accent">
            {reel.handle}
          </a>
        </span>
      </figcaption>
    </figure>
  );
}

export function GuestReels({
  reels,
  trackingLocation,
  compact,
}: {
  reels: Reel[];
  trackingLocation: string;
  /** Phones: two side by side instead of a swipe row. */
  compact?: boolean;
}) {
  const current = useRef<HTMLVideoElement | null>(null);

  function onStart(v: HTMLVideoElement) {
    if (current.current && current.current !== v) current.current.pause();
    current.current = v;
  }

  return (
    <div
      className={
        compact
          ? "grid grid-cols-2 gap-4 md:flex md:gap-10 md:justify-center pt-4 pb-6"
          : "-mx-4 md:mx-0 flex gap-6 md:gap-10 overflow-x-auto md:overflow-visible snap-x snap-mandatory px-8 md:px-0 pt-4 pb-6 md:justify-center [scrollbar-width:none]"
      }
    >
      {reels.map((reel, idx) => (
        <GuestReel key={reel.id} reel={reel} idx={idx} onStart={onStart} trackingLocation={trackingLocation} compact={compact} />
      ))}
    </div>
  );
}
