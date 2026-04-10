"use client";

import { motion } from "framer-motion";
import { useFounderBio } from "@/hooks/useFounder";

export default function FounderAbout() {
  const { heading, paragraphs, quote } = useFounderBio();

  return (
    <section
      id="about"
      className="py-24 md:py-32 bg-[#fafaf9] scroll-mt-24 relative overflow-hidden"
    >
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[color:var(--gold)]/5 to-transparent pointer-events-none" aria-hidden="true" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section label */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[color:var(--gold)]/10 border border-[color:var(--gold)]/20 mb-4">
            <span className="w-2 h-2 rounded-full bg-[color:var(--gold)] animate-pulse" />
            <span className="text-xs font-bold tracking-[0.2em] text-[color:var(--gold)] uppercase">
              The Founder
            </span>
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-gray-900 font-bold">
            About the Founder
          </h2>
        </motion.div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-10 lg:gap-16 items-start">
          {/* Bio text — spans 3 cols */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-3 space-y-6"
          >
            <h3 className="font-display text-3xl sm:text-4xl text-gray-800 font-semibold leading-tight">
              {heading}
            </h3>
            <div className="h-1 w-20 bg-gradient-to-r from-[color:var(--gold)] to-[color:var(--gold)]/30 rounded-full" />
            {paragraphs.map((p, i) => (
              <motion.p 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="text-base sm:text-lg text-gray-600 leading-[1.8]"
              >
                {p}
              </motion.p>
            ))}
          </motion.div>

          {/* Quote card — spans 2 cols */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="sticky top-28 card-light rounded-2xl bg-gradient-to-br from-white to-[#faf8f3] p-8 border border-[color:var(--gold)]/10 shadow-xl shadow-black/5 hover:shadow-2xl hover:shadow-black/10 transition-all duration-500 group">
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[color:var(--gold)]/10 to-transparent rounded-tr-2xl" aria-hidden="true" />
              
              {/* gold quote mark */}
              <div
                className="font-display text-7xl text-[color:var(--gold)] leading-none mb-4 select-none group-hover:scale-110 transition-transform duration-300"
                aria-hidden="true"
              >
                "
              </div>
              <p className="italic text-gray-700 text-base leading-[1.9] relative z-10">
                {quote}
              </p>
              <div className="mt-6 h-px bg-gradient-to-r from-[color:var(--gold)] via-[color:var(--gold)]/50 to-transparent" />
              <div className="mt-5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[color:var(--gold)] to-[color:var(--gold-dark)] flex items-center justify-center text-white font-bold text-sm">
                  MR
                </div>
                <p className="text-xs font-bold tracking-widest text-[color:var(--gold)] uppercase">
                  Leadership Philosophy
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="section-sep-light mt-24" />
    </section>
  );
}