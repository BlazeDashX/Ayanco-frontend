"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Globe, MapPin, Package, CheckCircle2, ArrowLeft } from "lucide-react";
import Image from "next/image";

interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
  market: string;
  specs: string;
  image_url: string;
  video_url: string;
  how_it_works: string;
  features: { text: string }[];
  applications: { text: string }[];
  operate_steps: { text: string }[];
  tech_specs: { label: string; value: string }[];
  gallery_images: { url: string; alt: string }[];
}

export default function ProductDetailPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        // Use the admin API with the product ID to get full relations
        const res = await fetch(`/api/public/products/${params.id}`);
        if (res.ok) {
          const data = await res.json();
          setProduct(data);
        }
      } catch (err) {
        console.error("Failed to load product:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [params.id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FAFAF8] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#C4882A] border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-[#FAFAF8] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-zinc-900 mb-2">Product Not Found</h1>
          <Link href="/products" className="text-[#C4882A] hover:underline">Back to Products</Link>
        </div>
      </main>
    );
  }

  const isGlobal = product.market?.includes("Export") || product.market?.includes("Global");
  const MarketIcon = isGlobal ? Globe : MapPin;

  return (
    <main className="min-h-screen bg-[#FAFAF8]">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-zinc-200 py-4">
        <div className="max-w-7xl mx-auto px-6">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-[#C4882A] transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Products
          </Link>
        </div>
      </div>

      {/* Product Header */}
      <div className="bg-white border-b border-zinc-200 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Image */}
            <div className="relative aspect-square bg-zinc-100 rounded-lg overflow-hidden border border-zinc-200">
              {product.image_url ? (
                <Image
                  src={product.image_url}
                  alt={product.title}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-zinc-300">
                  <Package size={128} strokeWidth={1} />
                </div>
              )}
            </div>

            {/* Details */}
            <div className="space-y-8">
              {/* Category Badge */}
              <div>
                <span className="inline-flex items-center gap-1.5 font-lato bg-[#C4882A]/10 text-[#C4882A] px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-sm">
                  {product.category}
                </span>
              </div>

              {/* Title */}
              <h1 className="font-display text-4xl md:text-5xl font-black text-zinc-900 tracking-tight leading-tight">
                {product.title}
              </h1>

              {/* Description */}
              <p className="font-lato text-zinc-600 text-lg leading-relaxed">
                {product.description}
              </p>

              {/* Market Badge */}
              <div className="inline-flex items-center gap-2 border border-zinc-200 bg-zinc-50 rounded-sm px-4 py-2">
                <MarketIcon size={16} className="text-zinc-500" />
                <span className="font-lato text-sm font-bold text-zinc-700">{product.market}</span>
              </div>

              {/* Specs */}
              <div className="flex items-center gap-4 pt-4 border-t border-zinc-200">
                <span className="font-lato text-xs font-bold text-zinc-400 uppercase tracking-wider">Specifications:</span>
                <span className="font-display text-sm font-bold text-zinc-900">{product.specs}</span>
              </div>

              {/* CTA */}
              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  href={`/quote?product=${encodeURIComponent(product.title)}`}
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
            </div>
          </div>
        </div>
      </div>

      {/* Features & Applications */}
      {(product.features?.length > 0 || product.applications?.length > 0) && (
        <div className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Features */}
              {product.features?.length > 0 && (
                <div>
                  <h2 className="font-display text-2xl font-black text-zinc-900 tracking-tight mb-6">
                    Key Features
                  </h2>
                  <ul className="space-y-4">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 size={20} className="text-[#C4882A] shrink-0 mt-0.5" />
                        <span className="font-lato text-zinc-600">{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Applications */}
              {product.applications?.length > 0 && (
                <div>
                  <h2 className="font-display text-2xl font-black text-zinc-900 tracking-tight mb-6">
                    Applications
                  </h2>
                  <ul className="space-y-4">
                    {product.applications.map((application, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 size={20} className="text-[#C4882A] shrink-0 mt-0.5" />
                        <span className="font-lato text-zinc-600">{application.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Machinery-Specific Sections */}
      {(product.how_it_works || product.operate_steps?.length > 0 || product.tech_specs?.length > 0) && (
        <div className="bg-white border-t border-zinc-200 py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-6 space-y-16">
            {/* How It Works */}
            {product.how_it_works && (
              <div>
                <h2 className="font-display text-2xl font-black text-zinc-900 tracking-tight mb-6">
                  How It Works
                </h2>
                <p className="font-lato text-zinc-600 text-lg leading-relaxed max-w-3xl">
                  {product.how_it_works}
                </p>
              </div>
            )}

            {/* How to Operate */}
            {product.operate_steps?.length > 0 && (
              <div>
                <h2 className="font-display text-2xl font-black text-zinc-900 tracking-tight mb-6">
                  How to Operate
                </h2>
                <ol className="space-y-4 max-w-3xl">
                  {product.operate_steps.map((step, index) => (
                    <li key={index} className="flex items-start gap-4">
                      <span className="shrink-0 w-8 h-8 bg-[#C4882A] text-white font-bold flex items-center justify-center rounded-sm">
                        {index + 1}
                      </span>
                      <span className="font-lato text-zinc-600 pt-1">{step.text}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Technical Specifications */}
            {product.tech_specs?.length > 0 && (
              <div>
                <h2 className="font-display text-2xl font-black text-zinc-900 tracking-tight mb-6">
                  Technical Specifications
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl">
                  {product.tech_specs.map((spec, index) => (
                    <div key={index} className="bg-zinc-50 border border-zinc-200 p-4 rounded-sm">
                      <p className="font-lato text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">
                        {spec.label}
                      </p>
                      <p className="font-display text-sm font-bold text-zinc-900">{spec.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Video */}
            {product.video_url && (
              <div>
                <h2 className="font-display text-2xl font-black text-zinc-900 tracking-tight mb-6">
                  Product Video
                </h2>
                <div className="aspect-video max-w-4xl bg-zinc-900 rounded-lg overflow-hidden">
                  <iframe
                    src={product.video_url}
                    title={`${product.title} Video`}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Related Products CTA */}
      <section className="bg-[#09090B] py-16 border-t border-white/6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="font-cormorant text-[10px] font-bold text-[#C4882A] uppercase tracking-[0.25em] mb-3">Need More Information?</p>
            <h2 className="font-display text-2xl md:text-3xl font-black text-[#FAFAF9] tracking-tight">
              Get in touch with our trade desk
            </h2>
            <p className="font-lato text-[#78716C] text-sm mt-2 max-w-md">
              Our team is ready to assist with detailed specifications and availability.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              href={`/quote?product=${encodeURIComponent(product.title)}`}
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
