"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, Clock, ArrowRight, ExternalLink, Building2 } from "lucide-react";
import { SITE } from "@/data/site";
import { motion } from "framer-motion";

const contactMethods = [
    { icon: Mail, label: "Trade Inquiries", value: SITE.contact.email, href: `mailto:${SITE.contact.email}` },
    { icon: Phone, label: "Direct Line", value: SITE.contact.phone, href: `tel:${SITE.contact.phoneRaw}` },
    { icon: MapPin, label: "Corporate HQ", value: "Banani Model Town, Dhaka-1213", href: "#offices" },
    { icon: Clock, label: "Office Hours", value: "Sat–Thu, 9:00 AM – 6:00 PM BST", href: "#" },
];

export default function ContactPage() {
    return (
        <main className="bg-[#FAFAF8] min-h-screen selection:bg-[#C4882A]/20 selection:text-[#C4882A]">

            {/* Page Header */}
            <div className="bg-white border-b border-zinc-200 py-16 md:py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <p className="font-cormorant text-[10px] font-bold text-[#C4882A] uppercase tracking-[0.25em] mb-4">Global Trade Desk</p>
                        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-zinc-900 tracking-tight leading-tight mb-4">
                            Let's build your <span className="text-[#C4882A]">supply chain.</span>
                        </h1>
                        <p className="font-lato text-zinc-500 text-base md:text-lg leading-relaxed max-w-2xl">
                            Our team responds within {SITE.contact.responseTime}. Whether it's procurement, logistics, or an industry partnership, we're here.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* ── CONTACT METHODS GRID ── */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-200 border border-zinc-200">
                        {contactMethods.map((m) => {
                            const Icon = m.icon;
                            return (
                                <a
                                    key={m.label}
                                    href={m.href}
                                    className="p-8 bg-zinc-50 hover:bg-white transition-colors group flex flex-col"
                                >
                                    <div className="w-10 h-10 bg-[#09090B] flex items-center justify-center mb-6 group-hover:bg-[#C4882A] transition-colors">
                                        <Icon size={16} className="text-[#C4882A] group-hover:text-white transition-colors" />
                                    </div>
                                    <p className="font-lato text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-2">{m.label}</p>
                                    <p className="font-display text-zinc-900 font-bold text-base leading-snug">{m.value}</p>
                                </a>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── OFFICES SECTION ── */}
            <section id="offices" className="pb-24 scroll-mt-20">
                <div className="max-w-7xl mx-auto px-6">

                    {/* Section header */}
                    <div className="flex items-center gap-3 mb-10">
                        <span className="w-8 h-px bg-[#C4882A]" />
                        <p className="font-cormorant text-[10px] font-bold text-[#C4882A] uppercase tracking-[0.25em]">Our Offices</p>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                        <h2 className="font-display text-3xl md:text-4xl font-black text-zinc-900 tracking-tight leading-tight">
                            Nationwide presence,<br />
                            <span className="text-[#C4882A]">global reach.</span>
                        </h2>
                        <p className="font-lato text-zinc-500 text-sm max-w-sm leading-relaxed">
                            With offices across Bangladesh's key trade hubs — from the capital to the port city and beyond — our teams are always close to your operations.
                        </p>
                    </div>

                    {/* Office cards grid — HQ spans full width on md+ */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {SITE.offices.map((office) => (
                            <div
                                key={office.city}
                                className={`group relative border flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[#C4882A]/8 hover:-translate-y-0.5 ${office.isHQ
                                        ? "bg-[#09090B] border-[#C4882A]/30 lg:col-span-1 md:col-span-2"
                                        : "bg-white border-zinc-200 hover:border-[#C4882A]/40"
                                    }`}
                            >
                                {/* Top accent */}
                                <div className={`h-px w-full ${office.isHQ ? "bg-[#C4882A]/60" : "bg-zinc-100 group-hover:bg-[#C4882A]/40 transition-colors"}`} />

                                <div className="p-7 flex flex-col flex-1">
                                    {/* Label row */}
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-7 h-7 flex items-center justify-center ${office.isHQ ? "bg-[#C4882A]" : "bg-zinc-100 group-hover:bg-[#C4882A]/10 transition-colors"}`}>
                                                <Building2 size={13} className={office.isHQ ? "text-white" : "text-zinc-500"} />
                                            </div>
                                            <span className={`font-lato text-[10px] font-black uppercase tracking-[0.2em] ${office.isHQ ? "text-[#C4882A]" : "text-zinc-400"}`}>
                                                {office.label}
                                            </span>
                                        </div>
                                        {office.isHQ && (
                                            <span className="inline-flex items-center gap-1 font-lato text-[9px] font-bold uppercase tracking-widest text-[#C4882A] border border-[#C4882A]/30 px-2 py-0.5">
                                                HQ
                                            </span>
                                        )}
                                    </div>

                                    {/* City */}
                                    <h3 className={`font-display text-2xl font-black tracking-tight mb-1 ${office.isHQ ? "text-white" : "text-zinc-900"}`}>
                                        {office.city}
                                    </h3>

                                    {/* Address */}
                                    <p className={`font-lato text-sm leading-relaxed mb-6 ${office.isHQ ? "text-zinc-400" : "text-zinc-500"}`}>
                                        {office.address}
                                    </p>

                                    {/* Contact details */}
                                    <div className={`space-y-2.5 text-sm mb-6 ${office.isHQ ? "text-zinc-400" : "text-zinc-600"}`}>
                                        <a
                                            href={`tel:${office.phone.replace(/\s|-/g, "")}`}
                                            className={`flex items-center gap-2.5 transition-colors ${office.isHQ ? "hover:text-[#C4882A]" : "hover:text-zinc-900"}`}
                                        >
                                            <Phone size={12} className={office.isHQ ? "text-[#C4882A]" : "text-zinc-400"} />
                                            {office.phone}
                                        </a>
                                        <a
                                            href={`mailto:${office.email}`}
                                            className={`flex items-center gap-2.5 transition-colors ${office.isHQ ? "hover:text-[#C4882A]" : "hover:text-zinc-900"}`}
                                        >
                                            <Mail size={12} className={office.isHQ ? "text-[#C4882A]" : "text-zinc-400"} />
                                            {office.email}
                                        </a>
                                    </div>

                                    {/* Directions link */}
                                    <div className="mt-auto">
                                        <a
                                            href={office.mapUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`inline-flex items-center gap-2 font-lato text-[11px] font-bold uppercase tracking-wider transition-colors ${office.isHQ
                                                    ? "text-[#C4882A] hover:text-[#D4952E]"
                                                    : "text-zinc-400 hover:text-[#C4882A]"
                                                }`}
                                        >
                                            Get Directions <ExternalLink size={11} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── BOTTOM CTA PANEL ── */}
            <section className="pb-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="border border-zinc-200 bg-zinc-50 p-10 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
                        {/* Decorative background lines */}
                        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10px, #e5e5e5 10px, #e5e5e5 11px)" }} />

                        <div className="relative z-10 text-center md:text-left">
                            <span className="inline-flex items-center gap-2 font-cormorant text-[10px] font-bold text-[#C4882A] uppercase tracking-[0.2em] mb-4">
                                <span className="w-4 h-px bg-[#C4882A]" /> Specific Requirements
                            </span>
                            <h3 className="font-display text-2xl font-black text-zinc-900 tracking-tight mb-2">Submit a detailed RFQ</h3>
                            <p className="font-lato text-zinc-500 text-sm">Our sourcing team will return verified pricing rapidly.</p>
                        </div>
                        <div className="relative z-10 shrink-0">
                            <Link
                                href="/quote"
                                className="inline-flex items-center gap-2 h-12 px-8 bg-[#09090B] hover:bg-zinc-800 text-white font-lato font-bold text-sm transition-colors"
                            >
                                Get a Quote <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

        </main>
    );
}
