"use client";

import { useEffect } from "react";

/**
 * Mount this once at the top of the founder page layout.
 * It drives all .reveal → .is-visible animations without any
 * per-component observer boilerplate.
 */
export default function ScrollRevealProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal, .stagger")
    );

    if (prefersReduced) {
      targets.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -50px 0px" }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return <>{children}</>;
}