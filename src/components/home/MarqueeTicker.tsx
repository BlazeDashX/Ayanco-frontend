"use client";

import { useState, useEffect } from "react";

export default function MarqueeTicker() {
    const [tickerItems, setTickerItems] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchMarquee() {
            try {
                const res = await fetch("/api/public/home/marquee");
                const data = await res.json();
                if (Array.isArray(data)) {
                    setTickerItems(data.map((i: any) => i.text));
                }
            } catch (err) {
                console.error("Failed to fetch marquee:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchMarquee();
    }, []);

    if (!loading && tickerItems.length === 0) return null;

    const items = [...tickerItems, ...tickerItems];

    return (
        <div className="relative bg-[#F5F4F0] border-y border-zinc-200 overflow-hidden py-4">
            {/* Left fade */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10" style={{ background: "linear-gradient(to right, #F5F4F0, transparent)" }} />
            {/* Right fade */}
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10" style={{ background: "linear-gradient(to left, #F5F4F0, transparent)" }} />

            <div className="flex w-max animate-marquee">
                {items.map((item, i) => (
                    <div key={i} className="flex items-center gap-4 px-8 whitespace-nowrap">
                        <span className="font-accent text-[11px] font-bold text-zinc-500 uppercase tracking-[0.2em]">{item}</span>
                        <span className="w-1 h-1 bg-gold/70 shrink-0" />
                    </div>
                ))}
            </div>
        </div>
    );
}
