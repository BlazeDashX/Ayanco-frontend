import type { Metadata } from "next";
import WhyHero from "@/components/why/WhyHero";
import GlobalScale from "@/components/why/GlobalScale";
import CoreValues from "@/components/why/CoreValues";
import QualityFramework from "@/components/why/QualityFramework";

export const metadata: Metadata = {
  title: "Why Ayanco | Ayanco Trade Corporation",
  description: "Discover why companies choose Ayanco for global trade — our quality framework, verified supplier network, and precision sourcing methodology.",
};

export default function WhyAyancoPage() {
  return (
    <main className="flex flex-col w-full bg-[#FAFAF8] overflow-x-hidden">
      <WhyHero />
      <GlobalScale />
      <CoreValues />
      <QualityFramework />
    </main>
  );
}