"use client";

import { motion } from "framer-motion";
import { missionVision } from "@/data/about";

export default function MissionVision() {
  const items = [missionVision.mission, missionVision.vision];

  return (
    <section className="py-20 bg-[#F5F4F0] border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-px bg-zinc-200">
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-white p-10 md:p-12 hover:bg-[#FAFAF8] transition-colors"
            >
              <p className="text-[10px] font-bold text-[#C4882A] uppercase tracking-[0.2em] mb-6">{item.label}</p>
              <h3 className="text-2xl md:text-3xl font-black text-zinc-900 tracking-tight mb-4 leading-tight">{item.heading}</h3>
              <p className="text-zinc-500 leading-relaxed text-sm">{item.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
