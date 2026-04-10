"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useEventSlides } from "@/hooks/useFounder";

const AUTOPLAY_DELAY = 3000;

export default function EventsSlideshow() {
  const slides = useEventSlides();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);

  const go = useCallback(
    (i: number) => setIndex(((i % slides.length) + slides.length) % slides.length),
    [slides.length]
  );
  const next = useCallback(() => go(index + 1), [go, index]);
  const prev = useCallback(() => go(index - 1), [go, index]);

  // Autoplay
  useEffect(() => {
    if (paused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(next, AUTOPLAY_DELAY);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [paused, next]);

  // Keyboard
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
    if (e.key === "ArrowRight") { e.preventDefault(); next(); }
  };

  // Touch swipe
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setPaused(true);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };
  const onTouchEnd = () => {
    if (Math.abs(touchDeltaX.current) > 50) {
      touchDeltaX.current < 0 ? next() : prev();
    }
    touchDeltaX.current = 0;
    setPaused(false);
  };

  return (
    <section id="events" className="py-20 md:py-28 bg-white scroll-mt-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 reveal" data-reveal="up">
          <p className="text-xs font-bold tracking-[.2em] text-[color:var(--gold)] uppercase mb-2">
            Highlights
          </p>
          <h2 className="font-display text-3xl sm:text-4xl text-gray-900">
            Event Highlights
          </h2>
        </div>

        {/* Carousel */}
        <div
          className="relative max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl reveal"
          data-reveal="up"
          tabIndex={0}
          aria-roledescription="carousel"
          aria-label="Event highlights carousel"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          onKeyDown={handleKeyDown}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Track */}
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${index * 100}%)`, willChange: "transform" }}
            aria-live="polite"
          >
            {slides.map((slide, i) => (
              <div key={i} className="w-full flex-shrink-0 relative">
                <div className="relative w-full pt-[56.25%]">
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    className="object-cover"
                    priority={i === 0}
                    loading={i === 0 ? undefined : "lazy"}
                    unoptimized={true}
                    sizes="(max-width:1024px) 100vw, 900px"
                  />
                  {/* Caption gradient overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-5 md:p-8 bg-gradient-to-t from-black/65 via-black/20 to-transparent text-white">
                    <h3 className="font-display font-semibold text-lg md:text-2xl">
                      {slide.title}
                    </h3>
                    <p className="text-sm opacity-80 mt-0.5">
                      {slide.location} · {slide.year}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Prev / Next */}
          <button
            onClick={() => { prev(); setPaused(false); }}
            className="absolute left-3 top-1/2 -translate-y-1/2 grid place-items-center w-10 h-10 rounded-full bg-white/90 text-gray-900 shadow hover:scale-105 hover:shadow-lg transition"
            aria-label="Previous slide"
          >
            ‹
          </button>
          <button
            onClick={() => { next(); setPaused(false); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 grid place-items-center w-10 h-10 rounded-full bg-white/90 text-gray-900 shadow hover:scale-105 hover:shadow-lg transition"
            aria-label="Next slide"
          >
            ›
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                className={`slide-dot ${i === index ? "active" : ""}`}
                onClick={() => { go(i); setPaused(false); }}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="section-sep mt-20" />
    </section>
  );
}