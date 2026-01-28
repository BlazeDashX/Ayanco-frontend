/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useMotionTemplate,
  type Variants,
  type Easing,
} from "framer-motion";
import { ArrowRight, Globe, ShieldCheck, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

/* ---------------- DATA ---------------- */

const services = [
  {
    icon: Globe,
    title: "Sourcing",
    tag: "Global Network",
    desc: "We identify vetted suppliers across 15+ countries, ensuring raw material quality before it even ships.",
  },
  {
    icon: ShieldCheck,
    title: "Compliance",
    tag: "ISO Certified",
    desc: "Every shipment undergoes rigorous QA checks, adhering to international trade standards and certifications.",
  },
  {
    icon: Truck,
    title: "Logistics",
    tag: "End-to-End",
    desc: "From customs clearance to last-mile delivery, we manage the entire supply chain with real-time tracking.",
  },
];

/* ---------------- MOTION CONFIG ---------------- */

const ease: Easing = [0.22, 1, 0.36, 1];

const leftBlock: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.85,
      ease,
      delay: 0.1 + i * 0.12,
    },
  }),
};

/* ---------------- TILT CARD ---------------- */

function TiltCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotX = useSpring(useTransform(y, [-40, 40], [6, -6]), { stiffness: 220, damping: 18 });
  const rotY = useSpring(useTransform(x, [-40, 40], [-6, 6]), { stiffness: 220, damping: 18 });

  const shine = useMotionTemplate`radial-gradient(
    250px at ${x}px ${y}px,
    rgba(59,130,246,0.18),
    transparent 55%
  )`;

  return (
    <motion.div
      style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
      onMouseMove={(e) => {
        const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
        x.set(e.clientX - rect.left - rect.width / 2);
        y.set(e.clientY - rect.top - rect.height / 2);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className={className}
    >
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ backgroundImage: shine }}
      />
      {children}
    </motion.div>
  );
}

/* ---------------- MAIN COMPONENT ---------------- */

export default function ServiceParallax() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const leftY = useTransform(scrollYProgress, [0, 1], [18, -18]);
  const rightY = useTransform(scrollYProgress, [0, 1], [-10, 10]);
  const spotX = useTransform(scrollYProgress, [0, 1], ["30%", "70%"]);
  const spotY = useTransform(scrollYProgress, [0, 1], ["30%", "60%"]);

  const spotlight = useMotionTemplate`radial-gradient(
    600px at ${spotX} ${spotY},
    rgba(59,130,246,0.14),
    transparent 60%
  )`;

  return (
    <section ref={ref} className="relative py-24 bg-slate-950 text-white overflow-hidden">
      <motion.div style={{ background: spotlight }} className="pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900/60" />

      <div className="container mx-auto px-6 relative">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          
          {/* LEFT CONTENT */}
          <motion.div
            style={{ y: leftY }}
            variants={leftBlock}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            className="lg:w-1/2 space-y-8"
          >
            <div className="space-y-6">
              {/* FIX: Reduced Font Size for Mobile to prevent overflow */}
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.1]">
                Streamlining <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                  Complexity.
                </span>
              </h2>

              <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-xl">
                We don't just move goods; we engineer supply chains. From strict compliance checks in origin countries to final-mile logistics, Ayanco safeguards your business interest.
              </p>
            </div>

            <Button asChild size="lg" className="w-full md:w-auto rounded-full px-8 h-14 bg-white text-blue-950 hover:bg-blue-50 font-bold text-base transition-transform hover:scale-105">
              <Link href="/services">
                Explore Our Services <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>

          {/* RIGHT CARDS */}
          <motion.div style={{ y: rightY }} className="lg:w-1/2 w-full flex flex-col gap-5">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                className="group relative"
              >
                <TiltCard className="relative p-6 md:p-8 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/15 transition-all duration-300">
                  {/* FIX: Mobile Flex Layout Stack */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4 relative">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-500/20 text-blue-400 rounded-lg group-hover:bg-blue-500 group-hover:text-white transition-colors">
                        <s.icon size={24} />
                      </div>
                      <h3 className="text-2xl font-bold">{s.title}</h3>
                    </div>
                    {/* Tag aligned cleanly on mobile */}
                    <span className="self-start sm:self-auto text-[10px] md:text-xs font-bold uppercase tracking-wider text-blue-300 bg-blue-500/10 px-3 py-1 rounded-full whitespace-nowrap">
                      {s.tag}
                    </span>
                  </div>

                  <p className="text-slate-400 text-sm md:text-base leading-relaxed sm:pl-[60px] relative">
                    {s.desc}
                  </p>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}