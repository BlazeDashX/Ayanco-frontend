"use client";

import { useState } from "react";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import ImageUploader from "@/components/admin/ImageUploader";

export interface HeroSlide {
  id: string;
  badge: string;
  title: string;
  highlight: string;
  subtitle: string;
  bg_image_url: string;
  primary_cta_label: string;
  primary_cta_href: string;
  secondary_cta_label: string;
  secondary_cta_href: string;
  order_index: number;
  is_active: number;
}

interface Props {
  slide: HeroSlide | null;
  nextOrder: number;
  onSaved: () => void;
  onCancel: () => void;
}

export default function HeroSlideForm({ slide, nextOrder, onSaved, onCancel }: Props) {
  const isEdit = !!slide;

  const [form, setForm] = useState({
    badge: slide?.badge || "",
    title: slide?.title || "",
    highlight: slide?.highlight || "",
    subtitle: slide?.subtitle || "",
    bg_image_url: slide?.bg_image_url || "",
    primary_cta_label: slide?.primary_cta_label || "",
    primary_cta_href: slide?.primary_cta_href || "",
    secondary_cta_label: slide?.secondary_cta_label || "",
    secondary_cta_href: slide?.secondary_cta_href || "",
    order_index: slide?.order_index ?? nextOrder,
    is_active: slide?.is_active ?? 1,
  });

  const [saving, setSaving] = useState(false);

  const update = (key: string, value: any) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const url = isEdit ? `/api/admin/hero/${slide!.id}` : "/api/admin/hero";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        onSaved();
      } else {
        const data = await res.json();
        alert(data.error || "Save failed");
      }
    } catch {
      alert("Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={onCancel}
          className="w-9 h-9 flex items-center justify-center rounded-lg border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors"
        >
          <ArrowLeft size={16} />
        </button>
        <div>
          <p className="text-[#C4882A] text-[10px] font-bold uppercase tracking-[0.25em] mb-0.5">
            Hero Slides
          </p>
          <h1 className="text-xl font-black text-white tracking-tight">
            {isEdit ? "Edit Slide" : "New Slide"}
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Badge */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Badge</label>
          <input
            type="text"
            value={form.badge}
            onChange={(e) => update("badge", e.target.value)}
            placeholder="e.g. Premier Global Trading"
            required
            className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-sm text-white placeholder:text-zinc-600 focus:border-[#C4882A] focus:outline-none transition-colors"
          />
        </div>

        {/* Title + Highlight */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              placeholder="e.g. Global Reach."
              required
              className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-sm text-white placeholder:text-zinc-600 focus:border-[#C4882A] focus:outline-none transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Highlight (gold text)</label>
            <input
              type="text"
              value={form.highlight}
              onChange={(e) => update("highlight", e.target.value)}
              placeholder="e.g. Local Impact."
              required
              className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-sm text-white placeholder:text-zinc-600 focus:border-[#C4882A] focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Subtitle */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Subtitle</label>
          <textarea
            value={form.subtitle}
            onChange={(e) => update("subtitle", e.target.value)}
            placeholder="Supporting description text..."
            rows={3}
            required
            className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-sm text-white placeholder:text-zinc-600 focus:border-[#C4882A] focus:outline-none transition-colors resize-none"
          />
        </div>

        {/* Background Image */}
        <ImageUploader
          value={form.bg_image_url}
          onChange={(url) => update("bg_image_url", url)}
          folder="hero"
          label="Background Image"
        />

        {/* Primary CTA */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 space-y-3">
          <p className="text-xs font-bold text-zinc-300 uppercase tracking-wider">Primary CTA</p>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              value={form.primary_cta_label}
              onChange={(e) => update("primary_cta_label", e.target.value)}
              placeholder="Button label"
              className="px-3 py-2.5 bg-zinc-900 border border-zinc-700 rounded-lg text-sm text-white placeholder:text-zinc-600 focus:border-[#C4882A] focus:outline-none transition-colors"
            />
            <input
              type="text"
              value={form.primary_cta_href}
              onChange={(e) => update("primary_cta_href", e.target.value)}
              placeholder="/products"
              className="px-3 py-2.5 bg-zinc-900 border border-zinc-700 rounded-lg text-sm text-white placeholder:text-zinc-600 focus:border-[#C4882A] focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Secondary CTA */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 space-y-3">
          <p className="text-xs font-bold text-zinc-300 uppercase tracking-wider">Secondary CTA</p>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              value={form.secondary_cta_label}
              onChange={(e) => update("secondary_cta_label", e.target.value)}
              placeholder="Button label"
              className="px-3 py-2.5 bg-zinc-900 border border-zinc-700 rounded-lg text-sm text-white placeholder:text-zinc-600 focus:border-[#C4882A] focus:outline-none transition-colors"
            />
            <input
              type="text"
              value={form.secondary_cta_href}
              onChange={(e) => update("secondary_cta_href", e.target.value)}
              placeholder="/services"
              className="px-3 py-2.5 bg-zinc-900 border border-zinc-700 rounded-lg text-sm text-white placeholder:text-zinc-600 focus:border-[#C4882A] focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Active Toggle */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => update("is_active", form.is_active ? 0 : 1)}
            className={`relative w-11 h-6 rounded-full transition-colors ${
              form.is_active ? "bg-[#C4882A]" : "bg-zinc-700"
            }`}
          >
            <span
              className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                form.is_active ? "left-[22px]" : "left-0.5"
              }`}
            />
          </button>
          <span className="text-sm text-zinc-300">{form.is_active ? "Active" : "Inactive"}</span>
        </div>

        {/* Submit */}
        <div className="flex items-center gap-3 pt-4 border-t border-zinc-800">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#C4882A] hover:bg-[#D4952E] text-black font-bold text-sm rounded-lg transition-colors disabled:opacity-50"
          >
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            {isEdit ? "Update Slide" : "Create Slide"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2.5 border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 font-medium text-sm rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
