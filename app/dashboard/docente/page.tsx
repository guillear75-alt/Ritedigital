import { supabase } from "@/lib/supabase";
import ProteccionRol from "@/components/ProteccionRol";

export default async function DashboardDocentePage() {

  const docenteId = 143;

  const { data: cursosDocente } = await supabase
    .from("docente_curso_materia")
    .select("curso_id")
    .eq("docente_id", docenteId)
    .eq("ciclo_lectivo", 2026);

  const misCursos = new Set(
    cursosDocente?.map((c) => c.curso_id)
  ).size;

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

      <ProteccionRol permitido="docente" />

      <h1 className="text-4xl font-bold mb-8">
        Dashboard Docente
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-slate-900 rounded-2xl p-6 shadow">
          <h2 className="text-slate-200">
            Mis Cursos
          </h2>

          <p className="text-4xl font-bold text-white">
            {misCursos}
          </p>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6 shadow">
          <h2 className="text-slate-200">
            Valoraciones
          </h2>

          <p className="text-4xl font-bold text-white">
            {valoraciones ?? 0}
          </p>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6 shadow">
          <h2 className="text-slate-200">
            Calificaciones
          </h2>

          <p className="text-4xl font-bold text-white">
            {calificaciones ?? 0}
          </p>
        </div>

        <div className="bg-amber-500 rounded-2xl p-6 shadow">
          <h2 className="text-white">
            Alertas Activas
          </h2>

          <p className="text-4xl font-bold text-white">
            {alertasActivas}
          </p>
        </div>

      </div>

    </div>
  );
}