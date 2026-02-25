import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Link from "next/link";
import { ArrowRight, Cog } from "lucide-react";

export const metadata: Metadata = {
    title: "Machinery & Equipment | Ayanco Trade Corporation",
    description: "Heavy equipment and specialized machinery for infrastructure, manufacturing, and agricultural operations.",
};

const products = [
    { title: "Hydraulic Excavator (20T)", desc: "Tier-4 compliant earthmoving excavator with 150HP engine for construction and mining.", specs: "150HP | Operating Weight: 20T | Origin: China/Japan" },
    { title: "Air Jet Weaving Loom", desc: "High-speed shuttleless loom for textile mills processing cotton and synthetic yarns.", specs: "1200 RPM | Width: 190–340cm | Origin: China" },
    { title: "Rubber Conveyor Belts", desc: "Heat-resistant reinforced rubber belts for cement, mining, and port operations.", specs: "Custom width & length | EP/NN ratings" },
    { title: "Diesel Forklift (3T)", desc: "Counterbalance forklift for warehouse and port logistics operations.", specs: "3 Ton capacity | Mast: 3–5m | Origin: China" },
    { title: "Rice Processing Plant", desc: "Full rice milling and polishing line with 5–20 TPH capacity.", specs: "5–20 Ton/hour | Turnkey installation available" },
    { title: "Solar Water Pump", desc: "DC brushless solar-powered submersible pumps for agricultural irrigation.", specs: "1–15 HP | Depth: up to 100m | Origin: China" },
];

export default function MachineryPage() {
    return (
        <main className="min-h-screen bg-slate-50">
            <PageHero
                badge="Machinery & Equipment"
                title="Heavy Industry."
                highlight="Precision Supply."
                subtitle="Heavy equipment and specialized machinery for infrastructure projects, factories, and agriculture — sourced and shipped globally."
                bgImage="https://images.unsplash.com/photo-1565514020179-026b92b84bb6?q=80&w=2070&auto=format&fit=crop"
                primaryCta={{ label: "Request Equipment Quote", href: "/quote" }}
                secondaryCta={{ label: "View All Products", href: "/products" }}
            />

            <section className="py-20 md:py-28">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="flex items-center gap-3 mb-12">
                        <div className="p-2.5 bg-slate-100 rounded-xl text-slate-600">
                            <Cog size={22} />
                        </div>
                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Catalog</p>
                            <h2 className="text-2xl font-bold text-slate-900">Machinery & Equipment</h2>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((p) => (
                            <div key={p.title} className="group bg-white rounded-3xl border border-slate-200 p-8 hover:shadow-xl hover:shadow-blue-900/5 hover:-translate-y-1 transition-all duration-300">
                                <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mb-6">
                                    <Cog size={20} className="text-slate-600" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">{p.title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed mb-4">{p.desc}</p>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider border-t border-slate-100 pt-4">{p.specs}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 text-center">
                        <p className="text-slate-500 mb-6">Need custom specifications? We source and configure on request.</p>
                        <Link href="/quote" className="inline-flex items-center gap-2 rounded-full bg-blue-600 text-white font-bold px-8 py-4 hover:bg-blue-500 transition-colors">
                            Request Equipment Quote <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
