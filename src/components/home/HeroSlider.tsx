"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { HERO_SLIDES } from "@/data/home";

export default function HeroSlider() {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(1);
    const [isPaused, setIsPaused] = useState(false);
    const count = HERO_SLIDES.length;

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

    const slide = HERO_SLIDES[current];

    const slideVariants = {
        enter: (dir: number) => ({ x: dir > 0 ? "5%" : "-5%", opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (dir: number) => ({ x: dir > 0 ? "-5%" : "5%", opacity: 0 }),
    };

    return (
        <section
            className="relative w-full min-h-screen flex items-center overflow-hidden bg-[#09090B]"
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
                    transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
                    className="absolute inset-0"
                >
                    <motion.div
                        key={`bg-${slide.id}`}
                        initial={{ scale: 1.08 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 8, ease: "easeOut" }}
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url('${slide.bgImage}')` }}
                    />
                    {/* Multi-layer overlay for crisp contrast */}
                    <div className="absolute inset-0 bg-[#09090B]/70" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(110deg, #09090B 42%, rgba(9,9,11,0.4) 100%)" }} />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #09090B 0%, transparent 50%)" }} />
                </motion.div>
            </AnimatePresence>

            {/* Cyan top accent line */}
            <div className="absolute top-0 inset-x-0 h-px bg-[#C4882A]/60 z-20" />

            {/* ── Floating side label ── */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2 z-20 hidden xl:flex flex-col items-center gap-3">
                <div className="h-20 w-px bg-white/10" />
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.3em] rotate-90 whitespace-nowrap">Verified Global Trade</span>
                <div className="h-20 w-px bg-white/10" />
            </div>

            {/* ── Content ── */}
            <div className="relative z-20 w-full max-w-7xl mx-auto px-6 pt-36 pb-44 lg:pt-44 lg:pb-52">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`content-${slide.id}`}
                        initial={{ opacity: 0, y: 32 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="max-w-3xl"
                    >
                        {/* Badge */}
                        <div className="flex items-center gap-3 mb-8">
                            <span className="text-[#C4882A] text-[11px] uppercase tracking-[0.3em] font-bold">
                                {slide.badge}
                            </span>
                        </div>

                        {/* Headline */}
                        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[90px] font-black tracking-[-0.03em] leading-[0.95] text-white mb-8">
                            {slide.title}
                            <br />
                            <span className="text-[#C4882A]">{slide.highlight}</span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-slate-300 text-base md:text-lg font-light leading-relaxed max-w-xl mb-10">
                            {slide.subtitle}
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href={slide.primaryCta.href}
                                className="inline-flex items-center justify-center gap-2 h-11 px-7 bg-[#C4882A] hover:bg-[#D4952E] text-[#09090B] font-bold text-sm transition-colors"
                            >
                                {slide.primaryCta.label} <ArrowRight size={17} />
                            </Link>
                            <Link
                                href={slide.secondaryCta.href}
                                className="inline-flex items-center justify-center gap-2 h-14 px-8 rounded-full border border-white/20 hover:border-white/40 text-white hover:bg-white/10 font-medium text-[15px] transition-all"
                            >
                                {slide.secondaryCta.label}
                            </Link>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* ── Bottom Controls ── */}
            <div className="absolute bottom-10 inset-x-6 z-20 flex items-end justify-between">
                {/* Dots */}
                <div className="flex items-center gap-2">
                    {HERO_SLIDES.map((s, i) => (
                        <button
                            key={s.id}
                            onClick={() => go(i, i > current ? 1 : -1)}
                            aria-label={`Slide ${i + 1}`}
                            className={`transition-all duration-300 ${i === current ? "w-7 h-0.5 bg-[#C4882A]" : "w-5 h-0.5 bg-white/20 hover:bg-white/40"}`}
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
