/**
 * Seed script — migrates hardcoded TS data into Cloudflare D1
 * Run once: npx tsx scripts/seed.ts
 */

export {};
const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID!;
const DATABASE_ID = process.env.CLOUDFLARE_D1_DATABASE_ID!;
const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN!;

async function queryD1(sql: string, params: any[] = []) {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/d1/database/${DATABASE_ID}/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sql, params }),
    }
  );
  const data = await response.json();
  if (!data.success) {
    console.error("D1 error:", data.errors);
    throw new Error(data.errors?.[0]?.message || "D1 query failed");
  }
  return data.result[0];
}

function nanoid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

// \u2500\u2500\u2500 Hero Slides \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

const HERO_SLIDES = [
  {
    badge: "Premier Global Trading",
    title: "Global Reach.",
    highlight: "Local Impact.",
    subtitle: "Bridging premium global suppliers with industrial markets across South Asia. Verified sourcing, compliant trade, seamless delivery.",
    bgImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1920&q=80",
    primaryCta: { label: "Explore Products", href: "/products" },
    secondaryCta: { label: "Our Services", href: "/services" },
  },
  {
    badge: "ISO 9001:2015 Certified",
    title: "Trade With",
    highlight: "Confidence.",
    subtitle: "Every shipment is verified, compliant, and documented. Our Trade QA protocols eliminate risk from source to destination.",
    bgImage: "https://images.unsplash.com/photo-1494412519320-aa613dfb7738?auto=format&fit=crop&w=1920&q=80",
    primaryCta: { label: "Our Process", href: "/why-ayanco" },
    secondaryCta: { label: "Request Quote", href: "/quote" },
  },
  {
    badge: "15+ Years of Excellence",
    title: "From Factory",
    highlight: "To Your Door.",
    subtitle: "End-to-end logistics coordination \u2014 from customs clearance to last-mile delivery. Real-time tracking at every stage.",
    bgImage: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1920&q=80",
    primaryCta: { label: "View Services", href: "/services" },
    secondaryCta: { label: "Contact Us", href: "/contact" },
  },
  {
    badge: "500+ Verified Suppliers",
    title: "Sourcing Done",
    highlight: "Right.",
    subtitle: "From agricultural commodities to heavy machinery \u2014 our global supplier network spans 15+ countries with rigorous vetting.",
    bgImage: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1920&q=80",
    primaryCta: { label: "See Products", href: "/products" },
    secondaryCta: { label: "Why Ayanco", href: "/why-ayanco" },
  },
];

// \u2500\u2500\u2500 Products \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

