"use client";

import { motion } from "framer-motion";
import { ArrowRight, Globe, ShieldCheck, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const services = [
  {
    icon: Globe,
    title: "Sourcing",
    tag: "Global Network",
    desc: "We identify vetted suppliers across 15+ countries, ensuring raw material quality before it even ships.",
  },
  {
    icon: ShieldCheck,
    title: "Compliance",
    tag: "ISO Certified",
    desc: "Every shipment undergoes rigorous QA checks, adhering to international trade standards and certifications.",
  },
  {
    icon: Truck,
    title: "Logistics",
    tag: "End-to-End",
    desc: "From customs clearance to last-mile delivery, we manage the entire supply chain with real-time tracking.",
  },
];

export default function ServiceParallax() {
  return (
    <section className="py-20 md:py-32 bg-[#050914] text-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
          
          {/* LEFT SIDE: Heading & Context */}
          <div className="lg:w-1/2 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* FIX 1: Reduced Mobile Font Size (text-4xl) to prevent overflow */}
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.1] mb-6">
                Streamlining <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                  Complexity.
                </span>
              </h2>
              
              <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-xl">
                We don't just move goods; we engineer supply chains. From strict compliance checks in origin countries to final-mile logistics, Ayanco safeguards your business interest.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Button asChild size="lg" className="w-full md:w-auto rounded-full px-8 h-14 bg-white text-blue-950 hover:bg-slate-200 font-bold text-base transition-transform hover:scale-105">
                <Link href="/services">
                  Explore Our Services <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* RIGHT SIDE: Service List Cards */}
          <div className="lg:w-1/2 w-full flex flex-col gap-4">
            {services.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="group p-6 md:p-8 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all cursor-default"
              >
                {/* FIX 2: Mobile Stack Layout (flex-col on mobile, flex-row on desktop) */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4 sm:gap-0">
                  
                  {/* Icon and Title */}
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-500/20 text-blue-400 rounded-lg group-hover:bg-blue-500 group-hover:text-white transition-colors">
                      <item.icon size={24} />
                    </div>
                    <h3 className="text-2xl font-bold">{item.title}</h3>
                  </div>

                  {/* Tag - Now stays separate on mobile */}
                  <span className="self-start sm:self-auto text-[10px] md:text-xs font-bold uppercase tracking-wider text-blue-300 bg-blue-500/10 px-3 py-1 rounded-full whitespace-nowrap">
                    {item.tag}
                  </span>
                </div>
                
                {/* FIX 3: Adjusted padding for description */}
                <p className="text-slate-400 text-sm md:text-base leading-relaxed sm:pl-[60px]">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}