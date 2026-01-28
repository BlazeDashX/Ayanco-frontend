"use client";

import { motion, Variants } from "framer-motion";
import { ArrowRight, CheckCircle2, LucideIcon } from "lucide-react";

// Animation Variants
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: "easeOut" } 
  }
};

interface ServiceProps {
  icon: LucideIcon;
  title: string;
  desc: string;
  features: string[];
  color: string;
}

export default function ServiceCard({ service, index }: { service: ServiceProps, index: number }) {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.1 }}
      className="group flex flex-col md:flex-row gap-8 md:gap-12 items-start p-8 md:p-10 rounded-3xl border border-slate-200 bg-white transition-all duration-300 hover:shadow-2xl hover:shadow-slate-200/50 hover:-translate-y-1"
    >
      {/* 1. Icon Box (Rotates & Scales on Hover) */}
      <div className={`w-20 h-20 rounded-2xl flex items-center justify-center shrink-0 ${service.color} transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
        <service.icon size={36} strokeWidth={1.5} />
      </div>

      {/* 2. Main Content */}
      <div className="flex-grow space-y-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3 tracking-tight group-hover:text-blue-700 transition-colors">
            {service.title}
          </h2>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-3xl">
            {service.desc}
          </p>
        </div>

        {/* 3. Feature Tags */}
        <div className="flex flex-wrap gap-3">
          {service.features.map((feature, idx) => (
            <div 
              key={idx} 
              className="flex items-center gap-2 text-xs md:text-sm font-bold text-slate-700 bg-slate-50 px-4 py-2 rounded-lg border border-slate-100 group-hover:border-blue-100 group-hover:bg-blue-50/30 transition-colors"
            >
              <CheckCircle2 size={16} className="text-blue-600" />
              {feature}
            </div>
          ))}
        </div>
      </div>

      {/* 4. Action Arrow (Desktop Only) */}
      <div className="hidden md:flex h-full items-center justify-center pl-4 border-l border-slate-100">
        <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
          <ArrowRight size={20} />
        </div>
      </div>
    </motion.div>
  );
}