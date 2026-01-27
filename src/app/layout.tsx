import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Or your preferred font
import "./globals.css";
import Navbar from "@/components/layout/Navbar"; // IMPORT THE NEW NAVBAR
import Footer from "@/components/layout/Footer"; // We will build this in Step 2

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
        <Navbar /> 
        {children}
        <Footer />
      </body>
    </html>
  );
}