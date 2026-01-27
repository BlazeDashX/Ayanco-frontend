"use client";

import { motion } from "framer-motion";
import CountUp from 'react-countup';

const globalStats = [
  { label: "Active Suppliers", value: 500, suffix: "+" },
  { label: "Sourcing Regions", value: 15, suffix: "+" },
  { label: "QA Checkpoints", value: 24, suffix: "/7" },
  { label: "Delivery Success", value: 99.8, suffix: "%", decimals: 1 },
];

export default function GlobalScale() {
  return (
    <section className="bg-[#05070a] py-20 border-y border-white/5">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {globalStats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center group"
            >
              <div className="text-4xl md:text-6xl font-bold text-white mb-2 tracking-tighter">
                <CountUp 
                  end={stat.value} 
                  duration={2.5} 
                  decimals={stat.decimals || 0}
                  enableScrollSpy 
                  scrollSpyOnce
                />
                <span className="text-blue-500">{stat.suffix}</span>
              </div>
              <div className="text-blue-500/60 text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold group-hover:text-blue-400 transition-colors">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}