"use client";

import React from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { Award, Handshake, CheckCircle2, TrendingUp } from "lucide-react";
import { HOME_STATS } from "@/data/home";

const iconMap: Record<string, React.ElementType> = { Award, Handshake, CheckCircle2, TrendingUp };

export default function StatsStrip() {
  return (
    <section className="bg-white border-t border-zinc-200 py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-200">
          {HOME_STATS.map((stat, i) => {
            const Icon = iconMap[stat.icon] ?? Award;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="bg-white hover:bg-[#F5F4F0] transition-colors p-8 md:p-10 flex flex-col gap-5"
              >
                <Icon size={20} className="text-[#C4882A]" />
                <div>
                  <div className="text-4xl md:text-5xl font-black tracking-tight text-zinc-900 tabular-nums leading-none mb-1.5">
                    <CountUp end={stat.value} duration={2.5} decimals={stat.decimals ?? 0} enableScrollSpy scrollSpyOnce />
                    <span className="text-[#C4882A]">{stat.suffix}</span>
                  </div>
                  <p className="text-xs font-semibold text-zinc-400 uppercase tracking-[0.18em]">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}