"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import ImageUploader from "@/components/admin/ImageUploader";
import DynamicList from "@/components/admin/DynamicList";

const SIZES = ["sm", "md", "lg"];

interface ServiceFormProps {
  initialData?: any;
  isEdit?: boolean;
}

export default function ServiceForm({ initialData, isEdit }: ServiceFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    num: initialData?.num || "",
    title: initialData?.title || "",
    description: initialData?.description || "",
    detailed_description: initialData?.detailed_description || "",
    image_url: initialData?.image_url || "",
    size: initialData?.size || "sm",
    case_study: initialData?.case_study || "",
    is_published: initialData?.is_published ?? 1,
    order_index: initialData?.order_index ?? 0,
  });

  const [features, setFeatures] = useState<string[]>(
    initialData?.features?.map((f: any) => (typeof f === "string" ? f : f.text)) || []
  );
  const [benefits, setBenefits] = useState<string[]>(
    initialData?.benefits?.map((b: any) => (typeof b === "string" ? b : b.text)) || []
  );
  const [processSteps, setProcessSteps] = useState<string[]>(
    initialData?.process_steps?.map((s: any) => (typeof s === "string" ? s : s.text)) || []
  );

  const update = (key: string, value: any) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      ...form,
      features,
      benefits,
      process_steps: processSteps,
    };

    try {
      const url = isEdit ? `/api/admin/services/${initialData.id}` : "/api/admin/services";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push("/admin/services");
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
          onClick={() => router.push("/admin/services")}
          className="w-9 h-9 flex items-center justify-center rounded-lg border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors"
        >
          <ArrowLeft size={16} />
        </button>
        <div>
          <p className="text-[#C4882A] text-[10px] font-bold uppercase tracking-[0.25em] mb-0.5">Services</p>
          <h1 className="text-xl font-black text-white tracking-tight">
            {isEdit ? "Edit Service" : "New Service"}
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic fields */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Number</label>
            <input
              type="text"
              value={form.num}
              onChange={(e) => update("num", e.target.value)}
              placeholder="01"
              className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-sm text-white placeholder:text-zinc-600 focus:border-[#C4882A] focus:outline-none transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Size</label>
            <select
              value={form.size}
              onChange={(e) => update("size", e.target.value)}
              className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-sm text-white focus:border-[#C4882A] focus:outline-none transition-colors"
            >
              {SIZES.map((s) => <option key={s} value={s}>{s.toUpperCase()}</option>)}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Title</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
            required
            className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-sm text-white placeholder:text-zinc-600 focus:border-[#C4882A] focus:outline-none transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Short Description</label>
          <textarea
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            rows={3}
            className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-sm text-white placeholder:text-zinc-600 focus:border-[#C4882A] focus:outline-none transition-colors resize-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Detailed Description</label>
          <textarea
            value={form.detailed_description}
            onChange={(e) => update("detailed_description", e.target.value)}
            rows={5}
            className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-sm text-white placeholder:text-zinc-600 focus:border-[#C4882A] focus:outline-none transition-colors resize-none"
          />
        </div>

        <ImageUploader
          value={form.image_url}
          onChange={(url) => update("image_url", url)}
          folder="services"
          label="Service Image"
        />

        {/* Dynamic lists */}
        <DynamicList label="Features (Tags)" items={features} onChange={setFeatures} placeholder="Feature tag..." />
        <DynamicList label="Benefits" items={benefits} onChange={setBenefits} placeholder="Benefit description..." />
        <DynamicList label="Process Steps" items={processSteps} onChange={setProcessSteps} placeholder="Step description..." />

        {/* Case Study */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Case Study</label>
          <textarea
            value={form.case_study}
            onChange={(e) => update("case_study", e.target.value)}
            rows={4}
            placeholder="Optional case study text..."
            className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-sm text-white placeholder:text-zinc-600 focus:border-[#C4882A] focus:outline-none transition-colors resize-none"
          />
        </div>

        {/* Publish toggle */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => update("is_published", form.is_published ? 0 : 1)}
            className={`relative w-11 h-6 rounded-full transition-colors ${
              form.is_published ? "bg-emerald-500" : "bg-zinc-700"
            }`}
          >
            <span
              className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                form.is_published ? "left-[22px]" : "left-0.5"
              }`}
            />
          </button>
          <span className="text-sm text-zinc-300">
            {form.is_published ? "Published" : "Draft"}
          </span>
        </div>

        {/* Submit */}
        <div className="flex items-center gap-3 pt-4 border-t border-zinc-800">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#C4882A] hover:bg-[#D4952E] text-black font-bold text-sm rounded-lg transition-colors disabled:opacity-50"
          >
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            {isEdit ? "Update Service" : "Create Service"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/services")}
            className="px-6 py-2.5 border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 font-medium text-sm rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
