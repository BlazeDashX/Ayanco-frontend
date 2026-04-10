"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
  hoverScale?: number;
}

export function AnimatedCard({
  children,
  className,
  delay = 0,
  hover = true,
  hoverScale = 1.02,
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, delay }}
      whileHover={hover ? { scale: hoverScale } : undefined}
      className={cn(
        "bg-white border border-zinc-200 p-6 md:p-8 transition-shadow",
        hover && "hover:shadow-lg hover:border-[#C4882A]/30",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
