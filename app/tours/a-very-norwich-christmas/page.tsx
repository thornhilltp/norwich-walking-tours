import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Clock, MapPin, Star, Users } from "lucide-react";
import { Mountains_of_Christmas } from "next/font/google";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { BookingFrame } from "@/components/BookingFrame";
import { PartnerLogosInverted } from "@/components/PartnerLogosInverted";
import { EmailCapture } from "@/components/EmailCapture";
import { ScrollSticker } from "@/components/ScrollSticker";
import { GuideReviews } from "@/app/our-guides/_components/GuideReviews";
import {
  BellSticker,
  CandleSticker,
  CrackerSticker,
  CrownSticker,
  HollySticker,
  JesterSticker,
  MincePieSticker,
  MugSticker,
  MustardHollySticker,
  XMAS_STICKER_CSS,
} from "@/app/tours/_components/ChristmasStickers";
import { googleReviewStats } from "@/lib/testimonials";
import { guides } from "@/lib/guides";
import { getTourWalks } from "@/lib/nextWalks";
import { londonToday } from "@/lib/tourRun";

// A Very Norwich Christmas (Tom 2026-11-19). The first PAID walk: £12 adults,
// £9 children, paid when you book through the booking app (Square checkout).
// Built from Tom's approved draft (claude.ai artifact 7DCqzPn7J1w2eMW8weasg4,
// look "B · Merry & Bright"): cream page, berry red, holly green, Mountains
// of Christmas for headings and buttons, snow, scrapbook stickers. Same
// section order as the Dark History page: hero with the booking widget,
// facts card, three question stories, the route band, guide, FAQs, closing
// band, email.
//
// Copy rules: this walk is paid, so the price shows in the hero, the facts,
// the FAQ and the closing band. The main walk is "free to book", never
// plain "free". Anything still undecided is written in [square brackets]
// and never renders (ready()), so the page stays clean until Tom fills it in.

const SLUG = "a-very-norwich-christmas";
const BOOKING_TOUR = "a-very-norwich-christmas";
const BASE = "https://www.norwichfreewalkingtours.co.uk";
const URL = `${BASE}/tours/${SLUG}`;
const HERO = "/images/tour/cathedral-west-front-wide.jpg";
const MAP = "https://www.google.com/maps/search/?api=1&query=Chantry+Place+Norwich+NR2+1SH";

// The published run (Tom 2026-11-19): 26 Nov to 20 Dec 2026, Thu and Fri
// at 6pm, Sat and Sun at 2pm, about 90 minutes.
const FIRST = "2026-11-26";
const LAST = "2026-12-20";
const DURATION_MIN = 90;
const PRICE = { adult: "12", child: "9" };

const RED = "#B92B2B";
const GREEN = "#1E5B3A";
const HERO_RED = "#F26457"; // brighter red, readable on the dark hero photo

// Re-render every 5 minutes so the Event data follows the booking app.
export const revalidate = 300;

// A value still waiting on Tom ("[TBC]" etc.) never renders.
const ready = (v?: string): v is string => Boolean(v) && !v!.includes("[");

const xmas = Mountains_of_Christmas({ weight: "700", subsets: ["latin"], display: "swap" });
const xmasStyle = { fontFamily: `${xmas.style.fontFamily}, var(--font-caveat), cursive`, fontWeight: 700 } as const;
const lora = { fontFamily: "var(--font-lora), Georgia, serif" } as const;

const TITLE = "Christmas Walking Tour Norwich | A Very Norwich Christmas";
const DESCRIPTION =
  "A 90-minute Christmas walking tour of Norwich, from Chantry Place to the Cathedral. Crackers, mince pies, a royal Christmas and the year it was cancelled. 26 Nov to 20 Dec, £12 adults, £9 children.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: URL, images: [{ url: HERO }] },
};

