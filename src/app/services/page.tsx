"use client";

import {
  Globe,
  ShieldCheck,
  Truck,
  BarChart3,
  Headphones,
  ArrowRight,
  CheckCircle2,
  PackageSearch,
  Landmark,
  Zap,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

/* ─── data ─────────────────────────────────────────────────── */
const services = [
  {
    num: "01",
    icon: Globe,
    title: "Global Sourcing & Procurement",
    desc: "We leverage a network of 500+ verified suppliers to find the exact raw materials or machinery you need — negotiation, risk-vetting and contract management included.",
    features: ["Supplier Verification", "Price Negotiation", "Contract Management"],
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
    size: "lg",   // bento large card
  },
  {
    num: "02",
    icon: ShieldCheck,
    title: "Quality Assurance",
    desc: "Pre-shipment inspections, lab testing coordination and defect reporting — our Trade QA methodology keeps every shipment compliant.",
    features: ["Pre-shipment Inspection", "Lab Testing", "Defect Reporting"],
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
    size: "sm",
  },
  {
    num: "03",
    icon: Truck,
    title: "Logistics & Freight",
    desc: "Sea, air or land — we optimise routes for cost and speed while handling every customs document end-to-end.",
    features: ["Customs Clearance", "Freight Forwarding", "Real-time Tracking"],
    image: "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=800&q=80",
    size: "sm",
  },
  {
    num: "04",
    icon: BarChart3,
    title: "Market Intelligence",
    desc: "Data-driven insights to help you buy at the right time. We analyse global commodity trends to forecast price shifts and minimise risk.",
    features: ["Trend Analysis", "Cost Forecasting", "Risk Assessment"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    size: "sm",
  },
  {
    num: "05",
    icon: PackageSearch,
    title: "Custom Sourcing",
    desc: "Can't find it on the shelf? Our trade desk scouts global markets on-demand and returns verified options within 48 hours.",
    features: ["On-Demand Scouting", "48-hr Turnaround", "Verified Alternatives"],
    image: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?auto=format&fit=crop&w=800&q=80",
    size: "sm",
  },
  {
    num: "06",
    icon: Landmark,
    title: "Compliance & Documentation",
    desc: "We handle Letter of Credit management, phytosanitary certificates, legal vetting and country-specific compliance requirements.",
    features: ["LC Management", "Phytosanitary Certs", "Legal Vetting"],
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80",
    size: "lg",
  },
];

const processSteps = [
  { label: "Requirement", desc: "You share your exact product specs, quantity and destination." },
  { label: "Scouting", desc: "We identify and vet suppliers from our 500+ global network." },
  { label: "QA Check", desc: "Pre-shipment inspection and compliance verification." },
  { label: "Logistics", desc: "Route-optimised freight, customs docs and real-time tracking." },
  { label: "Delivery", desc: "Goods arrive on time, fully documented." },
];

/* ─── component ─────────────────────────────────────────────── */
export default function ServicesPage() {
  return (
    <main className="bg-white min-h-screen">

      {/* ════ HERO ════ */}
      <section className="relative min-h-[88vh] flex items-end bg-[#09090B] pt-24 overflow-hidden">
        {/* background image */}
        <Image
          src="https://images.unsplash.com/photo-1510166089171-42e27769f27c?auto=format&fit=crop&w=2400&q=80"
          alt="Ayanco services"
          fill
          priority
          className="object-cover opacity-30"
        />
        {/* overlays */}
        <div className="absolute inset-0 bg-linear-to-br from-[#09090B]/90 via-[#09090B]/60 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-[#09090B] via-transparent to-transparent" />
        <div className="absolute top-0 inset-x-0 h-px bg-[#C4882A]/60 z-10" />

        {/* floating stat badges */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="absolute top-1/3 right-12 hidden lg:flex flex-col gap-3"
        >
          {[
            { val: "500+", label: "Verified Suppliers" },
            { val: "99.8%", label: "On-time Delivery" },
            { val: "15+", label: "Global Regions" },
          ].map((b) => (
            <div key={b.label} className="bg-white/5 backdrop-blur-md border border-white/10 px-5 py-3 flex items-center gap-3">
              <span className="text-xl font-black text-[#C4882A] tabular-nums">{b.val}</span>
              <span className="text-[10px] font-bold text-white/50 uppercase tracking-[0.18em]">{b.label}</span>
            </div>
          ))}
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20 md:pb-28 w-full">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 text-[10px] font-bold text-[#C4882A] uppercase tracking-[0.28em] mb-7">
              <span className="w-6 h-px bg-[#C4882A]" />
              End-to-End Solutions
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[0.92] mb-8">
              More Than<br />
              <span className="text-[#C4882A]">Just Trade.</span>
            </h1>
            <p className="text-white/55 text-lg max-w-lg leading-relaxed mb-10 font-light">
              We manage the full complexity of international trade — from factory floor to your warehouse door — so you can focus on your core business.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/quote"
                className="inline-flex items-center gap-2 h-12 px-8 bg-[#C4882A] hover:bg-[#D4952E] text-white font-bold text-sm transition-colors"
              >
                Request a Quote <ArrowRight size={15} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 h-12 px-8 border border-white/20 text-white/70 hover:text-white hover:border-white/40 font-medium text-sm transition-colors"
              >
                Talk to Our Desk
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════ BENTO SERVICES GRID ════ */}
      <section className="py-28 bg-[#F5F4F0]">
        <div className="max-w-7xl mx-auto px-6">
          {/* section header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <span className="inline-flex items-center gap-2 text-[10px] font-bold text-[#C4882A] uppercase tracking-[0.28em] mb-4">
                <span className="w-5 h-px bg-[#C4882A]" /> What We Do
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-zinc-900 tracking-tight leading-tight">
                Six pillars of<br />precision trade.
              </h2>
            </div>
            <p className="text-zinc-500 max-w-sm text-sm leading-relaxed md:text-right">
              Every aspect of the sourcing and delivery lifecycle — engineered to remove uncertainty.
            </p>
          </div>

          {/* bento grid */}
          <div className="grid md:grid-cols-3 gap-4">
            {services.map((s, i) => {
              const Icon = s.icon;
              const isLarge = s.size === "lg";
              return (
                <motion.div
                  key={s.num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  className={`group relative overflow-hidden bg-white border border-zinc-200 hover:border-[#C4882A]/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${isLarge ? "md:col-span-2" : ""}`}
                >
                  {/* image strip */}
                  <div className={`relative w-full overflow-hidden ${isLarge ? "h-52" : "h-40"}`}>
                    <Image
                      src={s.image}
                      alt={s.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-[#09090B]/50" />
                    {/* number */}
                    <span className="absolute top-4 left-4 text-[11px] font-black text-white/30 tracking-[0.25em]">
                      {s.num}
                    </span>
                    {/* icon */}
                    <div className="absolute bottom-4 right-4 w-9 h-9 bg-[#C4882A] flex items-center justify-center text-white">
                      <Icon size={16} />
                    </div>
                  </div>

                  {/* card body */}
                  <div className="p-7">
                    <h3 className="text-lg font-black text-zinc-900 tracking-tight mb-3 group-hover:text-[#C4882A] transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-zinc-500 text-sm leading-relaxed mb-5">{s.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {s.features.map((f) => (
                        <span
                          key={f}
                          className="inline-flex items-center gap-1.5 text-[11px] font-medium text-zinc-600 bg-zinc-50 border border-zinc-200 px-2.5 py-1"
                        >
                          <CheckCircle2 size={10} className="text-[#C4882A]" />
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════ PROCESS TIMELINE ════ */}
      <section className="py-24 bg-white border-y border-zinc-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <span className="inline-flex items-center gap-2 text-[10px] font-bold text-[#C4882A] uppercase tracking-[0.28em] mb-4">
                <span className="w-5 h-px bg-[#C4882A]" /> How It Works
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-zinc-900 tracking-tight">
                From inquiry<br />to delivery.
              </h2>
            </div>
            <p className="text-zinc-500 text-sm max-w-xs leading-relaxed">
              A disciplined five-step process that eliminates guesswork at every stage.
            </p>
          </div>

          {/* timeline row */}
          <div className="relative">
            {/* connector line */}
            <div className="hidden md:block absolute top-8 left-0 right-0 h-px bg-zinc-200" />
            <div className="grid md:grid-cols-5 gap-6 md:gap-0">
              {processSteps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: i * 0.1 }}
                  className="group relative md:pr-6"
                >
                  {/* step dot */}
                  <div className="relative z-10 mb-6">
                    <div className="w-16 h-16 bg-[#09090B] border-4 border-white ring-1 ring-zinc-200 flex items-center justify-center group-hover:ring-[#C4882A] transition-all duration-300">
                      <span className="text-[10px] font-black text-[#C4882A] tracking-widest">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                  <h4 className="font-black text-zinc-900 text-sm mb-2 tracking-tight">{step.label}</h4>
                  <p className="text-zinc-500 text-xs leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════ DARK CTA BAND ════ */}
      <section className="relative bg-[#09090B] py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="absolute top-0 inset-x-0 h-px bg-[#C4882A]/40" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#C4882A]/10 border border-[#C4882A]/20 flex items-center justify-center text-[#C4882A]">
                  <Headphones size={18} />
                </div>
                <span className="text-[10px] font-bold text-[#C4882A] uppercase tracking-[0.25em]">24/7 Trade Support</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-5">
                Ready to<br />start sourcing?
              </h2>
              <p className="text-white/50 leading-relaxed max-w-sm text-sm font-light">
                Our trade desk is always online — tracking shipments, handling urgent customs queries and finding the right supplier for your requirements.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col gap-4"
            >
              {[
                { icon: Zap, label: "Instant Quote", href: "/quote", primary: true },
                { icon: Headphones, label: "Talk to Our Trade Desk", href: "/contact", primary: false },
              ].map((btn) => {
                const BIcon = btn.icon;
                return (
                  <Link
                    key={btn.label}
                    href={btn.href}
                    className={`group inline-flex items-center justify-between h-14 px-7 font-bold text-sm transition-all ${btn.primary ? "bg-[#C4882A] hover:bg-[#D4952E] text-white" : "border border-white/12 text-white/60 hover:text-white hover:border-white/30"}`}
                  >
                    <span className="flex items-center gap-3">
                      <BIcon size={16} />
                      {btn.label}
                    </span>
                    <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                );
              })}

              <div className="flex flex-wrap gap-5 mt-2">
                {["Bangladesh Registered", "ISO-Compliant", "Phytosanitary Certified"].map((t) => (
                  <span key={t} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/30">
                    <CheckCircle2 size={11} className="text-[#C4882A]" />
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

    </main>
  );
}