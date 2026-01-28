"use client";

import CountUp from 'react-countup';
import { motion } from "framer-motion";

const stats = [
  { value: 15, label: "Years of Excellence", suffix: "+" },
  { value: 50, label: "Global Partners", suffix: "+" },
  { value: 500, label: "Verified Suppliers", suffix: "+" },
  { value: 24, label: "Support Coverage", suffix: "/7" },
];

export default function StatsStrip() {
  return (
    <section className="relative z-20 border-y border-white/5 bg-[#0a0f1c] py-20 md:py-24 overflow-hidden">
      
      {/* 1. Technical Grid Background */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ 
          backgroundImage: "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)", 
          backgroundSize: "60px 60px" 
        }} 
      />
      
      {/* 2. Central Glow */}
      <div className="absolute left-1/2 top-1/2 h-full w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-900/10 blur-[120px] pointer-events-none" />

      <div className="container relative mx-auto px-6">
        <div className="grid grid-cols-2 divide-x divide-white/10 gap-y-12 md:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex flex-col items-center justify-center px-4 text-center group"
            >
              <div className="mb-2 text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl tabular-nums">
                <CountUp end={stat.value} duration={2.5} enableScrollSpy />
                <span className="text-blue-500">{stat.suffix}</span>
              </div>
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 transition-colors group-hover:text-blue-400 sm:text-xs">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}