"use client";

import React from "react";
import { motion } from "framer-motion";
import { MessageSquare, Search, ShieldCheck, Truck, ArrowRight } from "lucide-react";
import { PROCESS_STEPS } from "@/data/home";
import Link from "next/link";

const iconMap: Record<string, React.ElementType> = { MessageSquare, Search, ShieldCheck, Truck };

export default function ProcessSteps() {
    return (
        <section className="bg-white py-24 md:py-32 border-t border-zinc-200">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    className="mb-16 max-w-2xl"
                >
                    <p className="font-cormorant text-[10px] font-bold text-[#C4882A] uppercase tracking-[0.25em] mb-4">Our Process</p>
                    <h2 className="font-display text-3xl md:text-5xl font-black text-zinc-900 tracking-tight leading-tight mb-4">
                        From Inquiry to Delivery.
                    </h2>
                    <p className="font-lato text-zinc-500 text-base leading-relaxed">
                        Four structured steps. No guesswork, no surprises.
                    </p>
                </motion.div>

                {/* Steps */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-200">
                    {PROCESS_STEPS.map((step, i) => {
                        const Icon = iconMap[step.icon] ?? MessageSquare;
                        return (
                            <motion.div
                                key={step.step}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.1 }}
                                transition={{ duration: 0.45, delay: i * 0.08 }}
                                className="group bg-white hover:bg-[#F5F4F0] transition-colors p-8"
                            >
                                <div className="flex items-start justify-between mb-7">
                                    <div className="w-10 h-10 border border-zinc-200 bg-zinc-50 flex items-center justify-center text-[#C4882A] group-hover:bg-[#C4882A] group-hover:text-white group-hover:border-[#C4882A] transition-all duration-300">
                                        <Icon size={18} />
                                    </div>
                                    <span className="text-[10px] font-bold text-zinc-300 tracking-[0.25em]">
                                        {String(step.step).padStart(2, "0")}
                                    </span>
                                </div>
                                <h3 className="font-display text-zinc-900 font-bold text-base mb-2">{step.title}</h3>
                                <p className="font-lato text-zinc-500 text-sm leading-relaxed">{step.description}</p>
                            </motion.div>
                        );
                    })}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.1 }}
                    className="flex justify-start mt-12"
                >
                    <Link
                        href="/quote"
                        className="inline-flex items-center gap-2 h-11 px-7 bg-[#C4882A] hover:bg-[#D4952E] text-white font-bold text-sm transition-colors"
                    >
                        Start Your Inquiry <ArrowRight size={15} />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
