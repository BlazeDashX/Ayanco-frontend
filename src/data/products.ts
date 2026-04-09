/**
 * products.ts — All product catalog data
 * Add, remove, or edit products here. Changes reflect instantly on the Products page.
 */

export type ProductCategory = "Food Essentials" | "Agro & Industrial" | "Machinery";
export type ProductMarket = "Global Export" | "Import & Distribution" | "Local Market";

export interface Product {
    id: string;
    category: ProductCategory;
    title: string;
    description: string;
    market: ProductMarket;
    specs: string;
}

export const PRODUCTS: Product[] = [
    // ─── Food Essentials ────────────────────────────────────────────
    {
        id: "basmati-rice",
        category: "Food Essentials",
        title: "Premium Basmati Rice",
        description: "Extra long grain parboiled rice sourced from top-tier South Asian growers. Meets international grain quality standards.",
        market: "Global Export",
        specs: "MOQ: 25T",
    },
    {
        id: "sunflower-oil",
        category: "Food Essentials",
        title: "Refined Sunflower Oil",
        description: "Triple-refined edible oil processed to international food-grade standards. Suitable for retail or bulk distribution.",
        market: "Import & Distribution",
        specs: "5L, 5KL",
    },
    {
        id: "yellow-lentils",
        category: "Food Essentials",
        title: "Organic Yellow Lentils",
        description: "High-protein split lentils grown in certified organic farms. Clean, sorted, and ready for packaging.",
        market: "Local Market",
        specs: "50kg Bags",
    },
    {
        id: "wheat-flour",
        category: "Food Essentials",
        title: "Premium Wheat Flour",
        description: "Milled from hard red winter wheat. Available in various extraction rates for industrial bakeries.",
        market: "Import & Distribution",
        specs: "MOQ: 20T",
    },
    {
        id: "palm-oil",
        category: "Food Essentials",
        title: "Refined Palm Oil",
        description: "RBD palm oil suitable for confectionery, margarine, and frying applications. RSPO-compliant sourcing.",
        market: "Global Export",
        specs: "Flexi: 24MT",
    },
    {
        id: "chickpeas",
        category: "Food Essentials",
        title: "Kabuli Chickpeas",
        description: "Premium Kabuli variety with uniform size and high protein content. Popular in Middle East and South Asian markets.",
        market: "Global Export",
        specs: "MOQ: 10T",
    },

    // ─── Agro & Industrial ────────────────────────────────────────────
    {
        id: "pvc-resin",
        category: "Agro & Industrial",
        title: "PVC Resin",
        description: "High-grade PVC resin (K67 grade) for pipe manufacturing, profiles, and cable insulation applications.",
        market: "Global Export",
        specs: "K-67",
    },
    {
        id: "yellow-corn",
        category: "Agro & Industrial",
        title: "Yellow Corn",
        description: "Animal feed-grade yellow corn. Tested for moisture, aflatoxin, and foreign matter per GAFTA standards.",
        market: "Import & Distribution",
        specs: "Moisture < 14%",
    },
    {
        id: "caustic-soda",
        category: "Agro & Industrial",
        title: "Caustic Soda Flakes",
        description: "Chemical compound for soap, textile, and paper manufacturing. Supplied in 25kg bags or bulk jumbo bags.",
        market: "Local Market",
        specs: "99% Purity",
    },
    {
        id: "urea-fertilizer",
        category: "Agro & Industrial",
        title: "Urea Fertilizer 46%",
        description: "Granular urea fertilizer for agricultural use. Prilled and granular variants available, meets IFA standards.",
        market: "Import & Distribution",
        specs: "46% N, 25T MOQ",
    },
    {
        id: "iron-ore",
        category: "Agro & Industrial",
        title: "Iron Ore Fines",
        description: "Fe 62%+ iron ore fines for steel and sponge iron production. Sourced from certified mining operations.",
        market: "Global Export",
        specs: "Fe 62%+",
    },
    {
        id: "soybeans",
        category: "Agro & Industrial",
        title: "Soybeans (Non-GMO)",
        description: "Non-GMO soybeans suitable for oil extraction, animal feed, and food processing. USDA-certified origins.",
        market: "Import & Distribution",
        specs: "Protein 36%+",
    },

    // ─── Machinery ────────────────────────────────────────────────────
    {
        id: "hydraulic-excavator",
        category: "Machinery",
        title: "Hydraulic Excavator",
        description: "20-ton earthmoving equipment suitable for construction, mining, and infrastructure projects. Tier 3 engine.",
        market: "Import & Distribution",
        specs: "150HP",
    },
    {
        id: "textile-loom",
        category: "Machinery",
        title: "Air-Jet Textile Loom",
        description: "High-speed air-jet loom for weaving cotton, polyester, and blended fabrics. Electronics speed control.",
        market: "Global Export",
        specs: "1200RPM",
    },
    {
        id: "conveyor-belts",
        category: "Machinery",
        title: "Industrial Conveyor Belts",
        description: "Reinforced rubber conveyor belts for mining, cement, and bulk material handling applications.",
        market: "Local Market",
        specs: "Custom Sizes",
    },
    {
        id: "grain-dryer",
        category: "Machinery",
        title: "Grain Dryer System",
        description: "Tower dryer for rice, corn, and wheat. Capacity from 20 to 200 tons/day. Propane or electric heating.",
        market: "Import & Distribution",
        specs: "20–200T/day",
    },
    {
        id: "rice-mill",
        category: "Machinery",
        title: "Complete Rice Mill Plant",
        description: "Turnkey rice processing plant covering cleaning, hulling, whitening, grading, and bagging stages.",
        market: "Global Export",
        specs: "3–10T/hr",
    },
    {
        id: "water-pump",
        category: "Machinery",
        title: "Industrial Water Pumps",
        description: "Centrifugal and submersible pumps for irrigation, industrial, and municipal water supply applications.",
        market: "Local Market",
        specs: "50–5000 m³/h",
    },
];

export const PRODUCT_CATEGORIES: ProductCategory[] = [
    "Food Essentials",
    "Agro & Industrial",
    "Machinery",
];

export const PRODUCTS_PER_PAGE = 9;
