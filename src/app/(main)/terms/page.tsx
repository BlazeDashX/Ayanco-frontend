import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms of Trade | Ayanco Trade Corporation",
    description: "Terms and conditions governing trading relationships with Ayanco Trade Corporation.",
};

export default function TermsPage() {
    const updated = "February 2025";

    const sections = [
        {
            title: "Acceptance of Terms",
            content: `By submitting a quote request or entering into a trade agreement with Ayanco Trade Corporation ("Ayanco"), you agree to be bound by these Terms of Trade. If you do not agree, do not use our services.`,
        },
        {
            title: "Quotation & Pricing",
            content: `All quotations issued by Ayanco are valid for 7 calendar days from the date of issue unless otherwise stated. Prices are subject to change based on commodity market fluctuations, foreign exchange rates, and supplier availability. A confirmed order requires a written acceptance from both parties.`,
        },
        {
            title: "Payment Terms",
            content: `Accepted payment methods include Letter of Credit (LC), Telegraphic Transfer (TT), and Cash Against Documents (CAD). Payment terms for each transaction will be specified in the formal quotation. Late payments may incur interest at 1.5% per month.`,
        },
        {
            title: "Order Confirmation",
            content: `An order is considered confirmed only upon receipt of a signed purchase order and advance payment or agreed LC terms. Ayanco reserves the right to decline any order at its discretion.`,
        },
        {
            title: "Delivery & Risk",
            content: `Unless otherwise agreed, delivery terms follow Incoterms 2020. Risk of loss or damage transfers to the buyer as specified in the applicable Incoterm for each shipment. Ayanco shall not be liable for delays caused by circumstances beyond its control.`,
        },
        {
            title: "Quality & Inspection",
            content: `All products are subject to Ayanco's Trade QA protocol. Pre-shipment inspection certificates will be provided. Claims for quality discrepancies must be submitted within 7 days of receipt of goods, supported by photographic evidence and an independent inspection report.`,
        },
        {
            title: "Force Majeure",
            content: `Ayanco shall not be liable for failure to perform obligations due to events beyond reasonable control including natural disasters, government actions, port closures, pandemics, or labor strikes.`,
        },
        {
            title: "Governing Law",
            content: `These Terms shall be governed by and construed in accordance with the laws of Bangladesh. Any disputes shall be resolved through arbitration in Dhaka, Bangladesh under applicable commercial arbitration rules.`,
        },
        {
            title: "Contact",
            content: `For terms-related queries, contact: Ayanco Trade Corporation, Banani Model Town, Dhaka-1213. Email: corporate@ayancotrade.com`,
        },
    ];

    return (
        <main className="min-h-screen bg-slate-50">
            <section className="relative bg-slate-950 pt-36 pb-20 md:pt-44 md:pb-24">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_circle_at_50%_0%,rgba(59,130,246,0.1),transparent_60%)]" />
                <div className="container mx-auto px-6 max-w-4xl relative z-10">
                    <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">Legal</p>
                    <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-4">Terms of Trade</h1>
                    <p className="text-slate-400">Last updated: {updated}</p>
                </div>
            </section>

            <section className="py-16 md:py-24">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="bg-white rounded-3xl border border-slate-200 p-8 md:p-14 shadow-sm">
                        <div className="flex flex-col gap-10">
                            {sections.map((section, i) => (
                                <div key={i} className="border-b border-slate-100 last:border-0 pb-10 last:pb-0">
                                    <h2 className="text-xl font-bold text-slate-900 mb-3">{section.title}</h2>
                                    <p className="text-slate-600 leading-relaxed">{section.content}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
