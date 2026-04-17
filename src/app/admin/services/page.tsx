"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Eye, EyeOff, GripVertical, Loader2 } from "lucide-react";
import Link from "next/link";

interface Service {
  id: string;
  num: string;
  title: string;
  description: string;
  image_url: string;
  is_published: number;
  order_index: number;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const loadServices = async () => {
    try {
      const res = await fetch("/api/admin/services");
      const data = await res.json();
      setServices(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load services:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadServices(); }, []);

  const togglePublish = async (svc: Service) => {
    await fetch(`/api/admin/services/${svc.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...svc, is_published: svc.is_published ? 0 : 1 }),
    });
    loadServices();
  };

  const deleteService = async (id: string) => {
    if (!confirm("Delete this service?")) return;
    await fetch(`/api/admin/services/${id}`, { method: "DELETE" });
    loadServices();
  };

  const moveService = async (index: number, direction: -1 | 1) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= services.length) return;

    const current = services[index];
    const target = services[targetIndex];

    await Promise.all([
      fetch(`/api/admin/services/${current.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...current, order_index: target.order_index }),
      }),
      fetch(`/api/admin/services/${target.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...target, order_index: current.order_index }),
      }),
    ]);
    loadServices();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[#C4882A] text-[10px] font-bold uppercase tracking-[0.25em] mb-1">
            Offerings
          </p>
          <h1 className="text-2xl font-black text-white tracking-tight">Services</h1>
        </div>
        <Link
          href="/admin/services/new"
          className="flex items-center gap-2 px-4 py-2.5 bg-[#C4882A] hover:bg-[#D4952E] text-black font-bold text-sm rounded-lg transition-colors"
        >
          <Plus size={16} /> Add Service
        </Link>
      </div>

      {/* Services List */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={24} className="text-[#C4882A] animate-spin" />
        </div>
      ) : services.length === 0 ? (
        <div className="text-center py-20 bg-zinc-900/50 border border-zinc-800 rounded-xl">
          <p className="text-zinc-500 mb-4">No services yet.</p>
          <Link
            href="/admin/services/new"
            className="px-4 py-2 bg-[#C4882A] text-black font-bold text-sm rounded-lg"
          >
            Create First Service
          </Link>
        </div>
      ) : (
        <div className="space-y-2">
          {services.map((svc, index) => (
            <div
              key={svc.id}
              className="flex items-center gap-4 bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 hover:border-zinc-700 transition-colors group"
            >
              {/* Reorder */}
              <div className="flex flex-col gap-1 shrink-0">
                <button
                  onClick={() => moveService(index, -1)}
                  disabled={index === 0}
                  className="w-6 h-6 flex items-center justify-center text-zinc-600 hover:text-white disabled:opacity-20 transition-colors"
                >
                  <GripVertical size={12} />
                </button>
              </div>

              {/* Num */}
              <div className="w-10 h-10 bg-[#C4882A]/10 rounded-lg flex items-center justify-center shrink-0">
                <span className="text-[#C4882A] text-sm font-black">{svc.num || "#"}</span>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      svc.is_published
                        ? "text-emerald-400 bg-emerald-500/10"
                        : "text-zinc-500 bg-zinc-800"
                    }`}
                  >
                    {svc.is_published ? "PUBLISHED" : "DRAFT"}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white truncate">{svc.title}</h3>
                <p className="text-xs text-zinc-500 truncate">{svc.description}</p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => togglePublish(svc)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors"
                >
                  {svc.is_published ? <Eye size={15} /> : <EyeOff size={15} />}
                </button>
                <Link
                  href={`/admin/services/${svc.id}/edit`}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors"
                >
                  <Pencil size={15} />
                </Link>
                <button
                  onClick={() => deleteService(svc.id)}
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
