"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Globe } from "lucide-react";
import { SITE } from "@/data/site";
import { PREMIUM_EASE, BLUR_REVEAL } from "@/lib/animations";

const AUTO_PLAY_INTERVAL = 7000; // 7 seconds

// Country \u2192 flag emoji map
const countryFlags: Record<string, string> = {
  "Saudi Arabia": "\ud83c\uddf8\ud83c\udde6",
  "China": "\ud83c\udde8\ud83c\uddf3",
  "Nigeria": "\ud83c\uddf3\ud83c\uddec",
  "USA": "\ud83c\uddfa\ud83c\uddf8",
  "UK": "\ud83c\uddec\ud83c\udde7",
  "UAE": "\ud83c\udde6\ud83c\uddea",
  "India": "\ud83c\uddee\ud83c\uddf3",
  "Bangladesh": "\ud83c\udde7\ud83c\udde9",
};

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const res = await fetch("/api/public/home/testimonials");
        const data = await res.json();
        if (Array.isArray(data)) {
          setTestimonials(data);
        }
      } catch (err) {
        console.error("Failed to fetch testimonials:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchTestimonials();
  }, []);

  const count = testimonials.length;
  const next = useCallback(() => {
    if (count > 0) setCurrent((c) => (c + 1) % count);
  }, [count]);

  const prev = () => {
    if (count > 0) setCurrent((c) => (c - 1 + count) % count);
  };

  // Auto-play \u2014 pauses on hover
  useEffect(() => {
    if (paused || count === 0) return;
    const id = setInterval(next, AUTO_PLAY_INTERVAL);
    return () => clearInterval(id);
  }, [next, paused, count]);

  if (!loading && count === 0) return null;
  if (loading) return (
    <div className="h-64 flex items-center justify-center bg-zinc-50 border-y border-zinc-200">
        <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
    </div>
  );

  const t = testimonials[current];
  const flag = countryFlags[t.country] ?? "\ud83c\udf0d";

  return (
    <section className="bg-white py-12 md:py-16 border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          variants={BLUR_REVEAL}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="mb-14"
        >
          <p className="font-accent text-[10px] font-bold text-gold uppercase tracking-[0.25em] mb-4">
            Client Voices
          </p>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <h2 className="font-display text-3xl md:text-4xl font-black text-zinc-900 tracking-tight">
              Trusted{" "}
              <span className="text-gold">Globally.</span>
            </h2>
            <p className="font-body text-sm text-stone-400 max-w-xs leading-relaxed">
              Real outcomes from procurement professionals across{" "}
              <strong className="text-zinc-600">{SITE.contact.responseTime}</strong>{" "}
              response cycles.
            </p>
          </div>
        </motion.div>

        {/* Card */}
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, filter: "blur(10px)", y: 20, scale: 0.98 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0, scale: 1 }}
              exit={{ opacity: 0, filter: "blur(6px)", y: -15, scale: 0.98 }}
              transition={{ duration: 0.7, ease: PREMIUM_EASE }}
              className="relative border border-zinc-200 bg-zinc-50 p-6"
            >
              {/* Gold accent bar */}
              <div className="h-0.5 w-6 bg-gold mb-6" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={12} className="text-gold fill-gold" />
                ))}
              </div>

              {/* Quote text — bigger, more weight */}
              <blockquote className="font-sans text-base md:text-lg text-zinc-800 font-medium leading-relaxed mb-7 max-w-3xl italic">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Attribution — company + role prominent */}
              <div className="flex items-center justify-between flex-wrap gap-6">
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="w-11 h-11 bg-gold flex items-center justify-center text-white font-black text-sm shrink-0">
                    {t.name.charAt(0)}
                  </div>

                  <div>
                    <p className="font-display font-bold text-zinc-900 text-sm leading-tight">
                      {t.name}
                    </p>
                    <p className="font-accent text-[11px] text-gold font-bold mt-1 uppercase tracking-wider">
                      {t.role}
                    </p>
                    <p className="font-sans text-[11px] text-stone-500 mt-0.5">
                      {t.company}
                    </p>
                  </div>
                </div>

                {/* Country badge */}
                <div className="flex items-center gap-2 bg-white px-3 py-1.5 border border-zinc-200">
                  <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">
                    {flag} {t.country}
                  </span>
                </div>
              </div>

              {/* Progress bar — auto-play indicator */}
              {!paused && (
                <motion.div
                  key={`progress-${current}`}
                  className="absolute bottom-0 left-0 h-[2.5px] bg-gold/50"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: AUTO_PLAY_INTERVAL / 1000, ease: "linear" }}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mt-8">
          {/* Dot indicators */}
          <div className="flex gap-3 items-center">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => { setCurrent(i); setPaused(true); }}
                aria-label={`Testimonial ${i + 1}`}
                className={`transition-all duration-500 h-[2px] ${
                  i === current
                    ? "w-10 bg-gold"
                    : "w-4 bg-zinc-200 hover:bg-zinc-300"
                }`}
              />
            ))}
          </div>

          {/* Arrow controls */}
          <div className="flex gap-2">
            <motion.button
              onClick={() => { prev(); setPaused(true); }}
              aria-label="Previous testimonial"
              whileTap={{ scale: 0.92 }}
              className="w-9 h-9 border border-zinc-200 text-zinc-400 hover:text-zinc-900 hover:border-zinc-400 flex items-center justify-center transition-colors"
            >
              <ChevronLeft size={16} />
            </motion.button>
            <motion.button
              onClick={() => { next(); setPaused(true); }}
              aria-label="Next testimonial"
              whileTap={{ scale: 0.92 }}
              className="w-9 h-9 border border-zinc-200 text-zinc-400 hover:text-zinc-900 hover:border-zinc-400 flex items-center justify-center transition-colors"
            >
              <ChevronRight size={16} />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
