import Link from 'next/link';
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Products', href: '/products' },
  { name: 'Services', href: '/services' },
  { name: 'Why Ayanco', href: '/why-ayanco' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link href="/" className="text-2xl font-bold text-blue-900 tracking-tight">
          AYANCO<span className="text-slate-500 font-light">TRADE</span>
        </Link>
        <nav className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-slate-600 hover:text-blue-900 transition-colors">
              {link.name}
            </Link>
          ))}
          <Button className="bg-blue-900 hover:bg-blue-800">Inquiry</Button>
        </nav>
      </div>
    </header>
  );
}