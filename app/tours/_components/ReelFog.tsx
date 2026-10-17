// Cold night air and drifting mist for the Reel section (Tom 2026-10-17,
// picked over an evidence board and a projector beam). Blue-grey where the
// lantern-lit stories below are warm, so the video reads as its own section.
// Mist drift stops under prefers-reduced-motion.

import s from "./reelFog.module.css";

/** Behind the content: cold light and a high mist band. */
export function ReelFogBack() {
  return (
    <>
      <div className={s.cold} aria-hidden="true" />
      <div className={s.mistTop} aria-hidden="true" />
    </>
  );
}

/** In front of the content: low mist drifting over the polaroid. */
export function ReelFogFront() {
  return <div className={`${s.mistLow} ${s.mistFront}`} aria-hidden="true" />;
}
