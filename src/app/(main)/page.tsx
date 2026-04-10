import HeroSlider from "@/components/home/HeroSlider";
import MarqueeTicker from "@/components/home/MarqueeTicker";
import StatsStrip from "@/components/home/StatsStrip";
import Portfolios from "@/components/home/Portfolios";
import ProcessSteps from "@/components/home/ProcessSteps";
import Testimonials from "@/components/home/Testimonials";
import ServiceParallax from "@/components/home/ServiceParallax";
import TrustStrip from "@/components/ui/TrustStrip";

export default function HomePage() {
  return (
    <main>
      <HeroSlider />
      <MarqueeTicker />
      <StatsStrip />
      {/* ProcessSteps before Portfolios — user must understand HOW before WHAT */}
      <ProcessSteps />
      <Portfolios />
      <Testimonials />
      <ServiceParallax />
      {/* TrustStrip: final credibility layer before footer */}
      <TrustStrip />
    </main>
  );
}

