import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Ayanco Trade Corporation",
  description: "Learn about Ayanco Trade Corporation — a global sourcing and industrial supply chain company operating since 2012.",
};

import HeroHeader from "@/components/about/HeroHeader";
import CompanySnapshot from "@/components/about/CompanySnapshot";
import CompanyStory from "@/components/about/CompanyStory";
import Capabilities from "@/components/about/Capabilities";
import ProcessFlow from "@/components/about/ProcessFlow";
import MissionVision from "@/components/about/MissionVision";
import CoreValues from "@/components/about/CoreValues";
import ManagementMessage from "@/components/about/ManagementMessage";
import ComplianceBlock from "@/components/about/ComplianceBlock";

export default function AboutPage() {
  return (
    <main className="flex flex-col w-full overflow-x-hidden bg-white">
      <HeroHeader />
      <CompanySnapshot />
      <CompanyStory />
      <Capabilities />
      <ProcessFlow />
      <MissionVision />
      <CoreValues />
      <ManagementMessage />
      <ComplianceBlock />
    </main>
  );
}
