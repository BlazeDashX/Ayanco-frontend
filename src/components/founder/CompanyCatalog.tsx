"use client";

import { useCatalogLinks } from "@/hooks/useFounder";

export default function CompanyCatalog() {
  const { heading, description, pdfSrc } = useCatalogLinks();

  return (
    <section
      id="catalog"
      className="py-20 md:py-28 bg-white scroll-mt-24"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="reveal max-w-3xl mx-auto text-center" data-reveal="up">
          <p className="text-xs font-bold tracking-[.2em] text-[color:var(--gold)] uppercase mb-2">
            Resources
          </p>
          <h2 className="font-display text-3xl sm:text-4xl text-gray-900 mb-4">
            {heading}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 mb-10">{description}</p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={pdfSrc}
              download
              className="cta-gold cta-solid-gold rounded-xl px-8 py-3.5 font-bold text-sm tracking-wide inline-flex items-center gap-2"
              aria-label="Download company catalog PDF"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              Download Catalog (PDF)
            </a>

            <a
              href={pdfSrc}
              target="_blank"
              rel="noopener"
              className="cta-gold rounded-xl px-8 py-3.5 font-bold text-sm tracking-wide inline-flex items-center gap-2"
              aria-label="Open company catalog PDF in a new tab"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
              Open in New Tab
            </a>
          </div>
        </div>
      </div>
      <div className="section-sep mt-20" />
    </section>
  );
}