"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { processSteps } from "@/data/about";

export default function ProcessFlow() {
  return (
    <SectionWrapper background="white">
      <SectionTitle
        label="How We Work"
        title="Our Process"
        subtitle="A systematic approach to global trade execution"
        centered
        dark
      />

      <div className="relative mt-12">
        {/* Connecting line - desktop */}
        <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-0.5 bg-zinc-200" />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="relative"
            >
              {/* Step number */}
              <div className="w-12 h-12 rounded-full bg-[#C4882A] text-white font-bold flex items-center justify-center mb-4 relative z-10">
                {step.step}
              </div>

              {/* Step content */}
              <h3 className="text-sm font-bold text-zinc-900 mb-2">
                {step.title}
              </h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                {step.description}
              </p>

              {/* Mobile connecting line */}
              {index < processSteps.length - 1 && (
                <div className="lg:hidden absolute top-6 left-full w-full h-0.5 bg-zinc-200 -translate-y-1/2" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
