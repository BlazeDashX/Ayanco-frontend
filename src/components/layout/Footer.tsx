"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, Linkedin, Globe, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="relative bg-slate-950 text-slate-400 border-t border-slate-900 overflow-hidden">
      {/* subtle premium glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-[520px] rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute -bottom-32 right-[-80px] h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-16 md:pt-20 pb-10">
        {/* Top CTA Strip (FIXED) */}
        <div className="mb-14 rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <p className="text-white font-bold text-xl md:text-2xl tracking-tight">
              Ready to source, verify, and ship with confidence?
            </p>
            <p className="text-slate-400 text-sm md:text-base max-w-2xl">
              Request a quote and our team will respond with sourcing options, pricing guidance, and lead times.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
  {/* Primary */}
  <Link
    href="/quote"
    className="inline-flex items-center justify-center rounded-full bg-white text-blue-950 hover:bg-slate-200 font-semibold h-12 px-6 w-full sm:w-auto transition-transform hover:scale-[1.02] active:scale-[0.98]"
  >
    Request Quote <ArrowRight className="ml-2" size={18} />
  </Link>

  {/* Secondary (NO Button component, pure link) */}
  <Link
    href="/quote"
    className="inline-flex items-center justify-center rounded-full border border-white/25 text-white hover:bg-white hover:text-slate-900 font-semibold h-12 px-6 w-full sm:w-auto transition-colors"
  >
    Contact Support
  </Link>
</div>

        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="inline-flex items-center">
              <h3 className="text-2xl font-extrabold text-white tracking-tight">
                AYANCO<span className="text-blue-500">TRADE</span>
              </h3>
            </Link>

            <p className="text-sm leading-relaxed text-slate-400">
              Premier global trading corporation bridging high-growth markets with premium industrial and agricultural
              supply chains.
            </p>

            <div className="flex gap-4">
              <Link
                href="#"
                className="text-slate-400 hover:text-blue-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md p-1"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </Link>
              <Link
                href="#"
                className="text-slate-400 hover:text-blue-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md p-1"
                aria-label="Website"
              >
                <Globe size={20} />
              </Link>
            </div>
          </div>

          {/* Business Units */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-6">Business Units</h4>
            <ul className="space-y-4 text-sm font-medium">
              {[
                { label: "Food Essentials", href: "/products" },
                { label: "Industrial Goods", href: "/products" },
                { label: "Machinery", href: "/products" },
              ].map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="inline-flex items-center gap-2 hover:text-white transition-colors group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md"
                  >
                    <span className="group-hover:translate-x-0.5 transition-transform">{l.label}</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-400">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-6">Company</h4>
            <ul className="space-y-4 text-sm font-medium">
              {[
                { label: "Our Firm", href: "/about" },
                { label: "The Advantage", href: "/why-ayanco" },
                { label: "Contact Us", href: "/quote" },
              ].map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="inline-flex items-center gap-2 hover:text-white transition-colors group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md"
                  >
                    <span className="group-hover:translate-x-0.5 transition-transform">{l.label}</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-400">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-6">Global Desk</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-blue-500" />
                <a
                  href="mailto:info@ayanco.com"
                  className="hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md"
                >
                  info@ayanco.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-blue-500" />
                <a
                  href="tel:+8801234567890"
                  className="hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md"
                >
                  +880 1234-567890
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-blue-500 shrink-0 mt-0.5" />
                <span>Dhaka, Bangladesh</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-slate-600">
          <p>© {new Date().getFullYear()} Ayanco Trade Corp. All Rights Reserved.</p>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-slate-400 transition-colors">
              Privacy
            </Link>
            <Link href="#" className="hover:text-slate-400 transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
