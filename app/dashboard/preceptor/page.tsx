import { supabase } from "@/lib/supabase";
import ProteccionRol from "@/components/ProteccionRol";

export default async function DashboardPreceptorPage() {

  const { count: alumnos } = await supabase
    .from("alumnos")
    .select("*", { count: "exact", head: true });

  const { count: matriculas } = await supabase
    .from("alumno_curso")
    .select("*", { count: "exact", head: true });

  const { data: ausentes } = await supabase
    .from("asistencias")
    .select("*")
    .eq("estado", "Ausente");

  const { count: intervenciones } = await supabase
    .from("intervenciones_rite")
    .select("*", { count: "exact", head: true });

  const ausentesHoy =
    ausentes?.length || 0;

  return (
    <div className="p-8">

      

      <h1 className="text-4xl font-bold mb-8">
        Dashboard Preceptor
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-slate-900 rounded-2xl p-6 shadow">
          <h2 className="text-slate-200">
            Alumnos
          </h2>

          <p className="text-4xl font-bold text-white">
            {alumnos ?? 0}
          </p>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6 shadow">
          <h2 className="text-slate-200">
            Matrículas
          </h2>

          <p className="text-4xl font-bold text-white">
            {matriculas ?? 0}
          </p>
        </div>

        <div className="bg-red-500 rounded-2xl p-6 shadow">
          <h2 className="text-white">
            Ausentes
          </h2>

          <p className="text-4xl font-bold text-white">
            {ausentesHoy}
          </p>
        </div>

        <div className="bg-amber-500 rounded-2xl p-6 shadow">
          <h2 className="text-white">
            Intervenciones RITE
          </h2>

          <p className="text-4xl font-bold text-white">
            {intervenciones ?? 0}
          </p>
        </div>

      </div>

    </div>
  );
}