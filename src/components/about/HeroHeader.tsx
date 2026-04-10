"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { companyInfo } from "@/data/about";

export default function HeroHeader() {
  return (
    <section className="bg-[#09090B] pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <p className="text-[10px] font-bold text-[#C4882A] uppercase tracking-[0.25em] mb-6">
            Formerly {companyInfo.formerName}
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#FAFAF9] tracking-tighter leading-tight mb-6">
            About {companyInfo.name}
          </h1>
          <p className="text-[#A8A29E] text-lg font-light leading-relaxed">
            {companyInfo.description}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
