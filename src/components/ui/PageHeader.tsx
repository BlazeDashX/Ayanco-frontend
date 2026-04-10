import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  badge?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  description?: string; // alias for subtitle/extended text
  /** "dark" (default) = zinc-950 bg. "light" = stone-50 bg with dark text */
  variant?: "dark" | "light";
  centered?: boolean;
  children?: React.ReactNode;
}

/**
 * Lightweight page header — replaces PageHero on inner pages.
 * No background image, no external network request, compact height (~180px).
 * Eliminates the 30-second page load caused by full-screen hero images.
 */
export default function PageHeader({
  badge,
  title,
  highlight,
  subtitle,
  description,
  variant = "dark",
  centered = false,
  children,
}: PageHeaderProps) {
  const isDark = variant === "dark";

  return (
    <section
      className={cn(
        "relative w-full overflow-hidden pt-28 pb-14",
        isDark ? "bg-zinc-950" : "bg-stone-50 border-b border-zinc-200"
      )}
    >
      {/* Top gold accent line */}
      <div
        className={cn(
          "absolute top-0 inset-x-0 h-px",
          isDark
            ? "bg-gradient-to-r from-transparent via-gold/60 to-transparent"
            : "bg-gradient-to-r from-transparent via-gold/40 to-transparent"
        )}
      />

      {/* Subtle ambient glow — dark variant only */}
      {isDark && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(600px circle at 30% 60%, rgba(196,136,42,0.07), transparent 60%)",
          }}
        />
      )}

      <div
        className={cn(
          "relative z-10 max-w-7xl mx-auto px-6",
          centered && "text-center"
        )}
      >
        {badge && (
          <motion.p
            className="font-accent text-[10px] font-bold text-gold uppercase tracking-[0.3em] mb-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {badge}
          </motion.p>
        )}

        <motion.h1
          className={cn(
            "font-display text-4xl md:text-5xl font-black tracking-tight leading-none mb-5",
            isDark ? "text-zinc-50" : "text-zinc-900"
          )}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
        >
          {title}
          {highlight && (
            <>
              {" "}
              <span className="text-gold">{highlight}</span>
            </>
          )}
        </motion.h1>

        {(subtitle || description) && (
          <motion.p
            className={cn(
              "font-body text-base md:text-lg leading-relaxed max-w-2xl",
              isDark ? "text-stone-400" : "text-zinc-500",
              centered && "mx-auto"
            )}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {subtitle || description}
          </motion.p>
        )}

        {children && (
          <motion.div
            className={cn("mt-8", centered && "flex justify-center")}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}