const PRODUCTS = [
  {
    id: "basmati-rice", category: "Food Essentials", title: "Premium Basmati Rice",
    description: "Extra long grain parboiled rice sourced from top-tier South Asian growers. Meets international grain quality standards.",
    market: "Global Export", specs: "MOQ: 25T", image: "https://images.unsplash.com/photo-1586201327693-8661d406085e?w=800&q=80",
    features: ["Extra long grain", "Aromatic", "Parboiled", "Premium quality"],
    applications: ["Retail packaging", "Bulk distribution", "Food service"],
  },
  {
    id: "sunflower-oil", category: "Food Essentials", title: "Refined Sunflower Oil",
    description: "Triple-refined edible oil processed to international food-grade standards. Suitable for retail or bulk distribution.",
    market: "Import & Distribution", specs: "5L, 5KL", image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&q=80",
    features: ["Triple-refined", "Food-grade", "High smoke point", "Neutral taste"],
    applications: ["Cooking oil", "Food processing", "Retail"],
  },
  {
    id: "yellow-lentils", category: "Food Essentials", title: "Organic Yellow Lentils",
    description: "High-protein split lentils grown in certified organic farms. Clean, sorted, and ready for packaging.",
    market: "Local Market", specs: "50kg Bags", image: "https://images.unsplash.com/photo-1515942400420-2b98fed1f515?w=800&q=80",
    features: ["Organic certified", "High protein", "Clean sorted", "Premium grade"],
    applications: ["Food processing", "Retail", "Export"],
  },
  {
    id: "wheat-flour", category: "Food Essentials", title: "Premium Wheat Flour",
    description: "Milled from hard red winter wheat. Available in various extraction rates for industrial bakeries.",
    market: "Import & Distribution", specs: "MOQ: 20T", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80",
    features: ["Hard red winter wheat", "Various extraction rates", "Industrial grade", "Consistent quality"],
    applications: ["Bakeries", "Food processing", "Confectionery"],
  },
  {
    id: "palm-oil", category: "Food Essentials", title: "Refined Palm Oil",
    description: "RBD palm oil suitable for confectionery, margarine, and frying applications. RSPO-compliant sourcing.",
    market: "Global Export", specs: "Flexi: 24MT", image: "https://images.unsplash.com/photo-1621460248085-70337000aa16?w=800&q=80",
    features: ["RSPO-compliant", "RBD processed", "Versatile", "Sustainable sourcing"],
    applications: ["Confectionery", "Margarine", "Frying", "Food industry"],
  },
  {
    id: "chickpeas", category: "Food Essentials", title: "Kabuli Chickpeas",
    description: "Premium Kabuli variety with uniform size and high protein content. Popular in Middle East and South Asian markets.",
    market: "Global Export", specs: "MOQ: 10T", image: "https://images.unsplash.com/photo-1585821035041-9198ba7778fb?w=800&q=80",
    features: ["Kabuli variety", "Uniform size", "High protein", "Premium quality"],
    applications: ["Food processing", "Retail", "Export"],
  },
  {
    id: "pvc-resin", category: "Agro & Industrial", title: "PVC Resin",
    description: "High-grade PVC resin (K67 grade) for pipe manufacturing, profiles, and cable insulation applications.",
    market: "Global Export", specs: "K-67", image: "https://images.unsplash.com/photo-1599723233816-168f121df0f6?w=800&q=80",
    features: ["K67 grade", "High purity", "Consistent quality", "Industrial grade"],
    applications: ["Pipe manufacturing", "Profiles", "Cable insulation"],
  },
  {
    id: "yellow-corn", category: "Agro & Industrial", title: "Yellow Corn",
    description: "Animal feed-grade yellow corn. Tested for moisture, aflatoxin, and foreign matter per GAFTA standards.",
    market: "Import & Distribution", specs: "Moisture < 14%", image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=800&q=80",
    features: ["Feed-grade", "GAFTA standards tested", "Quality assured", "Bulk available"],
    applications: ["Animal feed", "Food processing", "Industrial use"],
  },
  {
    id: "caustic-soda", category: "Agro & Industrial", title: "Caustic Soda Flakes",
    description: "Chemical compound for soap, textile, and paper manufacturing. Supplied in 25kg bags or bulk jumbo bags.",
    market: "Local Market", specs: "99% Purity", image: "https://images.unsplash.com/photo-1603512192005-7f978e88880a?w=800&q=80",
    features: ["99% purity", "Industrial grade", "Multiple packaging", "Consistent quality"],
    applications: ["Soap manufacturing", "Textile industry", "Paper manufacturing"],
  },
  {
    id: "urea-fertilizer", category: "Agro & Industrial", title: "Urea Fertilizer 46%",
    description: "Granular urea fertilizer for agricultural use. Prilled and granular variants available, meets IFA standards.",
    market: "Import & Distribution", specs: "46% N, 25T MOQ", image: "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?w=800&q=80",
    features: ["46% Nitrogen", "IFA standards", "Prilled & granular", "Agricultural grade"],
    applications: ["Agriculture", "Fertilizer blending", "Industrial use"],
  },
  {
    id: "iron-ore", category: "Agro & Industrial", title: "Iron Ore Fines",
    description: "Fe 62%+ iron ore fines for steel and sponge iron production. Sourced from certified mining operations.",
    market: "Global Export", specs: "Fe 62%+", image: "https://images.unsplash.com/photo-1516747432249-f0273764b85c?w=800&q=80",
    features: ["Fe 62%+ content", "Certified sourcing", "Consistent quality", "Bulk available"],
    applications: ["Steel production", "Sponge iron", "Metallurgy"],
  },
  {
    id: "soybeans", category: "Agro & Industrial", title: "Soybeans (Non-GMO)",
    description: "Non-GMO soybeans suitable for oil extraction, animal feed, and food processing. USDA-certified origins.",
    market: "Import & Distribution", specs: "Protein 36%+", image: "https://images.unsplash.com/photo-1550811330-8e78adc87c3a?w=800&q=80",
    features: ["Non-GMO", "USDA certified", "High protein", "Food-grade"],
    applications: ["Oil extraction", "Animal feed", "Food processing"],
  },
  {
    id: "hydraulic-excavator", category: "Machinery", title: "Hydraulic Excavator",
    description: "20-ton earthmoving equipment suitable for construction, mining, and infrastructure projects. Tier 3 engine with advanced hydraulic system for precise control.",
    market: "Import & Distribution", specs: "150HP",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1000&auto=format&fit=crop",
    features: ["20-ton operating weight", "Tier 3 engine", "Advanced hydraulic system", "Spacious cabin", "Quick coupler system"],
    applications: ["Construction sites", "Mining operations", "Infrastructure projects", "Demolition"],
    howItWorks: "Powered by a 150HP Tier 3 diesel engine, the hydraulic excavator uses a closed-loop hydraulic system to drive the boom, bucket, and track motors.",
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
      { label: "Bucket Capacity", value: "0.8 - 1.2 m\u00b3" },
      { label: "Max Digging Depth", value: "6,200 mm" },
      { label: "Max Reach", value: "9,800 mm" },
      { label: "Hydraulic System", value: "Closed-loop, Load-sensing" }
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: "textile-loom", category: "Machinery", title: "Air-Jet Textile Loom",
    description: "High-speed air-jet loom for weaving cotton, polyester, and blended fabrics. Electronic speed control with automated pattern selection.",
    market: "Global Export", specs: "1200RPM",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1000&auto=format&fit=crop",
    features: ["High-speed weaving", "Air-jet technology", "Electronic speed control", "Automated pattern selection", "Low energy consumption"],
    applications: ["Textile industry", "Fabric weaving", "Manufacturing", "Garment production"],
    howItWorks: "Uses compressed air to propel weft yarn through the warp shed at high speeds.",
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
      { label: "Air Consumption", value: "0.8-1.2 m\u00b3/min" },
      { label: "Weft Insertion", value: "Air-jet" },
      { label: "Number of Colors", value: "4-8" },
      { label: "Power Consumption", value: "3.5-5.5 kW" }
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: "conveyor-belts", category: "Machinery", title: "Industrial Conveyor Belts",
    description: "Reinforced rubber conveyor belts for mining, cement, and bulk material handling applications.",
    market: "Local Market", specs: "Custom Sizes",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1000&auto=format&fit=crop",
    features: ["Reinforced rubber construction", "Custom sizes available", "Heavy-duty design", "Abrasion resistant", "High tensile strength"],
    applications: ["Mining", "Cement industry", "Bulk material handling"],
  },
];

