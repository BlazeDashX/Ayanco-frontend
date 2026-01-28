"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

interface FilterBarProps {
  categories: string[];
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function FilterBar({
  categories = [],
  activeCategory,
  setActiveCategory,
  searchQuery,
  setSearchQuery,
}: FilterBarProps) {
  return (
    <div className="w-full px-6 -mt-8 relative z-30">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-4 flex flex-col md:flex-row items-center gap-4"
      >
        
        {/* Category Pills (Segmented Control Style) */}
        <div className="flex-1 w-full overflow-x-auto no-scrollbar pb-2 md:pb-0">
          <div className="flex gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap rounded-lg px-4 py-2.5 text-xs font-bold uppercase tracking-wide transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-blue-600 text-white shadow-md shadow-blue-200 scale-105"
                    : "bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Search Field */}
        <div className="relative w-full md:w-72 shrink-0">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <Input
            placeholder="Search inventory..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 w-full rounded-xl border-slate-200 bg-slate-50 pl-10 text-sm focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
          />
        </div>

      </motion.div>
    </div>
  );
}