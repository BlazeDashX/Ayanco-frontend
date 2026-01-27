import Link from 'next/link';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900">
      <div className="container mx-auto px-6 max-w-7xl pt-20 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo Column */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white tracking-tighter">AYANCO<span className="text-blue-500">.</span></h3>
            <p className="text-sm leading-relaxed">Premier global trading corporation bridging high-growth markets with premium industrial and agricultural supply chains.</p>
            <div className="flex gap-4">
              <Link href="#" className="hover:text-blue-500 transition-colors"><Linkedin size={20}/></Link>
              <Link href="#" className="hover:text-blue-500 transition-colors"><Globe size={20}/></Link>
            </div>
          </div>

          {/* Business Links */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-6">Business Units</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="/products" className="hover:text-white transition-colors">Food Essentials</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors">Industrial Goods</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors">Machinery</Link></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-6">Company</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="/about" className="hover:text-white transition-colors">Our Firm</Link></li>
              <li><Link href="/why-ayanco" className="hover:text-white transition-colors">The Advantage</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-6">Global Desk</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li className="flex items-center gap-3"><Mail size={16} className="text-blue-500"/><a href="mailto:info@ayanco.com">info@ayanco.com</a></li>
              <li className="flex items-center gap-3"><Phone size={16} className="text-blue-500"/><span>+880 1234-567890</span></li>
              <li className="flex items-start gap-3"><MapPin size={16} className="text-blue-500 shrink-0"/><span>Dhaka, Bangladesh</span></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-20 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-slate-600">
          <p>© {new Date().getFullYear()} Ayanco Trade Corp. All Rights Reserved.</p>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-slate-400">Privacy</Link>
            <Link href="#" className="hover:text-slate-400">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}