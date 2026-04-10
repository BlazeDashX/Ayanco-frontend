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
