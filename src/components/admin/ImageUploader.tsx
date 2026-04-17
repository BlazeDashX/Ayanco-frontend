"use client";

import { useRef, useState } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import Image from "next/image";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  label?: string;
}

export default function ImageUploader({ value, onChange, folder = "uploads", label = "Image" }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const upload = async (file: File) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.url) {
        onChange(data.url);
      } else {
        alert(data.error || "Upload failed");
      }
    } catch {
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) upload(file);
  };

  return (
    <div className="space-y-2">
      <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">{label}</label>

      {value ? (
        <div className="relative group rounded-lg overflow-hidden border border-zinc-700 bg-zinc-900">
          <div className="relative w-full h-40">
            <Image
              src={value}
              alt="Uploaded"
              fill
              className="object-cover"
              unoptimized={value.startsWith("/")}
            />
          </div>
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 w-7 h-7 bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
          >
            <X size={14} />
          </button>
          <div className="p-2 bg-zinc-900">
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="w-full text-xs bg-transparent text-zinc-400 border-none outline-none truncate"
              placeholder="Image URL"
            />
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileRef.current?.click()}
          className={`flex flex-col items-center justify-center gap-3 h-40 rounded-lg border-2 border-dashed cursor-pointer transition-colors ${
            dragOver
              ? "border-[#C4882A] bg-[#C4882A]/5"
              : "border-zinc-700 hover:border-zinc-500 bg-zinc-900/50"
          }`}
        >
          {uploading ? (
            <Loader2 size={24} className="text-[#C4882A] animate-spin" />
          ) : (
            <>
              <Upload size={24} className="text-zinc-500" />
              <p className="text-xs text-zinc-500">
                Drop image or <span className="text-[#C4882A]">click to upload</span>
              </p>
            </>
          )}
        </div>
      )}

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) upload(file);
        }}
      />

      {/* Manual URL input when no image */}
      {!value && (
        <input
          type="text"
          placeholder="Or paste image URL..."
          className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-sm text-white placeholder:text-zinc-600 focus:border-[#C4882A] focus:outline-none transition-colors"
          onBlur={(e) => {
            if (e.target.value.trim()) onChange(e.target.value.trim());
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              const val = (e.target as HTMLInputElement).value.trim();
              if (val) onChange(val);
            }
          }}
        />
      )}
    </div>
  );
}
