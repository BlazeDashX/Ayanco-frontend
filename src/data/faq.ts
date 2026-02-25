/**
 * faq.ts — Frequently Asked Questions data
 * Edit this file to add, remove, or update FAQ entries on the FAQ page.
 */

export interface FAQItem {
    question: string;
    answer: string;
}

export interface FAQCategory {
    category: string;
    items: FAQItem[];
}

export const FAQ_DATA: FAQCategory[] = [
    {
        category: "Sourcing & Procurement",
        items: [
            {
                question: "How does Ayanco source products?",
                answer:
                    "We maintain a network of over 500 verified suppliers across 15+ countries. Every supplier undergoes background verification, quality audits, and compliance checks before we engage them for client orders. Our SQA-inspired protocols eliminate unknowns at the source.",
            },
            {
                question: "What is the minimum order quantity (MOQ)?",
                answer:
                    "MOQ varies by product category. Food commodities typically start at 10–25 metric tons, industrial chemicals at 1–5 MT, and machinery at single units. Contact our trade desk for exact MOQs for your specific product.",
            },
            {
                question: "Can you source products not listed in your catalog?",
                answer:
                    "Absolutely. Our trade desk sources on request. Submit a product specification via the quote form and we will identify verified suppliers within 48 hours. Custom sourcing is one of our core competencies.",
            },
            {
                question: "How long does the sourcing process take?",
                answer:
                    "Standard sourcing from inquiry to confirmed supplier takes 3–7 business days. Rush sourcing is available for critical procurement needs. Lead time for delivery depends on shipment origin and mode of transport.",
            },
        ],
    },
    {
        category: "Quality Assurance",
        items: [
            {
                question: "How do you ensure product quality?",
                answer:
                    "We follow a Trade QA framework inspired by Software Quality Assurance principles. Every batch is tested against internationally accepted standards — SGS or Bureau Veritas inspection, lab certificates, and pre-shipment sample approval by the client.",
            },
            {
                question: "Are your products ISO certified?",
                answer:
                    "Our internal processes are ISO 9001:2015 certified. Supplier products carry their own certifications depending on category — Phytosanitary certificates for agricultural goods, CE/ISO for machinery, and relevant food safety certifications for edible commodities.",
            },
            {
                question: "What happens if the product doesn't meet specifications?",
                answer:
                    "We have a non-conformance protocol. If goods fall below agreed specifications upon pre-shipment inspection or arrival, we work to replace, renegotiate, or refund based on the terms agreed in the sales contract.",
            },
        ],
    },
    {
        category: "Logistics & Delivery",
        items: [
            {
                question: "What shipping modes do you support?",
                answer:
                    "We support sea freight (FCL/LCL), air freight, and land transport. For bulk commodities, sea freight is standard. For high-value or time-sensitive goods, air freight is available. We work with multiple licensed freight forwarders.",
            },
            {
                question: "How long does delivery take?",
                answer:
                    "Delivery timelines depend on origin and mode. Typical sea freight to Bangladesh: 15–30 days from Asia, 30–45 days from Europe/Americas. Air freight: 3–7 days. We provide estimated delivery windows at the quotation stage.",
            },
            {
                question: "Do you provide real-time shipment tracking?",
                answer:
                    "Yes. Once a shipment departs, we provide regular updates including bill of lading details, vessel tracking links, ETAs, and customs clearance status. A dedicated coordinator manages each shipment.",
            },
        ],
    },
    {
        category: "Payments & Terms",
        items: [
            {
                question: "What payment terms do you offer?",
                answer:
                    "We support Letter of Credit (LC), Telegraphic Transfer (TT), and D/P (Documents against Payment) depending on order size and client history. For new clients, we typically require a 30% advance with the balance against shipping documents.",
            },
            {
                question: "Is there a service fee for sourcing?",
                answer:
                    "Our sourcing fee is embedded in the product pricing, so there are no separate invoices for basic sourcing. For complex multi-supplier projects or trade advisory, a fixed consulting fee may apply — disclosed upfront.",
            },
        ],
    },
];
