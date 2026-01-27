"use client";

import { motion } from "framer-motion";
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const portfolios = [
  { title: "Food Essentials", desc: "Grains, pulses, and high-quality edible oils.", icon: "🌾", color: "bg-amber-100 text-amber-600" },
  { title: "Industrial Products", desc: "Raw materials and chemical compounds.", icon: "🏗️", color: "bg-slate-100 text-slate-600" },
  { title: "Machinery", desc: "Heavy equipment and specialized accessories.", icon: "⚙️", color: "bg-blue-100 text-blue-600" }
];

export default function Portfolios() {
  return (
    <section className="py-24 md:py-32 bg-slate-50">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h4 className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-3">Expertise</h4>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">Business Portfolios</h2>
          </motion.div>
          
          <Link href="/products" className="group flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors font-semibold">
            Explore All 
            <motion.span whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                <ArrowRight size={20} />
            </motion.span>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {portfolios.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white p-10 rounded-3xl shadow-sm hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-300 border border-slate-100 group"
            >
              <div className={`h-16 w-16 rounded-2xl flex items-center justify-center text-3xl mb-8 ${item.color} group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">{item.title}</h3>
              <p className="text-slate-500 mb-8 leading-relaxed text-sm sm:text-base">{item.desc}</p>
              
              <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-blue-600" 
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}