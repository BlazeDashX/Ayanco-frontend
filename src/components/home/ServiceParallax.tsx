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
} from "framer-motion";
import { ArrowRight, Globe, ShieldCheck, Truck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
interface Service {
  id: string;
  title: string;
  description: string;
  image?: string;
  image_url?: string;
  icon: string;
  tag: string;
  num: string;
}

import { PREMIUM_EASE, BLUR_REVEAL, SPRING_LOW } from "@/lib/animations";

const iconMap: Record<string, React.ElementType> = { Globe, ShieldCheck, Truck };

const staggeredContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

function ServiceCard({ s, i }: { s: Service; i: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotX = useSpring(useTransform(y, [-40, 40], [4, -4]), { stiffness: 150, damping: 20 });
  const rotY = useSpring(useTransform(x, [-40, 40], [-4, 4]), { stiffness: 150, damping: 20 });
  const shine = useMotionTemplate`radial-gradient(280px at ${x}px ${y}px, rgba(196,136,42,0.12), transparent 70%)`;

  return (
    <motion.div
      key={s.title}
      custom={i}
      variants={BLUR_REVEAL}
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
        className="relative border border-zinc-200 bg-white hover:border-gold/50 hover:shadow-2xl hover:shadow-gold/5 transition-all duration-500 overflow-hidden"
      >
        {/* Image top strip */}
        <div className="h-28 relative overflow-hidden">
          <Image
            src={s.image_url || s.image || ""}
            alt={s.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-zinc-900/40" />
          <div className="absolute inset-0 bg-linear-to-t from-white via-transparent" />
          <span className="absolute top-3 right-3 text-[9px] font-bold text-white/80 border border-white/20 bg-black/30 backdrop-blur-sm px-2 py-0.5 uppercase tracking-wider">
            {s.tag}
          </span>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start gap-4">
            <span className="font-accent text-[10px] font-bold text-gold/60 tracking-[0.25em] pt-1 shrink-0">{s.num}</span>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 border border-zinc-200 bg-zinc-50 text-gold group-hover:bg-gold group-hover:text-white group-hover:border-gold transition-all duration-300">
                  {(() => {
                    const Icon = iconMap[s.icon] || Globe;
                    return <Icon size={16} />;
                  })()}
                </div>
                <h3 className="font-display text-zinc-900 font-bold text-sm md:text-sm">{s.title}</h3>
              </div>
              <p className="font-sans text-zinc-500 text-xs leading-relaxed">{s.description}</p>
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
  const [dbServices, setDbServices] = React.useState<Service[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch("/api/public/services");
        const data = await res.json();
        if (Array.isArray(data)) {
          setDbServices(data);
        }
      } catch (err) {
        console.error("Failed to fetch services:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchServices();
  }, []);

  if (!loading && dbServices.length === 0) return null;

  const displayServices = dbServices;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const leftY = useTransform(scrollYProgress, [0, 1], [24, -24]);
  const rightY = useTransform(scrollYProgress, [0, 1], [-12, 12]);

  const smoothLeftY = useSpring(leftY, SPRING_LOW);
  const smoothRightY = useSpring(rightY, SPRING_LOW);

  return (
    <section ref={ref} className="relative py-12 md:py-16 bg-[#F5F4F0] overflow-hidden border-t border-zinc-200">
      <div className="container mx-auto px-6 max-w-7xl relative">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-28 items-start">

          {/* LEFT sticky */}
          <motion.div
            style={{ y: smoothLeftY }}
            variants={BLUR_REVEAL}
            custom={0}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="lg:w-[38%] space-y-8 lg:sticky lg:top-32"
          >
            <p className="font-accent text-[10px] font-bold text-gold uppercase tracking-[0.25em]">Core Services</p>

            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.05] text-zinc-900">
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

          <motion.div 
            style={{ y: smoothRightY }} 
            className="lg:w-[62%] w-full flex flex-col gap-4"
            variants={staggeredContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
          >
            {displayServices.map((s, i) => (
              <ServiceCard key={s.title} s={s} i={i} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
