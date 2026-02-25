"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award } from "lucide-react";

export default function WhyHero() {
  return (
    <section className="relative min-h-[90vh] flex items-end bg-[#09090B] pt-24 overflow-hidden">
      {/* Full-bleed background image */}
      <Image
        src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=2400&q=80"
        alt="Ayanco trade operations"
        fill
        priority
        className="object-cover opacity-20"
      />

      {/* Gradient layers */}
      <div className="absolute inset-0 bg-linear-to-br from-[#09090B]/95 via-[#09090B]/60 to-transparent" />
      <div className="absolute inset-0 bg-linear-to-t from-[#09090B] via-[#09090B]/20 to-transparent" />
      <div className="absolute top-0 inset-x-0 h-px bg-[#C4882A]/60 z-10" />

      {/* Diagonal brass stripe accent */}
      <div
        className="absolute right-0 top-0 w-[40%] h-full opacity-5 hidden lg:block"
        style={{
          background: "repeating-linear-gradient(-55deg, #C4882A, #C4882A 1px, transparent 1px, transparent 40px)",
        }}
      />

      {/* Award badge top-right */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute top-32 right-10 hidden lg:flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 px-5 py-3"
      >
        <Award size={18} className="text-[#C4882A]" />
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
          Established 2012
        </span>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-24 md:pb-32 w-full">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <span className="inline-flex items-center gap-2 text-[10px] font-bold text-[#C4882A] uppercase tracking-[0.28em] mb-7">
            <span className="w-6 h-px bg-[#C4882A]" />
            Established Excellence
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[0.92] mb-8">
            The Ayanco<br />
            <span className="text-[#C4882A]">Standard.</span>
          </h1>
          <p className="text-white/50 text-lg leading-relaxed mb-10 max-w-lg font-light">
            In global trade, reliability isn&apos;t just a goal — it&apos;s a requirement. We apply a rigorous, data-driven approach to sourcing and supply chain management that protects your bottom line.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/quote"
              className="inline-flex items-center gap-2 h-12 px-8 bg-[#C4882A] hover:bg-[#D4952E] text-white font-bold text-sm transition-colors"
            >
              Request a Quote <ArrowRight size={15} />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 h-12 px-8 border border-white/20 text-white/70 hover:text-white hover:border-white/40 font-medium text-sm transition-colors"
            >
              Our Services
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}