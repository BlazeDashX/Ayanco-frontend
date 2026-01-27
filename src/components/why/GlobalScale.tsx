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
    <section className="bg-[#05070a] py-16 md:py-24 border-y border-white/5">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {globalStats.map((stat, i) => (
            <motion.div 
              key={i}
              // Initial state: invisible and slightly below final position
              initial={{ opacity: 0, y: 30 }}
              // Animate state: visible and at final position when in view
              whileInView={{ opacity: 1, y: 0 }}
              // Ensures the animation only happens once per page load
              viewport={{ once: true, margin: "-100px" }}
              // Staggered delay for a premium feel
              transition={{ 
                duration: 0.8, 
                delay: i * 0.15, 
                ease: [0.21, 0.47, 0.32, 0.98] 
              }}
              className="text-center group"
            >
              <div className="text-4xl md:text-6xl font-bold text-white mb-3 tracking-tighter">
                <CountUp 
                  end={stat.value} 
                  duration={3} 
                  decimals={stat.decimals || 0}
                  enableScrollSpy 
                  scrollSpyOnce
                />
                <span className="text-blue-500">{stat.suffix}</span>
              </div>
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: (i * 0.15) + 0.5 }}
                className="text-blue-400/60 text-[10px] md:text-xs uppercase tracking-[0.4em] font-black"
              >
                {stat.label}
              </motion.div>
              
              {/* Subtle accent line animation on hover */}
              <div className="mt-4 flex justify-center">
                <div className="h-0.5 w-0 bg-blue-600 group-hover:w-12 transition-all duration-500 rounded-full" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}