import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://ayancotrade.com";

    const routes = [
        { path: "/", priority: 1.0, changeFrequency: "monthly" as const },
        { path: "/about", priority: 0.9, changeFrequency: "monthly" as const },
        { path: "/products", priority: 0.9, changeFrequency: "weekly" as const },
        { path: "/products/food", priority: 0.8, changeFrequency: "weekly" as const },
        { path: "/products/industrial", priority: 0.8, changeFrequency: "weekly" as const },
        { path: "/products/machinery", priority: 0.8, changeFrequency: "weekly" as const },
        { path: "/services", priority: 0.9, changeFrequency: "monthly" as const },
        { path: "/why-ayanco", priority: 0.8, changeFrequency: "monthly" as const },
        { path: "/quote", priority: 0.95, changeFrequency: "monthly" as const },
        { path: "/contact", priority: 0.9, changeFrequency: "monthly" as const },
        { path: "/faq", priority: 0.7, changeFrequency: "monthly" as const },
        { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
        { path: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
    ];

    return routes.map((route) => ({
        url: `${baseUrl}${route.path}`,
        lastModified: new Date(),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
    }));
}
