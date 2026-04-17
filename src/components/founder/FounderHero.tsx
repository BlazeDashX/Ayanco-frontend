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
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    facebook: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    twitter: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    wechat: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M8.7 13.6c-4.8 0-8.7-3.2-8.7-7.2s3.9-7.2 8.7-7.2c4.8 0 8.7 3.2 8.7 7.2-1.2-.2-2.5-.3-3.8-.3-5.2 0-9.4 3.5-9.4 7.9 0 1.2.3 2.3.9 3.3l-1.9 1.1c-.2.1-.5 0-.6-.2-.1-.1-.1-.3-.1-.4l.6-1.8c-1.8-1.1-2.9-2.7-2.9-4.5zM24 14.1c0-4.1-3.9-7.4-8.7-7.4s-8.7 3.3-8.7 7.4 3.9 7.4 8.7 7.4c1.3 0 2.5-.2 3.6-.7l1.7.9c.2.1.5 0 .6-.2.1-.1.1-.3.1-.4l-.5-1.5c1.9-1.2 3.2-3 3.2-5.1zm-11.6-1c-.6 0-1.1-.5-1.1-1.1s.5-1.1 1.1-1.1c.6 0 1.1.5 1.1 1.1s-.5 1.1-1.1 1.1zm5.2 0c-.6 0-1.1-.5-1.1-1.1s.5-1.1 1.1-1.1c.6 0 1.1.5 1.1 1.1s-.5 1.1-1.1 1.1z" />
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
    <section className="hero-premium min-h-dvh overflow-hidden py-24 flex flex-col text-white relative">
      {/* Animated Background Orbs */}
      <div className="hero-orb hero-orb-1" aria-hidden="true" />
      <div className="hero-orb hero-orb-2" aria-hidden="true" />
      <div className="hero-orb hero-orb-3" aria-hidden="true" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8 lg:gap-20 items-center relative z-10 pt-4 lg:pt-0">

        {/* ── LEFT COLUMN — Text ── */}
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
            <span className="px-4 py-2 rounded-full border border-(--gold)/30 bg-(--gold)/10 text-(--gold) text-xs font-bold tracking-[0.2em] uppercase backdrop-blur-sm">
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
          <p className="font-name text-2xl sm:text-3xl text-(--gold) italic">
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
              <p className="text-3xl font-bold text-(--gold)">17+</p>
              <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">Years Experience</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-(--gold)">5</p>
              <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">Business Sectors</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-(--gold)">2016</p>
              <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">Founded</p>
            </div>
          </div>
        </motion.div>

        {/* ── RIGHT COLUMN — Portrait + Social ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="flex flex-col lg:flex-row justify-center lg:justify-end items-center gap-4 lg:gap-6 order-1 lg:order-2"
        >
          {/* Desktop: Vertical Social Links */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="hidden lg:flex flex-col items-center gap-4"
          >
            <div className="w-px h-12 bg-linear-to-b from-transparent via-(--gold)/50 to-transparent" />
            <div className="flex flex-col gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-11 h-11 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white/60 hover:text-(--gold) hover:border-(--gold) hover:bg-(--gold)/10 transition-all duration-300 hover:scale-110"
                  aria-label={`Follow on ${social.name}`}
                >
                  <SocialIcon name={social.icon} />
                </a>
              ))}
            </div>
            <div className="w-px h-12 bg-linear-to-b from-transparent via-(--gold)/50 to-transparent" />
            <span
              className="text-[10px] text-gray-400 uppercase tracking-widest"
              style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
            >
              Connect
            </span>
          </motion.div>

          {/* Portrait Card */}
          <div className="relative">
            {/* Ambient glow */}
            <div
              className="absolute inset-0 blur-3xl scale-110 opacity-40 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse at center, rgba(196,136,42,0.35), transparent 70%)",
              }}
              aria-hidden="true"
            />

            {/* Decorative ring */}
            <div className="absolute -top-4 -left-4 -right-4 -bottom-4 rounded-2xl border border-(--gold)/10 pointer-events-none" aria-hidden="true" />

            {/* Image frame */}
            <div className="relative w-[290px] h-[370px] sm:w-[360px] sm:h-[460px] lg:w-[420px] lg:h-[600px] xl:w-[480px] xl:h-[640px] rounded-2xl overflow-hidden border border-(--gold)/25 shadow-2xl bg-zinc-900/50">
              <Image
                src={portraitSrc}
                alt={portraitAlt}
                fill
                className="object-contain object-top"
                priority
              />

              {/* Subtle inner vignette */}
              <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.4)] rounded-2xl pointer-events-none" />

              {/* Bottom fade into page background */}
              <div className="absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-black/80 to-transparent pointer-events-none" />

              {/* Name plate overlay at bottom */}
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="text-(--gold) text-xs font-bold uppercase tracking-[0.2em]">
                  {name}
                </p>
                <p className="text-white/60 text-[10px] tracking-wider mt-0.5">
                  Founder & CEO, Ayan International
                </p>
              </div>
            </div>

            {/* Gold corner accents */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-(--gold)/60 rounded-tl-2xl pointer-events-none" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-(--gold)/60 rounded-tr-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-(--gold)/60 rounded-bl-2xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-(--gold)/60 rounded-br-2xl pointer-events-none" />
          </div>

          {/* Mobile-only: Connect + social icons below portrait */}
          <div className="flex lg:hidden flex-col items-center gap-3 w-full mt-2">
            <span className="text-[10px] text-gray-400 uppercase tracking-[0.2em]">Connect</span>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white/70 hover:text-(--gold) hover:border-(--gold)/50 hover:bg-(--gold)/10 transition-all duration-300"
                  aria-label={`Follow on ${social.name}`}
                >
                  <SocialIcon name={social.icon} />
                </a>
              ))}
            </div>
          </div>

        </motion.div>

      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-(--bg) to-transparent pointer-events-none" />
    </section>
  );
}