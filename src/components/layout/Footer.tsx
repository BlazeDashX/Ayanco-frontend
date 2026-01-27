export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t py-12">
      <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-1">
          <h3 className="font-bold text-blue-900 mb-4">AYANCO</h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            A premier trade corporation dedicated to excellence in global procurement and supply chain management.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-slate-900">Quick Links</h4>
          <ul className="text-sm space-y-2 text-slate-600">
            <li>About Us</li>
            <li>Products</li>
            <li>Inquiry</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-slate-900">Contact</h4>
          <ul className="text-sm space-y-2 text-slate-600">
            <li>info@ayanco.com</li>
            <li>+1 (555) 000-1234</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-slate-900">Legal</h4>
          <ul className="text-sm space-y-2 text-slate-600">
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-12 pt-8 border-t text-center text-sm text-slate-400">
        © {new Date().getFullYear()} Ayanco Trade Corporation. All rights reserved.
      </div>
    </footer>
  );
}