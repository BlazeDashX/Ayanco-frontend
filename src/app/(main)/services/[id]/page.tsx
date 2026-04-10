import { notFound } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, ArrowLeft } from "lucide-react";
import { SERVICES } from "@/data/services/services";
import Image from "next/image";

const serviceIcons: Record<string, any> = {
  "global-sourcing": Globe,
  "quality-assurance": ShieldCheck,
  "logistics-freight": Truck,
  "market-intelligence": BarChart3,
  "custom-sourcing": PackageSearch,
  "compliance-documentation": Landmark,
};

import {
  Globe,
  ShieldCheck,
  Truck,
  BarChart3,
  PackageSearch,
  Landmark,
} from "lucide-react";

export async function generateStaticParams() {
  return SERVICES.map((service) => ({
    id: service.id,
  }));
}

export default function ServiceDetailPage({ params }: { params: { id: string } }) {
  const service = SERVICES.find((s) => s.id === params.id);

  if (!service) {
    notFound();
  }

  const Icon = serviceIcons[service.id];

  return (
    <main className="min-h-screen bg-[#FAFAF8]">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-zinc-200 py-4">
        <div className="max-w-7xl mx-auto px-6">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-[#C4882A] transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Services
          </Link>
        </div>
      </div>

      {/* Service Header */}
      <div className="bg-white border-b border-zinc-200 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative aspect-[16/9] bg-zinc-100 rounded-lg overflow-hidden border border-zinc-200"
            >
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover"
                priority
              />
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-8"
            >
              {/* Service Number & Icon */}
              <div className="flex items-center gap-4">
                <span className="font-display text-[11px] font-black text-[#C4882A] tracking-[0.25em]">
                  {service.num}
                </span>
                <div className="w-10 h-10 bg-[#C4882A]/10 border border-[#C4882A]/20 flex items-center justify-center text-[#C4882A]">
                  <Icon size={20} />
                </div>
              </div>

              {/* Title */}
              <h1 className="font-display text-4xl md:text-5xl font-black text-zinc-900 tracking-tight leading-tight">
                {service.title}
              </h1>

              {/* Description */}
              <p className="font-lato text-zinc-600 text-lg leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              {service.features && service.features.length > 0 && (
                <div>
                  <h3 className="font-display text-sm font-bold text-zinc-900 uppercase tracking-wider mb-4">Key Features</h3>
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature) => (
                      <span
                        key={feature}
                        className="inline-flex items-center gap-1.5 font-lato text-[11px] font-medium text-zinc-600 bg-zinc-50 border border-zinc-200 px-2.5 py-1"
                      >
                        <CheckCircle2 size={10} className="text-[#C4882A]" />
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  href="/quote"
                  className="inline-flex items-center gap-2 h-12 px-8 bg-[#C4882A] hover:bg-[#D4952E] text-white font-bold text-sm transition-colors"
                >
                  Request Quote <ArrowRight size={16} />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 h-12 px-8 border border-zinc-300 text-zinc-700 hover:border-[#C4882A] hover:text-[#C4882A] font-medium text-sm transition-colors"
                >
                  Contact Trade Desk
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Detailed Description */}
      {service.detailedDescription && (
        <div className="py-16 md:py-20 bg-white border-b border-zinc-200">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="font-display text-3xl font-black text-zinc-900 tracking-tight mb-6">
              Overview
            </h2>
            <p className="font-lato text-zinc-600 text-lg leading-relaxed">
              {service.detailedDescription}
            </p>
          </div>
        </div>
      )}

      {/* Benefits */}
      {service.benefits && service.benefits.length > 0 && (
        <div className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="font-display text-3xl font-black text-zinc-900 tracking-tight mb-8">
              Benefits
            </h2>
            <ul className="grid md:grid-cols-2 gap-4 max-w-4xl">
              {service.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-[#C4882A] shrink-0 mt-0.5" />
                  <span className="font-lato text-zinc-600">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Process */}
      {service.process && service.process.length > 0 && (
        <div className="py-16 md:py-20 bg-white border-y border-zinc-200">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="font-display text-3xl font-black text-zinc-900 tracking-tight mb-8">
              Our Process
            </h2>
            <ol className="space-y-6">
              {service.process.map((step, index) => (
                <li key={index} className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-[#C4882A] text-white font-bold flex items-center justify-center rounded-sm">
                    {index + 1}
                  </span>
                  <span className="font-lato text-zinc-600 pt-1">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}

      {/* Case Study */}
      {service.caseStudy && (
        <div className="py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="font-display text-3xl font-black text-zinc-900 tracking-tight mb-6">
              Case Study
            </h2>
            <div className="bg-zinc-50 border border-zinc-200 p-8 rounded-lg">
              <p className="font-lato text-zinc-600 text-lg leading-relaxed italic">
                "{service.caseStudy}"
              </p>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="bg-[#09090B] py-16 border-t border-white/6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="font-cormorant text-[10px] font-bold text-[#C4882A] uppercase tracking-[0.25em] mb-3">Ready to Get Started?</p>
            <h2 className="font-display text-2xl md:text-3xl font-black text-[#FAFAF9] tracking-tight">
              Let's discuss your requirements
            </h2>
            <p className="font-lato text-[#78716C] text-sm mt-2 max-w-md">
              Our trade desk is ready to assist with your sourcing and procurement needs.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              href="/quote"
              className="inline-flex items-center gap-2 h-11 px-7 bg-[#C4882A] hover:bg-[#D4952E] text-[#09090B] font-bold text-sm transition-colors"
            >
              Request Quote <ArrowRight size={15} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 h-11 px-7 border border-white/12 text-[#A8A29E] hover:text-[#FAFAF9] hover:border-white/20 font-medium text-sm transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
