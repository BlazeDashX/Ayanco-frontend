import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#09090B] text-white">
      <AdminSidebar />
      <main className="lg:ml-64 min-h-screen transition-all duration-300">
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
