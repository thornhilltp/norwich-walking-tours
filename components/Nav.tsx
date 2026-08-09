"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { trackEvent } from "@/lib/tracking";

// 'About Tom' link swapped for 'What is a free tour?' per Tom 2026-05-19.
// Reasoning: the free-tour model is the consideration-stage question first-
// time visitors actually have ('how does this work / what's the catch'),
// and that page directly addresses it. About Tom still exists at /about
// and is reached via the AboutSectionV2 'or contact me direct' link plus
// internal copy mentions. Not gone, just demoted from top nav.
// Nav order (Tom 2026-05-19, final):
//   The Tour > About > What is a free tour? > Private Tours > Contact
// 'About' was briefly removed earlier today then added back per Tom.
const navLinks = [
  { label: "The Tour", href: "/tour" },
  { label: "About", href: "/about-us" },
  { label: "What Is a Free Tour?", href: "/what-is-a-free-tour" },
  { label: "Private Tours", href: "/private-tours" },
  { label: "Contact", href: "/contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  // Nav is transparent at top of pages with dark image heroes (currently
  // just / — the homepage with its photo+overlay hero). Otherwise opaque
  // so nav text is legible against cream content bg.
  const hasDarkHero = pathname === "/";
  const isOpaque = scrolled || mobileOpen || !hasDarkHero;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isOpaque
          ? "bg-brand-bg/95 backdrop-blur-sm shadow-sm border-b border-brand-accent/10"
          : "bg-black/20 backdrop-blur-sm"
      }`}
    >
      <div className="brand-container">
        <nav
          className="flex items-center justify-between h-24"
          aria-label="Main navigation"
        >
          {/* Logo — sized larger on desktop for brand presence.
              Mobile stays moderate so the wordmark doesn't crowd the
              hamburger at 375px viewports. */}
          <a href="/" aria-label="Norwich Free Walking Tours, home">
            <Image
              src={isOpaque ? "/Logo_1.svg" : "/Logo_2.svg"}
              alt="Norwich Free Walking Tours"
              width={500}
              height={500}
              unoptimized
              className={`w-auto object-contain transition-all duration-300 ${
                isOpaque ? "h-[60px] md:h-[72px]" : "h-[68px] md:h-[84px]"
              }`}
              priority
            />
          </a>

          {/* Desktop links — wavy walking-path underline on hover, matching
              the ScrollTrail dashed-thread aesthetic (Tom 2026-05-19).
              Active link (matches current pathname) gets the underline
              permanently revealed + brand-accent / white text. SVG uses
              currentColor so dashes inherit the link's colour. */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const textClass = isOpaque
                ? isActive
                  ? "text-brand-accent"
                  : "text-brand-text/70 hover:text-brand-accent"
                : isActive
                  ? "text-white"
                  : "text-white/80 hover:text-white";
              const clipClass = isActive
                ? "[clip-path:inset(0_0_0_0)]"
                : "[clip-path:inset(0_100%_0_0)] group-hover:[clip-path:inset(0_0_0_0)]";
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`group relative text-sm font-medium pb-2 transition-colors duration-150 ${textClass}`}
                >
                  {link.label}
                  <svg
                    viewBox="0 0 60 6"
                    preserveAspectRatio="none"
                    className={`absolute bottom-0 left-0 w-full h-[6px] pointer-events-none transition-[clip-path] duration-500 ease-out ${clipClass}`}
                    aria-hidden="true"
                  >
                    <path
                      d="M 1 3 Q 10 0 20 3 T 40 3 T 59 3"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeDasharray="1 4"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </svg>
                </a>
              );
            })}
            <a
              href="/book"
              onClick={() => trackEvent("book_cta_click", { location: "nav_desktop" })}
              className="btn-cta inline-flex items-center h-10 px-5 text-base bg-brand-accent hover:bg-brand-accent/90 text-white rounded-xl transition-colors duration-150 focus-brand"
            >
              Book your spot (free)
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className={`md:hidden flex items-center justify-center w-11 h-11 rounded-lg transition-colors duration-150 focus-brand ${
              isOpaque
                ? "text-brand-text hover:bg-brand-accent/10"
                : "text-white hover:bg-white/15"
            }`}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden bg-brand-bg border-t border-brand-accent/10 transition-all duration-200 ${
          mobileOpen ? "max-h-[28rem] opacity-100" : "max-h-0 opacity-0"
        }`}
        aria-hidden={!mobileOpen}
      >
        <div className="brand-container py-4 flex flex-col gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                aria-current={isActive ? "page" : undefined}
                className={`text-base font-medium transition-colors duration-150 px-3 py-2.5 rounded-lg ${
                  isActive
                    ? "text-brand-accent bg-brand-accent/5 font-semibold"
                    : "text-brand-text/80 hover:text-brand-accent hover:bg-brand-accent/5"
                }`}
              >
                {link.label}
              </a>
            );
          })}
          <div className="mt-2 pt-2 border-t border-brand-accent/10">
            <a
              href="/book"
              onClick={() => {
                trackEvent("book_cta_click", { location: "nav_mobile" });
                setMobileOpen(false);
              }}
              className="btn-cta flex items-center justify-center w-full h-11 bg-brand-accent text-white rounded-xl hover:bg-brand-accent/90 transition-colors duration-150 text-base"
            >
              Book your spot (free)
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
