"use client";

import { motion } from "framer-motion";

export default function MissionVision() {
  return (
    <section className="relative py-20 md:py-28 bg-slate-950 text-white overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_50%_20%,rgba(59,130,246,0.16),transparent_60%)]" />
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-10"
          >
            <p className="text-blue-300 font-bold tracking-widest text-xs uppercase mb-3">
              Mission
            </p>
            <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Deliver reliable sourcing and trade execution.
            </h3>
            <p className="text-slate-300 leading-relaxed mt-4">
              We simplify global trade through quality control, compliance, and predictable logistics — so clients operate with confidence.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-10"
          >
            <p className="text-blue-300 font-bold tracking-widest text-xs uppercase mb-3">
              Vision
            </p>
            <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Become the most trusted trade partner in the region.
            </h3>
            <p className="text-slate-300 leading-relaxed mt-4">
              We aim to set a standard for transparency and operational excellence across sourcing, trading, and logistics.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
