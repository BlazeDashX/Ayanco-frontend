import type { Metadata } from "next";
import { Inter, Playfair_Display, Lato, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

import ScrollProgressBar from "@/components/ui/ScrollProgressBar";
import MouseGlow from "@/components/ui/MouseGlow";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800", "900"]
});
const lato = Lato({ 
  subsets: ["latin"], 
  variable: "--font-lato",
  weight: ["100", "300", "400", "700", "900"]
});
const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"], 
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"]
});

export const metadata: Metadata = {
  title: "Ayanco Trade Corporation",
  description: "Global Sourcing and Industrial Supply Chain Solutions",
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
      </body>
    </html>
  );
}