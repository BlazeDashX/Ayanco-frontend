"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MapPin, Mail, Phone, ArrowRight, CheckCircle2, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Animation Variants for Staggered Entrance
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 50 },
  },
};

export default function QuotePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate network request
    await new Promise((resolve) => setTimeout(resolve, 1500));
    alert("Quote Request Received. Ticket #88291 created.");
    setIsSubmitting(false);
  }

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-blue-200">
      
      {/* 1. CINEMATIC HEADER SECTION */}
      <section className="relative bg-[#05070a] pt-32 pb-48 md:pt-48 md:pb-64 overflow-hidden">
        {/* Abstract Background Mesh */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-900/40 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-900/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-12 bg-blue-500/50" />
              <span className="text-blue-400 font-mono text-xs uppercase tracking-[0.3em] font-bold">
                Global Desk
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tighter leading-[1.1] mb-8">
              Initiate <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-200 to-white">
                Trade Protocol.
              </span>
            </h1>
            <p className="text-slate-400 text-lg md:text-2xl font-light max-w-2xl leading-relaxed">
              Secure pricing for industrial machinery and agricultural essentials. 
              Our corporate team processes inquiries with priority SQA verification.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. INTERACTIVE FORM SECTION (Overlapping Card Layout) */}
      <section className="relative z-20 -mt-24 md:-mt-32 pb-24">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            
            {/* LEFT SIDE: Contact Info & Trust Signals */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="lg:col-span-4 space-y-10 lg:pt-12"
            >
              {/* Trust Badge */}
              <div className="bg-white p-6 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Globe size={16} className="text-blue-600" /> Regional HQ
                </h3>
                <div className="space-y-4">
                  <div className="flex gap-4 group">
                    <div className="mt-1 p-2 bg-slate-50 rounded-lg text-slate-400 group-hover:text-blue-600 group-hover:bg-blue-50 transition-colors">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">Dhaka Corporate Office</p>
                      <p className="text-slate-500 text-sm leading-relaxed mt-1">
                        Ayanco Tower, Level 12<br />Banani Model Town, Dhaka-1213
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 group">
                    <div className="mt-1 p-2 bg-slate-50 rounded-lg text-slate-400 group-hover:text-blue-600 group-hover:bg-blue-50 transition-colors">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">Trade Inquiries</p>
                      <a href="mailto:corporate@ayanco.com" className="text-slate-500 text-sm hover:text-blue-600 transition-colors">
                        corporate@ayanco.com
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4 group">
                    <div className="mt-1 p-2 bg-slate-50 rounded-lg text-slate-400 group-hover:text-blue-600 group-hover:bg-blue-50 transition-colors">
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">Direct Line</p>
                      <p className="text-slate-500 text-sm">+880 1711-000000</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Indicators */}
              <div className="hidden lg:block space-y-4 pl-4 border-l-2 border-slate-200">
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <CheckCircle2 size={16} className="text-green-500" />
                  <span>Response time: &lt; 4 Hours</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <CheckCircle2 size={16} className="text-green-500" />
                  <span>ISO 9001:2015 Certified Process</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <CheckCircle2 size={16} className="text-green-500" />
                  <span>Encrypted Data Transmission</span>
                </div>
              </div>
            </motion.div>

            {/* RIGHT SIDE: The Form Card */}
            <motion.div 
              className="lg:col-span-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-2xl shadow-blue-900/10 border border-white/20 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600" />
                
                <motion.div variants={itemVariants} className="mb-10">
                  <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Request Quotation</h2>
                  <p className="text-slate-500 mt-2">Complete the specifications below. Fields marked with * are required for SQA validation.</p>
                </motion.div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Row 1: Identity */}
                  <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Full Name *</label>
                      <Input placeholder="e.g. Tanvir Ahmed" className="h-14 bg-slate-50 border-slate-100 focus:bg-white transition-all text-base" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Company Name *</label>
                      <Input placeholder="e.g. Ayanco Industries" className="h-14 bg-slate-50 border-slate-100 focus:bg-white transition-all text-base" required />
                    </div>
                  </motion.div>

                  {/* Row 2: Contact */}
                  <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Work Email *</label>
                      <Input type="email" placeholder="name@company.com" className="h-14 bg-slate-50 border-slate-100 focus:bg-white transition-all text-base" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Phone / WhatsApp</label>
                      <Input type="tel" placeholder="+880..." className="h-14 bg-slate-50 border-slate-100 focus:bg-white transition-all text-base" />
                    </div>
                  </motion.div>

                  {/* Row 3: Context */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Inquiry Category</label>
                    <div className="relative">
                      <select className="w-full h-14 rounded-md border border-slate-100 bg-slate-50 px-4 text-slate-700 text-base focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none appearance-none cursor-pointer transition-colors">
                        <option>Bulk Product Sourcing (Agriculture)</option>
                        <option>Heavy Machinery Procurement</option>
                        <option>Logistics & Supply Chain</option>
                        <option>Partnership Proposal</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </div>
                    </div>
                  </motion.div>

                  {/* Row 4: Message */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Project Specifications *</label>
                    <Textarea 
                      placeholder="Please describe your requirements, quantity, and target delivery timeline..." 
                      className="min-h-[160px] bg-slate-50 border-slate-100 focus:bg-white transition-all text-base p-4 resize-none" 
                      required 
                    />
                  </motion.div>

                  {/* Submit Button */}
                  <motion.div variants={itemVariants} className="pt-4">
                    <Button 
                      disabled={isSubmitting}
                      className="w-full h-16 text-lg font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-600/20 transition-all hover:scale-[1.01] active:scale-[0.98]"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">Processing <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /></span>
                      ) : (
                        <span className="flex items-center gap-2">Submit Quote Request <ArrowRight size={20} /></span>
                      )}
                    </Button>
                    <p className="text-center text-xs text-slate-400 mt-4">
                      By submitting this form, you agree to our <a href="#" className="underline hover:text-blue-500">Terms of Trade</a>.
                    </p>
                  </motion.div>
                </form>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}