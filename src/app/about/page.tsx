import AboutHero from "@/components/about/AboutHero";
import CompanyBackground from "@/components/about/CompanyBackground";
import MissionVision from "@/components/about/MissionVision";
import CoreValues from "@/components/about/CoreValues";
import FounderMessage from "@/components/about/FounderMessage";
import LegalStatus from "@/components/about/LegalStatus";

export default function AboutPage() {
  return (
    <main className="flex flex-col w-full overflow-x-hidden">
      <AboutHero />
      <CompanyBackground />
      <MissionVision />
      <CoreValues />
      <FounderMessage />
      <LegalStatus />
    </main>
  );
}
