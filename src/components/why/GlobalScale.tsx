"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";
import { Globe, Clock, PackageCheck, TrendingUp } from "lucide-react";

const globalStats = [
  { label: "Active Suppliers", value: 500, suffix: "+", icon: Globe, desc: "Verified global network" },
  { label: "Sourcing Regions", value: 15, suffix: "+", icon: TrendingUp, desc: "Countries & territories" },
  { label: "Support Coverage", value: 24, suffix: "/7", icon: Clock, desc: "Always online" },
  { label: "Delivery Success", value: 99.8, suffix: "%", decimals: 1, icon: PackageCheck, desc: "On-time delivery rate" },
];

export default function GlobalScale() {
  return (
    <section className="relative bg-[#09090B] border-t border-white/6">
      {/* subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 py-0">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/6">
          {globalStats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group bg-[#09090B] hover:bg-[#0D0D0F] transition-colors p-8 md:p-10 lg:p-12 flex flex-col justify-between gap-8"
              >
                {/* top row: icon + stat */}
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 border border-white/8 bg-white/4 flex items-center justify-center text-[#C4882A] group-hover:bg-[#C4882A] group-hover:text-white group-hover:border-[#C4882A] transition-all duration-300">
                    <Icon size={18} />
                  </div>
                  <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* value */}
                <div>
                  <div className="text-5xl md:text-6xl font-black text-white tabular-nums tracking-tight leading-none mb-1">
                    <CountUp
                      end={stat.value}
                      duration={2.5}
                      decimals={stat.decimals ?? 0}
                      enableScrollSpy
                      scrollSpyOnce
                    />
                    <span className="text-[#C4882A]">{stat.suffix}</span>
                  </div>
                  <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.22em] mt-3">
                    {stat.label}
                  </p>
                  <p className="text-xs text-white/20 mt-1">{stat.desc}</p>
                </div>

                {/* bottom accent line */}
                <div className="h-px w-0 bg-[#C4882A] group-hover:w-full transition-all duration-500" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}