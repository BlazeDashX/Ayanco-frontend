"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { Award, Handshake, CheckCircle2, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PREMIUM_EASE, BLUR_REVEAL } from "@/lib/animations";

interface Stat {
  label: string;
  value: number;
  suffix: string;
  icon: string;
  decimals?: number;
}

const ICON_MAP: Record<string, LucideIcon> = {
  Award,
  Handshake,
  CheckCircle2,
  TrendingUp,
};

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

export default function StatsStrip() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/public/home/stats");
        const data = await res.json();
        if (Array.isArray(data)) {
          setStats(data);
        }
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (!loading && stats.length === 0) return null;

  return (
    <section className="bg-white border-b border-zinc-100 min-h-[140px]">
      <motion.div
        className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-zinc-100"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {stats.map((stat, i) => {
          const Icon = ICON_MAP[stat.icon] ?? Award;
          return (
            <motion.div
              key={stat.label}
              variants={BLUR_REVEAL}
              custom={i}
              className="bg-white hover:bg-zinc-50 transition-colors p-6 md:p-8 flex flex-col gap-4"
            >
              <Icon size={18} className="text-gold" />
              <div>
                <div suppressHydrationWarning className="font-display text-3xl md:text-3xl lg:text-4xl font-black tracking-tight text-zinc-900 tabular-nums leading-none mb-1">
                  <CountUp
                    end={stat.value}
                    duration={2.8}
                    decimals={stat.decimals ?? 0}
                    enableScrollSpy
                    scrollSpyOnce
                    easingFn={(t, b, c, d) => {
                        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
                    }}
                  />
                  <span className="text-gold">{stat.suffix}</span>
                </div>
                <p className="font-accent text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">
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