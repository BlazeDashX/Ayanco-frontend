"use client";

import { useRef, useState } from "react";
import { motion, Variants } from "framer-motion";
import { ArrowRight, Globe, MapPin, Package } from "lucide-react";
import Link from "next/link";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

interface ProductProps {
  id: string;
  category: string;
  title: string;
  description: string;
  market: string;
  specs: string;
}

export default function ProductCard({ product }: { product: ProductProps }) {
  const isGlobal = product.market.includes("Export") || product.market.includes("Global");
  const MarketIcon = isGlobal ? Globe : MapPin;

  const cat = product.category.toLowerCase();
  const isFood = cat.includes("food");
  const isMachinery = cat.includes("machinery") || cat.includes("machine");

  // Colorful industrial accents for card top banner
  const topBg = isFood
    ? "bg-amber-100"
    : isMachinery
      ? "bg-blue-100"
      : "bg-emerald-100";

  const iconColor = isFood
    ? "text-amber-500"
    : isMachinery
      ? "text-blue-500"
      : "text-emerald-500";

  const badgeTextColor = isFood ? "text-amber-700" : isMachinery ? "text-blue-700" : "text-emerald-700";

  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  }

  return (
    <motion.div variants={cardVariants} layout>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className="group relative flex h-full flex-col overflow-hidden border border-zinc-200 bg-white hover:border-gold/50 hover:shadow-xl hover:shadow-gold/8 transition-all duration-300"
      >
        {/* Glow Effect (Adapted for Light Mode) */}
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(196, 136, 42, 0.08), transparent 40%)`,
          }}
        />

        {/* Image Area */}
        <div className={`relative h-44 overflow-hidden ${topBg} z-10 border-b border-zinc-100`}>
          <div className="absolute top-3 left-3 z-20">
            <span className={`inline-flex items-center gap-1.5 font-lato bg-white/90 backdrop-blur-sm px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest ${badgeTextColor} shadow-sm rounded-sm`}>
              {product.category}
            </span>
          </div>
          <div className={`absolute inset-0 flex items-center justify-center transition-transform duration-500 group-hover:scale-105 ${iconColor} opacity-70`}>
            <Package size={64} strokeWidth={1} />
          </div>
          <div className="absolute inset-x-0 bottom-0 h-12 bg-linear-to-t from-white/80 to-transparent z-10" />
        </div>

        {/* Content */}
        <div className="flex grow flex-col p-6 z-10 bg-white">

          {/* Market badge */}
          <div className="mb-3 inline-flex w-fit items-center gap-1.5 border border-zinc-200 bg-zinc-50 rounded-sm px-2.5 py-1 font-lato text-[10px] font-bold uppercase tracking-wider text-zinc-600 shadow-xs">
            <MarketIcon size={12} className="text-zinc-500" />
            {product.market}
          </div>

          <h3 className="font-display mb-3 text-lg font-bold text-zinc-900 group-hover:text-gold transition-colors leading-tight">
            {product.title}
          </h3>

          <p className="font-lato mb-6 line-clamp-3 text-sm leading-relaxed text-zinc-600">
            {product.description}
          </p>

          {/* Footer */}
          <div className="mt-auto flex items-center justify-between border-t border-zinc-100 pt-4">
            <span className="font-lato text-xs font-bold text-zinc-400 uppercase tracking-wider">
              {product.specs}
            </span>
            <Link
              href={`/products/${product.id}`}
              className="inline-flex items-center gap-1.5 font-lato text-[11px] font-bold text-white bg-gold group-hover:bg-gold-dark px-3 py-1.5 rounded-sm uppercase tracking-wider shadow-sm transition-all"
            >
              View Details <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}