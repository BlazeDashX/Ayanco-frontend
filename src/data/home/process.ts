export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  icon: string; // lucide icon name
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: 1,
    title: "Submit Inquiry",
    description: "Tell us what you need — product, quantity, target delivery, and timeline via our quote form.",
    icon: "MessageSquare",
  },
  {
    step: 2,
    title: "Sourcing & Pricing",
    description: "Our trade desk identifies verified suppliers and provides competitive pricing within 4 hours.",
    icon: "Search",
  },
  {
    step: 3,
    title: "QA Verification",
    description: "Pre-shipment inspection, sample approval, compliance documentation, and certification review.",
    icon: "ShieldCheck",
  },
  {
    step: 4,
    title: "Delivery & Support",
    description: "End-to-end logistics, real-time tracking, customs clearance, and post-delivery follow-up.",
    icon: "Truck",
  },
];
