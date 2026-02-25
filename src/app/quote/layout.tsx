import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Request a Quote | Ayanco Trade Corporation",
    description: "Request a trade quotation from Ayanco. Our corporate team responds within 4 hours with pricing, sourcing options and delivery timelines.",
};

export default function QuoteLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
