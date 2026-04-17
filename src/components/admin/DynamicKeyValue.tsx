"use client";

import { Plus, Trash2 } from "lucide-react";

interface KeyValuePair {
  label: string;
  value: string;
}

interface DynamicKeyValueProps {
  label: string;
  items: KeyValuePair[];
  onChange: (items: KeyValuePair[]) => void;
  keyPlaceholder?: string;
  valuePlaceholder?: string;
}

export default function DynamicKeyValue({
  label,
  items,
  onChange,
  keyPlaceholder = "Label",
  valuePlaceholder = "Value",
}: DynamicKeyValueProps) {
  const addItem = () => onChange([...items, { label: "", value: "" }]);

  const removeItem = (index: number) => {
    const next = [...items];
    next.splice(index, 1);
    onChange(next);
  };

  const updateItem = (index: number, field: "label" | "value", val: string) => {
    const next = [...items];
    next[index] = { ...next[index], [field]: val };
    onChange(next);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">{label}</label>
        <button
          type="button"
          onClick={addItem}
          className="flex items-center gap-1.5 text-xs font-medium text-[#C4882A] hover:text-[#D4952E] transition-colors"
        >
          <Plus size={14} /> Add
        </button>
      </div>

      {items.length === 0 && (
        <p className="text-xs text-zinc-600 italic">No entries yet. Click &quot;Add&quot; to start.</p>
      )}

      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2 group">
            <input
              type="text"
              value={item.label}
              onChange={(e) => updateItem(index, "label", e.target.value)}
              placeholder={keyPlaceholder}
              className="flex-1 px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-sm text-white placeholder:text-zinc-600 focus:border-[#C4882A] focus:outline-none transition-colors"
            />
            <input
              type="text"
              value={item.value}
              onChange={(e) => updateItem(index, "value", e.target.value)}
              placeholder={valuePlaceholder}
              className="flex-1 px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-sm text-white placeholder:text-zinc-600 focus:border-[#C4882A] focus:outline-none transition-colors"
            />
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="shrink-0 w-8 h-8 flex items-center justify-center text-zinc-600 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
