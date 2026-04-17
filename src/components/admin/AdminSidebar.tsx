"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Images,
  Package,
  Wrench,
  LogOut,
  ChevronLeft,
  Menu,
} from "lucide-react";
import { useState } from "react";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/hero", label: "Hero Slides", icon: Images },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/services", label: "Services", icon: Wrench },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="fixed top-4 left-4 z-50 lg:hidden w-10 h-10 bg-zinc-900 border border-zinc-700 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
      >
        <Menu size={18} />
      </button>

      {/* Overlay for mobile */}
      {!collapsed && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setCollapsed(true)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-40 h-screen bg-[#0C0C0E] border-r border-zinc-800/60 flex flex-col transition-all duration-300 ${
          collapsed ? "-translate-x-full lg:translate-x-0 lg:w-20" : "translate-x-0 w-64"
        }`}
      >
        {/* Brand */}
        <div className="h-16 flex items-center px-5 border-b border-zinc-800/60 shrink-0">
          {!collapsed && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-linear-to-br from-[#C4882A] to-[#D4952E] rounded-lg flex items-center justify-center">
                <span className="text-black text-xs font-black">A</span>
              </div>
              <div>
                <p className="text-white text-sm font-bold tracking-tight">Ayanco</p>
                <p className="text-zinc-500 text-[10px] font-medium uppercase tracking-widest">CMS</p>
              </div>
            </div>
          )}
          {collapsed && (
            <div className="w-8 h-8 bg-linear-to-br from-[#C4882A] to-[#D4952E] rounded-lg flex items-center justify-center mx-auto">
              <span className="text-black text-xs font-black">A</span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                  active
                    ? "bg-[#C4882A]/10 text-[#C4882A]"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                }`}
              >
                <Icon
                  size={18}
                  className={active ? "text-[#C4882A]" : "text-zinc-500 group-hover:text-white"}
                />
                {!collapsed && <span>{item.label}</span>}
                {active && !collapsed && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#C4882A]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Collapse toggle (desktop) */}
        <div className="hidden lg:flex items-center justify-center py-2 border-t border-zinc-800/60">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-8 h-8 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800/50 flex items-center justify-center transition-colors"
          >
            <ChevronLeft
              size={16}
              className={`transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        {/* Sign out */}
        <div className="p-3 border-t border-zinc-800/60 shrink-0">
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-400 hover:text-red-400 hover:bg-red-500/5 transition-all ${
              collapsed ? "justify-center" : ""
            }`}
          >
            <LogOut size={18} />
            {!collapsed && <span>Sign Out</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
