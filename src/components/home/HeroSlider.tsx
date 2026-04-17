"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { PREMIUM_EASE, BLUR_REVEAL, MASK_REVEAL } from "@/lib/animations";

interface HeroSlide {
    id: string;
    badge: string;
    title: string;
    highlight: string;
    subtitle: string;
    bg_image_url: string;
    primary_cta_label: string;
    primary_cta_href: string;
    secondary_cta_label: string;
    secondary_cta_href: string;
}

export default function HeroSlider() {
    const [slides, setSlides] = useState<HeroSlide[]>([]);
    const [loading, setLoading] = useState(true);
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(1);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        async function fetchSlides() {
            setLoading(true);
            try {
                const res = await fetch("/api/public/hero");
                const data = await res.json();
                if (Array.isArray(data) && data.length > 0) {
                    setSlides(data);
                }
            } catch {
                // keep empty
            } finally {
                setLoading(false);
            }
        }
        fetchSlides();
    }, []);

    const count = slides.length;

    const go = useCallback(
        (next: number, dir: number) => {
            setDirection(dir);
            setCurrent((next + count) % count);
        },
        [count]
    );

    const prev = () => go(current - 1, -1);
    const next = () => go(current + 1, 1);

    useEffect(() => {
        if (isPaused) return;
        const timer = setTimeout(() => go(current + 1, 1), 6000);
        return () => clearTimeout(timer);
    }, [current, isPaused, go]);

    if (loading) {
        return (
            <section className="relative w-full h-screen bg-[#09090B] flex items-center justify-center">
                <div className="w-10 h-10 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
            </section>
        );
    }

    if (slides.length === 0) return null;

    const slide = slides[current];

    const slideVariants = {
        enter: (dir: number) => ({ x: dir > 0 ? "2%" : "-2%", opacity: 0, filter: "blur(4px)" }),
        center: { x: 0, opacity: 1, filter: "blur(0px)" },
        exit: (dir: number) => ({ x: dir > 0 ? "-2%" : "2%", opacity: 0, filter: "blur(4px)" }),
    };

    return (
        <section
            className="relative w-full h-screen flex items-center overflow-hidden bg-[#09090B]"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* ── Background Slides ── */}
            <AnimatePresence custom={direction} initial={false}>
                <motion.div
                    key={slide.id}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 1, ease: PREMIUM_EASE }}
                    className="absolute inset-0"
                >
                    <motion.div
                        key={`bg-${slide.id}`}
                        initial={{ scale: 1.15 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 10, ease: "easeOut" }}
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url('${slide.bg_image_url}')` }}
                    />
                    <div className="absolute inset-0 bg-[#09090B]/60" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(110deg, #09090B 35%, rgba(9,9,11,0.5) 100%)" }} />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #09090B 0%, transparent 40%)" }} />
                    <div className="absolute inset-0 opacity-20" style={{ background: "radial-gradient(circle at 70% 50%, rgba(196,136,42,0.15), transparent 60%)" }} />
                </motion.div>
            </AnimatePresence>

            <div className="absolute top-0 inset-x-0 h-px bg-gold/60 z-20" />

            {/* ── Content ── */}
            <div className="relative z-20 w-full max-w-7xl mx-auto px-6 pt-32 pb-40 lg:pt-40 lg:pb-48">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`content-${slide.id}`}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="max-w-3xl"
                    >
                        {/* Badge */}
                        <div className="overflow-hidden mb-8">
                            <motion.span 
                                variants={MASK_REVEAL}
                                custom={0}
                                className="inline-block font-accent text-[#C4882A] text-[10px] uppercase tracking-[0.3em] font-bold"
                            >
                                {slide.badge}
                            </motion.span>
                        </div>

                        {/* Headline */}
                        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-white mb-6">
                            <div className="overflow-hidden">
                                <motion.span variants={MASK_REVEAL} custom={1} className="inline-block">
                                    {slide.title}
                                </motion.span>
                            </div>
                            <div className="overflow-hidden">
                                <motion.span variants={MASK_REVEAL} custom={2} className="inline-block text-gold">
                                    {slide.highlight}
                                </motion.span>
                            </div>
                        </h1>

                        {/* Subtitle */}
                        <motion.p 
                            variants={BLUR_REVEAL}
                            custom={3}
                            className="font-sans text-slate-300 text-base md:text-lg font-medium leading-relaxed max-w-xl mb-10 opacity-90"
                        >
                            {slide.subtitle}
                        </motion.p>

                        {/* CTAs */}
                        <motion.div 
                            variants={BLUR_REVEAL} 
                            custom={4}
                            className="flex flex-col sm:flex-row gap-4"
                        >
                            <motion.div whileTap={{ scale: 0.96 }} whileHover={{ scale: 1.02 }}>
                              <Link
                                href={slide.primary_cta_href}
                                className="relative overflow-hidden group inline-flex items-center justify-center gap-2 h-11 px-7 bg-gold hover:bg-gold-dark text-zinc-950 font-bold text-sm transition-colors"
                              >
                                <span className="relative z-10 flex items-center gap-2">
                                  {slide.primary_cta_label} <ArrowRight size={17} />
                                </span>
                                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                              </Link>
                            </motion.div>
                            <motion.div whileTap={{ scale: 0.96 }}>
                              <Link
                                href={slide.secondary_cta_href}
                                className="inline-flex items-center justify-center gap-2 h-11 px-7 border border-white/20 hover:border-white/50 text-white font-semibold text-sm transition-colors backdrop-blur-sm"
                              >
                                {slide.secondary_cta_label} <ArrowRight size={15} className="opacity-60" />
                              </Link>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* ── Bottom Controls ── */}
            <div className="absolute bottom-10 inset-x-6 z-20 flex items-end justify-between">
                {/* Dots */}
                <div className="flex items-center gap-2">
                    {slides.map((s, i) => (
                        <button
                            key={s.id}
                            onClick={() => go(i, i > current ? 1 : -1)}
                            aria-label={`Slide ${i + 1}`}
                            className={`transition-all duration-300 ${i === current ? "w-7 h-0.5 bg-gold" : "w-5 h-0.5 bg-white/20 hover:bg-white/40"}`}
                        />
                    ))}
                </div>

                {/* Arrows + counter */}
                <div className="flex items-center gap-3">
                    <span className="font-mono text-[11px] text-slate-500 tracking-widest mr-2">
                        {String(current + 1).padStart(2, "0")}/{String(count).padStart(2, "0")}
                    </span>
                    <button onClick={prev} aria-label="Previous" className="w-10 h-10 rounded-full border border-white/15 text-white/60 hover:text-white hover:border-white/40 flex items-center justify-center transition-all">
                        <ChevronLeft size={18} />
                    </button>
                    <button onClick={next} aria-label="Next" className="w-10 h-10 rounded-full border border-white/15 text-white/60 hover:text-white hover:border-white/40 flex items-center justify-center transition-all">
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>
        </section>
    );
}
