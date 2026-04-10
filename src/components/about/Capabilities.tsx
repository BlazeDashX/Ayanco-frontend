"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { capabilities, coreCapabilitiesList } from "@/data/about";
import { CheckCircle2 } from "lucide-react";

export default function Capabilities() {
  return (
    <SectionWrapper background="gray">
      <SectionTitle
        label="What We Do"
        title="Our Capabilities"
        dark
      />

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {capabilities.map((cap, index) => (
          <AnimatedCard key={cap.title} delay={index * 0.1} hoverScale={1.02}>
            <h3 className="text-lg font-bold text-zinc-900 mb-4">{cap.title}</h3>
            <ul className="space-y-2">
              {cap.points.map((point) => (
                <li key={point} className="flex items-start gap-2 text-sm text-zinc-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C4882A] mt-2 shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          </AnimatedCard>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.5 }}
        className="border border-zinc-200 bg-white p-8"
      >
        <div className="h-0.5 w-8 bg-[#C4882A] mb-6" />
        <p className="text-zinc-900 font-bold mb-6">Core Capabilities</p>
        <ul className="grid sm:grid-cols-2 gap-4">
          {coreCapabilitiesList.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#C4882A] shrink-0 mt-0.5" />
              <span className="text-zinc-600 text-sm">{item}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </SectionWrapper>
  );
}
