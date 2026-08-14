import Image from "next/image";

// RoysPlazaMap — Tom's annotated version of the published Anglia Square
// planning-allocation map (site ref GNLP0506), marked up with the Roys units
// and the statue. The Crown copyright / Ordnance Survey attribution is baked
// into the bottom of the image itself: do not crop it out.

export function RoysPlazaMap() {
  return (
    <figure className="m-0">
      <div className="overflow-hidden rounded-xl border-2 border-brand-text/10 shadow-lg bg-brand-white">
        <Image
          src="/images/roys-plaza-map.png"
          alt="Planning map of the Anglia Square site marked up with Roys units across the whole development, a statue of a Roy in the centre, and the site labelled Roys Plaza."
          width={1679}
          height={1414}
          sizes="(max-width: 1024px) 100vw, 1100px"
          className="block w-full h-auto"
        />
      </div>
      <figcaption
        className="mt-3 text-sm text-muted-foreground"
        style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
      >
        The site plan, corrected. Every unit accounted for. Statue marked centrally, as agreed.
      </figcaption>
    </figure>
  );
}