// \u2500\u2500\u2500 Services \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

const SERVICES = [
  {
    num: "01",
    icon: "Globe",
    tag: "15+ Countries",
    title: "Global Sourcing",
    description: "We identify vetted suppliers across 15+ countries, ensuring raw material quality before a single unit ships.",
    detailed_description: "Our global sourcing network spans across South Asia, the Middle East, and Europe. We perform rigorous factor audits, material testing, and compliance verification to ensure that every raw material we source meets your exacting standards.",
    image_url: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1260&q=80",
    features: ["Supplier Vetting", "Quality Audits", "Source Procurement"],
    benefits: ["Cost Optimization", "Quality Assurance", "Reduced Risk"],
    process_steps: ["Requirement Analysis", "Supplier Matching", "Quality Verification"]
  },
  {
    num: "02",
    icon: "ShieldCheck",
    tag: "ISO Certified",
    title: "Trade Compliance",
    description: "Every shipment undergoes rigorous QA checks adhering to international trade standards and certifications.",
    detailed_description: "Compliance is the backbone of international trade. Ayanco ensures all shipments adhere to ISO 9001:2015 standards and GAFTA/FOSFA regulations where applicable. We manage all documentation including certificates of origin, quality certificates, and export permits.",
    image_url: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80",
    features: ["ISO Compliance", "Document Verification", "Risk Management"],
    benefits: ["Zero Legal Friction", "Smooth Customs", "Verified Quality"],
    process_steps: ["Pre-shipment Inspection", "Document Audit", "Final Certification"]
  },
  {
    num: "03",
    icon: "Truck",
    tag: "Door to Door",
    title: "End-to-End Logistics",
    description: "From customs clearance to last-mile delivery, we manage the entire supply chain with real-time tracking.",
    detailed_description: "We provide comprehensive logistics solutions that integrate sea, air, and land transport. Our team handles the complexities of customs brokerage, warehousing, and inventory management to ensure your cargo reaches its destination efficiently and safely.",
    image_url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1260&q=80",
    features: ["Real-time Tracking", "Customs Brokerage", "Multimodal Transport"],
    benefits: ["Timely Delivery", "Cost Efficiency", "Stress-free Logistics"],
    process_steps: ["Route Planning", "Transport Coordination", "Last-Mile Delivery"]
  }
];

