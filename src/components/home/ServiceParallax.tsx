"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";

export default function ServiceParallax() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  return (
    <section ref={ref} className="relative py-32 overflow-hidden bg-slate-900 text-white">
      {/* Abstract Background Elements */}
      <motion.div style={{ y }} className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], [100, -100]) }} className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl font-bold mb-8 leading-tight">
              Streamlining <br />
              <span className="text-blue-400">Complexity.</span>
            </h2>
            <p className="text-slate-300 text-lg mb-8 leading-relaxed">
              We don't just move goods; we engineer supply chains. From strict compliance checks in origin countries to final-mile logistics, Ayanco safeguards your business interest.
            </p>
            <Button className="bg-white text-slate-900 hover:bg-slate-100 h-12 px-8 rounded-full">
              Explore Our Services
            </Button>
          </motion.div>
          
          <div className="grid gap-6">
            {[
                { title: "Sourcing", val: "Global Network" },
                { title: "Compliance", val: "ISO Certified" },
                { title: "Logistics", val: "End-to-End" }
            ].map((item, i) => (
                <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 }}
                    className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-xl flex justify-between items-center hover:bg-white/10 transition-colors"
                >
                    <span className="text-xl font-medium">{item.title}</span>
                    <span className="text-blue-300">{item.val}</span>
                </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}