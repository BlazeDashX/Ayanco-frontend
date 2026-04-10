"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useFounderMeta } from "@/hooks/useFounder";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#company", label: "Company" },
  { href: "#catalog", label: "Catalog" },
  { href: "#milestones", label: "Milestones" },
  { href: "#gallery", label: "Gallery" },
  { href: "#affiliations", label: "Affiliations" },
  { href: "#contact", label: "Contact" },
];

export default function FounderNav() {
  const { name } = useFounderMeta();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = () => setMenuOpen(false);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? "bg-[#0a0a0f]/95 backdrop-blur-xl border-b border-[color:var(--gold)]/10 shadow-lg shadow-black/20" 
        : "bg-transparent"
    }`}>
      <nav
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center"
        role="navigation"
        aria-label="Main Navigation"
      >
        {/* Wordmark */}
        <Link
          href="#"
          className="font-name text-xl sm:text-2xl text-white leading-none hover:text-[color:var(--gold)] transition-colors duration-300"
        >
          {name}
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="lux-underline text-white/70 hover:text-[color:var(--gold)] font-medium text-xs tracking-[0.15em] uppercase transition-colors duration-300"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-white p-2 -mr-2 rounded-lg hover:bg-white/10 transition-colors duration-300"
          aria-controls="mobile-nav"
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          id="mobile-nav"
          className="lg:hidden px-4 sm:px-6 pb-5 bg-[#0a0a0f]/98 backdrop-blur-xl border-t border-[color:var(--gold)]/10"
        >
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={handleNavClick}
              className="block py-3 text-white/80 text-sm font-medium hover:text-[color:var(--gold)] transition-colors border-b border-white/5 last:border-0"
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}