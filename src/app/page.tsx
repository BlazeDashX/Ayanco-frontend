import Hero from "@/components/home/Hero";
import StatsStrip from "@/components/home/StatsStrip";
import Portfolios from "@/components/home/Portfolios";
import ServiceParallax from "@/components/home/ServiceParallax";
import Footer from "@/components/layout/Footer"; // Assuming you have this

export default function HomePage() {
  return (
    <main className="flex flex-col w-full overflow-x-hidden">
      <Hero />
      <StatsStrip />
      <Portfolios />
      <ServiceParallax />
      {/* Footer will be auto-injected by layout.tsx if configured there, or add here */}
    </main>
  );
}