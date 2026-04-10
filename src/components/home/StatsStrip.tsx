"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";
import { HOME_STATS } from "@/data/home";
import { Award, Handshake, CheckCircle2, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";

// Safe icon map — avoids dynamic import issues with lucide tree-shaking
const ICON_MAP: Record<string, LucideIcon> = {
  Award,
  Handshake,
  CheckCircle2,
  TrendingUp,
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.93 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 250,
      damping: 22,
    },
  },
};

export default function StatsStrip() {
  return (
    <section className="bg-white border-b border-zinc-100">
      <motion.div
        className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-zinc-100"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {HOME_STATS.map((stat) => {
          const Icon = ICON_MAP[stat.icon] ?? Award;
          return (
            <motion.div
              key={stat.label}
              variants={cardVariants}
              className="bg-white hover:bg-stone-50 transition-colors p-8 md:p-10 flex flex-col gap-5"
            >
              <Icon size={20} className="text-gold" />
              <div>
                <div suppressHydrationWarning className="font-display text-4xl md:text-5xl font-black tracking-tight text-zinc-900 tabular-nums leading-none mb-1.5">
                  <CountUp
                    end={stat.value}
                    duration={2.5}
                    decimals={stat.decimals ?? 0}
                    enableScrollSpy
                    scrollSpyOnce
                  />
                  <span className="text-gold">{stat.suffix}</span>
                </div>
                <p className="font-lato text-xs font-semibold text-zinc-400 uppercase tracking-[0.18em]">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}