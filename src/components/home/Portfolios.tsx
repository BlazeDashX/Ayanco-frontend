"use client";

import { motion } from "framer-motion";
import { ArrowRight, Factory, Sprout, Cog } from "lucide-react";
import Link from "next/link";

const portfolios = [
  {
    icon: Sprout,
    title: "Food Essentials",
    desc: "Grains, pulses, and high-quality edible oils sourced from premium growers.",
    color: "bg-yellow-100 text-yellow-700",
    href: "/products/food"
  },
  {
    icon: Factory,
    title: "Industrial Goods",
    desc: "Raw materials and chemical compounds for large-scale manufacturing.",
    color: "bg-blue-100 text-blue-700",
    href: "/products/industrial"
  },
  {
    icon: Cog,
    title: "Machinery",
    desc: "Heavy equipment and specialized accessories for infrastructure projects.",
    color: "bg-slate-200 text-slate-700",
    href: "/products/machinery"
  }
];

export default function Portfolios() {
  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-6">
        
        {/* --- HEADER FIX --- */}
        {/* Changed to flex-col on mobile so they stack, flex-row on desktop */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <span className="text-blue-600 font-bold tracking-widest text-xs md:text-sm uppercase">
              Expertise
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">
              Business Portfolios
            </h2>
          </div>
          
          {/* Link aligns left on mobile (natural flow) and right on desktop */}
          <Link 
            href="/products" 
            className="group flex items-center gap-2 text-blue-600 font-bold hover:text-blue-800 transition-colors"
          >
            Explore All <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* --- GRID --- */}
        <div className="grid md:grid-cols-3 gap-8">
          {portfolios.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group p-8 rounded-3xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 relative overflow-hidden"
            >
              <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center mb-6 text-2xl`}>
                <item.icon size={28} />
              </div>
              
              <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                {item.title}
              </h3>
              <p className="text-slate-500 leading-relaxed mb-8">
                {item.desc}
              </p>

              <div className="w-12 h-1 bg-blue-600 rounded-full group-hover:w-full transition-all duration-500" />
              
              {/* Full card link overlay */}
              <Link href={item.href} className="absolute inset-0 z-10" aria-label={`View ${item.title}`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}