// Thu/Fri 6pm, Sat/Sun 2pm, every date in the run still to come.
function scheduledWalks(): { date: string; time: string; spotsLeft: number }[] {
  const out: { date: string; time: string; spotsLeft: number }[] = [];
  const today = londonToday();
  for (let t = Date.parse(FIRST + "T12:00:00Z"); t <= Date.parse(LAST + "T12:00:00Z"); t += 86400000) {
    const d = new Date(t);
    const ymd = d.toISOString().slice(0, 10);
    const dow = d.getUTCDay();
    if (ymd < today) continue;
    if (dow === 4 || dow === 5) out.push({ date: ymd, time: "18:00", spotsLeft: 1 });
    if (dow === 6 || dow === 0) out.push({ date: ymd, time: "14:00", spotsLeft: 1 });
  }
  return out;
}

const place = {
  "@type": "Place",
  name: "Chantry Place square",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Chantry Place",
    addressLocality: "Norwich",
    postalCode: "NR2 1SH",
    addressCountry: "GB",
  },
};

const offers = (availability = "https://schema.org/InStock") => [
  { "@type": "Offer", name: "Adult", price: PRICE.adult, priceCurrency: "GBP", availability, url: URL, validFrom: "2026-11-01" },
  { "@type": "Offer", name: "Child", price: PRICE.child, priceCurrency: "GBP", availability, url: URL, validFrom: "2026-11-01" },
];

const stories = [
  {
    img: "/images/tour/guide-talk-st-peter-mancroft.jpg",
    alt: "A guide with a tour group outside St Peter Mancroft",
    q: "Who tried to cancel Christmas?",
    line: "And how did Norwich take it? Told under the bells of St Peter Mancroft.",
    stamp: true,
  },
  {
    img: "/images/tour/group-market-sunset.jpg",
    alt: "A tour group at Norwich Market at sunset",
    q: "What was really in a mince pie?",
    line: "You'd send it back. Told at the market.",
  },
  {
    img: "/images/tour/group-britons-arms.jpg",
    alt: "A tour group outside the Britons Arms on Elm Hill",
    q: "Who put the Lord of Misrule in charge?",
    line: "Wassail, boy bishops and a feast of fools, on the cobbles of Elm Hill.",
  },
];

const beats = [
  {
    when: "",
    place: "Chantry Place",
    text: "Meet in the square, where Caley's once made its chocolate and crackers. The first story: how Christmas got its English name.",
    Sticker: CrackerSticker,
    img: "/images/tour/holly-chantry-place-lights.jpg",
    alt: "Holly under the Christmas light arches in Chantry Place",
    pos: "center 45%",
  },
  {
    when: "",
    place: "Through the market",
    text: "St Peter Mancroft, the market, the Castle where a king kept Christmas in 1121, the Royal Arcade, Jarrolds and St Andrew's.",
    Sticker: CrownSticker,
    img: "/images/tour/guide-norwich-market.jpg",
    alt: "A guide telling a story at Norwich Market",
    pos: "center 40%",
  },
  {
    when: "",
    place: "The Cathedral",
    text: "Over the cobbles of Elm Hill and along the Quayside to Norwich Cathedral, where the monks kept Christmas for centuries.",
    Sticker: CandleSticker,
    img: "/images/tour/group-cathedral-west-front.jpg",
    alt: "A tour group in front of the west front of Norwich Cathedral",
    pos: "center 40%",
  },
];

