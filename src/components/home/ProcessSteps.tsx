"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Search, ShieldCheck, Truck, ArrowRight } from "lucide-react";
import Link from "next/link";
import { BLUR_REVEAL } from "@/lib/animations";

const iconMap: Record<string, React.ElementType> = { MessageSquare, Search, ShieldCheck, Truck };

const containerVariants = {
    hidden: {},
    show: {
        transition: { staggerChildren: 0.1 },
    },
};

export default function ProcessSteps() {
  const [steps, setSteps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProcess() {
      try {
        const res = await fetch("/api/public/home/process");
        const data = await res.json();
        if (Array.isArray(data)) {
          setSteps(data);
        }
      } catch (err) {
        console.error("Failed to fetch process:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProcess();
  }, []);

  if (!loading && steps.length === 0) return null;
    return (
        <section className="bg-white py-12 md:py-16 border-t border-zinc-200">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <motion.div
                    variants={BLUR_REVEAL}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.1 }}
                    className="mb-10 max-w-2xl"
                >
                    <p className="font-accent text-[10px] font-bold text-gold uppercase tracking-[0.25em] mb-4">Our Process</p>
                    <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-black text-zinc-900 tracking-tight leading-tight mb-4">
                        From Inquiry to Delivery.
                    </h2>
                    <p className="font-lato text-zinc-500 text-base leading-relaxed">
                        Four structured steps. No guesswork, no surprises.
                    </p>
                </motion.div>

                {/* Steps */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-200"
                >
                    {steps.map((step, i) => {
                        const Icon = iconMap[step.icon] ?? MessageSquare;
                        return (
                            <motion.div
                                key={step.id || step.step}
                                variants={BLUR_REVEAL}
                                custom={i}
                                className="group bg-white hover:bg-zinc-50 transition-colors p-5"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-8 h-8 border border-zinc-200 bg-zinc-50 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-white group-hover:border-gold transition-all duration-300">
                                        <Icon size={14} />
                                    </div>
                                    <span className="font-accent text-[10px] font-bold text-zinc-300 tracking-[0.25em]">
                                        {String(step.step).padStart(2, "0")}
                                    </span>
                                </div>
                                <h3 className="font-display text-zinc-900 font-bold text-sm mb-1.5">{step.title}</h3>
                                <p className="font-sans text-zinc-500 text-xs leading-relaxed">{step.description}</p>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ delay: 0.6 }}
                    className="flex justify-start mt-12"
                >
                    <motion.div whileTap={{ scale: 0.96 }} whileHover={{ scale: 1.02 }}>
                        <Link
                            href="/quote"
                            className="inline-flex items-center gap-2 h-11 px-7 bg-gold hover:bg-gold-dark text-white font-bold text-sm transition-colors"
                        >
                            Start Your Inquiry <ArrowRight size={15} />
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
