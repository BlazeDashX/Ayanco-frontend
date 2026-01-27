import { getServiceById } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: { id: string };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const service = await getServiceById(params.id);

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-slate-50 border-b py-20">
        <div className="container mx-auto px-4">
          <Button variant="ghost" asChild className="mb-6 -ml-4">
            <Link href="/services"><ArrowLeft className="mr-2 h-4 w-4" /> All Services</Link>
          </Button>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900">{service.title}</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">Service Overview</h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                {service.description}
              </p>
            </section>

            <section className="bg-slate-50 p-8 rounded-2xl border">
              <h2 className="text-2xl font-bold mb-6">Our Process</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {service.process?.map((step: string, i: number) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-blue-600 shrink-0" />
                    <div>
                      <span className="font-semibold block text-slate-900">{step}</span>
                      <span className="text-sm text-slate-500">Standard Ayanco protocol for efficiency.</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="h-fit sticky top-28">
            <div className="bg-slate-900 text-white p-8 rounded-2xl">
              <h3 className="text-xl font-bold mb-4">Request a Proposal</h3>
              <p className="text-slate-400 mb-6">
                Interested in this service for your corporation? Contact our specialists today.
              </p>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 py-6" asChild>
                <Link href="/contact">Inquire Now</Link>
              </Button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}