// \u2500\u2500\u2500 Homepage Content Blocks \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

const HOME_STATS = [
  { value: 15, suffix: "+", label: "Years of Excellence", icon: "Award" },
  { value: 50, suffix: "+", label: "Global Partners", icon: "Handshake" },
  { value: 500, suffix: "+", label: "Verified Suppliers", icon: "CheckCircle2" },
  { value: 99.8, suffix: "%", label: "Delivery Success", icon: "TrendingUp", decimals: 1 },
];

const HOME_PORTFOLIOS = [
  { id: "food", icon: "Sprout", title: "Food Essentials", description: "Premium grains, pulses, and edible oils sourced from certified growers across South Asia, Europe, and the Americas.", image: "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=800&q=80" },
  { id: "industrial", icon: "Factory", title: "Industrial Goods", description: "Raw materials and chemical compounds for large-scale manufacturing \u2014 PVC, caustic soda, fertilizers, and more.", image: "https://images.unsplash.com/photo-1581092335878-2d9ff86ca2bf?w=800&q=80" },
  { id: "machinery", icon: "Cog", title: "Machinery", description: "Heavy equipment and specialized machinery for agriculture, textile, and infrastructure projects globally.", image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80" },
];

const HOME_TESTIMONIALS = [
  { name: "Rashid Al-Harbi", role: "Procurement Director", company: "Gulf Industrial Group", quote: "Ayanco's sourcing process is remarkably efficient. They delivered certified basmati rice within 18 days of inquiry \u2014 documentation was flawless.", country: "Saudi Arabia", rating: 5 },
  { name: "Mei-Ling Chen", role: "Head of Supply Chain", company: "Shenzhen Textile Co.", quote: "Working with Ayanco for machinery procurement has been seamless. The pre-shipment inspection and SGS certification gave us full confidence.", country: "China", rating: 5 },
  { name: "Amara Okonkwo", role: "CEO", company: "Lagos Agro Imports", quote: "We sourced yellow corn and soybeans through Ayanco for the first time last quarter. Quality matched the spec sheet exactly.", country: "Nigeria", rating: 5 },
];

const HOME_PROCESS = [
  { step: 1, title: "Submit Inquiry", description: "Tell us what you need via our quote form.", icon: "MessageSquare" },
  { step: 2, title: "Sourcing & Pricing", description: "Our trade desk provides competitive pricing within 4 hours.", icon: "Search" },
  { step: 3, title: "QA Verification", description: "Pre-shipment inspection and compliance documentation.", icon: "ShieldCheck" },
  { step: 4, title: "Delivery & Support", description: "End-to-end logistics and post-delivery follow-up.", icon: "Truck" },
];

const MARQUEE_ITEMS = [
  "ISO 9001:2015 Certified", "500+ Verified Suppliers", "15+ Years in Global Trade", "Pre-Shipment Inspection", "LC & TT Payments", "Bangladesh Registered"
];

// \u2500\u2500\u2500 Seed Functions \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

async function seedHeroSlides() {
  console.log("\ud83c\udfac Seeding hero slides...");
  await queryD1("DELETE FROM hero_slides");
  for (let i = 0; i < HERO_SLIDES.length; i++) {
    const s = HERO_SLIDES[i];
    await queryD1(`INSERT INTO hero_slides (id, badge, title, highlight, subtitle, bg_image_url, primary_cta_label, primary_cta_href, secondary_cta_label, secondary_cta_href, order_index, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [nanoid(), s.badge, s.title, s.highlight, s.subtitle, s.bgImage, s.primaryCta.label, s.primaryCta.href, s.secondaryCta.label, s.secondaryCta.href, i, 1]);
  }
}

async function seedProducts() {
  console.log("\ud83d\udce6 Seeding products...");
  await queryD1("DELETE FROM product_features");
  await queryD1("DELETE FROM product_applications");
  await queryD1("DELETE FROM product_operate_steps");
  await queryD1("DELETE FROM product_tech_specs");
  await queryD1("DELETE FROM products");
  for (let i = 0; i < PRODUCTS.length; i++) {
    const p = PRODUCTS[i] as any;
    await queryD1(`INSERT INTO products (id, title, description, category, market, specs, image_url, video_url, how_it_works, is_published, order_index) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [p.id, p.title, p.description, p.category, p.market, p.specs, p.image, p.videoUrl || "", p.howItWorks || "", 1, i]);
    if (p.features) p.features.forEach(async (f: any, j: any) => await queryD1("INSERT INTO product_features (id, product_id, text, order_index) VALUES (?, ?, ?, ?)", [nanoid(), p.id, f, j]));
    if (p.applications) p.applications.forEach(async (f: any, j: any) => await queryD1("INSERT INTO product_applications (id, product_id, text, order_index) VALUES (?, ?, ?, ?)", [nanoid(), p.id, f, j]));
    if (p.howToOperate) p.howToOperate.forEach(async (f: any, j: any) => await queryD1("INSERT INTO product_operate_steps (id, product_id, text, order_index) VALUES (?, ?, ?, ?)", [nanoid(), p.id, f, j]));
    if (p.technicalSpecs) p.technicalSpecs.forEach(async (f: any, j: any) => await queryD1("INSERT INTO product_tech_specs (id, product_id, label, value, order_index) VALUES (?, ?, ?, ?, ?)", [nanoid(), p.id, f.label, f.value, j]));
  }
}

async function seedServices() {
  console.log("\ud83d\udee0\ufe0f Seeding services...");
  await queryD1("DELETE FROM service_features");
  await queryD1("DELETE FROM services");
  for (let i = 0; i < SERVICES.length; i++) {
    const s = SERVICES[i];
    const sid = nanoid();
    await queryD1(`INSERT INTO services (id, num, icon, tag, title, description, detailed_description, image_url, order_index, is_published) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [sid, s.num, s.icon, s.tag, s.title, s.description, s.detailed_description, s.image_url, i, 1]);
    s.features.forEach(async (f, j) => await queryD1("INSERT INTO service_features (id, service_id, text, order_index) VALUES (?, ?, ?, ?)", [nanoid(), sid, f, j]));
  }
}

async function seedHomeBlocks() {
  console.log("\ud83c\udfe0 Seeding home content blocks...");
  await queryD1("DELETE FROM homepage_stats");
  await queryD1("DELETE FROM homepage_portfolios");
  await queryD1("DELETE FROM homepage_testimonials");
  await queryD1("DELETE FROM homepage_process");
  await queryD1("DELETE FROM homepage_marquee");

  for (let i = 0; i < HOME_STATS.length; i++) {
    const s = HOME_STATS[i];
    await queryD1(`INSERT INTO homepage_stats (id, label, value, suffix, icon, decimals, order_index) VALUES (?, ?, ?, ?, ?, ?, ?)`, [nanoid(), s.label, s.value, s.suffix, s.icon, s.decimals || 0, i]);
  }
  for (let i = 0; i < HOME_PORTFOLIOS.length; i++) {
    const p = HOME_PORTFOLIOS[i];
    await queryD1(`INSERT INTO homepage_portfolios (id, title, description, icon, image_url, order_index) VALUES (?, ?, ?, ?, ?, ?)`, [nanoid(), p.title, p.description, p.icon, p.image, i]);
  }
  for (let i = 0; i < HOME_TESTIMONIALS.length; i++) {
    const t = HOME_TESTIMONIALS[i];
    await queryD1(`INSERT INTO homepage_testimonials (id, name, role, company, quote, country, rating, order_index) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [nanoid(), t.name, t.role, t.company, t.quote, t.country, t.rating, i]);
  }
  for (let i = 0; i < HOME_PROCESS.length; i++) {
    const p = HOME_PROCESS[i];
    await queryD1(`INSERT INTO homepage_process (id, title, description, icon, order_index) VALUES (?, ?, ?, ?, ?)`, [nanoid(), p.title, p.description, p.icon, i]);
  }
  for (let i = 0; i < MARQUEE_ITEMS.length; i++) {
    await queryD1(`INSERT INTO homepage_marquee (id, text, order_index) VALUES (?, ?, ?)`, [nanoid(), MARQUEE_ITEMS[i], i]);
  }
}

async function main() {
  try {
    await seedHeroSlides();
    await seedProducts();
    await seedServices();
    await seedHomeBlocks();
    console.log("\n\u2728 Seed complete!");
  } catch (error) {
    console.error("\n\u274c Seed failed:", error);
    process.exit(1);
  }
}

main();
