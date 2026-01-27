// src/lib/api.ts

type Service = {
  id: string;
  title: string;
  description: string;
};

type Product = {
  id: string;
  title?: string;
  name?: string;
  description?: string;
  price?: number;
  image?: string;
  [key: string]: unknown; // keep flexible until backend schema is fixed
};

// ✅ Backend base URL (optional for now)
const API_URL = process.env.NEXT_PUBLIC_API_URL?.trim();

// ✅ Fallback data (frontend-only stage)
const FALLBACK_SERVICES: Service[] = [
  {
    id: "1",
    title: "Import & Export",
    description: "End-to-end trading support and documentation.",
  },
  {
    id: "2",
    title: "Logistics Support",
    description: "Shipment handling and coordination.",
  },
];

const FALLBACK_PRODUCTS: Product[] = []; // add mock products if you want

function buildUrl(path: string) {
  if (!API_URL) return null;
  const base = API_URL.endsWith("/") ? API_URL.slice(0, -1) : API_URL;
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

/**
 * Safe JSON fetch:
 * - If API_URL missing: returns fallback
 * - If request fails: returns fallback
 * - If non-OK status: returns fallback
 */
async function safeFetchJson<T>(path: string, fallback: T, revalidate = 3600): Promise<T> {
  const url = buildUrl(path);
  if (!url) return fallback;

  try {
    const res = await fetch(url, {
      // next revalidate works in server components / route handlers
      next: { revalidate },
    });

    if (!res.ok) return fallback;
    return (await res.json()) as T;
  } catch {
    return fallback;
  }
}

// -------------------- API --------------------

export async function getServices(): Promise<Service[]> {
  // If you later add backend, it will automatically start using it
  return safeFetchJson<Service[]>("/services", FALLBACK_SERVICES);
}

export async function getProducts(): Promise<Product[]> {
  return safeFetchJson<Product[]>("/products", FALLBACK_PRODUCTS);
}

export async function getProductById(id: string): Promise<Product | null> {
  if (!id) return null;

  const url = buildUrl(`/products/${encodeURIComponent(id)}`);
  if (!url) return null;

  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    return (await res.json()) as Product;
  } catch {
    return null;
  }
}
