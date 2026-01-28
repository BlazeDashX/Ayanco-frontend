"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Handshake, Eye } from "lucide-react";

const values = [
  {
    icon: Handshake,
    title: "Integrity",
    desc: "We act with honesty and accountability — even when it’s difficult. We protect long-term trust over short-term gain.",
  },
  {
    icon: ShieldCheck,
    title: "Reliability",
    desc: "We deliver what we promise. From sourcing to shipping, our execution is consistent, measurable, and dependable.",
  },
  {
    icon: Eye,
    title: "Transparency",
    desc: "Clear communication, clear documentation. We keep clients informed and reduce uncertainty at every step.",
  },
];

export default function CoreValues() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between gap-6 mb-10">
          <div className="space-y-3">
            <p className="text-blue-600 font-bold tracking-widest text-xs uppercase">
              Core Values
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              How we operate, every day.
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.55, delay: i * 0.07 }}
              className="rounded-3xl border border-slate-200 bg-slate-50 p-8 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all"
            >
              <div className="p-3 rounded-2xl bg-blue-600/10 text-blue-700 w-fit">
                <v.icon size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mt-5">
                {v.title}
              </h3>
              <p className="text-slate-600 leading-relaxed mt-3">
                {v.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
