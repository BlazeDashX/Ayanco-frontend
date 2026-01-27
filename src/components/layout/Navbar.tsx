/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Products", href: "/products" },
  { name: "Services", href: "/services" },
  { name: "Why Ayanco", href: "/why-ayanco" },
  // Removed "Request Quote" from here to avoid duplication with the main button
];

// Replace with your actual WhatsApp number
const WHATSAPP_URL = "https://wa.me/8801711000000"; 

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll(); // Check on mount
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  }, [pathname]);

  // Dynamic Styles
  const navbarClasses = cn(
    "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out border-b",
    isScrolled
      ? "bg-white/95 backdrop-blur-md border-slate-200 py-3 shadow-sm"
      : "bg-transparent border-transparent py-5"
  );

  const textClasses = isScrolled ? "text-slate-700 hover:text-blue-900" : "text-slate-100 hover:text-white";
  const logoClasses = isScrolled ? "text-blue-900" : "text-white";

  return (
    <>
      <nav className={navbarClasses}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          
          {/* 1. LOGO */}
          <Link href="/" className="group flex items-center gap-2">
            <div className={cn("font-extrabold text-2xl tracking-tighter transition-colors", logoClasses)}>
              AYANCO<span className={isScrolled ? "text-slate-500 font-light" : "text-blue-200 font-light"}>TRADE</span>
            </div>
          </Link>

          {/* 2. DESKTOP NAVIGATION */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors relative group",
                  textClasses,
                  pathname === link.href && "font-bold"
                )}
              >
                {link.name}
                <span className={cn(
                  "absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full",
                  isScrolled ? "bg-blue-600" : "bg-white"
                )} />
              </Link>
            ))}
          </div>

          {/* 3. DESKTOP ACTIONS */}
          <div className="hidden lg:flex items-center gap-6">
            {/* WhatsApp Link */}
            <a 
              href={WHATSAPP_URL} 
              target="_blank" 
              rel="noopener noreferrer"
              className={cn("text-sm font-bold transition-colors flex items-center gap-2 hover:opacity-80", textClasses)}
            >
              <MessageCircle size={18} /> Contact Support
            </a>
            
            {/* CTA Button */}
            <Button 
              asChild
              variant={isScrolled ? "default" : "secondary"}
              className={cn(
                "font-bold rounded-full px-6 shadow-lg transition-all hover:scale-105 active:scale-95",
                !isScrolled && "bg-white text-blue-900 hover:bg-slate-100 border-none"
              )}
            >
              <Link href="/quote">Request Quote</Link>
            </Button>
          </div>

          {/* 4. MOBILE HAMBURGER */}
          <button
            className={cn("lg:hidden p-2 rounded-md transition-colors", textClasses)}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* 5. MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 lg:hidden flex flex-col h-screen"
          >
            <div className="flex flex-col gap-8 text-center">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-2xl font-bold transition-colors",
                    pathname === link.href ? "text-blue-600" : "text-slate-800"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              
              <hr className="border-slate-100 w-1/2 mx-auto" />
              
              <div className="flex flex-col gap-4 mt-auto pb-12">
                <a 
                  href={WHATSAPP_URL}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 text-slate-600 font-medium hover:text-green-600 transition-colors"
                >
                  <MessageCircle size={20} /> Contact Support
                </a>
                
                <Button asChild size="lg" className="w-full bg-blue-900 text-white text-lg py-6 shadow-xl">
                  <Link href="/quote">
                    Request a Quote <ArrowRight className="ml-2" size={20} />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}