"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Eye, EyeOff, GripVertical, Loader2 } from "lucide-react";
import HeroSlideForm, { HeroSlide } from "../../../components/admin/HeroSlideForm";

export default function HeroSlidesPage() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<HeroSlide | null>(null);
  const [showForm, setShowForm] = useState(false);

  const loadSlides = async () => {
    try {
      const res = await fetch("/api/admin/hero");
      const data = await res.json();
      setSlides(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load slides:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadSlides(); }, []);

  const toggleActive = async (slide: HeroSlide) => {
    await fetch(`/api/admin/hero/${slide.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_active: slide.is_active ? 0 : 1 }),
    });
    loadSlides();
  };

  const deleteSlide = async (id: string) => {
    if (!confirm("Delete this slide?")) return;
    await fetch(`/api/admin/hero/${id}`, { method: "DELETE" });
    loadSlides();
  };

  const moveSlide = async (index: number, direction: -1 | 1) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= slides.length) return;

    const current = slides[index];
    const target = slides[targetIndex];

    await Promise.all([
      fetch(`/api/admin/hero/${current.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order_index: target.order_index }),
      }),
      fetch(`/api/admin/hero/${target.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order_index: current.order_index }),
      }),
    ]);
    loadSlides();
  };

  const handleSaved = () => {
    setShowForm(false);
    setEditing(null);
    loadSlides();
  };

  if (showForm || editing) {
    return (
      <HeroSlideForm
        slide={editing}
        nextOrder={slides.length}
        onSaved={handleSaved}
        onCancel={() => { setShowForm(false); setEditing(null); }}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[#C4882A] text-[10px] font-bold uppercase tracking-[0.25em] mb-1">Homepage</p>
          <h1 className="text-2xl font-black text-white tracking-tight">Hero Slides</h1>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#C4882A] hover:bg-[#D4952E] text-black font-bold text-sm rounded-lg transition-colors"
        >
          <Plus size={16} /> Add Slide
        </button>
      </div>

      {/* Slides List */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={24} className="text-[#C4882A] animate-spin" />
        </div>
      ) : slides.length === 0 ? (
        <div className="text-center py-20 bg-zinc-900/50 border border-zinc-800 rounded-xl">
          <p className="text-zinc-500 mb-4">No hero slides yet.</p>
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-[#C4882A] text-black font-bold text-sm rounded-lg"
          >
            Create First Slide
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className="flex items-center gap-4 bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 hover:border-zinc-700 transition-colors group"
            >
              {/* Reorder */}
              <div className="flex flex-col gap-1 shrink-0">
                <button
                  onClick={() => moveSlide(index, -1)}
                  disabled={index === 0}
                  className="w-6 h-6 flex items-center justify-center text-zinc-600 hover:text-white disabled:opacity-20 transition-colors"
                >
                  <GripVertical size={12} />
                </button>
              </div>

              {/* Thumbnail */}
              <div
                className="w-24 h-16 rounded-lg bg-cover bg-center shrink-0 border border-zinc-700"
                style={{ backgroundImage: `url('${slide.bg_image_url}')` }}
              />

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold text-[#C4882A] uppercase tracking-wider">
                    {slide.badge}
                  </span>
                  {!slide.is_active && (
                    <span className="text-[10px] font-bold text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded">
                      INACTIVE
                    </span>
                  )}
                </div>
                <h3 className="text-sm font-bold text-white truncate">
                  {slide.title} <span className="text-[#C4882A]">{slide.highlight}</span>
                </h3>
                <p className="text-xs text-zinc-500 truncate">{slide.subtitle}</p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => toggleActive(slide)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors"
                  title={slide.is_active ? "Deactivate" : "Activate"}
                >
                  {slide.is_active ? <Eye size={15} /> : <EyeOff size={15} />}
                </button>
                <button
                  onClick={() => setEditing(slide)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors"
                >
                  <Pencil size={15} />
                </button>
                <button
                  onClick={() => deleteSlide(slide.id)}
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
