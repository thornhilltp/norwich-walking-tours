import Image from "next/image";
import { MapPin } from "lucide-react";

// Brand icons — lucide-react dropped Instagram/Facebook exports for trademark
// reasons, so we inline them (and TikTok, which was never in lucide).
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.1z" />
    </svg>
  );
}

const socials = [
  {
    label: "Norwich Free Walking Tour on Instagram",
    handle: "Instagram",
    href: "https://instagram.com/norwichfreewalkingtours",
    Icon: InstagramIcon,
  },
  {
    label: "Norwich Free Walking Tour on TikTok",
    handle: "TikTok",
    href: "https://tiktok.com/@norwichfreewalkingtours",
    Icon: TikTokIcon,
  },
  {
    label: "Norwich Free Walking Tour on Facebook",
    handle: "Facebook",
    href: "https://facebook.com/norwichfreewalkingtours",
    Icon: FacebookIcon,
  },
];

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
              src="/logo.png"
              alt="Norwich Free Walking Tours"
              width={510}
              height={277}
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
            <ul className="flex items-center gap-4">
              {socials.map(({ label, handle, href, Icon }) => (
                <li key={handle}>
                  <a
                    href={href}
                    aria-label={label}
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition-colors duration-150"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                </li>
              ))}
            </ul>
            <p className="font-lora text-xs text-white/50 mt-3">
              @norwichfreewalkingtours
            </p>
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
