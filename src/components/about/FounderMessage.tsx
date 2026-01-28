"use client";

import { motion } from "framer-motion";

export default function FounderMessage() {
  return (
    <section className="py-20 md:py-28 bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12"
        >
          <p className="text-blue-300 font-bold tracking-widest text-xs uppercase mb-4">
            Management Message
          </p>
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight">
            “Trust is earned through consistent execution.”
          </h2>
          <p className="text-slate-300 leading-relaxed mt-5 max-w-3xl">
            At Ayanco, we believe global trade works best when processes are transparent, timelines are reliable, and quality is non-negotiable. 
            Our team is committed to disciplined sourcing and responsible execution — because your business depends on predictability.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/10 pt-6">
            <div>
              <p className="text-white font-bold">Founder / Managing Director</p>
              <p className="text-slate-400 text-sm">Ayanco Trade Corporation</p>
            </div>
            <p className="text-slate-400 text-sm">
              (  name )
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
