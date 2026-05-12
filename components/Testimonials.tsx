"use client";

import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Quote, Star } from "lucide-react";
import { motion, useAnimation, useInView, type Variants, type Easing } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────
export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar?: string;
}

export interface TestimonialsProps {
  title?: string;
  subtitle?: string;
  badgeText?: string;
  testimonials?: Testimonial[];
  autoRotateInterval?: number;
  className?: string;
  profileUrl?: string;
  rating?: number;
  count?: number;
}

// ── Single testimonial card (shared by mobile + desktop) ─────────────────────
function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const lines = testimonial.content.split("\n");
  return (
    <div className="bg-white border border-brand-accent/20 shadow-lg rounded-xl p-6 md:p-8 h-full flex flex-col">
      <div className="relative mb-6 flex-1">
        <Quote
          className="absolute -top-2 -left-2 h-7 w-7 text-brand-accent/20 rotate-180"
          aria-hidden="true"
        />
        <div className="relative z-10 font-lora text-brand-text space-y-2">
          {lines.map((sentence, i) => (
            <p key={i} className="text-base font-medium leading-relaxed">
              {i === 0 && "“"}
              {sentence}
              {i === lines.length - 1 && "”"}
            </p>
          ))}
        </div>
      </div>
      <Separator className="my-4 bg-brand-accent/10" />
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-full overflow-hidden border border-brand-accent/20 bg-brand-accent-light flex items-center justify-center text-brand-accent font-semibold shrink-0">
          {testimonial.avatar ? (
            <Image
              src={testimonial.avatar}
              alt={testimonial.name}
              width={48}
              height={48}
              className="h-full w-full object-cover"
            />
          ) : (
            <span>{testimonial.name.charAt(0)}</span>
          )}
        </div>
        <div>
          <p className="font-semibold font-lora text-brand-text">{testimonial.name}</p>
          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
}

/**
 * Testimonials — adapted from AnimatedTestimonials pattern.
 * Mobile: single in-flow card, dots below.
 * Desktop: 2-column carousel with absolute-positioned cards animating in.
 */
export function Testimonials({
  title = "What guests are saying",
  subtitle = "Real reviews from real people who took the tour.",
  badgeText,
  testimonials = [],
  autoRotateInterval = 6000,
  className,
  profileUrl,
  rating,
  count,
}: TestimonialsProps) {
  const computedBadge =
    badgeText ??
    (rating && rating > 0
      ? `${rating.toFixed(1)} on Google${count ? ` · ${count} review${count === 1 ? "" : "s"}` : ""}`
      : "Reviews from Google");

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const controls = useAnimation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as Easing },
    },
  };

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  useEffect(() => {
    if (autoRotateInterval <= 0 || testimonials.length <= 1 || isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, autoRotateInterval);
    return () => clearInterval(interval);
  }, [autoRotateInterval, testimonials.length, isPaused]);

  if (testimonials.length === 0) return null;

  const dotsRow = (
    <div
      className="flex items-center gap-3"
      role="tablist"
      aria-label="Testimonial navigation"
    >
      {testimonials.map((_, index) => (
        <button
          key={index}
          role="tab"
          aria-selected={activeIndex === index}
          aria-label={`View testimonial ${index + 1}`}
          onClick={() => setActiveIndex(index)}
          className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer min-w-[10px] min-h-[10px] focus-brand ${
            activeIndex === index
              ? "w-10 bg-brand-accent"
              : "w-2.5 bg-brand-accent/40"
          }`}
        />
      ))}
    </div>
  );

  const readMoreLink = profileUrl && (
    <a
      href={profileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-sm font-semibold text-brand-accent hover:underline"
    >
      Read all reviews on Google
      <span aria-hidden="true">&rarr;</span>
    </a>
  );

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className={`section-padding bg-brand-bg ${className ?? ""}`}
    >
      <div className="brand-container">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="grid grid-cols-1 gap-10 w-full md:grid-cols-2 md:gap-16 lg:gap-24"
        >
          {/* Heading column */}
          <motion.div variants={itemVariants} className="flex flex-col">
            {computedBadge && (
              <div className="inline-flex w-fit items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold bg-brand-accent text-white mb-5">
                <Star className="h-3.5 w-3.5 fill-white" aria-hidden="true" />
                <span>{computedBadge}</span>
              </div>
            )}
            <h2 className="font-caveat text-4xl md:text-5xl font-bold text-brand-text mb-4 leading-tight">
              {title}
            </h2>
            <p className="text-muted-foreground font-lora text-lg leading-relaxed mb-6 max-w-[600px]">
              {subtitle}
            </p>
            {/* Desktop-only dots; mobile renders dots below the card */}
            <div className="hidden md:block mb-5">{dotsRow}</div>
            {readMoreLink}
          </motion.div>

          {/* Card column */}
          <motion.div variants={itemVariants} className="relative">
            {/* Mobile: in-flow card, no absolute positioning */}
            <div className="md:hidden">
              <TestimonialCard testimonial={testimonials[activeIndex]} />
              <div className="flex justify-center mt-6">{dotsRow}</div>
            </div>

            {/* Desktop: absolute-positioned carousel */}
            <div
              className="hidden md:block relative min-h-[400px] overflow-visible"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  className="absolute inset-0"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{
                    opacity: activeIndex === index ? 1 : 0,
                    x: activeIndex === index ? 0 : 100,
                    scale: activeIndex === index ? 1 : 0.9,
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  style={{ zIndex: activeIndex === index ? 10 : 0 }}
                  aria-hidden={activeIndex !== index}
                >
                  <TestimonialCard testimonial={testimonial} />
                </motion.div>
              ))}
              <div
                className="absolute -bottom-6 -left-6 h-24 w-24 rounded-xl bg-brand-accent/5"
                aria-hidden="true"
              />
              <div
                className="absolute -top-6 -right-6 h-24 w-24 rounded-xl bg-brand-accent/5"
                aria-hidden="true"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
