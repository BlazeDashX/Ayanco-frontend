/**
 * home.ts — Homepage content data
 * Edit hero slides, stats, portfolio categories, testimonials, and process steps here.
 */

// ─── HERO SLIDES ──────────────────────────────────────────────────────────────

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
        bgImage:
            "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1920&q=80",
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
        bgImage:
            "https://images.unsplash.com/photo-1494412519320-aa613dfb7738?auto=format&fit=crop&w=1920&q=80",
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
        bgImage:
            "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1920&q=80",
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
        bgImage:
            "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1920&q=80",
        primaryCta: { label: "See Products", href: "/products" },
        secondaryCta: { label: "Why Ayanco", href: "/why-ayanco" },
    },
];

// ─── STATS ─────────────────────────────────────────────────────────────────────

export interface Stat {
    value: number;
    suffix: string;
    label: string;
    decimals?: number;
    icon: string; // lucide icon name
}

export const HOME_STATS: Stat[] = [
    { value: 15, suffix: "+", label: "Years of Excellence", icon: "Award" },
    { value: 50, suffix: "+", label: "Global Partners", icon: "Handshake" },
    { value: 500, suffix: "+", label: "Verified Suppliers", icon: "CheckCircle2" },
    { value: 99.8, suffix: "%", label: "Delivery Success", icon: "TrendingUp", decimals: 1 },
];

// ─── PORTFOLIO CATEGORIES ──────────────────────────────────────────────────────

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

// ─── PROCESS STEPS ─────────────────────────────────────────────────────────────

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

// ─── TESTIMONIALS ──────────────────────────────────────────────────────────────

export interface Testimonial {
    id: string;
    name: string;
    role: string;
    company: string;
    quote: string;
    rating: number;
    country: string;
}

export const TESTIMONIALS: Testimonial[] = [
    {
        id: "t1",
        name: "Rashid Al-Harbi",
        role: "Procurement Director",
        company: "Gulf Industrial Group",
        quote:
            "Ayanco's sourcing process is remarkably efficient. They delivered certified basmati rice within 18 days of inquiry — documentation was flawless. Our second order is already in progress.",
        rating: 5,
        country: "Saudi Arabia",
    },
    {
        id: "t2",
        name: "Mei-Ling Chen",
        role: "Head of Supply Chain",
        company: "Shenzhen Textile Co.",
        quote:
            "Working with Ayanco for machinery procurement has been seamless. The pre-shipment inspection and SGS certification gave us full confidence. Highly recommended for serious B2B buyers.",
        rating: 5,
        country: "China",
    },
    {
        id: "t3",
        name: "Amara Okonkwo",
        role: "CEO",
        company: "Lagos Agro Imports",
        quote:
            "We sourced yellow corn and soybeans through Ayanco for the first time last quarter. Moisture content and quality matched the spec sheet exactly. Zero disputes — that's rare.",
        rating: 5,
        country: "Nigeria",
    },
];

// ─── MARQUEE TICKER ───────────────────────────────────────────────────────────

export const MARQUEE_ITEMS = [
    "ISO 9001:2015 Certified",
    "500+ Verified Suppliers",
    "15+ Years in Global Trade",
    "Pre-Shipment Inspection",
    "LC & TT Payments",
    "Phytosanitary Certified",
    "Bangladesh Registered",
    "Sea · Air · Land Freight",
    "Custom Sourcing Available",
    "Real-Time Shipment Tracking",
    "Agricultural Commodities",
    "Industrial Chemicals",
    "Heavy Machinery",
    "Trade QA Protocol",
    "24/7 Support Desk",
];
