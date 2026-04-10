import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppWidget from "@/components/ui/WhatsAppWidget";
import StickyQuoteBar from "@/components/ui/StickyQuoteBar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {/* Each page owns its own <main> for correct HTML semantics.
          MainLayout provides the chrome only (nav, footer, widgets). */}
      {children}
      <Footer />
      <WhatsAppWidget />
      {/* Sticky conversion bar — appears after hero scroll, dismissed per session */}
      <StickyQuoteBar />
    </>
  );
}