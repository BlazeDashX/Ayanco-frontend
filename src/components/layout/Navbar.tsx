"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Products", href: "/products" },
  { name: "Services", href: "/services" },
  { name: "Why Ayanco", href: "/why-ayanco" },
  { name: "FAQ", href: "/faq" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  // On non-homepage routes, always show the solid white navbar (text would be
  // invisible on light backgrounds in the transparent state).
  // On the homepage, start transparent and switch to solid after 40px scroll.
  const [isScrolled, setIsScrolled] = useState(!isHomePage);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isHomePage) {
      setIsScrolled(true);
      return;
    }
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setIsMobileMenuOpen(false); }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-white/95 backdrop-blur-lg border-b border-zinc-200 shadow-sm py-3"
            : "bg-transparent border-b border-transparent py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-8">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="w-8 h-8 bg-gold flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="1" y="1" width="6" height="6" fill="white" />
                <rect x="9" y="1" width="6" height="6" fill="white" opacity="0.5" />
                <rect x="1" y="9" width="6" height="6" fill="white" opacity="0.5" />
                <rect x="9" y="9" width="6" height="6" fill="white" />
              </svg>
            </div>
            <div className="flex items-baseline gap-1">
              <span className={cn("font-black text-base tracking-tight transition-colors", isScrolled ? "text-zinc-900" : "text-white")}>
                AYANCO
              </span>
              <span className="font-black text-base tracking-tight text-gold">TRADE</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "px-3.5 py-2 text-sm font-semibold transition-colors",
                  isActive(link.href)
                    ? "text-gold"
                    : isScrolled
                      ? "text-zinc-600 hover:text-zinc-900"
                      : "text-white/80 hover:text-white"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-2">
            <Link
              href="/contact"
              className={cn("px-3.5 py-2 text-sm font-semibold transition-colors",
                isScrolled ? "text-zinc-600 hover:text-zinc-900" : "text-white/80 hover:text-white"
              )}
            >
              Contact
            </Link>
            <motion.div whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.03 }}>
              <Link
                href="/quote"
                className="inline-flex items-center gap-2 h-9 px-5 bg-gold hover:bg-gold-dark text-white font-bold text-sm transition-colors"
              >
                Request Quote <ArrowRight size={14} />
              </Link>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <button
            className={cn("md:hidden p-2 transition-colors", isScrolled ? "text-zinc-700" : "text-white")}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[60px] inset-x-0 z-40 bg-white border-b border-zinc-200 shadow-lg"
          >
            <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "py-2.5 text-sm font-semibold border-b border-zinc-100 last:border-0 transition-colors",
                    isActive(link.href) ? "text-gold" : "text-zinc-700 hover:text-zinc-900"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/contact"
                className="py-2.5 text-sm font-semibold text-zinc-700 border-b border-zinc-100"
              >
                Contact
              </Link>
              <motion.div whileTap={{ scale: 0.96 }} className="mt-3">
                <Link
                  href="/quote"
                  className="inline-flex items-center justify-center gap-2 h-11 px-7 bg-gold hover:bg-gold-dark text-white font-bold text-sm transition-colors w-full"
                >
                  Request Quote <ArrowRight size={15} />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
