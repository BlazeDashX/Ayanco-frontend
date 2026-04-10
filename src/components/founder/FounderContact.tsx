"use client";

import Link from "next/link";
import { useContactInfo } from "@/hooks/useFounder";

export default function FounderContact() {
  const { heading, subheading, assistant, email, phone } = useContactInfo();

  return (
    <section
      id="contact"
      className="py-20 md:py-28 bg-[#111827] text-white scroll-mt-24"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 reveal" data-reveal="up">
          <p className="text-xs font-bold tracking-[.2em] text-[color:var(--gold)] uppercase mb-2">
            Get in Touch
          </p>
          <h2 className="font-display text-3xl sm:text-4xl mb-4">{heading}</h2>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
            {subheading}
          </p>
        </div>

        <div className="max-w-lg mx-auto bg-gray-800/70 border border-gray-700 rounded-2xl p-7 sm:p-9 space-y-5 reveal" data-reveal="up">
          {/* Assistant */}
          <div className="flex items-center gap-4">
            <div className="shrink-0 text-[color:var(--gold)]">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            </div>
            <span className="text-gray-200 text-sm">
              Executive Assistant: <span className="font-semibold">{assistant}</span>
            </span>
          </div>

          <div className="h-px bg-gray-700" />

          {/* Email */}
          <div className="flex items-center gap-4">
            <div className="shrink-0 text-[color:var(--gold)]">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
            </div>
            <Link
              href={`mailto:${email}`}
              className="text-gray-200 text-sm hover:text-[color:var(--gold)] transition-colors"
            >
              {email}
            </Link>
          </div>

          <div className="h-px bg-gray-700" />

          {/* Phone */}
          <div className="flex items-center gap-4">
            <div className="shrink-0 text-[color:var(--gold)]">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
              </svg>
            </div>
            <span className="text-gray-200 text-sm">{phone}</span>
          </div>
        </div>
      </div>
    </section>
  );
}