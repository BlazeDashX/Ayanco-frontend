import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Page Not Found | Ayanco Trade Corporation",
};

export default function NotFound() {
    return (
        <main className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_circle_at_50%_40%,rgba(59,130,246,0.12),transparent_60%)]" />
            <div className="relative z-10 text-center px-6 max-w-xl">
                <p className="text-blue-400 font-mono text-sm uppercase tracking-[0.3em] font-bold mb-6">Error 404</p>
                <h1 className="text-7xl md:text-9xl font-extrabold text-white tracking-tighter mb-4">404</h1>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Page Not Found</h2>
                <p className="text-slate-400 leading-relaxed mb-10">
                    The page you&apos;re looking for doesn&apos;t exist or has been moved. Head back to start your trade journey.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center rounded-full bg-white text-slate-900 font-bold px-8 py-4 hover:bg-slate-100 transition-colors"
                    >
                        Go Home
                    </Link>
                    <Link
                        href="/contact"
                        className="inline-flex items-center justify-center rounded-full border border-white/20 text-white font-bold px-8 py-4 hover:bg-white/10 transition-colors"
                    >
                        Contact Support
                    </Link>
                </div>
            </div>
        </main>
    );
}
