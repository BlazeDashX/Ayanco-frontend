"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Sprout, Factory, Cog, ArrowRight } from "lucide-react";
import { PORTFOLIO_CATEGORIES } from "@/data/home";

const iconMap: Record<string, React.ElementType> = { Sprout, Factory, Cog };

const categoryImages: Record<string, string> = {
  food: "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=800&q=80",
  industrial: "https://images.unsplash.com/photo-1581092335878-2d9ff86ca2bf?w=800&q=80",
  machinery: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80",
};

const categoryTags: Record<string, string[]> = {
  food: ["Grains", "Pulses", "Edible Oils"],
  industrial: ["PVC", "Chemicals", "Fertilizers"],
  machinery: ["Agriculture", "Textile", "Infrastructure"],
};

export default function Portfolios() {
  return (
    <section className="py-24 md:py-32 bg-[#F5F4F0] border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div>
            <p className="text-[10px] font-bold text-[#C4882A] uppercase tracking-[0.25em] mb-4">What We Trade</p>
            <h2 className="text-3xl md:text-5xl font-black text-zinc-900 tracking-tight leading-tight">
              Three Verticals,<br />
              <span className="text-zinc-400">One Partner.</span>
            </h2>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 h-10 px-6 border border-zinc-300 text-zinc-600 hover:text-zinc-900 hover:border-zinc-500 font-medium text-sm transition-colors shrink-0"
          >
            Browse Full Catalog <ArrowRight size={14} />
          </Link>
        </motion.div>

        {/* Cards — image-driven */}
        <div className="grid md:grid-cols-3 gap-6">
          {PORTFOLIO_CATEGORIES.map((item, i) => {
            const Icon = iconMap[item.icon] ?? Sprout;
            const tags = categoryTags[item.id] ?? [];
            const img = categoryImages[item.id] ?? "";
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative overflow-hidden border border-zinc-200 bg-white hover:shadow-xl hover:shadow-zinc-300/40 hover:-translate-y-1 transition-all duration-400"
              >
                {/* Image */}
                <div className="h-52 relative overflow-hidden">
                  <Image
                    src={img}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-white via-white/10 to-transparent" />
                  {/* Category icon overlay */}
                  <div className="absolute top-4 left-4 w-9 h-9 bg-white/90 backdrop-blur-sm border border-zinc-200 flex items-center justify-center text-[#C4882A]">
                    <Icon size={16} />
                  </div>
                </div>

                {/* Body */}
                <div className="p-7">
                  <h3 className="text-zinc-900 font-bold text-lg mb-2 tracking-tight">{item.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed mb-5">{item.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {tags.map((tag) => (
                      <span key={tag} className="text-[10px] font-bold text-zinc-500 border border-zinc-200 bg-zinc-50 px-2.5 py-1 uppercase tracking-wider">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link href="/products" className="inline-flex items-center gap-2 text-xs font-bold text-[#C4882A] hover:text-[#D4952E] transition-colors uppercase tracking-wider">
                    Explore <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}