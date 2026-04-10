import { ShieldCheck, Handshake, Eye, LucideIcon } from "lucide-react";

export interface CoreValue {
  icon: LucideIcon;
  title: string;
  desc: string;
}

export const coreValues: CoreValue[] = [
  {
    icon: Handshake,
    title: "Integrity",
    desc: "We act with honesty and accountability. We protect long-term trust over short-term gain.",
  },
  {
    icon: ShieldCheck,
    title: "Reliability",
    desc: "We deliver what we promise. Our execution is consistent, measurable, and dependable.",
  },
  {
    icon: Eye,
    title: "Transparency",
    desc: "Clear communication, clear documentation. We reduce uncertainty at every step.",
  },
];

export const missionVision = {
  mission: {
    label: "Mission",
    heading: "Deliver reliable sourcing and trade execution.",
    body: "We simplify global trade through quality control, compliance, and predictable logistics — so clients operate with confidence.",
  },
  vision: {
    label: "Vision",
    heading: "Become the most trusted trade partner in the region.",
    body: "We aim to set a standard for transparency and operational excellence across sourcing, trading, and logistics.",
  },
};
