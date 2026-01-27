"use client";

import CountUp from 'react-countup';
import { motion } from "framer-motion";

const stats = [
  { value: 15, label: "Years Active", suffix: "+" },
  { value: 50, label: "Countries", suffix: "+" },
  { value: 500, label: "Suppliers", suffix: "+" },
  { value: 24, label: "Support", suffix: "/7" },
];

export default function StatsStrip() {
  return (
    <section className="bg-blue-950 py-12 border-b border-white/5 relative z-30 -mt-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center group cursor-default"
            >
              <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                <CountUp end={stat.value} duration={2.5} enableScrollSpy />
                <span className="text-blue-500">{stat.suffix}</span>
              </div>
              <div className="text-blue-200/60 text-sm uppercase tracking-widest font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}