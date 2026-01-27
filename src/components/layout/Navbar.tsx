"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "Services", href: "/services" },
  { name: "Why Ayanco", href: "/why-ayanco" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // 1. Optimized Scroll Detection
  useEffect(() => {
    const handleScroll = () => {
      // Check if value actually changed to avoid re-renders
      const shouldBeScrolled = window.scrollY > 20;
      if (shouldBeScrolled !== isScrolled) {
        setIsScrolled(shouldBeScrolled);
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolled]); // Add dependency to suppress warnings

  // 2. Safe Mobile Menu Closing (Fixes the Warning)
  useEffect(() => {
    // Only update state if it actually needs to change
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  // Dynamic Styles
  const navbarClasses = cn(
    "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out border-b",
    isScrolled
      ? "bg-white/95 backdrop-blur-md border-slate-200 py-3 shadow-sm"
      : "bg-transparent border-transparent py-5"
  );

  const textClasses = isScrolled 
    ? "text-slate-700 hover:text-blue-900" 
    : "text-slate-100 hover:text-white shadow-sm drop-shadow-md";

  const logoClasses = isScrolled ? "text-blue-900" : "text-white drop-shadow-md";

  return (
    <>
      <nav className={navbarClasses}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          
          {/* LOGO */}
          <Link href="/" className="group flex items-center gap-2">
            <div className={cn("font-extrabold text-2xl tracking-tighter transition-colors", logoClasses)}>
              AYANCO<span className={isScrolled ? "text-slate-500 font-light" : "text-blue-200 font-light"}>TRADE</span>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-bold transition-colors relative group tracking-wide",
                  textClasses,
                  pathname === link.href && "opacity-100"
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

          {/* DESKTOP ACTIONS */}
          <div className="hidden lg:flex items-center gap-6">
            <Link 
              href="/contact" 
              className={cn("text-sm font-bold transition-colors hover:opacity-80", textClasses)}
            >
              Contact Support
            </Link>
            <Button 
              asChild
              variant={isScrolled ? "default" : "secondary"}
              className={cn(
                "font-bold rounded-full px-6 transition-all active:scale-95 shadow-lg",
                isScrolled 
                  ? "bg-blue-900 text-white hover:bg-blue-800" 
                  : "bg-white text-blue-900 hover:bg-slate-100 border-none"
              )}
            >
              <Link href="/contact">Request Quote</Link>
            </Button>
          </div>

          {/* MOBILE TOGGLE */}
          <button
            className={cn("lg:hidden p-2 rounded-md transition-colors", textClasses)}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
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
              
              <div className="flex flex-col gap-4 mt-2">
                <Link href="/contact" className="flex items-center justify-center gap-2 text-slate-600 font-medium">
                  <Phone size={18} /> Contact Support
                </Link>
                <Button asChild size="lg" className="w-full bg-blue-900 text-white text-lg py-6 shadow-xl">
                  <Link href="/contact">
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