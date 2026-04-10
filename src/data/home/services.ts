export interface Service {
  id: string;
  icon: string; // lucide icon name
  title: string;
  tag: string;
  description: string;
  num: string;
  image: string;
}

export const SERVICES: Service[] = [
  {
    id: "service-1",
    icon: "Globe",
    title: "Global Sourcing",
    tag: "15+ Countries",
    description: "We identify vetted suppliers across 15+ countries, ensuring raw material quality before a single unit ships.",
    num: "01",
    image: "/images/services/global-sourcing.jpg",
  },
  {
    id: "service-2",
    icon: "ShieldCheck",
    title: "Trade Compliance",
    tag: "ISO Certified",
    description: "Every shipment undergoes rigorous QA checks adhering to international trade standards and certifications.",
    num: "02",
    image: "/images/services/trade-compliance.jpg",
  },
  {
    id: "service-3",
    icon: "Truck",
    title: "End-to-End Logistics",
    tag: "Door to Door",
    description: "From customs clearance to last-mile delivery, we manage the entire supply chain with real-time tracking.",
    num: "03",
    image: "/images/services/logistics.jpg",
  },
];
