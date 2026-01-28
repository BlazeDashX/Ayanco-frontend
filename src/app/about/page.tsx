"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { ArrowRight, ShieldCheck, Scale, FileCheck, Quote, Building2, Globe2, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

// --- ANIMATION VARIANTS ---
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
  }
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

export default function AboutPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const yHero = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div className="min-h-screen bg-[#05070a] text-slate-200 selection:bg-blue-500/30 font-sans overflow-x-hidden">
      
      {/* 1. CINEMATIC HERO */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden border-b border-white/5 py-20">
        {/* Background Texture */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none mix-blend-overlay"></div>
        <div className="absolute top-0 w-full h-full bg-gradient-to-b from-blue-900/10 via-transparent to-[#05070a] z-0 pointer-events-none" />
        
        {/* Animated Glow Orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none animate-pulse" />

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div style={{ y: yHero }} initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-blue-200">Formerly Ayan International</span>
            </motion.div>
            
            {/* FIX: Responsive Font Size (text-5xl on mobile, 9xl on desktop) */}
            <motion.h1 variants={fadeUp} className="text-5xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white mb-8 leading-[0.95]">
              The Standard <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-blue-400">
                of Trust.
              </span>
            </motion.h1>
            
            <motion.p variants={fadeUp} className="text-base md:text-2xl font-light text-slate-400 max-w-3xl mx-auto leading-relaxed">
              We don't just move goods. We engineer the infrastructure of reliability that powers global industries.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* 2. STICKY SCROLL HISTORY */}
      <section ref={containerRef} className="py-20 md:py-32 bg-white text-slate-900 rounded-t-[40px] md:rounded-t-[60px] relative z-20 -mt-20 shadow-[0_-20px_60px_rgba(0,0,0,0.5)]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            
            {/* Sticky Image/Graphic Side */}
            <div className="lg:w-1/2 h-fit lg:sticky lg:top-32 self-start hidden lg:block">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-slate-900 group"
              >
                {/* Abstract Corporate Graphic */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-black flex flex-col items-center justify-center text-slate-400">
                   <Building2 size={80} className="text-blue-500/50 mb-6" />
                   <div className="text-center px-8">
                     <p className="text-white font-bold text-2xl tracking-tight">Ayanco Trade Ltd.</p>
                     <p className="text-sm text-slate-500 mt-2 uppercase tracking-widest">Govt. Reg #TR-49292-X</p>
                   </div>
                </div>
                
                <div className="absolute bottom-8 left-8 text-white backdrop-blur-md bg-white/10 p-6 rounded-2xl border border-white/10">
                  <div className="text-4xl font-bold">12+</div>
                  <div className="text-sm font-light opacity-80 uppercase tracking-widest mt-1">Years of Excellence</div>
                </div>
              </motion.div>
            </div>

            {/* Scrolling Narrative Side */}
            <div className="lg:w-1/2 space-y-24 lg:pt-16">
              {/* Chapter 1: Origins */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-4 mb-6">
                   <span className="text-4xl md:text-5xl font-bold text-slate-200">01</span>
                   <h3 className="text-xs md:text-sm font-bold text-blue-600 uppercase tracking-widest">The Foundation</h3>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 tracking-tight">From Local Origins to Global Reach</h2>
                <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
                  Founded in 2012 as <strong>Ayan International</strong>, we began with a singular vision: to bring transparency to the commodities market. What started as a modest sourcing agency has evolved into <strong>Ayanco</strong>, a powerhouse in industrial procurement and supply chain management.
                </p>
              </motion.div>

              {/* Chapter 2: Mission */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-4 mb-6">
                   <span className="text-4xl md:text-5xl font-bold text-slate-200">02</span>
                   <h3 className="text-xs md:text-sm font-bold text-blue-600 uppercase tracking-widest">Mission & Vision</h3>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 tracking-tight">Empowering Industry</h2>
                <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-6">
                  <strong>Our Mission:</strong> To eliminate the friction in global trade by providing verified, high-quality industrial resources with zero compromise on timing or safety.
                </p>
                <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
                  <strong>Our Vision:</strong> To become the most trusted trade partner in South Asia, bridging the gap between local producers and the global marketplace.
                </p>
              </motion.div>

              {/* Chapter 3: Compliance */}
               <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="bg-slate-50 p-8 rounded-2xl border border-slate-100"
              >
                <div className="flex items-center gap-3 mb-4">
                  <FileCheck className="text-green-600" size={24} />
                  <h3 className="font-bold text-slate-900">Legal & Compliance</h3>
                </div>
                <p className="text-slate-600 mb-4 text-sm md:text-base">
                  We operate with full government compliance. Ayanco is a registered Limited Company with active memberships in major trade chambers.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm text-slate-500"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Incorporated under RJSC</li>
                  <li className="flex items-center gap-2 text-sm text-slate-500"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Active VAT & BIN Compliant</li>
                  <li className="flex items-center gap-2 text-sm text-slate-500"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Import/Export License Holder</li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. BENTO GRID: Core Values */}
      <section className="py-20 md:py-32 bg-[#0a0c10] text-white relative">
        <div className="container mx-auto px-6">
          <div className="mb-20 max-w-2xl">
            {/* FIX: Responsive Font Size */}
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">Our DNA.</h2>
            <p className="text-slate-400 text-lg md:text-xl font-light">The core values that guide every contract, shipment, and handshake.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 auto-rows-[auto] md:auto-rows-[280px]">
            {/* Card 1: Integrity (Large) */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="md:col-span-2 bg-gradient-to-br from-blue-900/40 to-slate-900/40 border border-white/10 rounded-3xl p-8 md:p-10 flex flex-col justify-between relative overflow-hidden group min-h-[300px]"
            >
              <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-20 transition-opacity">
                <ShieldCheck size={120} />
              </div>
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-4">
                <ShieldCheck className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-3">Integrity First</h3>
                <p className="text-slate-400 leading-relaxed max-w-md text-sm md:text-base">We do what we say. In an industry often plagued by opacity, we stand as a beacon of honest dealing. No hidden fees, no last-minute changes.</p>
              </div>
            </motion.div>

            {/* Card 2: Reliability */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-slate-900/40 border border-white/10 rounded-3xl p-8 flex flex-col justify-between hover:bg-white/5 transition-colors min-h-[250px]"
            >
              <Scale className="text-blue-400 mb-4" size={32} />
              <div>
                <h3 className="text-2xl font-bold mb-2">Reliability</h3>
                <p className="text-sm text-slate-400">Consistent quality, on-time delivery. We treat your deadlines as our own.</p>
              </div>
            </motion.div>

            {/* Card 3: Transparency */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-slate-900/40 border border-white/10 rounded-3xl p-8 flex flex-col justify-between hover:bg-white/5 transition-colors min-h-[250px]"
            >
              <Globe2 className="text-cyan-400 mb-4" size={32} />
              <div>
                <h3 className="text-2xl font-bold mb-2">Transparency</h3>
                <p className="text-sm text-slate-400">Full visibility into sourcing and logistics. You are never left in the dark.</p>
              </div>
            </motion.div>

            {/* Card 4: Excellence (Large) */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="md:col-span-2 bg-gradient-to-br from-cyan-900/20 to-slate-900/40 border border-white/10 rounded-3xl p-8 md:p-10 flex flex-col justify-between relative overflow-hidden group min-h-[300px]"
            >
              <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-20 transition-opacity">
                <Trophy size={120} />
              </div>
              <div className="w-12 h-12 bg-cyan-500 rounded-xl flex items-center justify-center mb-4">
                <Trophy className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-3">Unmatched Excellence</h3>
                <p className="text-slate-400 leading-relaxed max-w-md text-sm md:text-base">From raw material selection to final delivery, our SQA (Software Quality Assurance) inspired processes ensure perfection.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. FOUNDER'S MESSAGE */}
      <section className="py-20 md:py-32 bg-white text-slate-900">
        <div className="container mx-auto px-6">
          <div className="relative max-w-4xl mx-auto">
            <Quote className="absolute -top-10 -left-10 text-blue-100 w-20 h-20 md:w-32 md:h-32 -z-10" />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              {/* FIX: Reduced mobile font size for quote */}
              <h2 className="text-2xl md:text-5xl font-bold mb-8 leading-tight">
                "We built Ayanco not just to trade, but to solve the trust deficit in the market. When you partner with us, you aren't just buying a product; you are securing peace of mind."
              </h2>
              
              <div className="flex flex-col items-center justify-center mt-12">
                 <div className="w-20 h-20 bg-slate-200 rounded-full mb-4 overflow-hidden">
                   <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-600 font-bold">JD</div>
                 </div>
                 <h3 className="text-xl font-bold">John Doe</h3>
                 <p className="text-slate-500 uppercase tracking-widest text-xs mt-1">Founder & Chairman</p>
                 {/* <Image src="/signature.png" alt="Signature" width={150} height={60} className="mt-4 opacity-50" /> */}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. CTA */}
      <section className="bg-blue-950 py-24 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to experience the Ayanco Standard?</h2>
          <Button asChild size="lg" className="rounded-full px-10 h-16 text-lg bg-white text-blue-900 hover:bg-blue-50 font-bold">
            <Link href="/quote">Request a Proposal <ArrowRight className="ml-2" /></Link>
          </Button>
        </div>
      </section>

    </div>
  );
}