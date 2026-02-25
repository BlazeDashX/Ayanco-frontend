"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Target, Handshake, ArrowUpRight } from "lucide-react";
import Image from "next/image";

const values = [
  {
    title: "Technical Integrity",
    icon: ShieldCheck,
    desc: "Our sourcing process is rooted in verification logic. We don't just find suppliers — we validate their entire operational ecosystems before engagement.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=700&q=80",
    tag: "Verification-First",
  },
  {
    title: "Precision Sourcing",
    icon: Target,
    desc: "Industrial requirements matched to specific manufacturer capabilities through a data-driven mapping system — never guessing, always verified.",
    image: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&w=700&q=80",
    tag: "Data-Driven",
  },
  {
    title: "Global Partnership",
    icon: Handshake,
    desc: "Building long-term B2B alliances that prioritise transparency and mutual growth — turning one-off transactions into strategic relationships.",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=700&q=80",
    tag: "Long-Term Focus",
  },
];

export default function CoreValues() {
  return (
    <section className="py-28 md:py-36 bg-white border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-6">

        {/* header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <span className="inline-flex items-center gap-2 text-[10px] font-bold text-[#C4882A] uppercase tracking-[0.28em] mb-5">
              <span className="w-5 h-px bg-[#C4882A]" /> Core Principles
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-zinc-900 tracking-tight leading-[0.95]">
              Built on professional<br />
              <span className="text-[#C4882A]">fundamentals.</span>
            </h2>
          </div>
          <p className="text-zinc-500 text-sm leading-relaxed max-w-xs md:text-right">
            Three non-negotiable commitments that shape every decision we make on behalf of our clients.
          </p>
        </div>

        {/* card row */}
        <div className="grid md:grid-cols-3 gap-6">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative bg-[#F5F4F0] border border-zinc-200 overflow-hidden hover:border-[#C4882A]/30 hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300"
              >
                {/* image */}
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={v.image}
                    alt={v.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#F5F4F0] via-transparent" />

                  {/* tag top right */}
                  <span className="absolute top-4 right-4 text-[9px] font-bold uppercase tracking-[0.2em] text-white/80 border border-white/20 bg-black/30 backdrop-blur-sm px-2.5 py-1">
                    {v.tag}
                  </span>
                </div>

                {/* body */}
                <div className="p-7">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-9 h-9 bg-[#09090B] border border-[#09090B] flex items-center justify-center text-[#C4882A] group-hover:bg-[#C4882A] group-hover:border-[#C4882A] group-hover:text-white transition-all duration-300">
                      <Icon size={16} />
                    </div>
                    <h3 className="font-black text-zinc-900 tracking-tight group-hover:text-[#C4882A] transition-colors">
                      {v.title}
                    </h3>
                  </div>
                  <p className="text-zinc-500 text-sm leading-relaxed">{v.desc}</p>
                </div>

                {/* bottom CTA hint */}
                <div className="px-7 pb-7 flex items-center gap-1.5 text-[10px] font-bold text-zinc-400 uppercase tracking-[0.18em] group-hover:text-[#C4882A] transition-colors">
                  <ArrowUpRight size={12} />
                  Learn More
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}