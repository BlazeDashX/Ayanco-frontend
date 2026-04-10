"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { coreValues } from "@/data/about";

export default function CoreValues() {
  return (
    <SectionWrapper background="dark" border={true} className="!border-zinc-800">
      <SectionTitle
        label="Core Values"
        title="How we operate, every day."
      />
      <div className="grid md:grid-cols-3 gap-6">
        {coreValues.map((v, i) => (
          <motion.div
            key={v.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="group bg-[#0E0E10] border border-zinc-800 hover:border-[#C4882A]/40 hover:shadow-lg hover:shadow-[#C4882A]/10 transition-all p-8"
          >
            <motion.div
              className="w-10 h-10 border border-white/8 bg-[#C4882A]/10 flex items-center justify-center text-[#C4882A] mb-6 group-hover:animate-pulse"
            >
              <v.icon size={20} />
            </motion.div>
            <h3 className="text-lg font-bold text-[#FAFAF9] mb-3">{v.title}</h3>
            <p className="text-[#78716C] leading-relaxed text-sm">{v.desc}</p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
