"use client";

import { motion } from "framer-motion";

export default function FounderMessage() {
  return (
    <section className="py-24 bg-[#F5F4F0] border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="border border-zinc-200 bg-white p-8 md:p-12"
        >
          <div className="h-0.5 w-8 bg-[#C4882A] mb-8" />
          <p className="text-[10px] font-bold text-[#C4882A] uppercase tracking-[0.2em] mb-7">Management Message</p>
          <blockquote className="text-2xl md:text-4xl font-black text-zinc-900 tracking-tight leading-tight mb-6 max-w-3xl">
            &ldquo;Trust is earned through consistent execution.&rdquo;
          </blockquote>
          <p className="text-zinc-500 leading-relaxed max-w-2xl text-sm mb-10">
            At Ayanco, we believe global trade works best when processes are transparent, timelines are reliable, and quality is non-negotiable. Our team is committed to disciplined sourcing and responsible execution — because your business depends on predictability.
          </p>
          <div className="flex items-center justify-between border-t border-zinc-100 pt-6">
            <div>
              <p className="text-[#FAFAF9] font-bold text-sm">Founder / Managing Director</p>
              <p className="text-[#57534E] text-xs mt-0.5">Ayanco Trade Corporation</p>
            </div>
            <div className="w-9 h-9 border border-[#C4882A]/30 bg-[#C4882A]/8 flex items-center justify-center text-[#C4882A] font-bold text-sm">
              MD
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
