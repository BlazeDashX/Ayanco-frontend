"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2, Plus, Trash2 } from "lucide-react";
import ImageUploader from "@/components/admin/ImageUploader";
import DynamicList from "@/components/admin/DynamicList";
import DynamicKeyValue from "@/components/admin/DynamicKeyValue";

const CATEGORIES = ["Food Essentials", "Agro & Industrial", "Machinery"];
const MARKETS = ["Global Export", "Import & Distribution", "Local Market"];

interface ProductFormProps {
  initialData?: any;
  isEdit?: boolean;
}

const TABS = ["Basic", "Features", "Tech Specs", "Models", "Media", "Operations"];

export default function ProductForm({ initialData, isEdit }: ProductFormProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    category: initialData?.category || CATEGORIES[0],
    market: initialData?.market || MARKETS[0],
    specs: initialData?.specs || "",
    image_url: initialData?.image_url || "",
    video_url: initialData?.video_url || "",
    how_it_works: initialData?.how_it_works || "",
    is_published: initialData?.is_published ?? 0,
    order_index: initialData?.order_index ?? 0,
  });

  const [features, setFeatures] = useState<string[]>(
    initialData?.features?.map((f: any) => (typeof f === "string" ? f : f.text)) || []
  );
  const [applications, setApplications] = useState<string[]>(
    initialData?.applications?.map((a: any) => (typeof a === "string" ? a : a.text)) || []
  );
  const [operateSteps, setOperateSteps] = useState<string[]>(
    initialData?.operate_steps?.map((s: any) => (typeof s === "string" ? s : s.text)) || []
  );
  const [techSpecs, setTechSpecs] = useState<{ label: string; value: string }[]>(
    initialData?.tech_specs?.map((s: any) => ({ label: s.label, value: s.value })) || []
  );
  const [galleryImages, setGalleryImages] = useState<{ url: string; alt: string }[]>(
    initialData?.gallery_images?.map((i: any) => ({ url: i.url, alt: i.alt || "" })) || []
  );

  // Models
  const [modelColumns, setModelColumns] = useState<string[]>(
    initialData?.model_columns?.map((c: any) => (typeof c === "string" ? c : c.label)) || []
  );
  const [models, setModels] = useState<{ name: string; cells: string[] }[]>(
    initialData?.models?.map((m: any) => ({
      name: m.model_name || m.name || "",
      cells: m.cells?.map((c: any) => (typeof c === "string" ? c : c.value)) || [],
    })) || []
  );

  const update = (key: string, value: any) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      ...form,
      features,
      applications,
      operate_steps: operateSteps,
      tech_specs: techSpecs,
      gallery_images: galleryImages,
      model_columns: modelColumns,
      models: models.map((m) => ({ name: m.name, cells: m.cells })),
    };

    try {
      const url = isEdit ? `/api/admin/products/${initialData.id}` : "/api/admin/products";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push("/admin/products");
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

  // Model helpers
  const addModelColumn = () => {
    setModelColumns([...modelColumns, ""]);
    setModels(models.map((m) => ({ ...m, cells: [...m.cells, ""] })));
  };

  const updateModelColumn = (index: number, value: string) => {
    const next = [...modelColumns];
    next[index] = value;
    setModelColumns(next);
  };

  const removeModelColumn = (index: number) => {
    setModelColumns(modelColumns.filter((_, i) => i !== index));
    setModels(models.map((m) => ({ ...m, cells: m.cells.filter((_, i) => i !== index) })));
  };

  const addModel = () => {
    setModels([...models, { name: "", cells: modelColumns.map(() => "") }]);
  };

  const removeModel = (index: number) => {
    setModels(models.filter((_, i) => i !== index));
  };

  const updateModelName = (index: number, name: string) => {
    const next = [...models];
    next[index] = { ...next[index], name };
    setModels(next);
  };

  const updateModelCell = (modelIndex: number, cellIndex: number, value: string) => {
    const next = [...models];
    const cells = [...next[modelIndex].cells];
    cells[cellIndex] = value;
    next[modelIndex] = { ...next[modelIndex], cells };
    setModels(next);
  };

  // Gallery helpers
  const addGalleryImage = (url: string) => {
    setGalleryImages([...galleryImages, { url, alt: "" }]);
  };

  const removeGalleryImage = (index: number) => {
    setGalleryImages(galleryImages.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.push("/admin/products")}
          className="w-9 h-9 flex items-center justify-center rounded-lg border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors"
        >
          <ArrowLeft size={16} />
        </button>
        <div>
          <p className="text-[#C4882A] text-[10px] font-bold uppercase tracking-[0.25em] mb-0.5">Products</p>
          <h1 className="text-xl font-black text-white tracking-tight">
            {isEdit ? "Edit Product" : "New Product"}
          </h1>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-zinc-900/50 border border-zinc-800 rounded-xl p-1 overflow-x-auto no-scrollbar">
        {TABS.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === i
                ? "bg-[#C4882A]/15 text-[#C4882A]"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Tab 0: Basic */}
        {activeTab === 0 && (
          <div className="space-y-5">
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
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
                rows={4}
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-sm text-white placeholder:text-zinc-600 focus:border-[#C4882A] focus:outline-none transition-colors resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => update("category", e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-sm text-white focus:border-[#C4882A] focus:outline-none transition-colors"
                >
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Market</label>
                <select
                  value={form.market}
                  onChange={(e) => update("market", e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-sm text-white focus:border-[#C4882A] focus:outline-none transition-colors"
                >
                  {MARKETS.map((m) => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Specs (short)</label>
              <input
                type="text"
                value={form.specs}
                onChange={(e) => update("specs", e.target.value)}
                placeholder="e.g. MOQ: 25T"
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-sm text-white placeholder:text-zinc-600 focus:border-[#C4882A] focus:outline-none transition-colors"
              />
            </div>

            <ImageUploader
              value={form.image_url}
              onChange={(url) => update("image_url", url)}
              folder="products"
              label="Main Image"
            />

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
          </div>
        )}

        {/* Tab 1: Features */}
        {activeTab === 1 && (
          <div className="space-y-6">
            <DynamicList label="Features" items={features} onChange={setFeatures} placeholder="Feature description..." />
            <DynamicList label="Applications" items={applications} onChange={setApplications} placeholder="Application..." />
          </div>
        )}

        {/* Tab 2: Technical Specs */}
        {activeTab === 2 && (
          <DynamicKeyValue
            label="Technical Specifications"
            items={techSpecs}
            onChange={setTechSpecs}
            keyPlaceholder="Spec label"
            valuePlaceholder="Spec value"
          />
        )}

        {/* Tab 3: Models */}
        {activeTab === 3 && (
          <div className="space-y-6">
            {/* Columns */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Table Columns</label>
                <button
                  type="button"
                  onClick={addModelColumn}
                  className="flex items-center gap-1.5 text-xs font-medium text-[#C4882A] hover:text-[#D4952E]"
                >
                  <Plus size={14} /> Add Column
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {modelColumns.map((col, i) => (
                  <div key={i} className="flex items-center gap-1">
                    <input
                      type="text"
                      value={col}
                      onChange={(e) => updateModelColumn(i, e.target.value)}
                      placeholder={`Column ${i + 1}`}
                      className="w-32 px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-xs text-white placeholder:text-zinc-600 focus:border-[#C4882A] focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => removeModelColumn(i)}
                      className="w-7 h-7 flex items-center justify-center text-zinc-600 hover:text-red-400 rounded"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Models */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Models</label>
                <button
                  type="button"
                  onClick={addModel}
                  className="flex items-center gap-1.5 text-xs font-medium text-[#C4882A] hover:text-[#D4952E]"
                >
                  <Plus size={14} /> Add Model
                </button>
              </div>
              {models.map((model, mi) => (
                <div key={mi} className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={model.name}
                      onChange={(e) => updateModelName(mi, e.target.value)}
                      placeholder="Model name"
                      className="flex-1 px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-sm text-white placeholder:text-zinc-600 focus:border-[#C4882A] focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => removeModel(mi)}
                      className="w-8 h-8 flex items-center justify-center text-zinc-600 hover:text-red-400 hover:bg-red-500/10 rounded-lg"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {modelColumns.map((col, ci) => (
                      <div key={ci} className="space-y-1">
                        <label className="text-[10px] text-zinc-500">{col || `Col ${ci + 1}`}</label>
                        <input
                          type="text"
                          value={model.cells[ci] || ""}
                          onChange={(e) => updateModelCell(mi, ci, e.target.value)}
                          className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-xs text-white placeholder:text-zinc-600 focus:border-[#C4882A] focus:outline-none"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Media */}
        {activeTab === 4 && (
          <div className="space-y-6">
            {/* Gallery */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Gallery Images</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {galleryImages.map((img, i) => (
                  <div key={i} className="relative group rounded-lg overflow-hidden border border-zinc-700">
                    <div
                      className="h-28 bg-cover bg-center bg-zinc-800"
                      style={{ backgroundImage: `url('${img.url}')` }}
                    />
                    <button
                      type="button"
                      onClick={() => removeGalleryImage(i)}
                      className="absolute top-1 right-1 w-6 h-6 bg-black/70 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 hover:bg-red-500 transition-all"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
              <ImageUploader
                value=""
                onChange={(url) => { if (url) addGalleryImage(url); }}
                folder="products/gallery"
                label="Add Gallery Image"
              />
            </div>

            {/* Video URL */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Video URL</label>
              <input
                type="text"
                value={form.video_url}
                onChange={(e) => update("video_url", e.target.value)}
                placeholder="YouTube embed URL"
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-sm text-white placeholder:text-zinc-600 focus:border-[#C4882A] focus:outline-none transition-colors"
              />
            </div>
          </div>
        )}

        {/* Tab 5: Operations */}
        {activeTab === 5 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">How It Works</label>
              <textarea
                value={form.how_it_works}
                onChange={(e) => update("how_it_works", e.target.value)}
                rows={5}
                placeholder="Explain how the product works..."
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-sm text-white placeholder:text-zinc-600 focus:border-[#C4882A] focus:outline-none transition-colors resize-none"
              />
            </div>
            <DynamicList
              label="How to Operate (Steps)"
              items={operateSteps}
              onChange={setOperateSteps}
              placeholder="Operation step..."
            />
          </div>
        )}

        {/* Submit */}
        <div className="flex items-center gap-3 pt-4 border-t border-zinc-800">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#C4882A] hover:bg-[#D4952E] text-black font-bold text-sm rounded-lg transition-colors disabled:opacity-50"
          >
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            {isEdit ? "Update Product" : "Create Product"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/products")}
            className="px-6 py-2.5 border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 font-medium text-sm rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
