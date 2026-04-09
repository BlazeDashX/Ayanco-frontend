/**
 * services.ts — All services data
 * Edit this file to update services displayed on the Services page and homepage.
 */

export interface Service {
    id: string;
    icon: string; // lucide icon name
    title: string;
    tag: string;
    description: string;
    features: string[];
}

export const SERVICES: Service[] = [
    {
        id: "sourcing",
        icon: "Globe",
        title: "Global Sourcing",
        tag: "15+ Countries",
        description:
            "We identify, vet, and engage verified suppliers across 15+ countries ensuring raw material quality before a single unit ships.",
        features: [
            "Supplier background verification",
            "Sample testing & QA",
            "Price benchmarking",
            "Contract negotiation support",
        ],
    },
    {
        id: "compliance",
        icon: "ShieldCheck",
        title: "Trade Compliance",
        tag: "ISO Certified",
        description:
            "Every shipment undergoes rigorous compliance checks adhering to international trade standards, certifications, and documentation requirements.",
        features: [
            "ISO 9001:2015 process adherence",
            "LC / SWIFT documentation",
            "Phytosanitary & lab certificates",
            "Country-of-origin compliance",
        ],
    },
    {
        id: "logistics",
        icon: "Truck",
        title: "End-to-End Logistics",
        tag: "Door to Door",
        description:
            "From customs clearance to last-mile delivery, we manage the entire supply chain with real-time tracking and dedicated coordinators.",
        features: [
            "Sea, air, and land freight",
            "Customs & clearance handling",
            "Real-time shipment tracking",
            "Warehouse coordination",
        ],
    },
    {
        id: "advisory",
        icon: "LineChart",
        title: "Trade Advisory",
        tag: "Expert Guidance",
        description:
            "Our experienced trade desk provides market intelligence, pricing guidance, and strategic advisory for your procurement decisions.",
        features: [
            "Market intelligence reports",
            "Price trend analysis",
            "Supplier risk assessment",
            "Trade finance guidance",
        ],
    },
];

export const SERVICE_SUPPORT = {
    title: "24/7 Trade Support",
    description: "Our logistics team is always online to track your shipments and handle urgent customs queries.",
    availability: "24/7 Emergency Support",
};
