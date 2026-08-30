import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Footer } from "@/components/Footer";
import { EmailCapture } from "@/components/EmailCapture";
import { tours } from "@/lib/tours";

// PROTOTYPE — the per-tour landing page template, worked through with the
// ghost tour example. This page type is the third door: someone googles
// "ghost walks norwich", lands HERE, and can decide without ever seeing
// the hub. Top half answers the transactional questions (when, where,
// how much); the story sells the vibe underneath. noindex until real.

export function generateStaticParams() {
  return tours.filter((t) => t.details).map((t) => ({ slug: t.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const tour = tours.find((t) => t.slug === params.slug);
  if (!tour?.details) return {};
  return {
    title: `${tour.name} (prototype) | Norwich Free Walking Tours`,
    description: tour.details.promise,
    robots: { index: false, follow: false },
  };
}

const lora = { fontFamily: "var(--font-lora), Georgia, serif" } as const;

export default function TourPage({ params }: { params: { slug: string } }) {
  const tour = tours.find((t) => t.slug === params.slug);
  if (!tour?.details) notFound();
  const d = tour.details;

  return (
    <main className="bg-brand-bg">
      {/* Prototype banner — remove when this tour is real. */}
      <div className="pt-24 bg-brand-text">
        <div className="brand-container py-3">
          <p className="text-[13px] text-white/80 leading-relaxed" style={lora}>
            <span className="font-semibold text-white">Prototype.</span> An
            example tour page with invented names, dates and prices, so we can
            judge the template.
          </p>
        </div>
      </div>

      {/* Header: the query answered above the fold */}
      <section className="pt-12 md:pt-16 pb-10">
        <div className="brand-container">
          <p
            className="text-brand-accent text-xs font-semibold tracking-[0.18em] uppercase mb-4"
            style={lora}
          >
            {tour.byline}
          </p>
          <h1
            className="text-[clamp(38px,5.4vw,64px)] font-semibold leading-[1.02] tracking-[-0.02em] text-brand-text mb-5 max-w-3xl"
            style={lora}
          >
            {tour.name}
          </h1>
          <p className="text-lg md:text-xl text-brand-text/75 leading-relaxed max-w-2xl" style={lora}>
            {d.promise}
          </p>
        </div>
      </section>

      {/* Photo + logistics: transactional answers before the scroll */}
      <section className="pb-14 md:pb-20">
        <div className="brand-container grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8 items-start">
          <div
            className="relative rounded-2xl overflow-hidden aspect-[16/10]"
            style={{ backgroundColor: tour.tint }}
          >
            <Image
              src={tour.image}
              alt={tour.imageAlt}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>

          <aside className="lg:sticky lg:top-28 bg-white rounded-2xl border border-brand-text/[0.07] shadow-[0_2px_24px_rgba(26,26,26,0.06)] p-6">
            <dl className="grid grid-cols-1 gap-3.5">
              {d.logistics.map((row) => (
                <div key={row.label} className="flex items-baseline justify-between gap-4 border-b border-brand-text/[0.06] pb-3 last:border-0 last:pb-0">
                  <dt className="text-[12px] uppercase tracking-[0.14em] font-semibold text-muted-foreground shrink-0" style={lora}>
                    {row.label}
                  </dt>
                  <dd className="text-[15px] font-semibold text-brand-text text-right m-0" style={lora}>
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
            {/* When real: the booking widget iframe replaces this block. */}
            <a
              href="#notify"
              className="mt-5 inline-flex w-full items-center justify-center h-12 px-6 rounded-full bg-brand-accent text-white font-semibold text-[16px] hover:bg-brand-accent/90 transition-colors duration-150"
              style={lora}
            >
              Notify me when dates open
            </a>
            <p className="mt-3 text-[13px] text-muted-foreground text-center" style={lora}>
              No dates on sale yet. Waiting list hears first.
            </p>
          </aside>
        </div>
      </section>

      {/* The story: vibe for the browsers */}
      <section className="section-padding bg-white border-y border-brand-accent/10">
        <div className="brand-container grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <h2 className="text-[clamp(26px,3vw,36px)] font-semibold tracking-[-0.01em] text-brand-text mb-5" style={lora}>
              What this walk is
            </h2>
            {d.story.map((p) => (
              <p key={p.slice(0, 24)} className="text-[16.5px] text-brand-text/75 leading-relaxed mb-4 max-w-[62ch]" style={lora}>
                {p}
              </p>
            ))}
          </div>
          <div>
            <h2 className="text-[clamp(26px,3vw,36px)] font-semibold tracking-[-0.01em] text-brand-text mb-5" style={lora}>
              How the evening runs
            </h2>
            <ol className="m-0 p-0 list-none">
              {d.runOfShow.map((step, i) => (
                <li key={step} className="flex gap-4 items-baseline py-3 border-b border-brand-text/[0.06] last:border-0">
                  <span className="shrink-0 w-7 h-7 rounded-full bg-brand-accent/10 text-brand-accent text-[13px] font-bold flex items-center justify-center translate-y-1">
                    {i + 1}
                  </span>
                  <span className="text-[16px] text-brand-text/80" style={lora}>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Tour FAQs */}
      <section className="section-padding">
        <div className="brand-container max-w-3xl">
          <h2 className="text-[clamp(26px,3vw,36px)] font-semibold tracking-[-0.01em] text-brand-text mb-7" style={lora}>
            Asked every time
          </h2>
          <div className="flex flex-col gap-6">
            {d.faqs.map((f) => (
              <div key={f.q}>
                <h3 className="text-[17.5px] font-bold text-brand-text mb-1.5" style={lora}>{f.q}</h3>
                <p className="text-[16px] text-brand-text/75 leading-relaxed m-0" style={lora}>{f.a}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-[15px] text-muted-foreground" style={lora}>
            Different question? <a href="/contact" className="text-brand-accent font-semibold hover:underline">Ask us direct</a> or see{" "}
            <a href="/tours" className="text-brand-accent font-semibold hover:underline">all our tours</a>.
          </p>
        </div>
      </section>

      <div id="notify" className="scroll-mt-28">
        <EmailCapture
          eyebrow={tour.name}
          heading="Hear when dates open"
          body="Leave your email and you get first pick of the dates before they go on the site. Plus the odd local tip. No spam."
        />
      </div>

      <Footer />
    </main>
  );
}
