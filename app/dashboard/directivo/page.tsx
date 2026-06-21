import { supabase } from "@/lib/supabase";
import ProteccionRol from "@/components/ProteccionRol";

export default async function DashboardDirectivoPage() {

  const { count: alumnos } = await supabase
    .from("alumnos")
    .select("*", { count: "exact", head: true });

  const { count: docentes } = await supabase
    .from("docentes")
    .select("*", { count: "exact", head: true });

  const { count: cursos } = await supabase
    .from("cursos")
    .select("*", { count: "exact", head: true });

  const { count: valoraciones } = await supabase
    .from("valoraciones")
    .select("*", { count: "exact", head: true });

  const { count: calificaciones } = await supabase
    .from("calificaciones")
    .select("*", { count: "exact", head: true });

  const { data: ausentes } = await supabase
    .from("asistencias")
    .select("*")
    .eq("estado", "Ausente");

  const alertasActivas =
    ausentes?.length || 0;

  return (
    <div className="p-8">

      <ProteccionRol permitido="directivo" />

      <h1 className="text-4xl font-bold mb-8">
        Dashboard Directivo
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">

        <div className="bg-slate-900 rounded-2xl p-6 shadow">
          <h2 className="text-slate-200">Alumnos</h2>
          <p className="text-4xl font-bold text-white">
            {alumnos ?? 0}
          </p>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6 shadow">
          <h2 className="text-slate-200">Docentes</h2>
          <p className="text-4xl font-bold text-white">
            {docentes ?? 0}
          </p>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6 shadow">
          <h2 className="text-slate-200">Cursos</h2>
          <p className="text-4xl font-bold text-white">
            {cursos ?? 0}
          </p>
        </div>

        <div className="bg-blue-600 rounded-2xl p-6 shadow">
          <h2 className="text-white">Valoraciones</h2>
          <p className="text-4xl font-bold text-white">
            {valoraciones ?? 0}
          </p>
        </div>

        <div className="bg-green-600 rounded-2xl p-6 shadow">
          <h2 className="text-white">Calificaciones</h2>
          <p className="text-4xl font-bold text-white">
            {calificaciones ?? 0}
          </p>
        </div>

        <div className="bg-amber-500 rounded-2xl p-6 shadow">
          <h2 className="text-white">Alertas</h2>
          <p className="text-4xl font-bold text-white">
            {alertasActivas}
          </p>
        </div>

      </div>

    </div>
  );
}