export interface HeroSlide {
  id: string;
  badge: string;
  title: string;
  highlight: string;
  subtitle: string;
  bgImage: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "slide-1",
    badge: "Premier Global Trading",
    title: "Global Reach.",
    highlight: "Local Impact.",
    subtitle:
      "Bridging premium global suppliers with industrial markets across South Asia. Verified sourcing, compliant trade, seamless delivery.",
    bgImage: "/images/hero/slide-1.jpg",
    primaryCta: { label: "Explore Products", href: "/products" },
    secondaryCta: { label: "Our Services", href: "/services" },
  },
  {
    id: "slide-2",
    badge: "ISO 9001:2015 Certified",
    title: "Trade With",
    highlight: "Confidence.",
    subtitle:
      "Every shipment is verified, compliant, and documented. Our Trade QA protocols eliminate risk from source to destination.",
    bgImage: "/images/hero/slide-2.jpg",
    primaryCta: { label: "Our Process", href: "/why-ayanco" },
    secondaryCta: { label: "Request Quote", href: "/quote" },
  },
  {
    id: "slide-3",
    badge: "15+ Years of Excellence",
    title: "From Factory",
    highlight: "To Your Door.",
    subtitle:
      "End-to-end logistics coordination — from customs clearance to last-mile delivery. Real-time tracking at every stage.",
    bgImage: "/images/hero/slide-3.jpg",
    primaryCta: { label: "View Services", href: "/services" },
    secondaryCta: { label: "Contact Us", href: "/contact" },
  },
  {
    id: "slide-4",
    badge: "500+ Verified Suppliers",
    title: "Sourcing Done",
    highlight: "Right.",
    subtitle:
      "From agricultural commodities to heavy machinery — our global supplier network spans 15+ countries with rigorous vetting.",
    bgImage: "/images/hero/slide-4.jpg",
    primaryCta: { label: "See Products", href: "/products" },
    secondaryCta: { label: "Why Ayanco", href: "/why-ayanco" },
  },
];
