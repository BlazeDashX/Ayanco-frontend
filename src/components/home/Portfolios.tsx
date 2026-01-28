"use client";

import { motion } from "framer-motion";
import { ArrowRight, Factory, Sprout, Cog } from "lucide-react";
import Link from "next/link";

const portfolios = [
  {
    icon: Sprout,
    title: "Food Essentials",
    desc: "Grains, pulses, and high-quality edible oils sourced from premium growers.",
    color: "bg-yellow-50 text-yellow-700 border-yellow-100",
    href: "/products/food",
  },
  {
    icon: Factory,
    title: "Industrial Goods",
    desc: "Raw materials and chemical compounds for large-scale manufacturing.",
    color: "bg-blue-50 text-blue-700 border-blue-100",
    href: "/products/industrial",
  },
  {
    icon: Cog,
    title: "Machinery",
    desc: "Heavy equipment and specialized accessories for infrastructure projects.",
    color: "bg-slate-100 text-slate-700 border-slate-200",
    href: "/products/machinery",
  },
];

export default function Portfolios() {
  return (
    // FIX: Changed bg-white to bg-slate-50 for contrast
    <section className="py-24 bg-slate-50 relative z-10">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-blue-600 text-[10px] font-bold uppercase tracking-widest border border-blue-100 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
              Our Expertise
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">
              Business Portfolios
            </h2>
          </motion.div>

          <Link 
            href="/products" 
            className="hidden md:inline-flex items-center gap-2 text-blue-600 font-bold hover:text-blue-800 transition-colors group"
          >
            Explore All 
            <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {portfolios.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Link
                  href={item.href}
                  className="group relative flex flex-col h-full p-8 rounded-3xl bg-white border border-slate-200 transition-all duration-300 hover:shadow-xl hover:shadow-blue-900/5 hover:-translate-y-1 hover:border-blue-200"
                >
                  {/* Icon Box */}
                  <div className={`relative w-16 h-16 rounded-2xl ${item.color} border flex items-center justify-center mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                    <Icon size={32} strokeWidth={1.5} />
                  </div>

                  <div className="relative space-y-4 flex-grow">
                    <h3 className="text-2xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  {/* Bottom Action Area */}
                  <div className="relative mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider group-hover:text-blue-600 transition-colors">
                      View Catalog
                    </span>
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                      <ArrowRight size={18} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile Button */}
        <div className="mt-10 md:hidden">
           <Link 
             href="/products"
             className="flex items-center justify-center w-full h-14 rounded-full bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors"
           >
              Explore All Portfolios <ArrowRight size={18} className="ml-2" />
           </Link>
        </div>
      </div>
    </section>
  );
}