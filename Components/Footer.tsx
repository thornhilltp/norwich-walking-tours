import Image from "next/image";
import { MapPin, AtSign } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "The Tour", href: "/tour" },
  { label: "Private Tours", href: "/private-tours" },
  { label: "Book your spot", href: "/book" },
  { label: "Contact", href: "/contact" },
  { label: "FAQs", href: "/#faq" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export function Footer() {
  return (
    <footer className="bg-brand-text text-white">
      <div className="brand-container py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">

          {/* Logo + tagline */}
          <div className="flex flex-col gap-4">
            <Image
              src="/logo.svg"
              alt="Norwich Free Walking Tours"
              width={1376}
              height={768}
              className="h-10 w-auto object-contain brightness-0 invert"
            />
            <p className="text-sm text-white/60 leading-relaxed max-w-xs" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
              See the real Norwich with a local. Near daily. Book your spot free.
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer navigation">
            <p className="font-lora text-xs font-semibold tracking-widest uppercase text-white/40 mb-4">
              Navigate
            </p>
            <ul className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-lora text-sm text-white/70 hover:text-white transition-colors duration-150"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Meeting point + social */}
          <div>
            <p className="font-lora text-xs font-semibold tracking-widest uppercase text-white/40 mb-4">
              Meeting point
            </p>
            <div className="flex items-start gap-2 mb-6">
              <MapPin className="w-4 h-4 text-brand-accent mt-0.5 shrink-0" aria-hidden="true" />
              <address className="font-lora text-sm text-white/70 not-italic leading-relaxed">
                Outside The Forum<br />
                Millennium Plain<br />
                Norwich, NR2 1TF
              </address>
            </div>

            <p className="font-lora text-xs font-semibold tracking-widest uppercase text-white/40 mb-3">
              Follow along
            </p>
            <a
              href="https://instagram.com/norwichfreetour"
              aria-label="Norwich Free Walking Tour on Instagram"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-150"
              rel="noopener noreferrer"
              target="_blank"
            >
              <AtSign className="w-4 h-4" aria-hidden="true" />
              <span className="font-lora text-sm">@norwichfreetour</span>
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-lora text-xs text-white/40">
            &copy; {new Date().getFullYear()} Norwich Free Walking Tour. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {legalLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-lora text-xs text-white/40 hover:text-white/70 transition-colors duration-150"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
