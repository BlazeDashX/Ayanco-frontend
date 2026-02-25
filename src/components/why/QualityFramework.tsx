"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Zap, SearchCheck, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

const frameworkSteps = [
  {
    title: "Technical Verification",
    icon: SearchCheck,
    desc: "Our SQA-inspired protocols verify every SKU against international standards before it ever leaves a factory floor.",
    metric: "100%",
    metricLabel: "SKU Coverage",
  },
  {
    title: "Logistics Efficiency",
    icon: Zap,
    desc: "Proprietary route mapping ensures zero-bottleneck, cost-optimised delivery across sea, air and land corridors.",
    metric: "94.2%",
    metricLabel: "Transit Efficiency",
  },
  {
    title: "Compliance Integrity",
    icon: ShieldCheck,
    desc: "Direct legal vetting of all manufacturer certifications, LC requirements and country-specific ISO compliance.",
    metric: "99.8%",
    metricLabel: "Compliance Index",
  },
];

const metrics = [
  { label: "Compliance Index", val: "99.8%", pct: "99.8%" },
  { label: "Sourcing Precision", val: "100%", pct: "100%" },
  { label: "Transit Efficiency", val: "94.2%", pct: "94.2%" },
  { label: "Supplier Network", val: "500+", pct: "83.3%" },
];

export default function QualityFramework() {
  return (
    <section className="py-28 md:py-36 bg-[#F5F4F0] border-t border-zinc-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* ── top header spanning full width ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div>
            <span className="inline-flex items-center gap-2 text-[10px] font-bold text-[#C4882A] uppercase tracking-[0.28em] mb-5">
              <span className="w-5 h-px bg-[#C4882A]" /> Quality Framework
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-zinc-900 tracking-tight leading-[0.95]">
              A framework of<br />
              <span className="text-[#C4882A]">verification.</span>
            </h2>
          </div>
          <p className="text-zinc-500 text-sm leading-relaxed max-w-xs md:text-right font-light">
            Just as Software QA ensures code integrity, our Trade QA protocols safeguard physical assets through standardised testing and real-time validation.
          </p>
        </div>

        {/* ── 3 step cards row ── */}
        <div className="grid md:grid-cols-3 gap-px bg-zinc-200 mb-16">
          {frameworkSteps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative bg-white hover:bg-[#F5F4F0] transition-colors p-8 md:p-10 flex flex-col gap-6 overflow-hidden"
              >
                {/* step number watermark */}
                <span className="absolute top-4 right-5 text-[60px] font-black text-zinc-100 leading-none select-none">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* icon */}
                <div className="w-11 h-11 border border-zinc-200 bg-zinc-50 flex items-center justify-center text-[#C4882A] group-hover:bg-[#C4882A] group-hover:text-white group-hover:border-[#C4882A] transition-all duration-300">
                  <Icon size={18} />
                </div>

                {/* text */}
                <div>
                  <h3 className="font-black text-zinc-900 text-lg tracking-tight mb-3">{step.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{step.desc}</p>
                </div>

                {/* inline metric */}
                <div className="flex items-center gap-3 mt-auto pt-5 border-t border-zinc-100">
                  <span className="text-2xl font-black text-[#C4882A] tabular-nums">{step.metric}</span>
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">{step.metricLabel}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── bottom split: dark panel + compliance row ── */}
        <div className="grid lg:grid-cols-5 gap-6">

          {/* dark metrics panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 bg-[#09090B] p-8 md:p-10"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="h-0.5 w-8 bg-[#C4882A]" />
              <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#C4882A]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C4882A] animate-pulse" />
                System Live
              </span>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/30 mb-8">Operational Metrics</p>
            <div className="space-y-7">
              {metrics.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  className="space-y-2"
                >
                  <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest">
                    <span className="text-white/40">{item.label}</span>
                    <span className="text-white tabular-nums">{item.val}</span>
                  </div>
                  <div className="h-px w-full bg-white/8 overflow-hidden relative">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: item.pct }}
                      viewport={{ once: true }}
                      transition={{ duration: 2.2, ease: "circOut", delay: i * 0.12 }}
                      className="absolute top-0 left-0 h-px bg-[#C4882A]"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* right: ISO badges + CTA */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 flex flex-col gap-4"
          >
            <div className="flex-1 bg-white border border-zinc-200 p-8 flex flex-col justify-between gap-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-400">Certifications</p>
              <div className="space-y-3">
                {["Bangladesh Registered", "Phytosanitary Certified", "ISO-Compliant Process", "BJMC / BJRI Audited"].map((cert) => (
                  <div key={cert} className="flex items-center gap-3 text-sm font-medium text-zinc-700">
                    <CheckCircle2 size={14} className="text-[#C4882A] shrink-0" />
                    {cert}
                  </div>
                ))}
              </div>
              <Link
                href="/quote"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#C4882A] hover:gap-3 transition-all"
              >
                Start a Request <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}