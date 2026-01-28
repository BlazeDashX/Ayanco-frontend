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
];

const WHATSAPP_URL = "https://wa.me/8801711000000";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navbarClasses = cn(
    "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
    isScrolled
      ? "bg-white/85 backdrop-blur-xl border-slate-200 shadow-sm py-3"
      : "bg-transparent border-transparent py-5"
  );

  const textClasses = isScrolled
    ? "text-slate-700 hover:text-blue-900"
    : "text-slate-100 hover:text-white";

  const logoMain = isScrolled ? "text-blue-900" : "text-white";
  const logoSub = isScrolled ? "text-slate-500" : "text-blue-200";

  return (
    <>
      {/* NAVBAR */}
      <nav className={navbarClasses}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2">
            <div className={cn("font-extrabold text-2xl tracking-tight", logoMain)}>
              AYANCO
              <span className={cn("font-light ml-0.5", logoSub)}>TRADE</span>
            </div>
          </Link>

          {/* DESKTOP LINKS */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => {
              const active = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative text-sm font-medium transition-colors group",
                    textClasses,
                    active && "font-semibold"
                  )}
                >
                  {link.name}

                  {/* Animated underline */}
                  <span
                    className={cn(
                      "absolute left-0 -bottom-1 h-[2px] bg-blue-600 transition-all duration-300",
                      active ? "w-full" : "w-0 group-hover:w-full"
                    )}
                  />
                </Link>
              );
            })}
          </div>

          {/* DESKTOP ACTIONS */}
          <div className="hidden lg:flex items-center gap-6">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "text-sm font-medium flex items-center gap-2 transition-colors",
                textClasses
              )}
            >
              <MessageCircle size={18} /> Contact Support
            </a>

            <Button
              asChild
              className={cn(
                "rounded-full px-6 font-semibold transition-transform hover:scale-[1.04] active:scale-[0.97]",
                isScrolled
                  ? "bg-blue-600 hover:bg-blue-500 text-white"
                  : "bg-white text-blue-900 hover:bg-slate-100"
              )}
            >
              <Link href="/quote">Request Quote</Link>
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

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed top-0 left-0 right-0 z-50 bg-white pt-24 px-6 lg:hidden"
            >
              <div className="flex flex-col gap-8 text-center">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "text-2xl font-semibold transition-colors",
                      pathname === link.href
                        ? "text-blue-600"
                        : "text-slate-800"
                    )}
                  >
                    {link.name}
                  </Link>
                ))}

                <div className="mt-10 flex flex-col gap-4 pb-10">
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 text-slate-600 hover:text-green-600 transition-colors"
                  >
                    <MessageCircle size={20} /> Contact Support
                  </a>

                  <Button
                    asChild
                    size="lg"
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white rounded-full py-6 shadow-xl"
                  >
                    <Link href="/quote">
                      Request Quote <ArrowRight className="ml-2" size={20} />
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
