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
  { name: "About", href: "/about" },
  { name: "Products", href: "/products" },
  { name: "Services", href: "/services" },
  { name: "Why Ayanco", href: "/why-ayanco" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Scroll detection to toggle styles
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Dynamic classes based on scroll state
  const navbarClasses = cn(
    "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out border-b",
    isScrolled
      ? "bg-white/95 backdrop-blur-md border-slate-200 py-3 shadow-sm"
      : "bg-transparent border-transparent py-5"
  );

  const textClasses = isScrolled ? "text-slate-700 hover:text-blue-900" : "text-slate-100 hover:text-white";
  const logoClasses = isScrolled ? "text-blue-900" : "text-white";
  const buttonVariant = isScrolled ? "default" : "secondary";

  return (
    <>
      <nav className={navbarClasses}>
        <div className="container mx-auto px-4 flex items-center justify-between">
          
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
                  isScrolled ? "bg-blue-600" : "bg-blue-400"
                )} />
              </Link>
            ))}
          </div>

          {/* 3. DESKTOP ACTIONS */}
          <div className="hidden lg:flex items-center gap-4">
            <Link 
              href="/contact" 
              className={cn("text-sm font-medium transition-colors", textClasses)}
            >
              Contact Support
            </Link>
            <Button 
              variant={isScrolled ? "default" : "secondary"}
              className={cn(
                "font-semibold rounded-full px-6",
                !isScrolled && "bg-white text-blue-900 hover:bg-blue-50"
              )}
            >
              Request Quote
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

      {/* 5. MOBILE MENU OVERLAY (Framer Motion) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 lg:hidden"
          >
            <div className="flex flex-col gap-6 text-center h-full">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-2xl font-bold text-slate-800 hover:text-blue-700 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <hr className="border-slate-100 my-4" />
              <Link href="/contact" className="flex items-center justify-center gap-2 text-slate-600 font-medium">
                <Phone size={18} /> Contact Support
              </Link>
              <Button size="lg" className="w-full bg-blue-900 text-white mt-4 text-lg py-6">
                Request a Quote <ArrowRight className="ml-2" size={20} />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}