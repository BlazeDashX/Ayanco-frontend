"use client";

import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";

export default function LegalStatus() {
  return (
    <section className="py-16 bg-white border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
          className="border border-[#C4882A]/20 bg-[#F5F4F0] p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-8"
        >
          <div className="flex items-start gap-5">
            <div className="w-10 h-10 border border-[#C4882A]/20 bg-[#C4882A]/10 flex items-center justify-center text-[#C4882A] shrink-0">
              <BadgeCheck size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#FAFAF9] mb-2">Legal Status & Registration</h3>
              <p className="text-[#78716C] text-sm leading-relaxed max-w-xl">
                Ayanco Trade Corporation operates as a legally registered business entity. All trading activities are conducted with standard documentation and compliance practices for international commerce.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2 text-sm shrink-0">
            {[
              { label: "Registered in", value: "Bangladesh" },
              { label: "Licensed by", value: "RJSC" },
              { label: "Tax Status", value: "VAT & TIN Registered/NBR" },
            ].map((item) => (
              <div key={item.label} className="flex gap-2 text-[#78716C]">
                <span className="text-[#57534E]">{item.label}:</span>
                <span className="text-[#A8A29E] font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
