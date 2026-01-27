// 1. THIS CONST MUST BE AT THE VERY TOP, OUTSIDE ANY FUNCTION
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export async function getProducts() {
  try {
    const res = await fetch(`${API_URL}/products`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
  } catch (error) {
    console.error("Backend unreachable. Returning fallback products.");
    return [];
  }
}

export async function getServices() {
  try {
    const res = await fetch(`${API_URL}/services`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error('Failed to fetch services');
    return res.json();
  } catch (error) {
    return [];
  }
}

export async function getProductById(id: string) {
  try {
    const res = await fetch(`${API_URL}/products/${id}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error('Product not found');
    return res.json();
  } catch (error) {
    return null;
  }
}