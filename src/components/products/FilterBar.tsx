"use client";

import { Search } from "lucide-react";
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
    <div className="sticky top-[64px] z-30 bg-[#FAFAF8]/90 backdrop-blur-md border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-6 py-3 flex flex-col md:flex-row items-center gap-3">

        {/* Category tabs */}
        <div className="flex-1 w-full overflow-x-auto no-scrollbar">
          <div className="flex gap-1">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                layout
                className={`whitespace-nowrap px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-200 ${activeCategory === cat
                  ? "bg-zinc-900 text-white"
                  : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100"
                  }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64 shrink-0">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-3.5 w-3.5 text-zinc-400" />
          </div>
          <input
            type="text"
            placeholder="Search inventory..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9 w-full border border-zinc-200 bg-white pl-9 pr-4 text-sm text-zinc-800 placeholder:text-zinc-400 outline-none focus:border-gold transition-colors"
          />
        </div>

      </div>
    </div>
  );
}