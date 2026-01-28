"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function CompanyBackground() {
  return (
    <section className="bg-white py-20 md:py-28 relative z-10 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest border border-blue-100">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
              Company Background
            </span>

            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
              Built from experience.
              <br />
              <span className="text-blue-600">Rebranded for scale.</span>
            </h2>

            <p className="text-slate-600 leading-relaxed text-base md:text-lg">
              Ayanco Trade Corporation (formerly <span className="font-bold text-slate-900">Ayan International</span>) operates
              as a global sourcing and trading partner. We support industrial and
              agricultural supply chains with procurement, documentation,
              compliance, and logistics coordination.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6 transition-all duration-300 hover:border-blue-100 hover:bg-white hover:shadow-lg hover:shadow-blue-900/5">
                <p className="text-slate-900 font-bold mb-2 text-lg">Global Sourcing</p>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Verified suppliers and disciplined procurement across 15+ countries.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6 transition-all duration-300 hover:border-blue-100 hover:bg-white hover:shadow-lg hover:shadow-blue-900/5">
                <p className="text-slate-900 font-bold mb-2 text-lg">Trade Execution</p>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Full documentation, compliance checks, and logistics support.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Content (Card) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative rounded-3xl border border-slate-100 bg-white p-8 md:p-12 shadow-2xl shadow-slate-200/50"
          >
            {/* Decorative decorative blob */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-50 rounded-full blur-3xl opacity-60 pointer-events-none" />

            <p className="text-slate-900 font-bold text-xl mb-8 relative z-10">Core Capabilities</p>

            <ul className="space-y-5 relative z-10">
              {[
                "Verified sourcing and supplier coordination",
                "Documentation & compliance support",
                "Shipment planning and end-to-end logistics",
                "Industrial & agricultural product supply"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4 group">
                  <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-blue-100 transition-colors">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-slate-600 text-sm md:text-base group-hover:text-slate-900 transition-colors">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 pt-6 border-t border-slate-50 text-xs text-slate-400 font-bold uppercase tracking-wider flex items-center justify-between">
              <span>Trusted Partner</span>
              <span className="text-blue-600">Since 2012</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}