// Ensure this constant is at the very top of the file
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export async function getServices() {
  try {
    const res = await fetch(`${API_URL}/services`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error('Failed to fetch services');
    return res.json();
  } catch (error) {
    // Return high-quality fallback data so UI never breaks
    return [
      { id: 'export-import', title: "Import & Export", desc: "Global border-crossing solutions.", icon: "Ship" },
      { id: 'logistics', title: "Global Logistics", desc: "End-to-end supply chain management.", icon: "Truck" },
    ];
  }
}