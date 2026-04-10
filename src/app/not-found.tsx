import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Page Not Found | Ayanco Trade Corporation",
  description: "The page you are looking for doesn't exist or has been moved.",
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-zinc-950 flex items-center justify-center relative overflow-hidden">
      {/* Gold accent top bar */}
      <div className="absolute top-0 inset-x-0 h-px bg-gold/60" />

      {/* Ambient radial glow — brand gold */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(700px circle at 50% 40%, rgba(196,136,42,0.08), transparent 60%)",
        }}
      />

      <div className="relative z-10 text-center px-6 max-w-xl">
        {/* Error badge */}
        <p className="font-accent text-[11px] font-bold text-gold uppercase tracking-[0.3em] mb-6">
          Error 404
        </p>

        {/* Headline */}
        <h1 className="font-display text-8xl md:text-9xl font-black text-zinc-50 tracking-tight leading-none mb-6">
          404
        </h1>

        {/* Subheadline */}
        <h2 className="font-display text-2xl md:text-3xl font-black text-zinc-50 tracking-tight mb-4">
          Page Not Found
        </h2>

        <p className="text-stone-400 leading-relaxed mb-10 max-w-sm mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Head back to start your trade journey.
        </p>

        {/* CTAs — sharp rectangles matching site design language */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 h-11 px-7
              bg-gold hover:bg-gold-dark text-zinc-950 font-bold text-sm
              transition-colors"
          >
            Go Home <ArrowRight size={15} />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center h-11 px-7
              border border-white/12 text-stone-400
              hover:text-zinc-50 hover:border-white/20
              font-medium text-sm transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </main>
  );
}
