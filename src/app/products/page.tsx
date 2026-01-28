/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, ChevronLeft, ChevronRight, Link } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHero from "@/components/ui/PageHero";
import ProductCard from "@/components/products/ProductCard";
import FilterBar from "@/components/products/FilterBar";

// --- MOCK DATA (Expanded to test pagination) ---
// I've duplicated items to simulate having more than 9 products
const rawProducts = [
  // ... (Your existing 9 items here)
  { id: "food-1", category: "Food Essentials", title: "Premium Basmati Rice", description: "Extra long grain parboiled rice.", market: "Global Export", specs: "MOQ: 25T" },
  { id: "food-2", category: "Food Essentials", title: "Refined Sunflower Oil", description: "Triple-refined edible oil.", market: "Import & Distribution", specs: "1L, 5L" },
  { id: "food-3", category: "Food Essentials", title: "Organic Yellow Lentils", description: "High-protein split lentils.", market: "Local Market", specs: "50kg Bags" },
  { id: "ind-1", category: "Agro & Industrial", title: "PVC Resin", description: "Raw material for pipe manufacturing.", market: "Global Export", specs: "K-67" },
  { id: "ind-2", category: "Agro & Industrial", title: "Yellow Corn", description: "Animal feed grade.", market: "Import & Distribution", specs: "Moisture < 14%" },
  { id: "ind-3", category: "Agro & Industrial", title: "Caustic Soda", description: "Chemical compound for soap.", market: "Local Market", specs: "99% Purity" },
  { id: "mach-1", category: "Machinery", title: "Hydraulic Excavator", description: "20-ton earthmoving equipment.", market: "Import & Distribution", specs: "150HP" },
  { id: "mach-2", category: "Machinery", title: "Textile Loom", description: "High-speed air jet loom.", market: "Global Export", specs: "1200RPM" },
  { id: "mach-3", category: "Machinery", title: "Conveyor Belts", description: "Reinforced rubber belts.", market: "Local Market", specs: "Custom" },
  // ... Added more to demonstrate page 2
  { id: "food-4", category: "Food Essentials", title: "Wheat Flour", description: "Premium grade flour.", market: "Local Market", specs: "50kg" },
  { id: "ind-4", category: "Agro & Industrial", title: "Urea Fertilizer", description: "High nitrogen content.", market: "Global Export", specs: "Granular" },
  { id: "mach-4", category: "Machinery", title: "Forklift Truck", description: "Diesel powered.", market: "Import & Distribution", specs: "3 Ton" },
];

const categories = ["All", "Food Essentials", "Agro & Industrial", "Machinery"];
const ITEMS_PER_PAGE = 9;

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  
  // Ref for scrolling
  const gridRef = useRef<HTMLDivElement>(null);

  // --- FILTER LOGIC ---
  const filteredProducts = rawProducts.filter((product) => {
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
    <main className="min-h-screen bg-slate-50">
      <PageHero 
        badge="Product Catalog"
        title="Verified."
        highlight="Sourced."
        subtitle="Browse our diverse portfolio of commodities and machinery."
        bgImage="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop"
        primaryCta={{ label: "Download Full Catalog", href: "#" }}
      />

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
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                    <Filter size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">No products found</h3>
                  <p className="mt-2 text-slate-500">Try adjusting your filters.</p>
                  <Button 
                    variant="outline" 
                    className="mt-8"
                    onClick={() => {setActiveCategory("All"); setSearchQuery("");}}
                  >
                    Clear All Filters
                  </Button>
                </div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* --- PAGINATION CONTROLS --- */}
          {totalPages > 1 && (
            <div className="mt-16 flex justify-center items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="rounded-full w-12 h-12 bg-white border-slate-200 hover:bg-slate-50 disabled:opacity-50"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>

              <span className="text-sm font-bold text-slate-600 tracking-widest">
                PAGE {currentPage} / {totalPages}
              </span>

              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="rounded-full w-12 h-12 bg-white border-slate-200 hover:bg-slate-50 disabled:opacity-50"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          )}
        </div>
      </section>

      <section className="bg-slate-900 py-24 text-center">
        <div className="container mx-auto px-6">
          <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
            Don't see what you need?
          </h2>
          <Button asChild size="lg" className="h-14 rounded-full bg-blue-600 px-10 text-lg font-bold hover:bg-blue-500">
            <Link href="/quote">Request Custom Sourcing</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}