import Portfolios from "@/components/home/Portfolios";
import ServiceParallax from "@/components/home/ServiceParallax";
import StatsStrip from "@/components/home/StatsStrip";
import PageHero from "@/components/ui/PageHero";

export default function HomePage() {
  return (
    <main>
      <PageHero
        badge="Premier Global Trading"
        title="Global Reach."
        highlight="Local Impact."
        subtitle="Bridging the gap between premium global suppliers and industrial markets."
        bgImage="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d"
        primaryCta={{ label: "Explore Products", href: "/products" }}
        secondaryCta={{ label: "Our Services", href: "/services" }}
      />

      <StatsStrip />
      <Portfolios />
      <ServiceParallax />
    </main>
  );
}
