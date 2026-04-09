"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  badge?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  bgImage?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  topOffsetClassName?: string;
  minHeightClassName?: string;
}

export default function PageHero({
  badge,
  title,
  highlight,
  subtitle,
  bgImage,
  primaryCta,
  secondaryCta,
  topOffsetClassName = "pt-32 md:pt-40",
  minHeightClassName = "min-h-[80vh] md:min-h-[86vh]",
}: PageHeroProps) {
  const hasPrimary = Boolean(primaryCta?.label?.trim() && primaryCta?.href);
  const hasSecondary = Boolean(secondaryCta?.label?.trim() && secondaryCta?.href);

  return (
    <section className={cn("relative w-full overflow-hidden bg-[#09090B] flex items-center", minHeightClassName)}>
      {/* Top brass accent line */}
      <div className="absolute top-0 inset-x-0 h-px bg-[#C4882A]/60 z-20" />

      {/* Background Image */}
      {bgImage && (
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${bgImage}')` }}
        />
      )}

      {/* Overlays */}
      <div className="absolute inset-0 z-10 bg-[#09090B]/70" />
      <div className="absolute inset-0 z-10" style={{ background: "linear-gradient(105deg, #09090B 40%, rgba(9,9,11,0.35) 100%)" }} />
      <div className="absolute inset-0 z-10" style={{ background: "linear-gradient(to top, #09090B 0%, transparent 55%)" }} />

      {/* Content — left-aligned (matches HeroSlider) */}
      <div className={cn("relative z-20 w-full max-w-7xl mx-auto px-6", topOffsetClassName, "pb-24 md:pb-32")}>
        <div className="max-w-2xl space-y-6">

          {badge && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <p className="text-[10px] font-bold text-[#C4882A] uppercase tracking-[0.25em]">{badge}</p>
            </motion.div>
          )}

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-none text-[#FAFAF9]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.05 }}
          >
            {title}
            {highlight && (
              <>
                <br className="hidden md:block" />{" "}
                <span className="text-[#C4882A]">{highlight}</span>
              </>
            )}
          </motion.h1>

          {subtitle && (
            <motion.p
              className="text-[#A8A29E] text-base md:text-lg font-light leading-relaxed max-w-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.65, delay: 0.12 }}
            >
              {subtitle}
            </motion.p>
          )}

          {(hasPrimary || hasSecondary) && (
            <motion.div
              className="flex flex-wrap gap-3 pt-2"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.18 }}
            >
              {hasPrimary && (
                <Link
                  href={primaryCta!.href}
                  className="inline-flex items-center gap-2 h-11 px-7 bg-[#C4882A] hover:bg-[#D4952E] text-[#09090B] font-bold text-sm transition-colors"
                >
                  {primaryCta!.label} <ArrowRight size={15} />
                </Link>
              )}
              {hasSecondary && (
                <Link
                  href={secondaryCta!.href}
                  className="inline-flex items-center gap-2 h-11 px-7 border border-white/12 text-[#A8A29E] hover:text-[#FAFAF9] hover:border-white/20 font-medium text-sm transition-colors"
                >
                  {secondaryCta!.label}
                </Link>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}