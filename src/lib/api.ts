export async function getServices() {
  try {
    const res = await fetch(`${API_URL}/services`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error('Failed to fetch services');
    return res.json();
  } catch (error) {
    // Fallback B2B Services
    return [
      { 
        id: 'export-import', 
        title: "Import & Export", 
        desc: "Comprehensive solutions for moving goods across international borders with ease.",
        icon: "Ship" 
      },
      { 
        id: 'logistics', 
        title: "Global Logistics", 
        desc: "End-to-end supply chain management from manufacturer to your warehouse.",
        icon: "Truck" 
      },
      { 
        id: 'compliance', 
        title: "Trade Compliance", 
        desc: "Expert navigation of customs, tariffs, and international trade regulations.",
        icon: "FileCheck" 
      }
    ];
  }
}