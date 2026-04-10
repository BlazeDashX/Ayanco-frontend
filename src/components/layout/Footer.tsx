"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { SITE } from "@/data/site";

const footerLinks = {
  products: [
    { label: "Food Essentials", href: "/products" },
    { label: "Industrial Goods", href: "/products" },
    { label: "Machinery", href: "/products" },
    { label: "Custom Sourcing", href: "/quote" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Services", href: "/services" },
    { label: "Why Ayanco", href: "/why-ayanco" },
    { label: "FAQ", href: "/faq" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Trade", href: "/terms" },
    { label: "Contact Us", href: "/contact" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-white/6 text-stone-400">
      {/* Top brass accent */}
      <div className="h-px bg-gold/60" />

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">

          {/* Brand column */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-7 h-7 bg-gold flex items-center justify-center shrink-0">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <rect x="1" y="1" width="5" height="5" fill="#09090B" />
                    <rect x="8" y="1" width="5" height="5" fill="#09090B" opacity="0.5" />
                    <rect x="1" y="8" width="5" height="5" fill="#09090B" opacity="0.5" />
                    <rect x="8" y="8" width="5" height="5" fill="#09090B" />
                  </svg>
                </div>
                <span className="font-black text-zinc-50 uppercase tracking-tight text-base">
                  Ayanco <span className="text-gold">Trade</span>
                </span>
              </div>
              <p className="text-sm leading-relaxed max-w-xs text-[#78716C]">
                International sourcing and supply chain management. Connecting verified global suppliers with high-growth markets since 2012.
              </p>
            </div>

            <div className="space-y-3 text-sm">
              <a href={`mailto:${SITE.contact.email}`} className="flex items-center gap-3 hover:text-zinc-50 transition-colors">
                <Mail size={15} className="text-gold shrink-0" />
                {SITE.contact.email}
              </a>
              <span className="flex items-center gap-3">
                <Phone size={15} className="text-gold shrink-0" />
                {SITE.contact.phone}
              </span>
              <span className="flex items-start gap-3">
                <MapPin size={15} className="text-gold shrink-0 mt-0.5" />
                {SITE.contact.address}
              </span>
            </div>

            <motion.div whileTap={{ scale: 0.96 }} whileHover={{ scale: 1.02 }}>
              <Link
                href="/quote"
                className="inline-flex items-center gap-2 h-10 px-6 bg-gold hover:bg-gold-dark text-zinc-950 font-bold text-sm transition-colors"
              >
                Request Quote <ArrowRight size={14} />
              </Link>
            </motion.div>
          </div>

          {/* Link columns */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold mb-5">Products</h4>
            <ul className="space-y-3">
              {footerLinks.products.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm hover:text-[#FAFAF9] transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold mb-5">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm hover:text-[#FAFAF9] transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold mb-5">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm hover:text-[#FAFAF9] transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/6">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#57534E]">
          <span>© {new Date().getFullYear()} Ayanco Trade Corporation. All rights reserved.</span>
          <span>Registered in Bangladesh · RJSC · VAT & TIN Registered</span>
        </div>
      </div>
    </footer>
  );
}
