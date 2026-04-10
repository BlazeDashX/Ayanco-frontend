"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";

import ProductCard from "@/components/products/ProductCard";
import FilterBar from "@/components/products/FilterBar";
import { PRODUCTS, PRODUCT_CATEGORIES, PRODUCTS_PER_PAGE } from "@/data/products";

const categories = ["All", ...PRODUCT_CATEGORIES];
const ITEMS_PER_PAGE = PRODUCTS_PER_PAGE;


export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("Machinery");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Ref for scrolling
  const gridRef = useRef<HTMLDivElement>(null);

  // --- FILTER LOGIC ---
  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // --- PAGINATION LOGIC ---
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Reset page when filter changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentPage(1);
  }, [activeCategory, searchQuery]);

  // Scroll Handler
  const scrollToGridTop = () => {
    if (gridRef.current) {
      const headerOffset = 140; // Height of header + filter bar
      const elementPosition = gridRef.current.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      scrollToGridTop();
    }
  };

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    scrollToGridTop();
  };

  return (
    <main className="min-h-screen bg-[#FAFAF8]">
      {/* Page Header */}
      <div className="bg-white border-b border-zinc-200 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-cormorant text-[10px] font-bold text-[#C4882A] uppercase tracking-[0.25em] mb-4">Product Catalog</p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-zinc-900 tracking-tight leading-tight mb-4">
              Verified. <span className="text-[#C4882A]">Sourced.</span>
            </h1>
            <p className="font-lato text-zinc-500 text-base md:text-lg leading-relaxed max-w-2xl">
              Browse our diverse portfolio of commodities and machinery sourced from verified suppliers worldwide.
            </p>
          </motion.div>
        </div>
      </div>

      <div ref={gridRef} className="relative z-30">
        <FilterBar
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={handleCategoryChange}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>

      <section className="pb-20 pt-16">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            layout
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 min-h-[600px]" // Min height prevents jumpy layout
          >
            <AnimatePresence mode="popLayout">
              {currentProducts.length > 0 ? (
                currentProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <div className="col-span-full py-24 text-center">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center bg-zinc-100 text-zinc-400">
                    <Filter size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900">No products found</h3>
                  <p className="mt-2 text-zinc-500 text-sm">Try adjusting your filters.</p>
                  <button
                    className="mt-8 h-10 px-6 border border-zinc-300 text-zinc-600 text-sm font-bold hover:border-[#C4882A] hover:bg-[#C4882A] hover:text-white transition-colors"
                    onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* --- PAGINATION CONTROLS --- */}
          {totalPages > 1 && (
            <div className="mt-16 flex justify-center items-center gap-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="w-10 h-10 border border-zinc-200 text-zinc-500 hover:border-[#C4882A] hover:text-[#C4882A] disabled:opacity-30 disabled:hover:border-zinc-200 disabled:hover:text-zinc-500 flex items-center justify-center transition-colors bg-white"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-xs font-bold text-zinc-500 tracking-[0.15em] uppercase">
                Page {currentPage} / {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="w-10 h-10 border border-zinc-200 text-zinc-500 hover:border-[#C4882A] hover:text-[#C4882A] disabled:opacity-30 disabled:hover:border-zinc-200 disabled:hover:text-zinc-500 flex items-center justify-center transition-colors bg-white"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="bg-[#09090B] py-20 border-t border-white/6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="font-cormorant text-[10px] font-bold text-[#C4882A] uppercase tracking-[0.25em] mb-3">Custom Sourcing</p>
            <h2 className="font-display text-2xl md:text-3xl font-black text-[#FAFAF9] tracking-tight">
              Don&apos;t see what you need?
            </h2>
            <p className="font-lato text-[#78716C] text-sm mt-2 max-w-md">Our trade desk sources globally on request — tell us exactly what you&apos;re looking for.</p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link href="/quote" className="inline-flex items-center gap-2 h-11 px-7 bg-[#C4882A] hover:bg-[#D4952E] text-[#09090B] font-bold text-sm transition-colors">
              Request Custom Sourcing <ArrowRight size={15} />
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 h-11 px-7 border border-white/12 text-[#A8A29E] hover:text-[#FAFAF9] hover:border-white/20 font-medium text-sm transition-colors">
              Contact Trade Desk
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}