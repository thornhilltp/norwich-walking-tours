"use client";

// Swipeable photo cards, adapted from Watermelon UI's CardSwipe
// (ui.watermelon.sh): drag or flick sideways, neighbouring cards turn
// away in 3D. Icons/text swapped for full-bleed tour photos with a
// caption, motion/react swapped for framer-motion, arrows added so it
// works without a touchscreen.

import { useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useTransform,
  type MotionValue,
  type PanInfo,
  type Transition,
} from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface SwipePhoto {
  src: string;
  alt: string;
  caption: string;
}

const ITEM_WIDTH = 320;
const ITEM_HEIGHT = 400;
const GAP = 16;
const STEP = ITEM_WIDTH + GAP;
const DRAG_BUFFER = 50;
const VELOCITY_THRESHOLD = 500;

const SPRING: Transition = { type: "spring", stiffness: 330, damping: 30 };

function PhotoCard({
  photo,
  index,
  x,
  priority,
}: {
  photo: SwipePhoto;
  index: number;
  x: MotionValue<number>;
  priority: boolean;
}) {
  const rotateY = useTransform(
    x,
    [-(index + 1) * STEP, -index * STEP, -(index - 1) * STEP],
    [90, 0, -90],
    { clamp: false }
  );

  return (
    <motion.figure
      style={{ width: ITEM_WIDTH, height: ITEM_HEIGHT, rotateY, flexShrink: 0 }}
      className="relative m-0 overflow-hidden rounded-3xl bg-[#1A1A1A] shadow-lg cursor-grab active:cursor-grabbing select-none"
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        draggable={false}
        className="object-cover pointer-events-none"
        sizes="320px"
        priority={priority}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />
      <figcaption
        className="absolute bottom-4 left-5 right-5 text-white text-[26px] font-bold leading-tight pointer-events-none"
        style={{ fontFamily: "var(--font-caveat), cursive" }}
      >
        {photo.caption}
      </figcaption>
    </motion.figure>
  );
}

export function PhotoSwipe({ photos }: { photos: SwipePhoto[] }) {
  const [current, setCurrent] = useState(0);
  const x = useMotionValue(0);
  if (!photos || photos.length === 0) return null;

  const last = photos.length - 1;
  const go = (i: number) => setCurrent(Math.max(0, Math.min(i, last)));

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -DRAG_BUFFER || info.velocity.x < -VELOCITY_THRESHOLD) {
      go(current + 1);
    } else if (info.offset.x > DRAG_BUFFER || info.velocity.x > VELOCITY_THRESHOLD) {
      go(current - 1);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative overflow-hidden"
        style={{ width: ITEM_WIDTH, height: ITEM_HEIGHT }}
        role="region"
        aria-roledescription="carousel"
        aria-label="Tour photos"
      >
        <motion.div
          className="flex"
          drag="x"
          dragConstraints={{ left: -STEP * last, right: 0 }}
          style={{
            gap: GAP,
            perspective: 1000,
            perspectiveOrigin: `${current * STEP + ITEM_WIDTH / 2}px 50%`,
            x,
          }}
          onDragEnd={handleDragEnd}
          animate={{ x: -current * STEP }}
          transition={SPRING}
        >
          {photos.map((photo, i) => (
            <PhotoCard key={photo.src} photo={photo} index={i} x={x} priority={i === 0} />
          ))}
        </motion.div>
      </div>

      <div className="mt-5 flex items-center gap-4">
        <button
          type="button"
          onClick={() => go(current - 1)}
          disabled={current === 0}
          aria-label="Previous photo"
          className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-brand-accent/30 bg-white text-brand-accent hover:bg-brand-accent hover:text-white transition-colors duration-150 disabled:opacity-30 disabled:pointer-events-none"
        >
          <ChevronLeft className="w-5 h-5" aria-hidden="true" />
        </button>
        <div className="flex items-center gap-2">
          {photos.map((p, i) => (
            <button
              key={p.src}
              type="button"
              onClick={() => go(i)}
              aria-label={`Photo ${i + 1}: ${p.caption}`}
              aria-current={i === current}
              className={`h-2 rounded-full transition-all duration-200 ${
                i === current ? "w-6 bg-brand-accent" : "w-2 bg-brand-text/20 hover:bg-brand-text/40"
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(current + 1)}
          disabled={current === last}
          aria-label="Next photo"
          className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-brand-accent/30 bg-white text-brand-accent hover:bg-brand-accent hover:text-white transition-colors duration-150 disabled:opacity-30 disabled:pointer-events-none"
        >
          <ChevronRight className="w-5 h-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
