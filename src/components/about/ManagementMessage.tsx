"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { managementMessage } from "@/data/about";

export default function ManagementMessage() {
  return (
    <SectionWrapper background="gray">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6 }}
        className="border border-zinc-200 bg-white p-8 md:p-12 relative overflow-hidden"
      >
        {/* Decorative quote mark */}
        <div className="absolute top-4 right-8 text-[120px] font-serif text-[#C4882A]/5 leading-none select-none">
          &ldquo;
        </div>

        <div className="h-0.5 w-8 bg-[#C4882A] mb-8" />
        <p className="text-[10px] font-bold text-[#C4882A] uppercase tracking-[0.2em] mb-7">
          {managementMessage.label}
        </p>
        <blockquote className="text-2xl md:text-3xl font-black text-zinc-900 tracking-tight leading-tight mb-6 max-w-3xl relative z-10">
          &ldquo;{managementMessage.quote}&rdquo;
        </blockquote>
        <p className="text-zinc-500 leading-relaxed max-w-2xl text-sm mb-10">
          {managementMessage.message}
        </p>
        <div className="flex items-center justify-between border-t border-zinc-100 pt-6">
          <div>
            <p className="text-zinc-900 font-bold text-sm">
              {managementMessage.author}
            </p>
            <p className="text-zinc-500 text-xs mt-0.5">
              {managementMessage.company}
            </p>
          </div>
          <div className="w-9 h-9 border border-[#C4882A]/30 bg-[#C4882A]/10 flex items-center justify-center text-[#C4882A] font-bold text-sm">
            MD
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
