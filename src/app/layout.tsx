import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";

import ScrollProgressBar from "@/components/ui/ScrollProgressBar";
import MouseGlow from "@/components/ui/MouseGlow";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["700", "800"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  weight: ["600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ayanco Trade Corporation",
  description: "Global Sourcing and Industrial Supply Chain Solutions",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jakarta.variable} ${spaceGrotesk.variable} font-sans`}>
        {/* Global UI only */}
        <MouseGlow />
        <ScrollProgressBar />

        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}