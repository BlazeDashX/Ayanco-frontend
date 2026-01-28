"use client";

import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";

export default function LegalStatus() {
  return (
    <section className="py-20 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55 }}
          className="rounded-3xl border border-slate-200 bg-slate-50 p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-blue-600/10 text-blue-700">
              <BadgeCheck size={24} />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl md:text-2xl font-bold text-slate-900">
                Legal Status & Registration
              </h3>
              <p className="text-slate-600 leading-relaxed max-w-2xl">
                Ayanco Trade Corporation operates as a legally registered business entity. 
                All trading activities are conducted with standard documentation and compliance practices required for international commerce.
              </p>
            </div>
          </div>

          <div className="text-slate-500 text-sm">
            (Trade license no., VAT/TIN, registration authority, etc.)
          </div>
        </motion.div>
      </div>
    </section>
  );
}
