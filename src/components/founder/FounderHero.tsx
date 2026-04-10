"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useFounderMeta, useSocialLinks } from "@/hooks/useFounder";

// Social icons mapping
const SocialIcon = ({ name }: { name: string }) => {
  const icons: Record<string, React.ReactNode> = {
    linkedin: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    facebook: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
    twitter: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
    instagram: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
      </svg>
    ),
  };
  return icons[name] || null;
};

export default function FounderHero() {
  const { name, title, subtitle, portraitSrc, portraitAlt, ctaLabel, ctaHref } =
    useFounderMeta();
  const socialLinks = useSocialLinks();

  return (
    <section className="hero-premium text-white relative">
      {/* Animated Background Orbs */}
      <div className="hero-orb hero-orb-1" aria-hidden="true" />
      <div className="hero-orb hero-orb-2" aria-hidden="true" />
      <div className="hero-orb hero-orb-3" aria-hidden="true" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
        {/* Left column - Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="flex flex-col gap-6 lg:gap-8 order-2 lg:order-1"
        >
          {/* Eyebrow Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex"
          >
            <span className="px-4 py-2 rounded-full border border-[color:var(--gold)]/30 bg-[color:var(--gold)]/10 text-[color:var(--gold)] text-xs font-bold tracking-[0.2em] uppercase backdrop-blur-sm">
              Executive E-Portfolio
            </span>
          </motion.div>

          {/* Main Title */}
          <h1 className="font-display font-bold leading-[1.1] shimmer-text text-4xl sm:text-5xl lg:text-6xl xl:text-7xl">
            {title}
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-gray-300/90 max-w-xl leading-relaxed font-light">
            {subtitle}
          </p>

          {/* Name */}
          <p className="font-name text-2xl sm:text-3xl text-[color:var(--gold)] italic">
            {name}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mt-4">
            <Link
              href={ctaHref}
              className="cta-gold cta-pulse rounded-xl px-8 py-4 font-bold text-sm tracking-wide inline-flex items-center gap-2"
              role="button"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
              {ctaLabel}
            </Link>
            <Link
              href="#about"
              className="group border border-white/20 text-white/80 hover:bg-white/10 hover:border-white/40 transition-all duration-300 rounded-xl px-8 py-4 font-bold text-sm tracking-wide inline-flex items-center gap-2"
            >
              Learn More
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="flex gap-8 mt-6 pt-6 border-t border-white/10">
            <div>
              <p className="text-3xl font-bold text-[color:var(--gold)]">14+</p>
              <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">Years Experience</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-[color:var(--gold)]">5</p>
              <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">Business Sectors</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-[color:var(--gold)]">2016</p>
              <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">Founded</p>
            </div>
          </div>

          {/* Social Links - Horizontal on mobile, moves to vertical on desktop */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex lg:hidden items-center gap-4 mt-4"
          >
            <span className="text-xs text-gray-400 uppercase tracking-wider">Connect:</span>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white/70 hover:text-[color:var(--gold)] hover:border-[color:var(--gold)]/50 hover:bg-[color:var(--gold)]/10 transition-all duration-300"
                  aria-label={`Follow on ${social.name}`}
                >
                  <SocialIcon name={social.icon} />
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Right column - Portrait + Desktop Social Links */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="flex justify-center lg:justify-end items-center gap-6 order-1 lg:order-2"
        >
          {/* Desktop: Vertical Social Links - Left of Portrait */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="hidden lg:flex flex-col items-center gap-4"
          >
            <div className="w-px h-12 bg-gradient-to-b from-transparent via-[color:var(--gold)]/50 to-transparent" />
            <div className="flex flex-col gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-11 h-11 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white/60 hover:text-[color:var(--gold)] hover:border-[color:var(--gold)] hover:bg-[color:var(--gold)]/10 transition-all duration-300 hover:scale-110"
                  aria-label={`Follow on ${social.name}`}
                >
                  <SocialIcon name={social.icon} />
                </a>
              ))}
            </div>
            <div className="w-px h-12 bg-gradient-to-b from-transparent via-[color:var(--gold)]/50 to-transparent" />
            <span className="text-[10px] text-gray-400 uppercase tracking-widest writing-mode-vertical rotate-180" style={{ writingMode: 'vertical-rl' }}>Connect</span>
          </motion.div>

          <div className="relative">
            {/* Glow effect behind portrait */}
            <div className="absolute inset-0 bg-gradient-radial from-[color:var(--gold)]/20 via-[color:var(--gold)]/5 to-transparent blur-3xl scale-110" aria-hidden="true" />
            
            {/* Floating decorative orbs */}
            <div className="absolute -top-8 -left-8 w-20 h-20 rounded-full border border-[color:var(--gold)]/20 animate-pulse" aria-hidden="true" />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full border border-[color:var(--gold)]/10" aria-hidden="true" />
            <div className="absolute top-1/2 -right-12 w-4 h-4 rounded-full bg-[color:var(--gold)]/40" aria-hidden="true" />
            
            {/* Main Portrait - No container, pure PNG */}
            <div className="relative drop-shadow-2xl">
              <Image
                src={portraitSrc}
                alt={portraitAlt}
                width={560}
                height={700}
                className="w-full h-auto max-w-[400px] sm:max-w-[480px] lg:max-w-[520px] xl:max-w-[560px] object-contain relative z-10"
                style={{ 
                  filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.5))',
                  maskImage: 'linear-gradient(to bottom, black 90%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 90%, transparent 100%)'
                }}
                priority
              />
            </div>

            {/* Gold accent line */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[color:var(--gold)] to-transparent" aria-hidden="true" />
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[color:var(--bg)] to-transparent pointer-events-none" />
    </section>
  );
}