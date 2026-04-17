"use client";

import { useEffect, useState } from "react";
import { Images, Package, Wrench, TrendingUp } from "lucide-react";
import Link from "next/link";

interface Stats {
  heroSlides: number;
  products: number;
  publishedProducts: number;
  services: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ heroSlides: 0, products: 0, publishedProducts: 0, services: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [heroRes, productsRes, servicesRes] = await Promise.all([
          fetch("/api/admin/hero"),
          fetch("/api/admin/products"),
          fetch("/api/admin/services"),
        ]);

        const hero = await heroRes.json();
        const products = await productsRes.json();
        const services = await servicesRes.json();

        setStats({
          heroSlides: Array.isArray(hero) ? hero.length : 0,
          products: Array.isArray(products) ? products.length : 0,
          publishedProducts: Array.isArray(products)
            ? products.filter((p: any) => p.is_published).length
            : 0,
          services: Array.isArray(services) ? services.length : 0,
        });
      } catch (err) {
        console.error("Failed to load stats:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const cards = [
    {
      label: "Hero Slides",
      value: stats.heroSlides,
      icon: Images,
      href: "/admin/hero",
      color: "from-amber-500/20 to-orange-500/20",
      iconColor: "text-amber-400",
    },
    {
      label: "Total Products",
      value: stats.products,
      icon: Package,
      href: "/admin/products",
      color: "from-blue-500/20 to-cyan-500/20",
      iconColor: "text-blue-400",
    },
    {
      label: "Published Products",
      value: stats.publishedProducts,
      icon: TrendingUp,
      href: "/admin/products",
      color: "from-emerald-500/20 to-green-500/20",
      iconColor: "text-emerald-400",
    },
    {
      label: "Services",
      value: stats.services,
      icon: Wrench,
      href: "/admin/services",
      color: "from-violet-500/20 to-purple-500/20",
      iconColor: "text-violet-400",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <p className="text-[#C4882A] text-[10px] font-bold uppercase tracking-[0.25em] mb-1">
          Admin Panel
        </p>
        <h1 className="text-3xl font-black text-white tracking-tight">Dashboard</h1>
        <p className="text-zinc-500 text-sm mt-1">Manage your Ayanco Trade Corporation content.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className="group relative overflow-hidden bg-zinc-900/50 border border-zinc-800 rounded-xl p-5 hover:border-zinc-700 transition-all duration-300"
            >
              <div className={`absolute inset-0 bg-linear-to-br ${card.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <Icon size={20} className={card.iconColor} />
                  <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-wider">
                    View →
                  </span>
                </div>
                <p className="text-3xl font-black text-white mb-1">
                  {loading ? (
                    <span className="inline-block w-8 h-8 bg-zinc-800 rounded animate-pulse" />
                  ) : (
                    card.value
                  )}
                </p>
                <p className="text-xs font-medium text-zinc-500">{card.label}</p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
        <h2 className="text-sm font-bold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link
            href="/admin/hero"
            className="flex items-center gap-3 px-4 py-3 bg-zinc-800/50 rounded-lg hover:bg-zinc-800 transition-colors group"
          >
            <Images size={16} className="text-amber-400" />
            <span className="text-sm text-zinc-300 group-hover:text-white transition-colors">Manage Hero Slides</span>
          </Link>
          <Link
            href="/admin/products/new"
            className="flex items-center gap-3 px-4 py-3 bg-zinc-800/50 rounded-lg hover:bg-zinc-800 transition-colors group"
          >
            <Package size={16} className="text-blue-400" />
            <span className="text-sm text-zinc-300 group-hover:text-white transition-colors">Add New Product</span>
          </Link>
          <Link
            href="/admin/services/new"
            className="flex items-center gap-3 px-4 py-3 bg-zinc-800/50 rounded-lg hover:bg-zinc-800 transition-colors group"
          >
            <Wrench size={16} className="text-violet-400" />
            <span className="text-sm text-zinc-300 group-hover:text-white transition-colors">Add New Service</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