// Undecided items stay as [placeholders] and are filtered out by ready().
const faqs = [
  {
    q: "When is it?",
    a: "Thursdays and Fridays at 6pm, Saturdays and Sundays at 2pm, from 26 November to 20 December 2026. It takes about 90 minutes. Pick a date in the booking calendar.",
  },
  {
    q: "Where do we meet?",
    a: "Chantry Place square, Norwich NR2 1SH. The walk finishes at Norwich Cathedral.",
  },
  {
    q: "How much is it?",
    a: "£12 for adults and £9 for children, paid when you book by card, Apple Pay or Google Pay.",
  },
  {
    q: "Why do I pay for this one when your other walks are free to book?",
    a: "This is a Christmas special with set dates, so it's ticketed. Our Norwich Free Walking Tour still runs most days: free to book, and you pay what it was worth at the end.",
  },
  {
    q: "Can I cancel or get a refund?",
    a: "Cancel 48 hours or more before your walk for a full refund, straight back to your card. Inside 48 hours there's no refund, but you can move to another date for free. If we call a walk off, everyone is refunded in full automatically. Use \"Manage booking\" in your confirmation email to cancel or move.",
  },
  {
    q: "What if the weather's bad?",
    a: "If there's a Met Office weather warning, we'll call the walk off and refund you in full. Otherwise we walk in most weather, so wrap up warm and wear good shoes.",
  },
  {
    q: "What if I'm running late?",
    a: "We can't wait for latecomers. If you miss the start, we can't refund.",
  },
  {
    q: "Is mulled wine included?",
    a: "[Mulled wine TBC: included, discounted, or pay your own at Sir Toby's and the Britons Arms]",
  },
  {
    q: "Is it suitable for children?",
    // [Age guidance TBC]: add it to this answer once decided.
    a: "Children are welcome on a child ticket (£9).",
  },
  {
    q: "Can I bring a pushchair or mobility scooter?",
    a: "We'd love to have you along. The route goes over the cobbles of Elm Hill, which are pretty bumpy. Not sure? Drop us a message and we'll talk it through.",
  },
  {
    q: "How many people are on a walk?",
    a: "Up to 25 per walk.",
  },
  {
    q: "Can I give it as a present?",
    a: "[Gift vouchers TBC]",
  },
  {
    q: "Can we book a private Christmas walk for our team?",
    a: "Yes. See our private tours, and tell us your date and group size.",
  },
];

// Guide (Tom 2026-11-19): Holly. Photo, blurb and reviews are her Our Guides
// ones until Tom swaps in Christmas-specific ones. A second guide is [TBC].
const holly = guides.find((g) => g.name === "Holly");

function BookButton({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <a
      href="#book"
      className={`btn-cta inline-flex items-center justify-center h-12 px-7 text-white rounded-xl transition-colors duration-150 focus-brand ${className}`}
    >
      {children}
      <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
    </a>
  );
}

function SplitHeading({ plain, script, center = false }: { plain: string; script: string; center?: boolean }) {
  return (
    <h2 className={`leading-[1.0] mb-8 ${center ? "text-center" : ""}`}>
      <span
        className="inline text-[clamp(30px,3.6vw,44px)] font-semibold leading-[1.05] tracking-[-0.01em] text-brand-text"
        style={lora}
      >
        {plain}
      </span>{" "}
      <span className="inline text-[clamp(40px,4.8vw,58px)] leading-[0.95]" style={{ ...xmasStyle, color: RED }}>
        {script}
      </span>
    </h2>
  );
}

