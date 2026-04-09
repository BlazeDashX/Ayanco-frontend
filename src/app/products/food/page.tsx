import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Link from "next/link";
import { ArrowRight, Sprout } from "lucide-react";

export const metadata: Metadata = {
    title: "Food Essentials | Ayanco Trade Corporation",
    description: "Premium food essentials including basmati rice, edible oils, lentils, wheat flour and more from verified global suppliers.",
};

const products = [
    { title: "Premium Basmati Rice", desc: "Extra long grain parboiled rice, 100% natural, sourced from South Asian premium growers.", specs: "MOQ: 25 Metric Tons | Origin: India/Pakistan" },
    { title: "Refined Sunflower Oil", desc: "Triple-refined, zero-trans-fat edible oil certified for food-grade use.", specs: "Pack: 1L, 5L, 18L | Origin: Ukraine/Russia" },
    { title: "Organic Yellow Lentils", desc: "High-protein split red and yellow lentils for retail and food processing.", specs: "50kg Bags | Origin: Canada/Australia" },
    { title: "Wheat Flour", desc: "Premium grade all-purpose wheat flour for industrial bakers and distributors.", specs: "MOQ: 10MT | Pack: 50kg Bags" },
    { title: "Raw Sugar (ICUMSA 45)", desc: "Refined white sugar meeting ICUMSA 45 international standards.", specs: "MOQ: 100MT | Origin: Brazil/Thailand" },
    { title: "Palm Oil (RBD)", desc: "Refined, bleached, deodorized palm oil for food manufacturing.", specs: "Bulk / Flexi-bags | Origin: Malaysia/Indonesia" },
];

export default function FoodEssentialsPage() {
    return (
        <main className="min-h-screen bg-slate-50">
            <PageHero
                badge="Food Essentials"
                title="Farm to Factory."
                highlight="Global Standards."
                subtitle="Premium food commodities sourced from certified farms and processed facilities across Asia, Europe, and the Americas."
                bgImage="https://images.unsplash.com/photo-1506617420156-8e4536971650?q=80&w=2069&auto=format&fit=crop"
                primaryCta={{ label: "Request Sourcing Quote", href: "/quote" }}
                secondaryCta={{ label: "View All Products", href: "/products" }}
            />

            <section className="py-20 md:py-28">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="flex items-center gap-3 mb-12">
                        <div className="p-2.5 bg-yellow-50 rounded-xl text-yellow-600">
                            <Sprout size={22} />
                        </div>
                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Catalog</p>
                            <h2 className="text-2xl font-bold text-slate-900">Food Essentials</h2>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((p) => (
                            <div key={p.title} className="group bg-white rounded-3xl border border-slate-200 p-8 hover:shadow-xl hover:shadow-blue-900/5 hover:-translate-y-1 transition-all duration-300">
                                <div className="w-12 h-12 rounded-2xl bg-yellow-50 flex items-center justify-center mb-6">
                                    <Sprout size={20} className="text-yellow-600" />
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
