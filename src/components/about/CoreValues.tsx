"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Handshake, Eye } from "lucide-react";

const values = [
  { icon: Handshake, title: "Integrity", desc: "We act with honesty and accountability. We protect long-term trust over short-term gain." },
  { icon: ShieldCheck, title: "Reliability", desc: "We deliver what we promise. Our execution is consistent, measurable, and dependable." },
  { icon: Eye, title: "Transparency", desc: "Clear communication, clear documentation. We reduce uncertainty at every step." },
];

export default function CoreValues() {
  return (
    <section className="py-24 bg-white border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <p className="text-[10px] font-bold text-[#C4882A] uppercase tracking-[0.25em] mb-4">Core Values</p>
          <h2 className="text-3xl md:text-4xl font-black text-zinc-900 tracking-tight">How we operate, every day.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-px bg-zinc-200">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="bg-[#09090B] hover:bg-[#0E0E10] transition-colors p-8 md:p-10"
            >
              <div className="w-10 h-10 border border-white/8 bg-[#C4882A]/8 flex items-center justify-center text-[#C4882A] mb-7">
                <v.icon size={20} />
              </div>
              <h3 className="text-lg font-bold text-[#FAFAF9] mb-3">{v.title}</h3>
              <p className="text-[#78716C] leading-relaxed text-sm">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
