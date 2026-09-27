"use client";

// Expandable profile section (Watermelon UI "Expandable Profile Card"
// pattern, rebuilt by hand). Each guide card shows photo + blurb; the
// guest reviews sit behind a "What guests say" toggle so the page is
// scannable, especially on phones where the three guides stack.
// The reviews stay in the DOM when closed (grid 0fr -> 1fr trick), so
// search engines and screen readers still get them.

import { useEffect, useId, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

export function GuideExpand({
  name,
  count,
  accent,
  children,
}: {
  name: string;
  count: number;
  accent?: { ac: string; ad: string };
  children: ReactNode;
}) {
  // Open by default on desktop (3 cards side by side, room for reviews),
  // closed on phones (cards stack, page gets long). Transition is off until
  // the visitor taps, so desktop doesn't visibly animate open on load.
  const [open, setOpen] = useState(false);
  const [touched, setTouched] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(min-width: 640px)").matches) setOpen(true);
  }, []);
  const id = useId();
  const ac = accent?.ac ?? "#2DA96B";
  const ad = accent?.ad ?? "#1A6B47";

  return (
    <div className="w-full flex flex-col items-center mt-5">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => { setTouched(true); setOpen((o) => !o); }}
        className="group inline-flex items-center gap-2 min-h-[44px] pl-4 pr-3 rounded-full border bg-white shadow-sm hover:shadow-md transition-all duration-200"
        style={{ borderColor: `${ac}55`, color: ad }}
      >
        <span className="font-lora text-sm font-semibold">What guests say about {name}</span>
        <span
          className="inline-flex items-center justify-center min-w-[22px] h-[22px] px-1.5 rounded-full text-xs font-bold text-white"
          style={{ backgroundColor: ac }}
        >
          {count}
        </span>
        <ChevronDown
          className="w-4 h-4 transition-transform duration-300"
          style={{ transform: open ? "rotate(180deg)" : "none" }}
          aria-hidden="true"
        />
      </button>

      <div
        id={id}
        className={`grid w-full ${touched ? "transition-[grid-template-rows,opacity] duration-500 ease-out" : ""}`}
        style={{ gridTemplateRows: open ? "1fr" : "0fr", opacity: open ? 1 : 0 }}
        aria-hidden={!open}
      >
        <div className="overflow-hidden flex flex-col items-center">{children}</div>
      </div>
    </div>
  );
}
