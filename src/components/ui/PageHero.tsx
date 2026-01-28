"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  badge?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  bgImage?: string;

  primaryCta?: {
    label: string;
    href: string;
  };

  secondaryCta?: {
    label: string;
    href: string;
  };

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
    <section
      className={cn(
        "relative w-full overflow-hidden bg-slate-950 flex items-center justify-center",
        minHeightClassName
      )}
    >
      {/* Background Image */}
      {bgImage && (
        <motion.div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${bgImage}')` }}
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
      )}

      {/* Overlays */}
      <div className="absolute inset-0 z-10 bg-slate-950/60" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
      
      {/* Content */}
      <div
        className={cn(
          "relative z-20 w-full max-w-7xl mx-auto px-6 text-center",
          topOffsetClassName,
          "pb-24 md:pb-32"
        )}
      >
        <div className="max-w-4xl mx-auto space-y-8 md:space-y-10">
          
          {/* Badge */}
          {badge && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-400/30 bg-blue-500/10 text-blue-200 text-xs md:text-sm font-bold tracking-[0.2em] uppercase backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
                {badge}
              </span>
            </motion.div>
          )}

          {/* Title - REFINED SIZES (Smaller & More Premium) */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tighter leading-[1.1] text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {title}
            {highlight && (
              <>
                <br className="hidden md:block" />{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400">
                  {highlight}
                </span>
              </>
            )}
          </motion.h1>

          {/* Subtitle - REFINED SIZES */}
          {subtitle && (
            <motion.p
              className="text-base sm:text-lg md:text-xl text-slate-300 font-light leading-relaxed max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              {subtitle}
            </motion.p>
          )}

          {/* CTA Buttons */}
          {(hasPrimary || hasSecondary) && (
            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-4 pt-6 md:pt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              {hasPrimary && (
                <Button
                  asChild
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-500 text-white h-14 px-8 text-base md:text-lg font-bold rounded-full shadow-lg shadow-blue-600/25 transition-all hover:scale-105"
                >
                  <Link href={primaryCta!.href}>{primaryCta!.label}</Link>
                </Button>
              )}

              {hasSecondary && (
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  // FIX APPLIED HERE: Added 'bg-transparent' to fix the white blob issue
                  className="bg-transparent border-white/20 text-white hover:bg-white hover:text-slate-900 h-14 px-8 text-base md:text-lg font-bold rounded-full backdrop-blur-sm transition-all"
                >
                  <Link href={secondaryCta!.href}>{secondaryCta!.label}</Link>
                </Button>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}