export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  country: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Rashid Al-Harbi",
    role: "Procurement Director",
    company: "Gulf Industrial Group",
    quote:
      "Ayanco's sourcing process is remarkably efficient. They delivered certified basmati rice within 18 days of inquiry — documentation was flawless. Our second order is already in progress.",
    rating: 5,
    country: "Saudi Arabia",
  },
  {
    id: "t2",
    name: "Mei-Ling Chen",
    role: "Head of Supply Chain",
    company: "Shenzhen Textile Co.",
    quote:
      "Working with Ayanco for machinery procurement has been seamless. The pre-shipment inspection and SGS certification gave us full confidence. Highly recommended for serious B2B buyers.",
    rating: 5,
    country: "China",
  },
  {
    id: "t3",
    name: "Amara Okonkwo",
    role: "CEO",
    company: "Lagos Agro Imports",
    quote:
      "We sourced yellow corn and soybeans through Ayanco for the first time last quarter. Moisture content and quality matched the spec sheet exactly. Zero disputes — that's rare.",
    rating: 5,
    country: "Nigeria",
  },
];
