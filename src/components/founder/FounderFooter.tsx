"use client";

import { useFooterText } from "@/hooks/useFounder";

export default function FounderFooter() {
  const text = useFooterText();

  return (
    <footer className="bg-white border-t border-gray-100 py-6">
      <div className="container mx-auto px-4 sm:px-6 text-center">
        <p className="text-sm text-gray-500">{text}</p>
      </div>
    </footer>
  );
}