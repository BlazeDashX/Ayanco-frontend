/* eslint-disable react/no-unescaped-entities */
"use client";

import { motion } from "framer-motion";

export default function WhyHero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-[#05070a] overflow-hidden">
      {/* Premium Background Mesh Gradient */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-900/40 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[100px]" />
      </div>

      <div className="container relative z-10 mx-auto px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-[10px] font-bold tracking-[0.3em] uppercase mb-8">
            Established Excellence
          </span>
          <h1 className="text-5xl md:text-[90px] font-bold text-white tracking-tighter leading-[0.95] mb-10">
            The Ayanco <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-200 to-white">
              Standard.
            </span>
          </h1>
          <p className="text-slate-400 text-lg md:text-2xl leading-relaxed max-w-2xl font-light">
            In global trade, reliability isn't just a goal it's a requirement. We apply a rigorous, 
            data-driven approach to sourcing and supply chain management that protects your bottom line.
          </p>
        </motion.div>
      </div>
    </section>
  );
}