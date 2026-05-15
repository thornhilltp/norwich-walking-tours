import Image from "next/image";
import { partners } from "@/lib/partners";

// Compact partner-logo row for dark backgrounds (Hero overlay, Footer).
// At rest: every logo is mapped to flat white via brightness(0) invert(1)
// so the three read as a uniform set. On hover/focus the filter is
// dropped so the logo reverts to its full brand colour, EXCEPT for
// logos flagged keepWhiteOnHover — their native colour disappears on a
// dark background (VisitNorwich is solid black) so they stay white and
// just brighten via the opacity transition.

type Size = "sm" | "md";

const heightClassFor = (name: string, size: Size) => {
  if (size === "sm") {
    return name === "VisitNorwich" ? "h-6 md:h-7" : "h-3.5 md:h-4";
  }
  return name === "VisitNorwich" ? "h-8 md:h-9" : "h-5 md:h-6";
};

export function PartnerLogosInverted({
  size = "sm",
  label,
  className = "",
  gap = "gap-x-7 md:gap-x-9",
}: {
  size?: Size;
  label?: string;
  className?: string;
  gap?: string;
}) {
  return (
    <div className={className}>
      {label ? (
        <p className="font-lora text-[11px] font-semibold tracking-widest uppercase text-white/55 text-center mb-4">
          {label}
        </p>
      ) : null}
      <ul
        className={`flex flex-wrap items-center justify-center ${gap} gap-y-3`}
      >
        {partners.map((p) => (
          <li key={p.name} className="flex items-center">
            <a
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View our listing on ${p.name} (opens in a new tab)`}
              className={`block opacity-85 hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-sm transition duration-200 ${
                p.invertOnDark ? "[filter:brightness(0)_invert(1)]" : ""
              } ${
                p.invertOnDark && !p.keepWhiteOnHover
                  ? "hover:[filter:none] focus-visible:[filter:none]"
                  : ""
              }`}
            >
              <Image
                src={p.src}
                alt={`${p.name} logo`}
                width={p.width}
                height={p.height}
                className={`${heightClassFor(p.name, size)} w-auto`}
                style={{ width: "auto" }}
                unoptimized
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
