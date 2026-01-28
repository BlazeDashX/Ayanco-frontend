"use client";

import PageHero from "@/components/ui/PageHero";

export default function AboutHero() {
  return (
    <PageHero
      badge="FORMERLY AYAN INTERNATIONAL"
      title="The Standard"
      highlight="of Trust."
      subtitle="Ayanco Trade Corporation is built on disciplined sourcing, strict compliance, and reliable delivery — connecting global suppliers with high-growth markets."
      bgImage="https://images.unsplash.com/photo-1586528116493-da8c682b3b7a?auto=format&fit=crop&w=2400&q=80"
      primaryCta={{ label: "Request Quote", href: "/quote" }}
      secondaryCta={{ label: "Explore Services", href: "/services" }}
      topOffsetClassName="pt-28 md:pt-32"
      minHeightClassName="min-h-[78vh] md:min-h-[86vh]"
    />
  );
}
