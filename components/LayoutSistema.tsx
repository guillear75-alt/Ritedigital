import Sidebar from "./sidebar";

export default function LayoutSistema({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 bg-slate-100 p-8 min-h-screen">
        {children}
      </main>
    </div>
  );
}