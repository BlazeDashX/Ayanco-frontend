import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Product Catalog | Ayanco Trade Corporation",
    description: "Browse Ayanco's verified portfolio of food essentials, agro & industrial goods, and heavy machinery sourced from 500+ global suppliers.",
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
