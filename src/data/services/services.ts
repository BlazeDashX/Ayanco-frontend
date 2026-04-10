export type ServiceSize = "sm" | "lg";

export interface Service {
  id: string;
  num: string;
  title: string;
  description: string;
  features: string[];
  image: string;
  size: ServiceSize;
  // Extended fields for detail page
  detailedDescription?: string;
  benefits?: string[];
  process?: string[];
  caseStudy?: string;
}

export interface ProcessStep {
  label: string;
  desc: string;
}

export const SERVICES: Service[] = [
  {
    id: "global-sourcing",
    num: "01",
    title: "Global Sourcing & Procurement",
    description: "We leverage a network of 500+ verified suppliers to find the exact raw materials or machinery you need — negotiation, risk-vetting and contract management included.",
    features: ["Supplier Verification", "Price Negotiation", "Contract Management"],
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
    size: "lg",
    detailedDescription: "Our global sourcing network spans 15+ countries, giving you access to verified suppliers across Asia, Europe, Africa, and the Americas. We handle end-to-end procurement from initial supplier identification to final contract signing, ensuring compliance with international trade standards.",
    benefits: [
      "Access to 500+ pre-vetted suppliers",
      "Competitive pricing through bulk negotiation",
      "Reduced procurement lead time by 40%",
      "Comprehensive supplier risk assessment",
      "Legal contract protection"
    ],
    process: [
      "Requirement analysis and specification",
      "Supplier identification and vetting",
      "Price negotiation and quotation",
      "Sample approval and quality check",
      "Contract finalization and signing"
    ],
    caseStudy: "Successfully sourced 5,000 tons of basmati rice from Pakistan for a UAE client, achieving 15% cost savings through strategic supplier negotiations."
  },
  {
    id: "quality-assurance",
    num: "02",
    title: "Quality Assurance",
    description: "Pre-shipment inspections, lab testing coordination and defect reporting — our Trade QA methodology keeps every shipment compliant.",
    features: ["Pre-shipment Inspection", "Lab Testing", "Defect Reporting"],
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
    size: "sm",
    detailedDescription: "Our comprehensive quality assurance program includes pre-shipment inspections at origin, third-party lab testing coordination, and detailed defect reporting. We ensure every shipment meets international standards and your specific requirements.",
    benefits: [
      "99.8% defect-free shipment rate",
      "Third-party lab testing coordination",
      "Real-time inspection reporting",
      "ISO 9001 compliant processes",
      "Preventive quality control measures"
    ],
    process: [
      "Define quality specifications",
      "Pre-shipment inspection scheduling",
      "Lab sample collection and testing",
      "Defect analysis and reporting",
      "Corrective action implementation"
    ]
  },
  {
    id: "logistics-freight",
    num: "03",
    title: "Logistics & Freight",
    description: "Sea, air or land — we optimise routes for cost and speed while handling every customs document end-to-end.",
    features: ["Customs Clearance", "Freight Forwarding", "Real-time Tracking"],
    image: "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=800&q=80",
    size: "sm",
    detailedDescription: "Our logistics team manages multimodal freight forwarding with real-time tracking capabilities. We handle all customs documentation, duty optimization, and route planning to ensure timely delivery at competitive rates.",
    benefits: [
      "Multimodal transportation options",
      "Real-time shipment tracking",
      "Customs documentation handling",
      "Duty optimization strategies",
      "Warehouse and distribution support"
    ],
    process: [
      "Route planning and optimization",
      "Carrier selection and booking",
      "Customs documentation preparation",
      "Shipment tracking and monitoring",
      "Final delivery confirmation"
    ]
  },
  {
    id: "market-intelligence",
    num: "04",
    title: "Market Intelligence",
    description: "Data-driven insights to help you buy at the right time. We analyse global commodity trends to forecast price shifts and minimise risk.",
    features: ["Trend Analysis", "Cost Forecasting", "Risk Assessment"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    size: "sm",
    detailedDescription: "Our market intelligence team analyzes global commodity trends, currency fluctuations, and geopolitical factors to provide actionable insights. We help you make informed purchasing decisions and minimize market risks.",
    benefits: [
      "Monthly market trend reports",
      "Price forecasting accuracy of 85%",
      "Risk assessment and mitigation",
      "Currency fluctuation analysis",
      "Strategic purchasing recommendations"
    ],
    process: [
      "Market data collection",
      "Trend analysis and forecasting",
      "Risk assessment and reporting",
      "Strategic recommendation",
      "Continuous monitoring"
    ]
  },
  {
    id: "custom-sourcing",
    num: "05",
    title: "Custom Sourcing",
    description: "Can't find it on the shelf? Our trade desk scouts global markets on-demand and returns verified options within 48 hours.",
    features: ["On-Demand Scouting", "48-hr Turnaround", "Verified Alternatives"],
    image: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?auto=format&fit=crop&w=800&q=80",
    size: "sm",
    detailedDescription: "Our custom sourcing service specializes in hard-to-find products and specialized requirements. Our trade desk scouts global markets and returns verified supplier options within 48 hours, complete with pricing and compliance information.",
    benefits: [
      "48-hour turnaround time",
      "Access to specialized suppliers",
      "Multiple verified options",
      "Complete compliance information",
      "Competitive pricing analysis"
    ],
    process: [
      "Requirement specification",
      "Global market scouting",
      "Supplier verification",
      "Option presentation and comparison",
      "Selection and procurement"
    ]
  },
  {
    id: "compliance-documentation",
    num: "06",
    title: "Compliance & Documentation",
    description: "We handle Letter of Credit management, phytosanitary certificates, legal vetting and country-specific compliance requirements.",
    features: ["LC Management", "Phytosanitary Certs", "Legal Vetting"],
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80",
    size: "lg",
    detailedDescription: "Our compliance team manages all trade documentation and regulatory requirements. From Letter of Credit management to phytosanitary certificates and country-specific compliance, we ensure smooth customs clearance and regulatory adherence.",
    benefits: [
      "Complete documentation management",
      "Letter of Credit handling",
      "Phytosanitary certification",
      "Country-specific compliance",
      "Legal document vetting"
    ],
    process: [
      "Regulatory requirement analysis",
      "Document preparation and review",
      "LC and payment term management",
      "Certification coordination",
      "Final compliance verification"
    ]
  },
];

export const PROCESS_STEPS = [
  { label: "Requirement", desc: "You share your exact product specs, quantity and destination." },
  { label: "Scouting", desc: "We identify and vet suppliers from our 500+ global network." },
  { label: "QA Check", desc: "Pre-shipment inspection and compliance verification." },
  { label: "Logistics", desc: "Route-optimised freight, customs docs and real-time tracking." },
  { label: "Delivery", desc: "Goods arrive on time, fully documented." },
];
