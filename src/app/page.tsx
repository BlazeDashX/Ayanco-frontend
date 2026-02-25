import HeroSlider from "@/components/home/HeroSlider";
import MarqueeTicker from "@/components/home/MarqueeTicker";
import StatsStrip from "@/components/home/StatsStrip";
import Portfolios from "@/components/home/Portfolios";
import ProcessSteps from "@/components/home/ProcessSteps";
import Testimonials from "@/components/home/Testimonials";
import ServiceParallax from "@/components/home/ServiceParallax";

export default function HomePage() {
  return (
    <main>
      <HeroSlider />
      <MarqueeTicker />
      <StatsStrip />
      <Portfolios />
      <ProcessSteps />
      <Testimonials />
      <ServiceParallax />
    </main>
  );
}
