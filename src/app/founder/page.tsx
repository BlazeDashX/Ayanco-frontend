import type { Metadata } from "next";

// ─── CSS ─────────────────────────────────────────────────────
// Import the founder stylesheet once here so it's tree-shaken
// per-route and doesn't bleed into other pages.
import "@/styles/founder.css";

// ─── Components ──────────────────────────────────────────────
import ScrollRevealProvider from "@/components/founder/ScrollRevealProvider";
import ReadProgressBar from "@/components/founder/ReadProgressBar";
import FounderNav from "@/components/founder/FounderNav";
import FounderHero from "@/components/founder/FounderHero";
import FounderAbout from "@/components/founder/FounderAbout";
import CompanyStats from "@/components/founder/CompanyStats";
import CompanyCatalog from "@/components/founder/CompanyCatalog";
import FounderMilestones from "@/components/founder/FounderMilestones";
import EventsSlideShow from "@/components/founder/EventsSlideShow";
import AwardsGallery from "@/components/founder/AwardsGallery";
import FounderAffiliations from "@/components/founder/FounderAffiliations";
import FounderContact from "@/components/founder/FounderContact";
import FounderFooter from "@/components/founder/FounderFooter";

export const metadata: Metadata = {
  title: "Md. Akhtarul Islam Rimon — Executive E-Portfolio",
  description:
    "Visionary entrepreneur and founder of Ayan International — building excellence across agriculture, packaging, fisheries, and more.",
};

export default function FounderPage() {
  return (
    <ScrollRevealProvider>
      {/* Fixed UI chrome */}
      <ReadProgressBar />
      <FounderNav />

      <main className="flex flex-col w-full overflow-x-hidden bg-(--bg)">
        <FounderHero />
        <FounderAbout />
        
        {/* Combine Stats and Catalog to share 1 screen (50vh each) */}
        <div className="w-full flex flex-col shrink-0">
          <CompanyStats />
          <CompanyCatalog />
        </div>

        <FounderMilestones />
        <EventsSlideShow />
        <AwardsGallery />
        <FounderAffiliations />
        <FounderContact />
      </main>

      <FounderFooter />
    </ScrollRevealProvider>
  );
}