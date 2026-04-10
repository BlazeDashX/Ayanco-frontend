"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Plus, Minus, ArrowRight, Search, X } from "lucide-react";
import { FAQ_DATA } from "@/data/faq";
import PageHero from "@/components/ui/PageHero";

const ALL = "All";
const CATEGORIES = [ALL, ...FAQ_DATA.map((s) => s.category)];

export default function FAQPage() {
    const [activeCategory, setActiveCategory] = useState(ALL);
    const [openIndex, setOpenIndex] = useState<string | null>(null);
    const [search, setSearch] = useState("");

    // Filter by category + search query
    const filteredSections = useMemo(() => {
        const q = search.toLowerCase().trim();
        return FAQ_DATA
            .filter((s) => activeCategory === ALL || s.category === activeCategory)
            .map((s) => ({
                ...s,
                items: s.items.filter(
                    (item) =>
                        !q ||
                        item.question.toLowerCase().includes(q) ||
                        item.answer.toLowerCase().includes(q)
                ),
            }))
            .filter((s) => s.items.length > 0);
    }, [activeCategory, search]);

    const totalVisible = filteredSections.reduce((acc, s) => acc + s.items.length, 0);

    function toggle(key: string) {
        setOpenIndex((prev) => (prev === key ? null : key));
    }

    return (
        <main className="bg-white min-h-screen selection:bg-[#C4882A]/20 selection:text-[#C4882A]">

            <PageHero
                badge="Help Center"
                title="Frequently Asked"
                highlight="Questions."
                subtitle="Everything you need to know about Ayanco's trading, sourcing, logistics, and payment processes."
                primaryCta={{ label: "Contact our trade desk", href: "/contact" }}
            />

            {/* ── STICKY FILTER BAR ── */}
            <div className="sticky top-[64px] z-30 bg-white/95 backdrop-blur-md border-b border-zinc-200">
                <div className="max-w-4xl mx-auto px-6 py-3 flex flex-col sm:flex-row items-center gap-3">

                    {/* Category pills */}
                    <div className="flex gap-1 overflow-x-auto no-scrollbar w-full sm:w-auto">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => { setActiveCategory(cat); setOpenIndex(null); }}
                                className={`relative whitespace-nowrap px-4 py-1.5 text-[10px] font-black uppercase tracking-wider transition-all duration-200 shrink-0 ${activeCategory === cat
                                        ? "text-white"
                                        : "text-zinc-500 hover:text-zinc-800"
                                    }`}
                            >
                                {activeCategory === cat && (
                                    <motion.span
                                        layoutId="faq-pill"
                                        className="absolute inset-0 bg-[#09090B]"
                                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                                    />
                                )}
                                <span className="relative">{cat}</span>
                            </button>
                        ))}
                    </div>

                    {/* Search input */}
                    <div className="relative w-full sm:w-64 shrink-0 ml-auto">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400 pointer-events-none" />
                        <input
                            type="text"
                            placeholder="Search questions…"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="h-9 w-full border border-zinc-200 bg-zinc-50 pl-9 pr-8 text-sm text-zinc-800 placeholder:text-zinc-400 outline-none focus:border-[#C4882A] focus:bg-white transition-colors"
                        />
                        <AnimatePresence>
                            {search && (
                                <motion.button
                                    initial={{ opacity: 0, scale: 0.7 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.7 }}
                                    onClick={() => setSearch("")}
                                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 transition-colors"
                                >
                                    <X size={13} />
                                </motion.button>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* ── FAQ CONTENT ── */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-6">

                    <AnimatePresence mode="popLayout">
                        {filteredSections.length > 0 ? (
                            <motion.div key="results" className="space-y-16">
                                {filteredSections.map((section, sIdx) => (
                                    <motion.div
                                        key={section.category}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.4, delay: sIdx * 0.06 }}
                                    >
                                        {/* Category header */}
                                        <div className="flex items-center gap-4 mb-8">
                                            <div className="flex items-center gap-3">
                                                <span className="w-6 h-px bg-[#C4882A]" />
                                                <p className="text-[10px] font-black text-[#C4882A] uppercase tracking-[0.25em]">
                                                    {section.category}
                                                </p>
                                            </div>
                                            <span className="text-[10px] font-bold text-zinc-300 ml-1">
                                                {section.items.length} {section.items.length === 1 ? "entry" : "entries"}
                                            </span>
                                        </div>

                                        {/* Accordion items */}
                                        <div className="divide-y divide-zinc-100 border-y border-zinc-100">
                                            {section.items.map((item, iIdx) => {
                                                const key = `${section.category}-${iIdx}`;
                                                const isOpen = openIndex === key;

                                                return (
                                                    <motion.div
                                                        key={key}
                                                        initial={{ opacity: 0, x: -8 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ duration: 0.35, delay: sIdx * 0.05 + iIdx * 0.04 }}
                                                    >
                                                        <button
                                                            onClick={() => toggle(key)}
                                                            className="group w-full flex items-center justify-between gap-6 py-5 text-left"
                                                            aria-expanded={isOpen}
                                                        >
                                                            {/* Question */}
                                                            <span className={`font-semibold text-base leading-snug transition-colors duration-200 ${isOpen ? "text-[#C4882A]" : "text-zinc-900 group-hover:text-[#C4882A]"}`}>
                                                                {/* Highlight search match */}
                                                                {search ? highlightText(item.question, search) : item.question}
                                                            </span>

                                                            {/* Icon */}
                                                            <span className={`shrink-0 w-8 h-8 flex items-center justify-center border transition-all duration-300 ${isOpen
                                                                    ? "bg-[#C4882A] border-[#C4882A] text-white rotate-0"
                                                                    : "bg-zinc-50 border-zinc-200 text-zinc-400 group-hover:border-[#C4882A] group-hover:text-[#C4882A]"
                                                                }`}>
                                                                {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                                                            </span>
                                                        </button>

                                                        {/* Animated answer */}
                                                        <AnimatePresence initial={false}>
                                                            {isOpen && (
                                                                <motion.div
                                                                    key="answer"
                                                                    initial={{ height: 0, opacity: 0 }}
                                                                    animate={{ height: "auto", opacity: 1 }}
                                                                    exit={{ height: 0, opacity: 0 }}
                                                                    transition={{ height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }, opacity: { duration: 0.25, ease: "easeOut" } }}
                                                                    className="overflow-hidden"
                                                                >
                                                                    <div className="pb-6 pr-14">
                                                                        {/* Gold left bar */}
                                                                        <div className="flex gap-4">
                                                                            <div className="w-px bg-[#C4882A]/40 shrink-0 self-stretch ml-0.5" />
                                                                            <p className="text-zinc-500 leading-relaxed text-sm md:text-base">
                                                                                {search ? highlightText(item.answer, search) : item.answer}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </motion.div>
                                                );
                                            })}
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        ) : (
                            /* Empty state */
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="text-center py-24"
                            >
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-zinc-100 mb-6">
                                    <Search size={24} className="text-zinc-400" />
                                </div>
                                <h3 className="text-xl font-black text-zinc-800 mb-2">No results found</h3>
                                <p className="text-zinc-400 text-sm mb-6">
                                    No questions match &ldquo;<span className="font-semibold text-zinc-600">{search}</span>&rdquo;
                                </p>
                                <button
                                    onClick={() => { setSearch(""); setActiveCategory(ALL); }}
                                    className="text-sm font-bold text-[#C4882A] hover:text-[#D4952E] uppercase tracking-widest transition-colors"
                                >
                                    Clear search
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Count strip */}
                    {totalVisible > 0 && (
                        <p className="text-[10px] font-bold text-zinc-300 uppercase tracking-[0.2em] mt-12 text-center">
                            Showing {totalVisible} question{totalVisible !== 1 ? "s" : ""}
                        </p>
                    )}
                </div>
            </section>

            {/* ── BOTTOM CTA ── */}
            <section className="pb-24">
                <div className="max-w-4xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.5 }}
                        className="relative border border-zinc-200 bg-zinc-50 overflow-hidden p-10 flex flex-col md:flex-row items-center justify-between gap-8"
                    >
                        {/* Grid texture */}
                        <div
                            className="absolute inset-0 opacity-[0.03] pointer-events-none"
                            style={{ backgroundImage: "repeating-linear-gradient(45deg, #09090B, #09090B 1px, transparent 1px, transparent 20px)" }}
                        />
                        <div className="relative text-center md:text-left">
                            <span className="inline-flex items-center gap-2 text-[10px] font-bold text-[#C4882A] uppercase tracking-[0.2em] mb-3">
                                <span className="w-4 h-px bg-[#C4882A]" /> Still have questions?
                            </span>
                            <h3 className="text-2xl font-black text-zinc-900 tracking-tight mb-2">Talk to our trade desk</h3>
                            <p className="text-zinc-500 text-sm max-w-sm leading-relaxed">
                                Our team responds to all inquiries within 24 hours.
                            </p>
                        </div>
                        <div className="relative flex flex-col sm:flex-row gap-3 shrink-0">
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center gap-2 h-12 px-8 bg-[#09090B] hover:bg-zinc-800 text-white font-bold transition-colors text-sm"
                            >
                                Contact Support <ArrowRight size={15} />
                            </Link>
                            <Link
                                href="/quote"
                                className="inline-flex items-center justify-center h-12 px-8 border border-zinc-200 bg-white text-zinc-600 hover:text-zinc-900 hover:border-zinc-300 font-bold transition-colors text-sm"
                            >
                                Request Quote
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

        </main>
    );
}

/* ─── Highlight matching text ───────────────────────────────── */
function highlightText(text: string, query: string) {
    if (!query.trim()) return <>{text}</>;
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
    const parts = text.split(regex);
    return (
        <>
            {parts.map((part, i) =>
                regex.test(part) ? (
                    <mark key={i} className="bg-[#C4882A]/20 text-[#C4882A] rounded-sm px-0.5 not-italic font-semibold">
                        {part}
                    </mark>
                ) : (
                    part
                )
            )}
        </>
    );
}
