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
    <section className="py-32 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h4 className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-3">Our Expertise</h4>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900">Core Portfolios</h2>
          </motion.div>
          
          <motion.div
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
          >
            <Link href="/products" className="group flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors font-medium">
              View All Products 
              <span className="group-hover:translate-x-1 transition-transform"><ArrowRight size={20} /></span>
            </Link>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {portfolios.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              whileHover={{ y: -10 }}
              className="bg-white p-10 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-slate-100 group"
            >
              <div className={`h-16 w-16 rounded-2xl flex items-center justify-center text-3xl mb-8 ${item.color} group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">{item.title}</h3>
              <p className="text-slate-500 mb-8 leading-relaxed">{item.desc}</p>
              <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 w-0 group-hover:w-full transition-all duration-500 ease-out" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}