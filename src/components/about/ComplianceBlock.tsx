"use client";

import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { complianceInfo, complianceBadges } from "@/data/about";
import { BadgeCheck } from "lucide-react";

export default function ComplianceBlock() {
  return (
    <SectionWrapper background="white">
      <SectionTitle
        label="Trust & Compliance"
        title={complianceInfo.headline}
        subtitle={complianceInfo.description}
        dark
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        {complianceBadges.map((badge) => (
          <div
            key={badge.label}
            className="bg-[#F5F4F0] border border-zinc-200 p-5 text-center"
          >
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] mb-2">
              {badge.label}
            </p>
            <p className="text-zinc-900 font-bold text-sm">{badge.value}</p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
