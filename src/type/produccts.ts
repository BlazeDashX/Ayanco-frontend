export interface Product {
  id: string;
  category: "Food Essentials" | "Agro & Industrial" | "Machinery";
  title: string;
  description: string;
  market: "Global Export" | "Local Market" | "Import & Distribution"; // Requirement: Market served
  image?: string;
  specs: string;
}