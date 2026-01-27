"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Target, Handshake } from "lucide-react";

const values = [
  {
    title: "Technical Integrity",
    icon: <ShieldCheck className="w-8 h-8" />,
    desc: "Our sourcing process is rooted in verification logic. We don't just find suppliers; we validate their operational ecosystems.",
  },
  {
    title: "Precision Sourcing",
    icon: <Target className="w-8 h-8" />,
    desc: "Matching industrial requirements with specific manufacturer capabilities through a data-driven mapping system.",
  },
  {
    title: "Global Partnership",
    icon: <Handshake className="w-8 h-8" />,
    desc: "Building long-term B2B alliances that prioritize transparency and mutual growth in the Bangladesh market.",
  },
];

export default function CoreValues() {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">
            Built on Professional <br /> <span className="text-blue-600">Fundamentals.</span>
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((v, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="p-10 rounded-[32px] bg-slate-50 border border-slate-100 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/5 group"
            >
              <div className="mb-8 p-4 bg-white rounded-2xl w-fit shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500">
                {v.icon}
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{v.title}</h3>
              <p className="text-slate-500 leading-relaxed font-light">
                {v.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}