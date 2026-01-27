"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background with Zoom Effect */}
      <motion.div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070')" }}
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      />
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-900/90" />

      {/* Content */}
      <div className="container relative z-20 mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <span className="px-4 py-2 rounded-full border border-blue-400/30 bg-blue-500/10 text-blue-300 text-sm font-medium tracking-wider backdrop-blur-sm">
              PREMIER GLOBAL TRADING
            </span>
          </motion.div>

          <motion.h1 
            className="text-6xl md:text-8xl font-extrabold text-white tracking-tight leading-none"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Global Reach.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              Local Impact.
            </span>
          </motion.h1>

          <motion.p 
            className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            Bridging the gap between premium global suppliers and industrial markets. We specialize in agricultural essentials and heavy machinery.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white h-14 px-10 text-lg rounded-full shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)]">
              Explore Products
            </Button>
            <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 h-14 px-10 text-lg rounded-full bg-transparent backdrop-blur-sm">
              Our Services
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}