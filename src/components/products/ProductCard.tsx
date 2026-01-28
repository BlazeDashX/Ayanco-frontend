"use client";

import { motion, Variants } from "framer-motion";
import { ArrowRight, Globe, Package, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
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
  // Color coding for markets
  const isGlobal = product.market.includes("Export") || product.market.includes("Global");
  const marketColor = isGlobal ? "text-blue-600 bg-blue-50 border-blue-100" : "text-emerald-600 bg-emerald-50 border-emerald-100";
  const MarketIcon = isGlobal ? Globe : MapPin;

  return (
    <motion.div variants={cardVariants} layout>
      <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-200/50">
        
        {/* 1. Image Area (Abstract Placeholder) */}
        <div className="relative h-60 overflow-hidden bg-slate-100">
          <div className="absolute top-4 left-4 z-20">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-900 shadow-sm backdrop-blur-md">
              {product.category}
            </span>
          </div>

          {/* Animated Icon Placeholder */}
          <div className="absolute inset-0 flex items-center justify-center text-slate-300 transition-transform duration-700 group-hover:scale-110">
            <Package size={80} strokeWidth={0.8} />
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>

        {/* 2. Content Body */}
        <div className="flex flex-grow flex-col p-8">
          {/* Market Badge (Requirement III.a) */}
          <div className={`mb-4 inline-flex w-fit items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-bold uppercase tracking-wider ${marketColor}`}>
            <MarketIcon size={12} />
            {product.market}
          </div>

          <h3 className="mb-3 text-2xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
            {product.title}
          </h3>
          
          <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-slate-500">
            {product.description}
          </p>

          {/* 3. Footer Action */}
          <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-6">
            <span className="text-xs font-bold text-slate-400">
              {product.specs}
            </span>
            
            <Button 
              asChild 
              variant="ghost" 
              className="group/btn h-auto p-0 font-bold text-blue-600 hover:bg-transparent hover:text-blue-800"
            >
              <Link href={`/quote?product=${encodeURIComponent(product.title)}`} className="flex items-center gap-2">
                Request Quote 
                <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}