"use client";

import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";

import { usePathname } from "next/navigation";

/** Appears after the user scrolls past the hero (~100vh).
 *  Provides a persistent, low-friction conversion nudge. */
export default function StickyQuoteBar() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (dismissed) return;
    // show once they've scrolled at least 80% of viewport height
    setVisible(latest > (typeof window !== "undefined" ? window.innerHeight * 0.8 : 600));
  });

  // Do not show the quote bar if the user is already on the quote page
  if (pathname === "/quote") {
    return null;
  }

  const show = visible && !dismissed;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="sticky-bar"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 340, damping: 32 }}
          className="fixed bottom-0 inset-x-0 z-40 bg-zinc-950 border-t border-gold/30
                     shadow-[0_-8px_32px_rgba(0,0,0,0.4)]"
        >
          {/* Gold accent top line */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4
                          flex items-center justify-between gap-4 flex-wrap">
            {/* Message */}
            <div className="flex items-center gap-3 sm:gap-4 min-w-0">
              {/* Pulse dot */}
              <span className="relative flex shrink-0">
                <span className="absolute inline-flex h-2 w-2 rounded-full bg-gold opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
              </span>

              <div className="min-w-0">
                <p className="text-zinc-50 font-bold text-sm sm:text-base leading-tight">
                  Ready to source?{" "}
                  <span className="text-gold hidden sm:inline">
                    Get verified pricing in &lt; 24 hours.
                  </span>
                </p>
                <p className="text-stone-400 text-xs mt-0.5 hidden sm:block">
                  Our global trade desk responds within one business day — guaranteed.
                </p>
              </div>
            </div>

            {/* CTA + close */}
            <div className="flex items-center gap-3 shrink-0">
              <motion.div whileTap={{ scale: 0.96 }}>
                <Link
                  href="/quote"
                  className="inline-flex items-center gap-2 h-9 sm:h-10 px-5 sm:px-6
                             bg-gold hover:bg-gold-dark text-zinc-950 font-bold text-sm
                             transition-colors whitespace-nowrap"
                >
                  Request Quote <ArrowRight size={14} />
                </Link>
              </motion.div>

              <button
                onClick={() => setDismissed(true)}
                aria-label="Dismiss"
                className="p-1.5 text-stone-500 hover:text-stone-300 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
