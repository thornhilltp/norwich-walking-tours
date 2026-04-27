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

/**
 * Testimonials — adapted from AnimatedTestimonials pattern
 * (Components/Animated Testimonial.txt).
 * Auto-rotating cards, dot navigation, scroll-triggered entrance.
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
      ? `★ ${rating.toFixed(1)} on Google${count ? ` · ${count} review${count === 1 ? "" : "s"}` : ""}`
      : "Reviews from Google");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
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

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className={`section-padding overflow-hidden bg-brand-bg ${className ?? ""}`}
    >
      <div className="brand-container">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="grid grid-cols-1 gap-16 w-full md:grid-cols-2 lg:gap-24"
        >
          {/* Left: heading + dots */}
          <motion.div variants={itemVariants} className="flex flex-col justify-center">
            <div className="space-y-6">
              {computedBadge && (
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-brand-accent/10 text-brand-accent">
                  <Star className="mr-1 h-3.5 w-3.5 fill-brand-accent" aria-hidden="true" />
                  <span>{computedBadge}</span>
                </div>
              )}

              <h2 className="font-caveat text-4xl font-bold text-brand-text">
                {title}
              </h2>

              <p className="max-w-[600px] text-muted-foreground font-lora text-lg leading-relaxed">
                {subtitle}
              </p>

              <div className="flex items-center gap-3 pt-4" role="tablist" aria-label="Testimonial navigation">
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
                        : "w-2.5 bg-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>

              {profileUrl && (
                <a
                  href={profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-medium text-brand-accent hover:underline"
                >
                  Read all reviews on Google
                  <span aria-hidden="true">→</span>
                </a>
              )}
            </div>
          </motion.div>

          {/* Right: testimonial cards */}
          <motion.div
            variants={itemVariants}
            className="relative h-full mr-10 min-h-[300px] md:min-h-[400px]"
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
                <div className="bg-white border border-brand-accent/20 shadow-lg rounded-xl p-8 h-full flex flex-col">
                  <div className="relative mb-6 flex-1">
                    <Quote className="absolute -top-2 -left-2 h-8 w-8 text-brand-accent/20 rotate-180" aria-hidden="true" />
                    <div className="relative z-10 font-lora text-brand-text space-y-2">
                      {testimonial.content.split("\n").map((sentence, i, arr) => (
                        <p key={i} className="text-base font-medium leading-relaxed">
                          {i === 0 && "“"}{sentence}{i === arr.length - 1 && "”"}
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
                      <p className="font-semibold font-lora text-brand-text">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-xl bg-brand-accent/5" aria-hidden="true" />
            <div className="absolute -top-6 -right-6 h-24 w-24 rounded-xl bg-brand-accent/5" aria-hidden="true" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
