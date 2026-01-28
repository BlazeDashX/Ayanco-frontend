/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ProductCard from "@/components/products/ProductCard"; // Import the component

// --- MOCK DATA ---
const productsData = [
  {
    id: 1,
    category: "Agriculture",
    title: "Premium Basmati Rice",
    desc: "Long-grain, aromatic rice sourced from the Himalayan foothills. Double-polished for export quality.",
    image: "/products/rice.jpg", 
    specs: "25kg / 50kg Bags",
  },
  {
    id: 2,
    category: "Industrial",
    title: "Polypropylene Granules",
    desc: "High-grade thermoplastic polymer for injection molding and packaging applications.",
    image: "/products/granules.jpg",
    specs: "Industrial Grade A+",
  },
  {
    id: 3,
    category: "Machinery",
    title: "Hydraulic Excavator X200",
    desc: "Heavy-duty earthmoving equipment designed for mining and large-scale construction.",
    image: "/products/excavator.jpg",
    specs: "22 Ton / 150 HP",
  },
  {
    id: 4,
    category: "Agriculture",
    title: "Organic Yellow Corn",
    desc: "Non-GMO dried corn suitable for animal feed and industrial processing.",
    image: "/products/corn.jpg",
    specs: "Bulk Shipping",
  },
  {
    id: 5,
    category: "Industrial",
    title: "Caustic Soda Flakes",
    desc: "Sodium Hydroxide 99% purity for textile, soap, and paper industries.",
    image: "/products/chemical.jpg",
    specs: "25kg PP Bags",
  },
  {
    id: 6,
    category: "Machinery",
    title: "Industrial Textile Loom",
    desc: "High-speed weaving machine for cotton and synthetic fabric production.",
    image: "/products/loom.jpg",
    specs: "1200 RPM",
  },
];

const categories = ["All", "Agriculture", "Industrial", "Machinery"];

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = productsData.filter((product) => {
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 1. HERO HEADER */}
      <section className="bg-[#05070a] pt-32 pb-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-blue-500 font-bold tracking-[0.2em] uppercase text-xs mb-4 block">
              Global Inventory
            </span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
              World-Class <span className="text-blue-500">Commodities.</span>
            </h1>
            <p className="text-slate-400 text-lg font-light leading-relaxed">
              Explore our verified catalog of industrial goods and agricultural staples.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. FILTER BAR */}
      <section className="sticky top-20 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 py-4 shadow-sm">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? "bg-blue-900 text-white shadow-md"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input 
              placeholder="Search products..." 
              className="pl-10 h-10 bg-slate-100 border-transparent focus:bg-white transition-all rounded-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* 3. PRODUCT GRID */}
      <section className="py-20 min-h-[60vh]">
        <div className="container mx-auto px-6">
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                <Filter size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900">No products found</h3>
              <p className="text-slate-500">Try adjusting your search or category filter.</p>
              <Button 
                variant="outline" 
                className="mt-6"
                onClick={() => {setActiveCategory("All"); setSearchQuery("");}}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </section>
      
      {/* 4. FOOTER CTA */}
      <section className="bg-blue-600 py-16 text-center text-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-4">Can't find what you need?</h2>
          <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50 font-bold rounded-full px-8">
            <Link href="/quote">Submit Sourcing Request</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}