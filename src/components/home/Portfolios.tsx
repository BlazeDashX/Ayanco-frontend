"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sprout, Factory, Cog, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { BLUR_REVEAL, SPRING_MED } from "@/lib/animations";

const iconMap: Record<string, React.ElementType> = { Sprout, Factory, Cog };

export default function Portfolios() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPortfolios() {
      try {
        const res = await fetch("/api/public/home/portfolios");
        const data = await res.json();
        if (Array.isArray(data)) {
          setCategories(data);
        }
      } catch (err) {
        console.error("Failed to fetch portfolios:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPortfolios();
  }, []);

  if (!loading && categories.length === 0) return null;

  return (
    <section className="py-12 md:py-16 bg-[#F5F4F0] border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
           variants={BLUR_REVEAL}
           initial="hidden"
           whileInView="show"
           viewport={{ once: true, amount: 0.1 }}
           className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
        >
          <div>
            <p className="font-accent text-[10px] font-bold text-gold uppercase tracking-[0.25em] mb-4">What We Trade</p>
            <h2 className="font-display text-3xl md:text-3xl lg:text-4xl font-black text-zinc-900 tracking-tight leading-tight">
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
          {categories.map((item, i) => {
            const Icon = iconMap[item.icon] ?? Sprout;
            return (
              <motion.div
                key={item.title}
                variants={BLUR_REVEAL}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.05 }}
                whileHover={{ 
                  y: -5, 
                  transition: SPRING_MED 
                }}
                className="group relative overflow-hidden border border-zinc-200 bg-white shadow-sm"
              >
                {/* Image */}
                <div className="h-40 relative overflow-hidden">
                  <Image
                    src={item.image_url}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-white via-white/10 to-transparent" />
                  {/* Category icon overlay */}
                  <div className="absolute top-4 left-4 w-9 h-9 bg-white/90 backdrop-blur-sm border border-zinc-200 flex items-center justify-center text-gold">
                    <Icon size={16} />
                  </div>
                </div>

                {/* Body */}
                <div className="p-5">
                  <h3 className="font-display text-zinc-900 font-bold text-base mb-1.5 tracking-tight">{item.title}</h3>
                  <p className="font-sans text-zinc-500 text-xs leading-relaxed mb-3">{item.description}</p>
                  
                  <Link href="/products" className="inline-flex items-center gap-2 font-accent text-[10px] font-bold text-gold hover:text-gold-dark transition-colors uppercase tracking-[0.15em]">
                    Explore <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
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
