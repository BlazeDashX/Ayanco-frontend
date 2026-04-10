"use client";

import { useMilestones } from "@/hooks/useFounder";

export default function FounderMilestones() {
  const milestones = useMilestones();

  return (
    <section className="py-24 md:py-32 bg-[#fafaf9] scroll-mt-24 relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-[color:var(--gold)]/5 to-transparent pointer-events-none" aria-hidden="true" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-16 reveal" data-reveal="up">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[color:var(--gold)]/10 border border-[color:var(--gold)]/20 mb-4">
            <span className="w-2 h-2 rounded-full bg-[color:var(--gold)] animate-pulse" />
            <span className="text-xs font-bold tracking-[0.2em] text-[color:var(--gold)] uppercase">
              The Journey
            </span>
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-gray-900 font-bold">
            Key Milestones
          </h2>
        </div>

        <div className="max-w-3xl mx-auto pl-4">
          <div className="space-y-12">
            {milestones.map((m, i) => (
              <div
                key={i}
                className="timeline-item reveal group"
                data-reveal="up"
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="timeline-dot"></div>

                <div className="mb-3">
                  <span className="inline-block px-3 py-1 bg-white border border-[color:var(--gold)]/20 shadow-sm text-[color:var(--gold-dark)] font-bold text-sm tracking-widest rounded-full group-hover:bg-[color:var(--gold)] group-hover:text-white transition-colors duration-300">
                    {m.year}
                  </span>
                </div>
                <h3 className="text-2xl font-bold font-display text-gray-900 mb-2 group-hover:text-[color:var(--gold)] transition-colors duration-300">
                  {m.title}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {m.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="section-sep-light mt-24" />
    </section>
  );
}
