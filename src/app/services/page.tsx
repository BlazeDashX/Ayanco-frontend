"use client";

import { Globe, ShieldCheck, Truck, BarChart3, Headphones, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import ServiceCard from "@/components/services/ServiceCard";

// --- DATA ---
const services = [
  {
    icon: Globe,
    title: "Global Sourcing & Procurement",
    desc: "We leverage a network of 500+ verified suppliers to find the exact raw materials or machinery you need. We handle negotiation, contract verification, and supplier vetting.",
    features: ["Supplier Verification", "Price Negotiation", "Contract Management"],
    color: "bg-blue-50 text-blue-600 border border-blue-100"
  },
  {
    icon: ShieldCheck,
    title: "Quality Assurance (SQA)",
    desc: "Our 'Software Quality Assurance' inspired methodology ensures physical goods meet strict standards. We deploy inspectors to factories before shipment.",
    features: ["Pre-shipment Inspection", "Lab Testing Coordination", "Defect Reporting"],
    color: "bg-emerald-50 text-emerald-600 border border-emerald-100"
  },
  {
    icon: Truck,
    title: "Logistics & Freight",
    desc: "End-to-end supply chain management. Whether by sea, air, or land, we optimize routes for cost and speed, handling all customs documentation.",
    features: ["Customs Clearance", "Freight Forwarding", "Real-time Tracking"],
    color: "bg-orange-50 text-orange-600 border border-orange-100"
  },
  {
    icon: BarChart3,
    title: "Market Intelligence",
    desc: "Data-driven insights to help you buy at the right time. We analyze global commodity trends to forecast price shifts.",
    features: ["Trend Analysis", "Cost Forecasting", "Risk Assessment"],
    color: "bg-purple-50 text-purple-600 border border-purple-100"
  }
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      
      {/* 1. HERO (Consistent with Products Page) */}
      <PageHero 
        badge="End-to-End Solutions"
        title="More Than Just Trade."
        highlight="Complete Mastery."
        subtitle="We manage the complexity of international trade so you can focus on your core business. From factory floor to your warehouse door."
        bgImage="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop" 
        primaryCta={{ label: "Contact Support", href: "/contact" }}
      />

      {/* 2. SERVICES LIST */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col gap-8">
            {services.map((service, i) => (
              <ServiceCard key={i} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. SUPPORT CTA (Redesigned & FIXED) */}
      <section className="bg-slate-900 py-24 relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 max-w-6xl mx-auto">
            
            {/* Left Text */}
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center shrink-0 shadow-lg shadow-blue-900/50">
                <Headphones size={32} className="text-white" />
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-bold text-white tracking-tight">24/7 Trade Support</h3>
                <p className="text-slate-400 text-lg max-w-md">
                  Our logistics team is always online to track your shipments and handle urgent customs queries.
                </p>
              </div>
            </div>

            {/* Right Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
               <Button asChild size="lg" className="h-14 px-8 rounded-full bg-white text-blue-950 font-bold hover:bg-blue-50 transition-transform hover:scale-105">
                 <Link href="/contact">
                   Contact Support <ArrowRight className="ml-2 w-5 h-5" />
                 </Link>
               </Button>
               
               {/* FIX IS HERE: Added 'bg-transparent' to fix white blob issue */}
               <Button 
                 asChild 
                 variant="outline" 
                 size="lg" 
                 className="h-14 px-8 rounded-full border-slate-700 bg-transparent text-white hover:bg-slate-800 hover:text-white"
               >
                 <Link href="/faq">Visit Help Center</Link>
               </Button>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}