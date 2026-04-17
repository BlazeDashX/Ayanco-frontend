"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import ServiceForm from "@/components/admin/ServiceForm";

export default function EditServicePage() {
  const params = useParams();
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/admin/services/${params.id}`);
        if (res.ok) {
          const data = await res.json();
          setService(data);
        }
      } catch (err) {
        console.error("Failed to load service:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={24} className="text-[#C4882A] animate-spin" />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="text-center py-20">
        <p className="text-zinc-500">Service not found.</p>
      </div>
    );
  }

  return <ServiceForm initialData={service} isEdit />;
}
