import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppWidget from "@/components/ui/WhatsAppWidget";
import ScrollProgressBar from "@/components/ui/ScrollProgressBar";
import MouseGlow from "@/components/ui/MouseGlow";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <MouseGlow />
        <ScrollProgressBar />
        <Navbar />
        {children}
        <Footer />
        <WhatsAppWidget />
      </body>
    </html>
  );
}