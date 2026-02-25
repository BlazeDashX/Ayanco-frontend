"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AboutHero() {
  return (
    <section className="relative min-h-[80vh] flex items-center bg-[#09090B] pt-24 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1586528116493-da8c682b3b7a?auto=format&fit=crop&w=2400&q=80')" }}
      />
      <div className="absolute inset-0 bg-[#09090B]/80" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(105deg, #09090B 42%, rgba(9,9,11,0.4) 100%)" }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #09090B 0%, transparent 60%)" }} />
      <div className="absolute top-0 inset-x-0 h-px bg-[#C4882A]/50" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <p className="text-[10px] font-bold text-[#C4882A] uppercase tracking-[0.25em] mb-6">Formerly Ayan International</p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-[#FAFAF9] tracking-tighter leading-none mb-6">
            The Standard of Trust.
          </h1>
          <p className="text-[#A8A29E] text-lg font-light max-w-md leading-relaxed mb-10">
            Built on disciplined sourcing, strict compliance, and reliable delivery — connecting global suppliers with high-growth markets.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/quote" className="inline-flex items-center gap-2 h-11 px-7 bg-[#C4882A] hover:bg-[#D4952E] text-[#09090B] font-bold text-sm transition-colors">
              Request Quote <ArrowRight size={15} />
            </Link>
            <Link href="/services" className="inline-flex items-center gap-2 h-11 px-7 border border-white/12 text-[#A8A29E] hover:text-[#FAFAF9] hover:border-white/20 font-medium text-sm transition-colors">
              Explore Services
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
