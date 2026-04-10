"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { companyStory } from "@/data/about";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  show: { opacity: 1, x: 0 },
};

export default function CompanyStory() {
  return (
    <SectionWrapper background="white">
      <div className="grid lg:grid-cols-2 gap-16 items-start">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.p
            variants={itemVariants}
            className="text-[10px] font-bold text-[#C4882A] uppercase tracking-[0.25em] mb-6"
          >
            Our Story
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-black text-zinc-900 tracking-tight leading-tight mb-6"
          >
            {companyStory.headline}
          </motion.h2>
          <div className="space-y-4">
            {companyStory.paragraphs.map((paragraph, index) => (
              <motion.p
                key={index}
                variants={itemVariants}
                className="text-zinc-600 leading-relaxed"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="border-l-2 border-[#C4882A]/30 pl-8 space-y-8"
        >
          {companyStory.highlights.map((highlight, index) => (
            <div key={index} className="relative">
              <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-[#C4882A] border-4 border-white" />
              <p className="text-[#C4882A] font-bold text-sm mb-1">
                {highlight.year}
              </p>
              <p className="text-zinc-700">{highlight.event}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
