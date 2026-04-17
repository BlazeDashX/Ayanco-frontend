"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useGalleryItems } from "@/hooks/useFounder";

export default function AwardsGallery() {
  const items = useGalleryItems();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const open = (i: number) => setLightboxIndex(i);
  const close = () => setLightboxIndex(null);
  const next = () =>
    setLightboxIndex((i) => ((i ?? 0) + 1) % items.length);
  const prev = () =>
    setLightboxIndex((i) => (((i ?? 0) - 1) + items.length) % items.length);

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  });

  // Focus trap on open
  useEffect(() => {
    if (lightboxIndex !== null) closeRef.current?.focus();
  }, [lightboxIndex]);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightboxIndex]);

  const active = lightboxIndex !== null ? items[lightboxIndex] : null;

  return (
    <section id="gallery" className="min-h-dvh py-20 md:py-28 flex flex-col justify-center bg-[#f8f9fa] relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 reveal" data-reveal="up">
          <p className="text-xs font-bold tracking-[.2em] text-(--gold) uppercase mb-2">
            Recognition
          </p>
          <h2 className="font-display text-3xl sm:text-4xl text-gray-900">
            Awards & Recognition
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto stagger">
          {items.map((item, i) => (
            <div
              key={item.id}
              className="gallery-item card-premium bg-white rounded-2xl overflow-hidden group cursor-pointer reveal"
              data-reveal="up"
            >
              <button
                className="block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-(--gold)"
                onClick={() => open(i)}
                aria-label={`View: ${item.title}`}
              >
                <div className="relative overflow-hidden h-60">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="gallery-img object-cover"
                    loading="lazy"
                    sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg className="w-10 h-10 text-white drop-shadow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM10.5 7.5v6m3-3h-6" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-base text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-500 mt-0.5">{item.subtitle}</p>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ── Lightbox ── */}
      {active && (
        <div
          className="lightbox-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          onClick={(e) => e.target === e.currentTarget && close()}
        >
          <div className="bg-white rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl">
            {/* Image */}
            <div className="relative w-full bg-black flex-1 min-h-0" style={{ minHeight: "50vh" }}>
              <Image
                src={active.fullSrc}
                alt={active.alt}
                fill
                className="object-contain"
                loading="eager"
                sizes="(max-width:1024px) 100vw, 900px"
              />
            </div>

            {/* Caption bar */}
            <div className="flex items-center justify-between gap-4 px-5 py-4 border-t">
              <p className="text-sm text-gray-700">{active.caption}</p>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={prev}
                  className="w-9 h-9 grid place-items-center rounded-lg hover:bg-gray-100 transition text-gray-700"
                  aria-label="Previous"
                >
                  ‹
                </button>
                <button
                  onClick={next}
                  className="w-9 h-9 grid place-items-center rounded-lg hover:bg-gray-100 transition text-gray-700"
                  aria-label="Next"
                >
                  ›
                </button>
                <button
                  ref={closeRef}
                  onClick={close}
                  className="w-9 h-9 grid place-items-center rounded-lg hover:bg-gray-100 transition text-gray-700"
                  aria-label="Close (Esc)"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="section-sep-light absolute bottom-0 left-0 w-full" />
    </section>
  );
}