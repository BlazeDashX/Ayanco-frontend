"use client";

import { useAffiliations } from "@/hooks/useFounder";

const iconPaths: Record<string, React.ReactNode> = {
  sitemap: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
    </svg>
  ),
  university: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
    </svg>
  ),
  heart: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
    </svg>
  ),
};

export default function FounderAffiliations() {
  const affiliations = useAffiliations();

  return (
    <section
      id="affiliations"
      className="min-h-dvh py-20 md:py-28 flex flex-col justify-center bg-white relative overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 reveal" data-reveal="up">
          <p className="text-xs font-bold tracking-[.2em] text-(--gold) uppercase mb-2">
            Leadership
          </p>
          <h2 className="font-display text-3xl sm:text-4xl text-gray-900">
            Board Memberships & Affiliations
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {affiliations.map((a, i) => (
            <div
              key={i}
              className="card-premium bg-gray-50 rounded-2xl p-6 flex items-center gap-6 hover:-translate-y-0.5 hover:shadow-md transition-all duration-300 reveal"
              data-reveal="up"
            >
              <div className="shrink-0 text-(--gold)">
                {iconPaths[a.icon]}
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-800">{a.role}</h3>
                <p className="text-gray-500 text-sm mt-0.5">{a.organization}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="section-sep absolute bottom-0 left-0 w-full" />
    </section>
  );
}