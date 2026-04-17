"use client";

import { Plus, Trash2, GripVertical } from "lucide-react";

interface DynamicListProps {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
}

export default function DynamicList({ label, items, onChange, placeholder = "Enter item..." }: DynamicListProps) {
  const addItem = () => onChange([...items, ""]);

  const removeItem = (index: number) => {
    const next = [...items];
    next.splice(index, 1);
    onChange(next);
  };

  const updateItem = (index: number, value: string) => {
    const next = [...items];
    next[index] = value;
    onChange(next);
  };

  const moveItem = (from: number, to: number) => {
    if (to < 0 || to >= items.length) return;
    const next = [...items];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
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
        <p className="text-xs text-zinc-600 italic">No items yet. Click &quot;Add&quot; to start.</p>
      )}

      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2 group">
            <button
              type="button"
              className="shrink-0 text-zinc-600 hover:text-zinc-400 cursor-grab"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => moveItem(index, index - 1)}
            >
              <GripVertical size={14} />
            </button>
            <span className="shrink-0 w-6 text-center text-[10px] font-bold text-zinc-600">{index + 1}</span>
            <input
              type="text"
              value={item}
              onChange={(e) => updateItem(index, e.target.value)}
              placeholder={placeholder}
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
