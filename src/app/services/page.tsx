import { getServices } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Ship, Truck, FileCheck, Globe2 } from "lucide-react";
import Link from "next/link";

// Mapping icons for fallback/dummy data
const IconMap: any = {
  Ship: <Ship className="w-10 h-10 text-blue-600" />,
  Truck: <Truck className="w-10 h-10 text-blue-600" />,
  FileCheck: <FileCheck className="w-10 h-10 text-blue-600" />,
};

export const metadata = {
  title: "Professional Services | Ayanco Trade Corporation",
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="bg-slate-900 py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold">Our Expertise</h1>
            <p className="text-slate-400 mt-6 text-lg">
              Ayanco Trade provides more than just products. We offer the operational infrastructure 
              required to scale your business globally.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="container mx-auto px-4 -mt-10">
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service: any) => (
            <Card key={service.id} className="border-none shadow-xl hover:translate-y-[-5px] transition-transform duration-300">
              <CardHeader className="pt-8">
                <div className="mb-4">
                  {IconMap[service.icon] || <Globe2 className="w-10 h-10 text-blue-600" />}
                </div>
                <CardTitle className="text-2xl font-bold">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 leading-relaxed mb-6">
                  {service.desc}
                </p>
                <Button variant="link" asChild className="p-0 text-blue-600 font-bold hover:gap-2 transition-all">
                  <Link href={`/services/${service.id}`}>
                    Learn More <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Why Consult Section */}
      <section className="container mx-auto px-4 mt-24">
        <div className="bg-blue-600 rounded-3xl p-8 md:p-16 text-white flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold">Need a custom supply chain solution?</h2>
            <p className="text-blue-100 mt-4 text-lg">
              Our consultants are ready to help you navigate the complexities of international trade.
            </p>
          </div>
          <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-slate-100 text-lg py-7 px-10">
            Book a Consultation
          </Button>
        </div>
      </section>
    </div>
  );
}