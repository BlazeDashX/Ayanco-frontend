import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Link from "next/link";
import { ArrowRight, Factory } from "lucide-react";

export const metadata: Metadata = {
    title: "Agro & Industrial Goods | Ayanco Trade Corporation",
    description: "Industrial raw materials, chemicals, and agro commodities for large-scale manufacturing sourced globally.",
};

const products = [
    { title: "PVC Resin (K-67)", desc: "High-grade polyvinyl chloride resin for pipe, cable, and fittings manufacturing.", specs: "K-67 Grade | MOQ: 10MT | Origin: China/Korea" },
    { title: "Yellow Corn", desc: "Animal feed grade yellow corn meeting moisture and aflatoxin standards.", specs: "Moisture <14% | MOQ: 500MT | Origin: USA/Ukraine" },
    { title: "Caustic Soda Flakes", desc: "Industrial grade sodium hydroxide for soap, textile, and paper processing.", specs: "Purity: 99% | 25kg Bags | Origin: China" },
    { title: "Urea Fertilizer (46%N)", desc: "High nitrogen content granular urea for agricultural application.", specs: "46% N content | Granular | MOQ: 100MT" },
    { title: "Titanium Dioxide (TiO₂)", desc: "Rutile grade TiO₂ for paint, plastics, and coating industries.", specs: "Rutile R-902 | 25kg Bags" },
    { title: "Polypropylene (PP) Granules", desc: "General purpose injection molding grade polypropylene.", specs: "MFI: 2–12 g/10min | MOQ: 5MT | Origin: Korea/China" },
];

export default function IndustrialPage() {
    return (
        <main className="min-h-screen bg-slate-50">
            <PageHero
                badge="Agro & Industrial"
                title="Raw Materials."
                highlight="Verified Sources."
                subtitle="Industrial-grade commodities and chemical compounds for large-scale manufacturing operations."
                bgImage="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2069&auto=format&fit=crop"
                primaryCta={{ label: "Request Sourcing Quote", href: "/quote" }}
                secondaryCta={{ label: "View All Products", href: "/products" }}
            />

            <section className="py-20 md:py-28">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="flex items-center gap-3 mb-12">
                        <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600">
                            <Factory size={22} />
                        </div>
                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Catalog</p>
                            <h2 className="text-2xl font-bold text-slate-900">Agro & Industrial Goods</h2>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((p) => (
                            <div key={p.title} className="group bg-white rounded-3xl border border-slate-200 p-8 hover:shadow-xl hover:shadow-blue-900/5 hover:-translate-y-1 transition-all duration-300">
                                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center mb-6">
                                    <Factory size={20} className="text-blue-600" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">{p.title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed mb-4">{p.desc}</p>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider border-t border-slate-100 pt-4">{p.specs}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 text-center">
                        <p className="text-slate-500 mb-6">Need a product not listed here? We source on demand.</p>
                        <Link href="/quote" className="inline-flex items-center gap-2 rounded-full bg-blue-600 text-white font-bold px-8 py-4 hover:bg-blue-500 transition-colors">
                            Request Custom Sourcing <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
