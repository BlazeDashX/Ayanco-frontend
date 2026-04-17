"use client";

import { SITE } from "@/data/site";
import { motion } from "framer-motion";
import { ShieldCheck, Globe, Clock, Award } from "lucide-react";

const TRUST_ITEMS = [
  {
    icon: ShieldCheck,
    label: "ISO 9001:2015",
    sublabel: "Quality Certified",
  },
  {
    icon: Award,
    label: "RJSC Registered",
    sublabel: "Bangladesh Govt.",
  },
  {
    icon: Globe,
    label: "47+ Countries",
    sublabel: "Active Trade Routes",
  },
  {
    icon: Clock,
    label: `Since ${SITE.foundedYear}`,
    sublabel: "Trade Legacy",
  },
] as const;

export default function TrustStrip() {
  return (
    <section className="bg-zinc-950 border-t border-white/6 py-12 sm:py-14">
      {/* Gold gradient accent */}
      <div className="h-px bg-linear-to-r from-transparent via-gold/50 to-transparent mb-12" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Label */}
        <p className="font-accent text-[10px] font-bold text-gold uppercase tracking-[0.3em] text-center mb-10">
          Credentials &amp; Compliance
        </p>

        {/* Trust items grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/6">
          {TRUST_ITEMS.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="bg-zinc-950 p-8 flex flex-col items-center text-center gap-4 hover:bg-white/4 transition-colors group"
              >
                <div className="w-12 h-12 border border-gold/20 bg-gold/8 group-hover:border-gold/40 group-hover:bg-gold/12 flex items-center justify-center transition-all duration-300">
                  <Icon size={20} className="text-gold" />
                </div>
                <div>
                  <p className="font-display text-zinc-50 font-black text-lg tracking-tight leading-tight">
                    {item.label}
                  </p>
                  <p className="text-stone-500 text-xs mt-1 font-medium">
                    {item.sublabel}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom certifications ticker */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
          {SITE.certifications.map((cert) => (
            <span
              key={cert}
              className="font-accent text-[11px] text-stone-500 uppercase tracking-[0.15em] flex items-center gap-2"
            >
              <span className="w-1 h-1 bg-gold/50 shrink-0" />
              {cert}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
