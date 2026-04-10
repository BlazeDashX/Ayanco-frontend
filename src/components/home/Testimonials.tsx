"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote, Globe } from "lucide-react";
import { TESTIMONIALS } from "@/data/home";
import { SITE } from "@/data/site";

const AUTO_PLAY_INTERVAL = 7000; // 7 seconds

// Country → flag emoji map
const countryFlags: Record<string, string> = {
  "Saudi Arabia": "🇸🇦",
  "China": "🇨🇳",
  "Nigeria": "🇳🇬",
  "USA": "🇺🇸",
  "UK": "🇬🇧",
  "UAE": "🇦🇪",
  "India": "🇮🇳",
  "Bangladesh": "🇧🇩",
};

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = TESTIMONIALS.length;

  const next = useCallback(() => setCurrent((c) => (c + 1) % count), [count]);
  const prev = () => setCurrent((c) => (c - 1 + count) % count);

  // Auto-play — pauses on hover
  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, AUTO_PLAY_INTERVAL);
    return () => clearInterval(id);
  }, [next, paused]);

  const t = TESTIMONIALS[current];
  const flag = countryFlags[t.country] ?? "🌍";

  return (
    <section className="bg-white py-24 md:py-32 border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="font-accent text-[10px] font-bold text-gold uppercase tracking-[0.25em] mb-4">
            Client Voices
          </p>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <h2 className="font-display text-3xl md:text-5xl font-black text-zinc-900 tracking-tight">
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
              initial={{ opacity: 0, filter: "blur(6px)", y: 12 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              exit={{ opacity: 0, filter: "blur(4px)", y: -8 }}
              transition={{ duration: 0.38, ease: "easeOut" }}
              className="relative border border-zinc-200 bg-stone-50 p-8 md:p-12"
            >
              {/* Gold accent bar */}
              <div className="h-0.5 w-8 bg-gold mb-8" />

              {/* Quote mark */}
              <Quote size={40} className="text-zinc-100 mb-4" />

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={14} className="text-gold fill-gold" />
                ))}
              </div>

              {/* Quote text — bigger, more weight */}
              <blockquote className="font-body text-xl md:text-2xl text-zinc-800 font-light leading-relaxed mb-10 max-w-3xl">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Attribution — company + role prominent */}
              <div className="flex items-center justify-between flex-wrap gap-6">
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="w-12 h-12 bg-gold flex items-center justify-center text-white font-black text-base shrink-0">
                    {t.name.charAt(0)}
                  </div>

                  <div>
                    <p className="font-display font-bold text-zinc-900 text-base leading-tight">
                      {t.name}
                    </p>
                    <p className="font-body text-sm text-gold font-semibold mt-0.5">
                      {t.role}
                    </p>
                    <p className="font-body text-xs text-stone-500 mt-0.5">
                      {t.company}
                    </p>
                  </div>
                </div>

                {/* Country badge */}
                <div className="flex items-center gap-2 bg-zinc-100 px-4 py-2 border border-zinc-200">
                  <Globe size={12} className="text-stone-400" />
                  <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-[0.15em]">
                    {flag} {t.country}
                  </span>
                </div>
              </div>

              {/* Progress bar — auto-play indicator */}
              {!paused && (
                <motion.div
                  key={`progress-${current}`}
                  className="absolute bottom-0 left-0 h-[2px] bg-gold/40"
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
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => { setCurrent(i); setPaused(true); }}
                aria-label={`Testimonial ${i + 1}`}
                className={`transition-all duration-300 h-px ${
                  i === current
                    ? "w-8 bg-gold"
                    : "w-5 bg-zinc-300 hover:bg-zinc-400"
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
