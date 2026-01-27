"use client";

import WhyHero from "@/components/why/WhyHero";
import GlobalScale from "@/components/why/GlobalScale";
import CoreValues from "@/components/why/CoreValues";
import QualityFramework from "@/components/why/QualityFramework";

export default function WhyAyancoPage() {
  return (
    <main className="flex flex-col w-full bg-white overflow-x-hidden">
      <WhyHero />
      <GlobalScale />
      <CoreValues />
      <QualityFramework />
    </main>
  );
}