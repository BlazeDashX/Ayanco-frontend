"use client";

import { useEffect, useRef } from "react";
import { useCompanyStats } from "@/hooks/useFounder";

// ── icon map ──────────────────────────────────────────────────
const icons: Record<string, React.ReactNode> = {
  currency: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  ),
  users: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
    </svg>
  ),
  map: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
    </svg>
  ),
};

// ── CountUp helper (client-side only) ─────────────────────────
function useCountUp(target: number | null, ref: React.RefObject<HTMLSpanElement>) {
  useEffect(() => {
    if (target === null || !ref.current) return;

    const el = ref.current;
    let start: number | null = null;
    const duration = 2200;

    const observed = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observed.disconnect();

        const tick = (ts: number) => {
          if (!start) start = ts;
          const progress = Math.min((ts - start) / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
          el.textContent = Math.floor(ease * target).toLocaleString();
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { root: document.querySelector('main'), threshold: 0.3 }
    );

    observed.observe(el);
    return () => observed.disconnect();
  }, [target, ref]);
}

// ── StatCard ──────────────────────────────────────────────────
function StatCard({
  icon,
  value,
  suffix,
  staticText,
  label,
}: {
  icon: string;
  value: number | null;
  suffix?: string;
  staticText?: string;
  label: string;
}) {
  const numRef = useRef<HTMLSpanElement>(null!);
  useCountUp(value, numRef);

  return (
    <div className="card-premium bg-white rounded-2xl p-8 flex flex-col items-center text-center gap-4 group hover:-translate-y-1 transition-transform duration-300">
      <div className="text-(--gold) group-hover:scale-110 transition-transform duration-300">
        {icons[icon]}
      </div>
      <div className="font-display text-3xl sm:text-4xl font-bold text-gray-900">
        {value !== null ? (
          <>
            <span ref={numRef}>0</span>
            {suffix}
          </>
        ) : (
          staticText
        )}
      </div>
      <p className="text-sm text-gray-500 leading-snug">{label}</p>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────
export default function CompanyStats() {
  const stats = useCompanyStats();

  return (
    <section id="company" className="min-h-[50dvh] py-16 flex flex-col justify-center relative bg-[#f8f9fa]">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 reveal" data-reveal="up">
          <p className="text-xs font-bold tracking-[.2em] text-(--gold) uppercase mb-2">
            At a Glance
          </p>
          <h2 className="font-display text-3xl sm:text-4xl text-gray-900">
            Ayan International
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto stagger">
          {stats.map((s) => (
            <StatCard key={s.id} {...s} />
          ))}
        </div>
      </div>
      <div className="section-sep absolute bottom-0 left-0 w-full" />
    </section>
  );
}