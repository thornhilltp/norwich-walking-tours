"use client";

import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, MessageCircle, ArrowRight, CheckCircle } from "lucide-react";

export function LeadMagnet() {
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    // In production: send to your email platform / API
    // For now, show success state
    setError("");
    setSubmitted(true);
  }

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-brand-accent"
      aria-labelledby="lead-magnet-heading"
    >
      <div className="brand-container">
        <div className="max-w-2xl mx-auto text-center">
          {!submitted ? (
            <>
              {/* Heading */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                <p className="font-lora text-white/70 text-sm font-semibold tracking-widest uppercase mb-3">
                  Free download
                </p>
                <h2
                  id="lead-magnet-heading"
                  className="font-caveat text-4xl md:text-5xl font-bold text-white mb-4"
                >
                  Get the Secret Norwich Map
                </h2>
                <p className="font-lora text-white/80 text-lg leading-relaxed mb-8">
                  The 12 spots that didn&apos;t make the tour. Hidden courtyards,
                  the best coffee, the alley that nobody can find. Yours free.
                </p>
              </motion.div>

              {/* Form */}
              <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="flex flex-col gap-3"
                noValidate
              >
                {/* Email */}
                <div className="relative">
                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-accent"
                    aria-hidden="true"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    aria-label="Email address"
                    className="w-full h-12 pl-11 pr-4 rounded-xl bg-white text-brand-text font-lora text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-white/60"
                  />
                </div>

                {/* WhatsApp (optional) */}
                <div className="relative">
                  <MessageCircle
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-accent"
                    aria-hidden="true"
                  />
                  <input
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="WhatsApp number (optional): for tour updates"
                    aria-label="WhatsApp number (optional)"
                    className="w-full h-12 pl-11 pr-4 rounded-xl bg-white text-brand-text font-lora text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-white/60"
                  />
                </div>

                {error && (
                  <p role="alert" className="font-lora text-sm text-white/90 text-left px-1">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full h-12 bg-brand-text text-white font-lora font-semibold text-base rounded-xl hover:bg-brand-text/85 transition-colors duration-150 flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/60 mt-1"
                >
                  Send me the map
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>

                <p className="font-lora text-white/60 text-xs mt-1">
                  No spam. Unsubscribe any time.
                </p>
              </motion.form>
            </>
          ) : (
            /* Success state */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center gap-4"
            >
              <CheckCircle className="w-14 h-14 text-white" aria-hidden="true" />
              <h2 className="font-caveat text-4xl font-bold text-white">
                It&apos;s on its way.
              </h2>
              <p className="font-lora text-white/80 text-lg">
                Check your inbox. The Secret Norwich Map will be there shortly.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
