"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function CompanyBackground() {
  return (
    <section className="py-24 md:py-32 bg-white border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <p className="text-[10px] font-bold text-[#C4882A] uppercase tracking-[0.25em]">Company Background</p>
            <h2 className="text-3xl md:text-4xl font-black text-[#FAFAF9] tracking-tight leading-tight">
              Built from experience.<br />Rebranded for scale.
            </h2>
            <p className="text-[#78716C] leading-relaxed">
              Ayanco Trade Corporation (formerly <span className="font-semibold text-[#A8A29E]">Ayan International</span>) operates as a global sourcing and trading partner. We support industrial and agricultural supply chains with procurement, documentation, compliance, and logistics coordination.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              {[
                { title: "Global Sourcing", desc: "Verified suppliers across 15+ countries with strict compliance." },
                { title: "Trade Execution", desc: "Full documentation, compliance checks, and logistics support." },
              ].map((c) => (
                <div key={c.title} className="p-5 border border-zinc-200 hover:border-[#C4882A]/30 transition-colors">
                  <p className="text-zinc-900 font-bold text-sm mb-2">{c.title}</p>
                  <p className="text-zinc-500 text-sm leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="border border-zinc-200 bg-[#F5F4F0] p-8 md:p-10"
          >
            <div className="h-0.5 w-8 bg-[#C4882A] mb-7" />
            <p className="text-zinc-900 font-bold mb-6">Core Capabilities</p>
            <ul className="space-y-4">
              {[
                "Verified sourcing and supplier coordination",
                "Documentation & compliance support",
                "Shipment planning and end-to-end logistics",
                "Industrial & agricultural product supply",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#C4882A] shrink-0 mt-0.5" />
                  <span className="text-[#78716C] text-sm">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 pt-6 border-t border-zinc-200 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.2em]">
              <span className="text-zinc-400">Trusted Partner</span>
              <span className="text-[#C4882A]">Since 2012</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}