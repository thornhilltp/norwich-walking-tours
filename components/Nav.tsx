"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "The Tour", href: "/tour" },
  { label: "Private Tours", href: "/private-tours" },
  { label: "Contact", href: "/contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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
        scrolled || mobileOpen
          ? "bg-brand-bg/95 backdrop-blur-sm shadow-sm border-b border-brand-accent/10"
          : "bg-black/20 backdrop-blur-sm"
      }`}
    >
      <div className="brand-container">
        <nav
          className="flex items-center justify-between h-20"
          aria-label="Main navigation"
        >
          {/* Logo — enlarged */}
          <a href="/" aria-label="Norwich Free Walking Tours, home">
            <Image
              src="/logo.svg"
              alt="Norwich Free Walking Tours"
              width={1376}
              height={768}
              className={`w-auto object-contain transition-all duration-300 ${
                scrolled ? "h-12 brightness-100" : "h-14 brightness-0 invert"
              }`}
              priority
            />
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-150 ${
                  scrolled
                    ? "text-brand-text/70 hover:text-brand-accent"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="/book"
              className="btn-cta inline-flex items-center h-10 px-5 text-base bg-brand-accent hover:bg-brand-accent/90 text-white rounded-xl transition-colors duration-150 focus-brand"
            >
              Book your spot
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className={`md:hidden flex items-center justify-center w-11 h-11 rounded-lg transition-colors duration-150 focus-brand ${
              scrolled || mobileOpen
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
          mobileOpen ? "max-h-72 opacity-100" : "max-h-0 opacity-0"
        }`}
        aria-hidden={!mobileOpen}
      >
        <div className="brand-container py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-base font-medium text-brand-text/80 hover:text-brand-accent hover:bg-brand-accent/5 transition-colors duration-150 px-3 py-2.5 rounded-lg"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-2 pt-2 border-t border-brand-accent/10">
            <a
              href="/book"
              onClick={() => setMobileOpen(false)}
              className="btn-cta flex items-center justify-center w-full h-11 bg-brand-accent text-white rounded-xl hover:bg-brand-accent/90 transition-colors duration-150 text-base"
            >
              Book your spot
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
