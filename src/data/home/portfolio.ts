export interface PortfolioCategory {
  id: string;
  icon: string; // lucide icon name
  title: string;
  description: string;
  href: string;
  accent: string; // tailwind color classes for icon bg/text
}

export const PORTFOLIO_CATEGORIES: PortfolioCategory[] = [
  {
    id: "food",
    icon: "Sprout",
    title: "Food Essentials",
    description:
      "Premium grains, pulses, and edible oils sourced from certified growers across South Asia, Europe, and the Americas.",
    href: "/products/food",
    accent: "amber",
  },
  {
    id: "industrial",
    icon: "Factory",
    title: "Industrial Goods",
    description:
      "Raw materials and chemical compounds for large-scale manufacturing — PVC, caustic soda, fertilizers, and more.",
    href: "/products/industrial",
    accent: "blue",
  },
  {
    id: "machinery",
    icon: "Cog",
    title: "Machinery",
    description:
      "Heavy equipment and specialized machinery for agriculture, textile, and infrastructure projects globally.",
    href: "/products/machinery",
    accent: "violet",
  },
];
