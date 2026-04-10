import type { Metadata } from "next";
import { Inter, Playfair_Display, Lato, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

import ScrollProgressBar from "@/components/ui/ScrollProgressBar";
import MouseGlow from "@/components/ui/MouseGlow";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["700", "900"],  // Only weights actually used (font-bold + font-black)
  display: "swap",
});
const lato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  weight: ["300", "400", "700"],  // font-light, normal, font-bold
  display: "swap",
});
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["700"],  // Only used for 10px bold labels
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
      <body className={`${inter.variable} ${playfair.variable} ${lato.variable} ${cormorant.variable} font-sans`}>
        {/* Global UI only */}
        <MouseGlow />
        <ScrollProgressBar />

        {children}
        <Analytics />
      </body>
    </html>
  );
}