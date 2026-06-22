import Sidebar from "@/components/sidebar";
import ProteccionDashboard from "@/components/ProteccionDashboard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProteccionDashboard>

      <div className="flex">

        <Sidebar />

        <main className="flex-1 bg-slate-100 min-h-screen">
          {children}
        </main>

      </div>

    </ProteccionDashboard>
  );
}