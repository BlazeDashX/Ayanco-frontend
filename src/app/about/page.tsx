import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Ayanco Trade Corporation",
  description: "Learn about Ayanco Trade Corporation — a global sourcing and industrial supply chain company operating since 2012.",
};

import AboutHero from "@/components/about/AboutHero";
import CompanyBackground from "@/components/about/CompanyBackground";
import MissionVision from "@/components/about/MissionVision";
import CoreValues from "@/components/about/CoreValues";
import FounderMessage from "@/components/about/FounderMessage";
import LegalStatus from "@/components/about/LegalStatus";

export default function AboutPage() {
  return (
    <main className="flex flex-col w-full overflow-x-hidden bg-white">
      <AboutHero />
      <CompanyBackground />
      <MissionVision />
      <CoreValues />
      <FounderMessage />
      <LegalStatus />
    </main>
  );
}
