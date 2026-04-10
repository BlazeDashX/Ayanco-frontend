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
import Link from "next/link";
import Image from "next/image";
import { SERVICES } from "@/data/home/services";

const iconMap: Record<string, React.ElementType> = { Globe, ShieldCheck, Truck };

const ease: Easing = [0.22, 1, 0.36, 1];

const leftBlock: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease, delay: 0.1 + i * 0.12 },
  }),
};

function ServiceCard({ s, i }: { s: typeof SERVICES[0]; i: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotX = useSpring(useTransform(y, [-40, 40], [3, -3]), { stiffness: 200, damping: 20 });
  const rotY = useSpring(useTransform(x, [-40, 40], [-3, 3]), { stiffness: 200, damping: 20 });
  const shine = useMotionTemplate`radial-gradient(260px at ${x}px ${y}px, rgba(196,136,42,0.08), transparent 60%)`;

  return (
    <motion.div
      key={s.title}
      custom={i}
      variants={cardVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      className="group relative"
    >
      <motion.div
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          x.set(e.clientX - rect.left - rect.width / 2);
          y.set(e.clientY - rect.top - rect.height / 2);
        }}
        onMouseLeave={() => { x.set(0); y.set(0); }}
        className="relative border border-zinc-200 bg-white hover:border-gold/50 hover:shadow-xl hover:shadow-gold/8 transition-all duration-300 overflow-hidden"
      >
        {/* Image top strip */}
        <div className="h-40 relative overflow-hidden">
          <Image
            src={s.image}
            alt={s.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-zinc-900/40" />
          <div className="absolute inset-0 bg-linear-to-t from-white via-transparent" />
          <span className="absolute top-3 right-3 text-[9px] font-bold text-white/80 border border-white/20 bg-black/30 backdrop-blur-sm px-2 py-0.5 uppercase tracking-wider">
            {s.tag}
          </span>
        </div>

        {/* Content */}
        <div className="p-6 md:p-7">
          <div className="flex items-start gap-4">
            <span className="text-[10px] font-bold text-gold/60 tracking-[0.25em] pt-1 shrink-0">{s.num}</span>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 border border-zinc-200 bg-zinc-50 text-gold group-hover:bg-gold group-hover:text-white group-hover:border-gold transition-all duration-300">
                  <s.icon />
                </div>
                <h3 className="font-display text-zinc-900 font-bold text-base">{s.title}</h3>
              </div>
              <p className="font-lato text-zinc-500 text-sm leading-relaxed">{s.description}</p>
            </div>
          </div>
        </div>

        <motion.div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: shine }} />
      </motion.div>
    </motion.div>
  );
}

export default function ServiceParallax() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const leftY = useTransform(scrollYProgress, [0, 1], [16, -16]);
  const rightY = useTransform(scrollYProgress, [0, 1], [-10, 10]);

  return (
    <section ref={ref} className="relative py-24 md:py-32 bg-[#F5F4F0] overflow-hidden border-t border-zinc-200">
      <div className="container mx-auto px-6 max-w-7xl relative">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-28 items-start">

          {/* LEFT sticky */}
          <motion.div
            style={{ y: leftY }}
            variants={leftBlock}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="lg:w-[38%] space-y-8 lg:sticky lg:top-32"
          >
            <p className="font-accent text-[10px] font-bold text-gold uppercase tracking-[0.25em]">Core Services</p>

            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.05] text-zinc-900">
              Engineered for{" "}
              <span className="text-gold">Scale.</span>
            </h2>

            <p className="font-lato text-zinc-500 text-base leading-relaxed max-w-sm">
              We don&apos;t just move goods — we engineer supply chains. From origin compliance to last-mile logistics, Ayanco safeguards your business interests.
            </p>

            <motion.div whileTap={{ scale: 0.96 }} whileHover={{ scale: 1.02 }}>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 h-11 px-7 bg-gold hover:bg-gold-dark text-white font-bold text-sm transition-colors"
              >
                All Services <ArrowRight size={17} />
              </Link>
            </motion.div>
          </motion.div>

          {/* RIGHT CARDS */}
          <motion.div style={{ y: rightY }} className="lg:w-[62%] w-full flex flex-col gap-4">
            {SERVICES.map((s, i) => {
              const Icon = iconMap[s.icon] || Globe;
              const serviceWithIcon = { ...s, icon: Icon as any };
              return <ServiceCard key={s.title} s={serviceWithIcon} i={i} />;
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}