export type ProductCategory = "Food Essentials" | "Agro & Industrial" | "Machinery";
export type ProductMarket = "Global Export" | "Import & Distribution" | "Local Market";

export interface Product {
  id: string;
  category: ProductCategory;
  title: string;
  description: string;
  market: ProductMarket;
  specs: string;
  image?: string;
  features?: string[];
  applications?: string[];
  // Machinery-specific fields
  howItWorks?: string;
  howToOperate?: string[];
  technicalSpecs?: { label: string; value: string }[];
  videoUrl?: string;
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
    image: "/images/products/basmati-rice.jpg",
    features: ["Extra long grain", "Aromatic", "Parboiled", "Premium quality"],
    applications: ["Retail packaging", "Bulk distribution", "Food service"],
  },
  {
    id: "sunflower-oil",
    category: "Food Essentials",
    title: "Refined Sunflower Oil",
    description: "Triple-refined edible oil processed to international food-grade standards. Suitable for retail or bulk distribution.",
    market: "Import & Distribution",
    specs: "5L, 5KL",
    image: "/images/products/sunflower-oil.jpg",
    features: ["Triple-refined", "Food-grade", "High smoke point", "Neutral taste"],
    applications: ["Cooking oil", "Food processing", "Retail"],
  },
  {
    id: "yellow-lentils",
    category: "Food Essentials",
    title: "Organic Yellow Lentils",
    description: "High-protein split lentils grown in certified organic farms. Clean, sorted, and ready for packaging.",
    market: "Local Market",
    specs: "50kg Bags",
    image: "/images/products/yellow-lentils.jpg",
    features: ["Organic certified", "High protein", "Clean sorted", "Premium grade"],
    applications: ["Food processing", "Retail", "Export"],
  },
  {
    id: "wheat-flour",
    category: "Food Essentials",
    title: "Premium Wheat Flour",
    description: "Milled from hard red winter wheat. Available in various extraction rates for industrial bakeries.",
    market: "Import & Distribution",
    specs: "MOQ: 20T",
    image: "/images/products/wheat-flour.jpg",
    features: ["Hard red winter wheat", "Various extraction rates", "Industrial grade", "Consistent quality"],
    applications: ["Bakeries", "Food processing", "Confectionery"],
  },
  {
    id: "palm-oil",
    category: "Food Essentials",
    title: "Refined Palm Oil",
    description: "RBD palm oil suitable for confectionery, margarine, and frying applications. RSPO-compliant sourcing.",
    market: "Global Export",
    specs: "Flexi: 24MT",
    image: "/images/products/palm-oil.jpg",
    features: ["RSPO-compliant", "RBD processed", "Versatile", "Sustainable sourcing"],
    applications: ["Confectionery", "Margarine", "Frying", "Food industry"],
  },
  {
    id: "chickpeas",
    category: "Food Essentials",
    title: "Kabuli Chickpeas",
    description: "Premium Kabuli variety with uniform size and high protein content. Popular in Middle East and South Asian markets.",
    market: "Global Export",
    specs: "MOQ: 10T",
    image: "/images/products/chickpeas.jpg",
    features: ["Kabuli variety", "Uniform size", "High protein", "Premium quality"],
    applications: ["Food processing", "Retail", "Export"],
  },

  // ─── Agro & Industrial ────────────────────────────────────────────
  {
    id: "pvc-resin",
    category: "Agro & Industrial",
    title: "PVC Resin",
    description: "High-grade PVC resin (K67 grade) for pipe manufacturing, profiles, and cable insulation applications.",
    market: "Global Export",
    specs: "K-67",
    image: "/images/products/pvc-resin.jpg",
    features: ["K67 grade", "High purity", "Consistent quality", "Industrial grade"],
    applications: ["Pipe manufacturing", "Profiles", "Cable insulation"],
  },
  {
    id: "yellow-corn",
    category: "Agro & Industrial",
    title: "Yellow Corn",
    description: "Animal feed-grade yellow corn. Tested for moisture, aflatoxin, and foreign matter per GAFTA standards.",
    market: "Import & Distribution",
    specs: "Moisture < 14%",
    image: "/images/products/yellow-corn.jpg",
    features: ["Feed-grade", "GAFTA standards tested", "Quality assured", "Bulk available"],
    applications: ["Animal feed", "Food processing", "Industrial use"],
  },
  {
    id: "caustic-soda",
    category: "Agro & Industrial",
    title: "Caustic Soda Flakes",
    description: "Chemical compound for soap, textile, and paper manufacturing. Supplied in 25kg bags or bulk jumbo bags.",
    market: "Local Market",
    specs: "99% Purity",
    image: "/images/products/caustic-soda.jpg",
    features: ["99% purity", "Industrial grade", "Multiple packaging", "Consistent quality"],
    applications: ["Soap manufacturing", "Textile industry", "Paper manufacturing"],
  },
  {
    id: "urea-fertilizer",
    category: "Agro & Industrial",
    title: "Urea Fertilizer 46%",
    description: "Granular urea fertilizer for agricultural use. Prilled and granular variants available, meets IFA standards.",
    market: "Import & Distribution",
    specs: "46% N, 25T MOQ",
    image: "/images/products/urea-fertilizer.jpg",
    features: ["46% Nitrogen", "IFA standards", "Prilled & granular", "Agricultural grade"],
    applications: ["Agriculture", "Fertilizer blending", "Industrial use"],
  },
  {
    id: "iron-ore",
    category: "Agro & Industrial",
    title: "Iron Ore Fines",
    description: "Fe 62%+ iron ore fines for steel and sponge iron production. Sourced from certified mining operations.",
    market: "Global Export",
    specs: "Fe 62%+",
    image: "/images/products/iron-ore.jpg",
    features: ["Fe 62%+ content", "Certified sourcing", "Consistent quality", "Bulk available"],
    applications: ["Steel production", "Sponge iron", "Metallurgy"],
  },
  {
    id: "soybeans",
    category: "Agro & Industrial",
    title: "Soybeans (Non-GMO)",
    description: "Non-GMO soybeans suitable for oil extraction, animal feed, and food processing. USDA-certified origins.",
    market: "Import & Distribution",
    specs: "Protein 36%+",
    image: "/images/products/soybeans.jpg",
    features: ["Non-GMO", "USDA certified", "High protein", "Food-grade"],
    applications: ["Oil extraction", "Animal feed", "Food processing"],
  },

  // ─── Machinery ────────────────────────────────────────────────────
  {
    id: "hydraulic-excavator",
    category: "Machinery",
    title: "Hydraulic Excavator",
    description: "20-ton earthmoving equipment suitable for construction, mining, and infrastructure projects. Tier 3 engine with advanced hydraulic system for precise control.",
    market: "Import & Distribution",
    specs: "150HP",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1000&auto=format&fit=crop",
    features: ["20-ton operating weight", "Tier 3 engine", "Advanced hydraulic system", "Spacious cabin", "Quick coupler system"],
    applications: ["Construction sites", "Mining operations", "Infrastructure projects", "Demolition"],
    howItWorks: "Powered by a 150HP Tier 3 diesel engine, the hydraulic excavator uses a closed-loop hydraulic system to drive the boom, bucket, and track motors. The system provides precise control for delicate operations while maintaining high power output for heavy-duty tasks.",
    howToOperate: [
      "Start engine and allow warm-up period (5-10 minutes)",
      "Check all safety indicators and warning lights",
      "Engage hydraulic system and test controls",
      "Position machine on stable ground before operation",
      "Use joystick controls for boom and bucket movement",
      "Follow load charts for safe lifting capacity",
      "Perform daily maintenance checks on hydraulic fluid and filters"
    ],
    technicalSpecs: [
      { label: "Operating Weight", value: "20,000 kg" },
      { label: "Engine Power", value: "150 HP @ 2200 RPM" },
      { label: "Bucket Capacity", value: "0.8 - 1.2 m³" },
      { label: "Max Digging Depth", value: "6,200 mm" },
      { label: "Max Reach", value: "9,800 mm" },
      { label: "Hydraulic System", value: "Closed-loop, Load-sensing" }
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: "textile-loom",
    category: "Machinery",
    title: "Air-Jet Textile Loom",
    description: "High-speed air-jet loom for weaving cotton, polyester, and blended fabrics. Electronic speed control with automated pattern selection.",
    market: "Global Export",
    specs: "1200RPM",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1000&auto=format&fit=crop",
    features: ["High-speed weaving", "Air-jet technology", "Electronic speed control", "Automated pattern selection", "Low energy consumption"],
    applications: ["Textile industry", "Fabric weaving", "Manufacturing", "Garment production"],
    howItWorks: "Uses compressed air to propel weft yarn through the warp shed at high speeds. The electronic control system manages timing, tension, and pattern changes automatically, ensuring consistent fabric quality at production speeds up to 1200 RPM.",
    howToOperate: [
      "Load warp beams and thread through heddles and reed",
      "Set fabric specifications on electronic panel",
      "Adjust air pressure to 6-8 bar for optimal performance",
      "Start machine and monitor fabric quality sensors",
      "Use automatic pattern change for multi-pattern production",
      "Perform regular cleaning of air nozzles",
      "Check and replace air filters weekly"
    ],
    technicalSpecs: [
      { label: "Max Speed", value: "1200 RPM" },
      { label: "Reed Width", value: "190-340 cm" },
      { label: "Air Consumption", value: "0.8-1.2 m³/min" },
      { label: "Weft Insertion", value: "Air-jet" },
      { label: "Number of Colors", value: "4-8" },
      { label: "Power Consumption", value: "3.5-5.5 kW" }
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: "grain-dryer",
    category: "Machinery",
    title: "Grain Dryer System",
    description: "Tower dryer for rice, corn, and wheat. Capacity from 20 to 200 tons/day with propane or electric heating options.",
    market: "Import & Distribution",
    specs: "20–200T/day",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=1000&auto=format&fit=crop",
    features: ["Tower design for space efficiency", "Multiple capacity options", "Propane or electric heating", "Moisture control system", "Energy recovery unit"],
    applications: ["Agriculture", "Grain processing", "Storage facilities", "Cooperative farms"],
    howItWorks: "Grain flows through vertical drying columns while heated air passes through counter-currently. The moisture control system continuously monitors grain moisture levels and automatically adjusts temperature and airflow to achieve target moisture content without over-drying.",
    howToOperate: [
      "Load grain into receiving hopper",
      "Set target moisture percentage on control panel",
      "Select heating source (propane or electric)",
      "Start drying cycle and monitor moisture sensors",
      "Adjust airflow based on grain type and initial moisture",
      "Unload dried grain when target moisture is reached",
      "Clean air filters and inspect burners monthly"
    ],
    technicalSpecs: [
      { label: "Capacity", value: "20-200 tons/day" },
      { label: "Moisture Reduction", value: "5-15%" },
      { label: "Heating Options", value: "Propane / Electric" },
      { label: "Power Consumption", value: "15-45 kW" },
      { label: "Air Temperature", value: "45-65°C" },
      { label: "Grain Types", value: "Rice, Corn, Wheat" }
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: "conveyor-belts",
    category: "Machinery",
    title: "Industrial Conveyor Belts",
    description: "Reinforced rubber conveyor belts for mining, cement, and bulk material handling applications.",
    market: "Local Market",
    specs: "Custom Sizes",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1000&auto=format&fit=crop",
    features: ["Reinforced rubber construction", "Custom sizes available", "Heavy-duty design", "Abrasion resistant", "High tensile strength"],
    applications: ["Mining", "Cement industry", "Bulk material handling"],
  },
  {
    id: "rice-mill",
    category: "Machinery",
    title: "Complete Rice Mill Plant",
    description: "Turnkey rice processing plant covering cleaning, hulling, whitening, grading, and bagging stages.",
    market: "Global Export",
    specs: "3–10T/hr",
    image: "https://images.unsplash.com/photo-1592982537447-6f2a6a0c7c18?q=80&w=1000&auto=format&fit=crop",
    features: ["Turnkey solution", "Complete processing line", "Multiple capacities", "Fully automated", "Low breakage rate"],
    applications: ["Rice processing", "Agriculture", "Food industry"],
  },
  {
    id: "water-pump",
    category: "Machinery",
    title: "Industrial Water Pumps",
    description: "Centrifugal and submersible pumps for irrigation, industrial, and municipal water supply applications.",
    market: "Local Market",
    specs: "50–5000 m³/h",
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=1000&auto=format&fit=crop",
    features: ["Centrifugal & submersible options", "Multiple capacities", "Industrial grade", "Energy efficient", "Corrosion resistant"],
    applications: ["Irrigation", "Industrial", "Municipal water supply"],
  },
];
