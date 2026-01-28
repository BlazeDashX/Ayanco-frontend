"use client";

import { motion } from "framer-motion";
import { ArrowRight, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

interface ProductProps {
  id: number;
  category: string;
  title: string;
  desc: string;
  image: string;
  specs: string;
}

export default function ProductCard({ product }: { product: ProductProps }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500 flex flex-col h-full"
    >
      {/* 1. Image Area with Overlay Effect */}
      <div className="relative h-64 bg-slate-200 overflow-hidden">
        {/* Placeholder for Real Image */}
        {/* <Image src={product.image} fill className="object-cover group-hover:scale-110 transition-transform duration-700" alt={product.title} /> */}
        
        {/* Fallback Premium Graphic */}
        <div className="absolute inset-0 flex items-center justify-center text-slate-400 bg-slate-100 group-hover:bg-blue-50/50 transition-colors duration-500">
          <Package size={48} opacity={0.2} />
          <span className="ml-2 font-bold opacity-50 uppercase tracking-widest text-xs">
            {product.category}
          </span>
        </div>
        
        {/* Floating Badge */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-blue-900 uppercase tracking-widest shadow-sm z-10">
          {product.category}
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* 2. Content Area */}
      <div className="p-8 flex flex-col flex-grow relative">
        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
          {product.title}
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
          {product.desc}
        </p>
        
        {/* 3. Footer / Action Area */}
        <div className="pt-6 border-t border-slate-100 flex items-center justify-between mt-auto">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Spec: {product.specs}
          </div>
          <Button 
            asChild
            variant="ghost" 
            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-0 h-auto font-bold"
          >
            <Link href={`/quote?product=${encodeURIComponent(product.title)}`} className="flex items-center gap-2">
               Get Quote <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}