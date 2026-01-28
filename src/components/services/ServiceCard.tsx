"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, LucideIcon } from "lucide-react";

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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group flex flex-col md:flex-row gap-8 md:gap-16 items-start p-8 md:p-12 rounded-3xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300"
    >
      {/* Icon Box with Hover Animation */}
      <div className={`w-20 h-20 rounded-2xl flex items-center justify-center shrink-0 ${service.color} group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
        <service.icon size={40} />
      </div>

      {/* Content */}
      <div className="flex-grow">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 tracking-tight">
          {service.title}
        </h2>
        <p className="text-slate-600 text-lg leading-relaxed mb-8 max-w-2xl">
          {service.desc}
        </p>

        {/* Feature Tags */}
        <div className="grid sm:grid-cols-3 gap-3">
          {service.features.map((feature, idx) => (
            <div 
              key={idx} 
              className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-white px-3 py-2 rounded-lg border border-slate-200 shadow-sm group-hover:border-blue-200 transition-colors"
            >
              <CheckCircle2 size={14} className="text-blue-500" />
              {feature}
            </div>
          ))}
        </div>
      </div>

      {/* Action Arrow (Hidden on Mobile) */}
      <div className="hidden md:flex h-full items-center justify-center">
        <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-300 group-hover:border-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
          <ArrowRight size={20} />
        </div>
      </div>
    </motion.div>
  );
}