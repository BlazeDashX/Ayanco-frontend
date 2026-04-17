import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy | Ayanco Trade Corporation",
    description: "How Ayanco Trade Corporation collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
    const updated = "February 2025";

    const sections = [
        {
            title: "Information We Collect",
            content: `When you submit a quote request or contact form, we collect your name, company name, email address, phone number, and the details of your trade inquiry. We do not collect payment information through this website.`,
        },
        {
            title: "How We Use Your Information",
            content: `We use the information you provide solely to respond to your trade inquiries, process quotation requests, and maintain our business relationship with you. We do not use your data for marketing purposes without explicit consent.`,
        },
        {
            title: "Data Sharing",
            content: `We do not sell, rent, or share your personal information with third parties except where required to fulfill a trade order (e.g., sharing shipping details with logistics partners) or where required by law.`,
        },
        {
            title: "Data Retention",
            content: `We retain your inquiry data for up to 3 years for business continuity and legal compliance purposes. You may request deletion of your data by contacting us at corporate@ayancotrade.com.`,
        },
        {
            title: "Cookies",
            content: `This website may use essential cookies to ensure proper functionality. We do not use advertising or tracking cookies. By using this site, you consent to the use of essential cookies.`,
        },
        {
            title: "Security",
            content: `We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, disclosure, or destruction.`,
        },
        {
            title: "Your Rights",
            content: `You have the right to access, correct, or delete the personal data we hold about you. To exercise these rights, contact us at corporate@ayancotrade.com. We will respond within 30 days.`,
        },
        {
            title: "Contact",
            content: `For any privacy-related questions, contact: Ayanco Trade Corporation, Banani Model Town, Dhaka-1213, Bangladesh. Email: corporate@ayancotrade.com`,
        },
    ];

    return (
        <main className="min-h-screen bg-slate-50">
            <section className="relative bg-slate-950 pt-36 pb-20 md:pt-44 md:pb-24">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_circle_at_50%_0%,rgba(59,130,246,0.1),transparent_60%)]" />
                <div className="container mx-auto px-6 max-w-4xl relative z-10">
                    <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">Legal</p>
                    <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-4">Privacy Policy</h1>
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
