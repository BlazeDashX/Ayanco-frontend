import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Services | Ayanco Trade Corporation",
    description: "End-to-end global trade services including sourcing, quality assurance, logistics & freight, and market intelligence.",
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
