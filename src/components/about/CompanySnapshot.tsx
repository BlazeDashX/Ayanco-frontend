"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { companySnapshot } from "@/data/about";

export default function CompanySnapshot() {
  return (
    <SectionWrapper background="gray">
      <SectionTitle
        label="Company Snapshot"
        title="Quick Facts"
        dark
      />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {companySnapshot.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-white border border-zinc-200 p-6 hover:border-[#C4882A]/30 transition-colors"
          >
            <p className="text-[10px] font-bold text-[#C4882A] uppercase tracking-[0.2em] mb-2">
              {item.label}
            </p>
            <p className="text-zinc-900 font-bold text-lg">{item.value}</p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
