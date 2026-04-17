"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Eye, EyeOff, Loader2, Search } from "lucide-react";
import Link from "next/link";

interface Product {
  id: string;
  title: string;
  category: string;
  market: string;
  is_published: number;
  order_index: number;
  image_url: string;
}

const CATEGORIES = ["All", "Food Essentials", "Agro & Industrial", "Machinery"];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const loadProducts = async () => {
    try {
      const res = await fetch("/api/admin/products");
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadProducts(); }, []);

  const togglePublish = async (product: Product) => {
    await fetch(`/api/admin/products/${product.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...product,
        is_published: product.is_published ? 0 : 1,
      }),
    });
    loadProducts();
  };

  const deleteProduct = async (id: string) => {
    if (!confirm("Delete this product and all its related data?")) return;
    await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    loadProducts();
  };

  const filtered = products.filter((p) => {
    const matchCategory = filter === "All" || p.category === filter;
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[#C4882A] text-[10px] font-bold uppercase tracking-[0.25em] mb-1">Catalog</p>
          <h1 className="text-2xl font-black text-white tracking-tight">Products</h1>
        </div>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 px-4 py-2.5 bg-[#C4882A] hover:bg-[#D4952E] text-black font-bold text-sm rounded-lg transition-colors"
        >
          <Plus size={16} /> Add Product
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                filter === cat
                  ? "bg-[#C4882A]/15 text-[#C4882A] border border-[#C4882A]/30"
                  : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:border-zinc-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="relative flex-1 sm:max-w-xs ml-auto">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-9 pr-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-white placeholder:text-zinc-600 focus:border-[#C4882A] focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Products List */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={24} className="text-[#C4882A] animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 bg-zinc-900/50 border border-zinc-800 rounded-xl">
          <p className="text-zinc-500 mb-4">
            {products.length === 0 ? "No products yet." : "No products match your filter."}
          </p>
          {products.length === 0 && (
            <Link
              href="/admin/products/new"
              className="px-4 py-2 bg-[#C4882A] text-black font-bold text-sm rounded-lg"
            >
              Create First Product
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((product) => (
            <div
              key={product.id}
              className="flex items-center gap-4 bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 hover:border-zinc-700 transition-colors group"
            >
              {/* Thumbnail */}
              <div
                className="w-16 h-16 rounded-lg bg-cover bg-center shrink-0 border border-zinc-700 bg-zinc-800"
                style={product.image_url ? { backgroundImage: `url('${product.image_url}')` } : {}}
              />

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded uppercase">
                    {product.category}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      product.is_published
                        ? "text-emerald-400 bg-emerald-500/10"
                        : "text-zinc-500 bg-zinc-800"
                    }`}
                  >
                    {product.is_published ? "PUBLISHED" : "DRAFT"}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white truncate">{product.title}</h3>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => togglePublish(product)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors"
                  title={product.is_published ? "Unpublish" : "Publish"}
                >
                  {product.is_published ? <Eye size={15} /> : <EyeOff size={15} />}
                </button>
                <Link
                  href={`/admin/products/${product.id}/edit`}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors"
                >
                  <Pencil size={15} />
                </Link>
                <button
                  onClick={() => deleteProduct(product.id)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
