/* eslint-disable react/no-unescaped-entities */
"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Zap, SearchCheck } from "lucide-react";

const frameworkSteps = [
  { title: "Technical Verification", icon: <SearchCheck />, desc: "Our SQA-inspired protocols verify every SKU against international standards." },
  { title: "Logistics Latency Control", icon: <Zap />, desc: "Proprietary route mapping to ensure zero-bottleneck delivery to Bangladesh." },
  { title: "Compliance Integrity", icon: <ShieldCheck />, desc: "Direct legal vetting of all manufacturer certifications and ISO standards." }
];

export default function QualityFramework() {
  return (
    <section className="py-24 md:py-40 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-10">
            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight leading-tight">
              A Framework of <br />
              <span className="text-blue-600">Verification.</span>
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed font-light">
              Just as Software Quality Assurance ensures code integrity, our "Trade QA" 
              protocols safeguard physical assets. We eliminate variables through 
              standardized testing and real-time validation.
            </p>
            
            <div className="space-y-6 pt-4">
              {frameworkSteps.map((step, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-6 p-6 rounded-2xl bg-slate-50 border border-slate-100 group hover:bg-white hover:shadow-2xl hover:shadow-blue-500/5 transition-all"
                >
                  <div className="p-4 bg-white rounded-xl shadow-sm text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500">
                    {step.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xl">{step.title}</h4>
                    <p className="text-slate-500 text-sm">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Premium Tech Panel Visualization */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative p-1 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-[40px] shadow-2xl"
          >
            <div className="bg-[#0a0f1c] rounded-[39px] p-8 md:p-12 space-y-10 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full" />
              <div className="flex justify-between items-center border-b border-white/10 pb-6">
                <span className="text-blue-400 font-mono text-xs tracking-widest">SYSTEM_STATUS: SECURE</span>
                <div className="flex gap-1.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse delay-75" />
                </div>
              </div>
              
              {[
                { label: "Compliance Index", val: "99.8%", color: "bg-blue-500" },
                { label: "Sourcing Precision", val: "100%", color: "bg-cyan-500" },
                { label: "Transit Efficiency", val: "94.2%", color: "bg-indigo-500" }
              ].map((item, i) => (
                <div key={i} className="space-y-4">
                  <div className="flex justify-between text-xs uppercase tracking-widest font-bold">
                    <span className="text-slate-500">{item.label}</span>
                    <span className="text-white">{item.val}</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: item.val }}
                      transition={{ duration: 2, ease: "circOut" }}
                      className={`h-full ${item.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}