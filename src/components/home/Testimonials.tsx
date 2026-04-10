"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/data/home";

export default function Testimonials() {
    const [current, setCurrent] = useState(0);
    const count = TESTIMONIALS.length;
    const prev = () => setCurrent((current - 1 + count) % count);
    const next = () => setCurrent((current + 1) % count);
    const t = TESTIMONIALS[current];

    return (
        <section className="bg-white py-24 md:py-32 border-t border-zinc-200">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    className="mb-14"
                >
                    <p className="font-cormorant text-[10px] font-bold text-[#C4882A] uppercase tracking-[0.25em] mb-4">Client Voices</p>
                    <h2 className="font-display text-3xl md:text-5xl font-black text-zinc-900 tracking-tight">
                        Trusted Globally.
                    </h2>
                </motion.div>

                {/* Card */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={current}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.32 }}
                        className="relative border border-zinc-200 bg-[#FAFAF8] p-8 md:p-12"
                    >
                        {/* Brass top bar */}
                        <div className="h-0.5 w-8 bg-[#C4882A] mb-8" />

                        {/* Large quote icon */}
                        <Quote size={40} className="text-zinc-100 mb-4" />

                        {/* Stars */}
                        <div className="flex gap-1 mb-6">
                            {Array.from({ length: t.rating }).map((_, i) => (
                                <Star key={i} size={14} className="text-[#C4882A] fill-[#C4882A]" />
                            ))}
                        </div>

                        {/* Quote text */}
                        <blockquote className="font-lato text-xl md:text-2xl text-zinc-800 font-light leading-relaxed mb-10 max-w-3xl">
                            &ldquo;{t.quote}&rdquo;
                        </blockquote>

                        {/* Attribution */}
                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 border border-zinc-200 bg-[#C4882A] flex items-center justify-center text-white font-black text-base">
                                    {t.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-display font-bold text-zinc-900 text-sm">{t.name}</p>
                                    <p className="font-lato text-zinc-400 text-xs">{t.role} · {t.company}</p>
                                </div>
                            </div>
                            <span className="hidden md:flex items-center gap-2 font-lato text-[10px] font-bold text-zinc-300 uppercase tracking-[0.2em]">
                                {t.country}
                            </span>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Controls */}
                <div className="flex items-center justify-between mt-8">
                    <div className="flex gap-3">
                        {TESTIMONIALS.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrent(i)}
                                aria-label={`Testimonial ${i + 1}`}
                                className={`transition-all duration-300 h-px ${i === current ? "w-8 bg-[#C4882A]" : "w-5 bg-zinc-300 hover:bg-zinc-400"}`}
                            />
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <button onClick={prev} aria-label="Previous" className="w-9 h-9 border border-zinc-200 text-zinc-400 hover:text-zinc-900 hover:border-zinc-400 flex items-center justify-center transition-colors">
                            <ChevronLeft size={16} />
                        </button>
                        <button onClick={next} aria-label="Next" className="w-9 h-9 border border-zinc-200 text-zinc-400 hover:text-zinc-900 hover:border-zinc-400 flex items-center justify-center transition-colors">
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