// Dashed wiggly walking route between the stories, like the free tour page.
function Wiggle() {
  return (
    <svg aria-hidden viewBox="0 0 420 46" className="block mx-auto my-6 md:my-2 w-[min(420px,80%)] h-[46px] overflow-visible">
      <path
        d="M4 30 C60 4 110 44 170 22 S280 4 330 26 S400 40 416 18"
        fill="none"
        stroke={RED}
        strokeWidth="2.6"
        strokeDasharray="9 8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default async function ChristmasTourPage() {
  const run = await getTourWalks(BOOKING_TOUR);
  const walks = run.known ? run.walks : scheduledWalks();

  return (
    <main className="bg-brand-bg" data-xmas-tour="">
      {/* Every green booking button on this page, the nav and the phone bar
          goes berry red in Mountains of Christmas (same trick as Dark
          History's Eater buttons: the nav and sticky bar live in the layout,
          and this page is where the font is loaded). */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          body:has([data-xmas-tour]) .btn-cta {
            font-family: ${xmas.style.fontFamily}, var(--font-caveat), cursive;
            font-weight: 700;
            font-size: 1.3rem;
            letter-spacing: 0.01em;
            white-space: nowrap;
            background-color: ${RED};
            color: #fff;
          }
          body:has([data-xmas-tour]) .btn-cta:hover { background-color: #A12424; }
          /* Shared sections (FAQ, email sign-up) use the free tour's green.
             The theme is "@theme inline", so the colours are baked into the
             utilities and can't be swapped by variable: restyle them here,
             on this page's own sections only, never the footer
             (Tom 2026-11-21). */
          [data-xmas-tour] > :not(footer) .text-brand-accent,
          [data-xmas-tour] > :not(footer) .group:hover .group-hover\\:text-brand-accent { color: ${RED}; }
          [data-xmas-tour] > :not(footer) .bg-brand-accent,
          [data-xmas-tour] > :not(footer) .group:hover .group-hover\\:bg-brand-accent { background-color: ${RED}; }
          [data-xmas-tour] > :not(footer) .bg-brand-accent\\/10 { background-color: rgba(185, 43, 43, 0.1); }
          [data-xmas-tour] > :not(footer) .border-brand-accent\\/10,
          [data-xmas-tour] > :not(footer) .border-brand-accent\\/15,
          [data-xmas-tour] > :not(footer) .border-brand-accent\\/25 { border-color: rgba(185, 43, 43, 0.2); }
          [data-xmas-tour] > :not(footer) .bg-brand-accent-light,
          [data-xmas-tour] > #notify > section { background-color: #FCFAF8; }
          [data-xmas-tour] > :not(footer) .focus-visible\\:ring-brand-accent:focus-visible,
          [data-xmas-tour] > :not(footer) .focus\\:ring-brand-accent:focus { --tw-ring-color: ${RED}; }
          [data-xmas-tour] #notify h2 {
            font-family: ${xmas.style.fontFamily}, var(--font-caveat), cursive;
            font-weight: 700;
            color: ${RED};
          }
          ${XMAS_STICKER_CSS}
        `,
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TouristTrip",
            name: "A Very Norwich Christmas",
            description: DESCRIPTION,
            url: URL,
            touristType: "Walking tour",
            provider: { "@id": `${BASE}/#localbusiness` },
            offers: offers(),
            subjectOf: {
              "@type": "Event",
              name: "A Very Norwich Christmas",
              startDate: `${FIRST}T14:00:00+00:00`,
              endDate: `${LAST}T15:30:00+00:00`,
              eventSchedule: [
                { "@type": "Schedule", byDay: ["https://schema.org/Thursday", "https://schema.org/Friday"], startTime: "18:00", duration: "PT1H30M", startDate: FIRST, endDate: LAST, scheduleTimezone: "Europe/London" },
                { "@type": "Schedule", byDay: ["https://schema.org/Saturday", "https://schema.org/Sunday"], startTime: "14:00", duration: "PT1H30M", startDate: FIRST, endDate: LAST, scheduleTimezone: "Europe/London" },
              ],
              location: place,
            },
            itinerary: {
              "@type": "ItemList",
              itemListElement: ["Chantry Place", "St Peter Mancroft", "Norwich Market", "Norwich Castle", "Royal Arcade", "St Andrew's Hall", "Elm Hill", "Quayside", "Norwich Cathedral"].map(
                (name, i) => ({ "@type": "ListItem", position: i + 1, name })
              ),
            },
          }),
        }}
      />
      {walks.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              // One Event per walk still to come (December is GMT, +00:00).
              walks.map(({ date, time, spotsLeft }) => {
                const [hh, mm] = time.split(":").map(Number);
                const endMin = hh * 60 + mm + DURATION_MIN;
                const end = `${String(Math.floor(endMin / 60)).padStart(2, "0")}:${String(endMin % 60).padStart(2, "0")}`;
                return {
                  "@context": "https://schema.org",
                  "@type": "Event",
                  name: "A Very Norwich Christmas",
                  description: DESCRIPTION,
                  startDate: `${date}T${time}:00+00:00`,
                  endDate: `${date}T${end}:00+00:00`,
                  eventStatus: "https://schema.org/EventScheduled",
                  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
                  location: place,
                  image: [`${BASE}${HERO}`],
                  organizer: { "@type": "Organization", name: "Norwich Free Walking Tours", url: BASE },
                  offers: offers(run.known && spotsLeft === 0 ? "https://schema.org/SoldOut" : "https://schema.org/InStock"),
                };
              })
            ),
          }}
        />
      )}

      {/* Hero: cathedral photo, dark tint, snow, split H1, price line, and
          the live booking widget in the right-hand slot. */}
      <section className="relative isolate w-full overflow-hidden">
        <Image src={HERO} alt="" fill priority sizes="100vw" className="object-cover -z-10" style={{ objectPosition: "center 40%" }} />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(90deg, rgba(18,22,20,.86) 0%, rgba(18,22,20,.62) 50%, rgba(18,22,20,.3) 100%)" }}
        />
        {/* Snow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "radial-gradient(2px 2px at 20px 30px,#fff 50%,transparent),radial-gradient(1.5px 1.5px at 90px 80px,#fff 50%,transparent),radial-gradient(2.5px 2.5px at 160px 20px,#fff 50%,transparent),radial-gradient(1.5px 1.5px at 210px 120px,#fff 50%,transparent)",
            backgroundSize: "240px 160px",
          }}
        />

        <div className="relative brand-container pt-32 pb-24 lg:pt-36 lg:pb-28 grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-14 items-center">
          <div className="text-center lg:text-left min-w-0">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-white text-[19px]" style={{ ...xmasStyle, backgroundColor: RED }}>
              New for Christmas: 26 Nov to 20 Dec
            </span>

            <h1 className="mt-4 leading-[0.95]" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.55)" }}>
              <span className="block text-[clamp(34px,4.6vw,56px)] font-semibold leading-[1.05] tracking-[-0.02em] text-white" style={lora}>
                A very Norwich
              </span>{" "}
              <span className="block text-[clamp(54px,7.2vw,88px)] leading-[0.95]" style={{ ...xmasStyle, color: HERO_RED }}>
                Christmas.
              </span>
            </h1>

            <p className="mt-5 max-w-md mx-auto lg:mx-0 text-lg md:text-xl text-white leading-snug" style={{ ...lora, textShadow: "0 1px 8px rgba(0,0,0,0.5)" }}>
              Who made Norwich&apos;s Christmas crackers? Why did turkeys walk to London? And which king came here for Christmas?
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-3">
              <BookButton>Book your ticket</BookButton>
              <a
                href="/tours/free-walking-tour"
                className="italic text-white underline underline-offset-4 decoration-white/30 hover:decoration-white"
                style={{ ...lora, textShadow: "0 1px 6px rgba(0,0,0,0.4)" }}
              >
                or see our Norwich Free Walking Tour
              </a>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-center lg:justify-start gap-x-3 gap-y-2 text-sm text-white" style={lora}>
              {googleReviewStats.count > 0 && (
                <>
                  <a
                    href={googleReviewStats.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:underline"
                    aria-label={`${googleReviewStats.rating.toFixed(1)} stars from ${googleReviewStats.count} Google reviews of our tours`}
                  >
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                    <span className="font-semibold">{googleReviewStats.rating.toFixed(1)}</span>
                    <span>({googleReviewStats.count} reviews)</span>
                  </a>
                  <span aria-hidden="true" className="text-white/40">&middot;</span>
                </>
              )}
              <span className="inline-flex items-center gap-1">
                <Clock className="h-4 w-4" aria-hidden="true" /> 1h 30m
              </span>
              <span aria-hidden="true" className="text-white/40">&middot;</span>
              <span className="inline-flex items-center gap-1">
                <Users className="h-4 w-4" aria-hidden="true" /> Up to 25
              </span>
            </div>
            <p className="mt-2 text-xs text-white leading-relaxed" style={lora}>
              £12 adults, £9 children, paid when you book. Full refund, straight back to your card, up to 48 hours before.
            </p>
          </div>

          {/* The live booking widget (dressed for Christmas by the booking
              app). It shows only the tour name and calendar, so meeting
              point, times and prices are on this page. It only frames on
              the live domains, so Vercel previews show it blocked. */}
          <div className="w-full max-w-md mx-auto lg:mx-0 min-w-0">
            <div id="book" className="relative scroll-mt-28 rounded-2xl shadow-xl overflow-visible" style={{ backgroundColor: "#FCFAF8" }}>
              <ScrollSticker className="-top-6 -right-3 md:-right-6" rotate={10}>
                <HollySticker className="h-10 w-14" />
              </ScrollSticker>
              <div className="rounded-2xl overflow-hidden">
                <BookingFrame tour={BOOKING_TOUR} priority height={560} title="Book A Very Norwich Christmas" />
              </div>
            </div>
            <p className="mt-3 text-center text-[13px] text-white/85" style={lora}>
              Meet at{" "}
              <a href={MAP} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 decoration-white/50 hover:decoration-white">
                Chantry Place square, NR2 1SH
              </a>
            </p>
            <div className="mt-5 flex justify-center">
              <PartnerLogosInverted size="sm" label="Featured on" />
            </div>
          </div>
        </div>
      </section>

      {/* Facts card, overlapping the hero's bottom edge. */}
      <div className="relative z-10 -mt-10 md:-mt-12">
        <div className="brand-container">
          <dl className="bg-white rounded-2xl shadow-[0_10px_40px_-12px_rgba(26,26,26,0.25)] border border-brand-text/[0.05] px-6 py-6 md:px-10 md:py-7 grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-5">
            {[
              // Three facts, like the free tour's card (Tom 2026-11-19).
              { label: "When", value: "26 Nov to 20 Dec. Thu & Fri 6pm, Sat & Sun 2pm (90 min)" },
              { label: "Route", value: "Chantry Place to Norwich Cathedral", href: MAP },
              { label: "Price", value: "£12 adults, £9 children, paid when you book" },
            ].map((row) => (
              <div key={row.label} className="min-w-0">
                <dt className="text-[14px] font-semibold mb-1" style={{ ...lora, color: RED }}>
                  {row.label}
                </dt>
                <dd className="text-[17px] md:text-[18px] font-bold m-0 leading-snug text-brand-text" style={lora}>
                  {row.href ? (
                    <a href={row.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-start gap-1 underline decoration-brand-text/20 underline-offset-4 hover:decoration-brand-text">
                      <MapPin className="h-4 w-4 mt-1 shrink-0" style={{ color: RED }} aria-hidden="true" />
                      {row.value}
                    </a>
                  ) : (
                    row.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Three question stories on a dashed walking route, polaroid photos
          with candy-stripe tape and a sticker each. */}
      <section className="pt-20 pb-16 md:pt-28 md:pb-24 overflow-hidden">
        <div className="brand-container">
          <SplitHeading plain="What's on" script="the walk?" center />
          {stories.map((s, i) => (
            <div key={s.q}>
              {i > 0 && <Wiggle />}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center">
                <div className={i % 2 ? "md:order-2" : ""}>
                  <div
                    className="relative bg-white p-3 pb-10 shadow-[0_14px_34px_rgba(0,0,0,0.14)] rounded-[3px] mx-2"
                    style={{ transform: `rotate(${i % 2 ? 1.4 : -1.6}deg)` }}
                  >
                    <span
                      aria-hidden
                      className="absolute -top-3.5 left-1/2 h-[30px] w-[110px] -translate-x-1/2 -rotate-[4deg] shadow-sm"
                      style={{ background: "repeating-linear-gradient(45deg,rgba(185,43,43,.8) 0 10px,rgba(255,255,255,.8) 10px 20px)" }}
                    />
                    {i === 0 && (
                      <ScrollSticker className="-top-7 -left-4" rotate={-9}>
                        <BellSticker className="h-16 w-14 md:h-20 md:w-[72px]" />
                      </ScrollSticker>
                    )}
                    {i === 1 && (
                      <>
                        <ScrollSticker className="-top-7 -right-4" rotate={10}>
                          <MincePieSticker className="h-14 w-16 md:h-[72px] md:w-20" />
                        </ScrollSticker>
                        <ScrollSticker className="-bottom-5 -left-4" rotate={-6}>
                          <MugSticker className="h-12 w-12 md:h-16 md:w-16" />
                        </ScrollSticker>
                      </>
                    )}
                    {i === 2 && (
                      <ScrollSticker className="-top-7 -right-4" rotate={10}>
                        <JesterSticker className="h-14 w-16 md:h-[72px] md:w-20" />
                      </ScrollSticker>
                    )}
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      <Image src={s.img} alt={s.alt} fill sizes="(min-width: 768px) 45vw, 90vw" className="object-cover" />
                    </div>
                    {s.stamp && (
                      <span
                        className="absolute right-4 bottom-14 -rotate-[9deg] rounded-md px-3 pt-1.5 pb-1 text-center text-[12px] font-extrabold uppercase leading-tight tracking-[0.12em] shadow-md"
                        style={{ border: `3px double ${RED}`, color: RED, backgroundColor: "rgba(255,253,247,.9)" }}
                      >
                        Christmas cancelled
                        <span className="block text-[10px] tracking-[0.18em] font-bold">By order · 1647</span>
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <span
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full text-white text-base font-bold mb-3"
                    style={{ backgroundColor: RED }}
                  >
                    {i + 1}
                  </span>
                  <h3 className="text-[clamp(30px,3.4vw,40px)] leading-[1.05]" style={{ ...xmasStyle, color: RED }}>
                    {s.q}
                  </h3>
                  <p className="mt-3 text-[18px] text-brand-text/80 leading-relaxed" style={lora}>
                    {s.line}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Route band: holly green, zigzag top edge. */}
      <section className="relative pt-24 pb-20 text-[#FFF8F0]" style={{ backgroundColor: GREEN }}>
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-[14px] bg-brand-bg"
          style={{
            clipPath:
              "polygon(0 0,100% 0,100% 0,97% 100%,94% 0,91% 100%,88% 0,85% 100%,82% 0,79% 100%,76% 0,73% 100%,70% 0,67% 100%,64% 0,61% 100%,58% 0,55% 100%,52% 0,49% 100%,46% 0,43% 100%,40% 0,37% 100%,34% 0,31% 100%,28% 0,25% 100%,22% 0,19% 100%,16% 0,13% 100%,10% 0,7% 100%,4% 0,1% 100%,0 0)",
          }}
        />
        <div className="brand-container">
          <h2 className="text-center leading-[1.0] mb-12">
            <span className="inline text-[clamp(30px,3.6vw,44px)] font-semibold leading-[1.05] text-[#FFF8F0]" style={lora}>
              Wrap up,
            </span>{" "}
            <span className="inline text-[clamp(40px,4.8vw,58px)] leading-[0.95]" style={{ ...xmasStyle, color: "#FFE7A8" }}>
              let&apos;s walk.
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-9">
            {beats.map(({ when, place: p, text, Sticker, img, alt, pos }, i) => (
              <div key={p} className="border-t-2 border-[#FFE7A8]/70 pt-6">
                <div className="relative mb-5 mx-1 bg-white p-2.5 pb-6 rounded-[3px] shadow-[0_14px_30px_rgba(0,0,0,0.3)]" style={{ transform: `rotate(${[-1.5, 1.2, -1][i]}deg)` }}>
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image src={img} alt={alt} fill sizes="(min-width: 768px) 30vw, 90vw" className="object-cover" style={{ objectPosition: pos }} />
                  </div>
                  <ScrollSticker className="-top-6 -right-4" rotate={[-5, 8, -6][i]}>
                    <Sticker className="h-14 w-14" />
                  </ScrollSticker>
                </div>
                {when && (
                  <div className="text-[15px] font-bold text-[#FFE7A8]" style={lora}>
                    {when}
                  </div>
                )}
                <h3 className="mt-2 mb-2 text-[32px] leading-[1.05] text-[#FFF8F0]" style={xmasStyle}>
                  {p}
                </h3>
                <p className="m-0 text-[16px] leading-relaxed text-[#FFF8F0]/90" style={lora}>
                  {text}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <BookButton>Book your ticket</BookButton>
          </div>
        </div>
      </section>

      {/* The guide: Holly, with her Our Guides card and real reviews. */}
      {holly && (
        <section className="section-padding" style={{ backgroundColor: "#F5EBDA" }}>
          <div className="brand-container grid grid-cols-1 lg:grid-cols-[minmax(0,340px)_1fr] gap-10 lg:gap-14 items-center">
            {/* The draft's gift-tag polaroid (Tom 2026-11-21): white frame,
                candy-stripe tape, red tag, Holly's Chantry Place photo. */}
            <div className="flex flex-col items-center lg:items-start">
              <div className="relative w-[280px] md:w-[320px] bg-white p-3 pb-5 rounded-[3px] shadow-[0_18px_40px_rgba(0,0,0,0.22)] -rotate-2">
                <span
                  aria-hidden
                  className="absolute -top-3.5 left-1/2 h-[30px] w-[110px] -translate-x-1/2 -rotate-[4deg] shadow-sm"
                  style={{ background: "repeating-linear-gradient(45deg,rgba(185,43,43,.8) 0 10px,rgba(255,255,255,.8) 10px 20px)" }}
                />
                <span
                  className="absolute -top-3 left-4 z-[2] text-white text-[16px] pl-4 pr-3 py-1"
                  style={{ ...xmasStyle, backgroundColor: RED, clipPath: "polygon(10px 0,100% 0,100% 100%,10px 100%,0 50%)" }}
                >
                  To: you
                </span>
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <Image
                    // Christmas shoot at Chantry Place (Tom 2026-11-19).
                    src="/images/tour/holly-chantry-place-lights-story.jpg"
                    alt="Holly, the Christmas guide, under the light arches in Chantry Place"
                    fill
                    sizes="320px"
                    className="object-cover"
                    style={{ objectPosition: "50% 35%" }}
                  />
                </div>
                <p className="mt-3 mb-0 text-center text-[30px] leading-none" style={{ ...xmasStyle, color: RED }}>
                  Holly
                </p>
              </div>
              {holly.handle && (
                <a
                  href={holly.handle.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 text-[15px] font-semibold underline-offset-4 hover:underline"
                  style={{ ...lora, color: RED }}
                >
                  {holly.handle.label}
                </a>
              )}
            </div>
            <div className="min-w-0">
              <SplitHeading plain="Your guide," script="Holly." />
              <p className="text-[17px] text-brand-text/80 leading-relaxed max-w-[55ch] mb-6" style={lora}>
                {holly.blurb}
              </p>
              <GuideReviews reviews={holly.reviews ?? []} accent={{ ac: RED, ad: "#8A1F1F" }} />
            </div>
          </div>
        </section>
      )}

      <FAQ
        items={faqs.filter((f) => ready(f.q) && ready(f.a))}
        customHeading={
          <h2 className="leading-[1.0]">
            <span className="inline text-[clamp(40px,4.8vw,58px)] leading-[0.95]" style={{ ...xmasStyle, color: RED }}>
              Questions?
            </span>
          </h2>
        }
      />

      {/* Closing band: one last booking moment. */}
      <section className="relative overflow-hidden py-20 md:py-28 text-center" style={{ backgroundColor: "#F4EFE7" }}>
        <div className="brand-container flex flex-col items-center gap-7">
          <h2 className="leading-[1.0] m-0">
            <span className="block text-[clamp(40px,5.4vw,64px)] leading-[0.95]" style={{ ...xmasStyle, color: RED }}>
              One very Norwich Christmas.
            </span>
          </h2>
          <BookButton>Book your ticket</BookButton>
          <p className="m-0 text-[14px] text-brand-text/70" style={lora}>
            £12 adults, £9 children, paid when you book.
          </p>
        </div>
      </section>

      <div id="notify" className="relative scroll-mt-28">
        <div className="pointer-events-none absolute left-6 top-10 md:left-4 md:top-16 z-20 -rotate-[9deg]">
          <MustardHollySticker className="h-16 w-12" />
        </div>
        <EmailCapture tourInterest={SLUG} />
      </div>

      <Footer />
    </main>
  );
}
