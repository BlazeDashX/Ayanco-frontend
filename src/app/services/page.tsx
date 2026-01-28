"use client";

import { motion } from "framer-motion";
import { Globe, ShieldCheck, Truck, BarChart3, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ServiceCard from "@/components/services/ServiceCard"; // Import

const services = [
  {
    icon: Globe,
    title: "Global Sourcing & Procurement",
    desc: "We leverage a network of 500+ verified suppliers to find the exact raw materials or machinery you need. We handle negotiation, contract verification, and supplier vetting.",
    features: ["Supplier Verification", "Price Negotiation", "Contract Management"],
    color: "bg-blue-50 text-blue-600"
  },
  {
    icon: ShieldCheck,
    title: "Quality Assurance (SQA)",
    desc: "Our 'Software Quality Assurance' inspired methodology ensures physical goods meet strict standards. We deploy inspectors to factories before shipment.",
    features: ["Pre-shipment Inspection", "Lab Testing Coordination", "Defect Reporting"],
    color: "bg-green-50 text-green-600"
  },
  {
    icon: Truck,
    title: "Logistics & Freight",
    desc: "End-to-end supply chain management. Whether by sea, air, or land, we optimize routes for cost and speed, handling all customs documentation.",
    features: ["Customs Clearance", "Freight Forwarding", "Real-time Tracking"],
    color: "bg-orange-50 text-orange-600"
  },
  {
    icon: BarChart3,
    title: "Market Intelligence",
    desc: "Data-driven insights to help you buy at the right time. We analyze global commodity trends to forecast price shifts.",
    features: ["Trend Analysis", "Cost Forecasting", "Risk Assessment"],
    color: "bg-purple-50 text-purple-600"
  }
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      
      {/* 1. HERO */}
      <section className="bg-[#050914] pt-32 pb-24 text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6 }}
             className="max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
              More Than Just Trade. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Complete Solutions.
              </span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl font-light leading-relaxed">
              We manage the complexity of international trade so you can focus on your core business. From factory floor to your warehouse door.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. SERVICE LIST */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid gap-12">
            {services.map((service, i) => (
              <ServiceCard key={i} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. SUPPORT STRIP */}
      <section className="bg-slate-900 py-20 border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white animate-pulse">
                <Headphones size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">24/7 Trade Support</h3>
                <p className="text-slate-400">Our logistics team is always online to track your shipments.</p>
              </div>
            </div>
            <div className="flex gap-4">
               <Button asChild variant="secondary" className="h-14 px-8 rounded-full font-bold">
                 <Link href="/contact">Contact Support</Link>
               </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}