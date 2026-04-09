"use client";

import { MARQUEE_ITEMS } from "@/data/home";

export default function MarqueeTicker() {
    const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

    return (
        <div className="relative bg-[#F5F4F0] border-y border-zinc-200 overflow-hidden py-4">
            {/* Left fade */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10" style={{ background: "linear-gradient(to right, #F5F4F0, transparent)" }} />
            {/* Right fade */}
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10" style={{ background: "linear-gradient(to left, #F5F4F0, transparent)" }} />

            <div className="flex w-max animate-marquee">
                {items.map((item, i) => (
                    <div key={i} className="flex items-center gap-4 px-8 whitespace-nowrap">
                        <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-[0.2em]">{item}</span>
                        <span className="w-1 h-1 bg-[#C4882A]/70 shrink-0" />
                    </div>
                ))}
            </div>
        </div>
    );
}
