import { supabase } from "@/lib/supabase";
import ProteccionRol from "@/components/ProteccionRol";

export default async function DashboardSecretarioPage() {

  const { count: alumnos } = await supabase
    .from("alumnos")
    .select("*", { count: "exact", head: true });

  const { count: docentes } = await supabase
    .from("docentes")
    .select("*", { count: "exact", head: true });

  const { count: cursos } = await supabase
    .from("cursos")
    .select("*", { count: "exact", head: true });

  const { count: materias } = await supabase
    .from("materias")
    .select("*", { count: "exact", head: true });

  const { count: matriculas } = await supabase
    .from("alumno_curso")
    .select("*", { count: "exact", head: true });

  return (
    <div className="p-8">

   

      <h1 className="text-4xl font-bold mb-8">
        Dashboard Secretaría
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">

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

        <div className="bg-slate-900 rounded-2xl p-6 shadow">
          <h2 className="text-slate-200">Materias</h2>
          <p className="text-4xl font-bold text-white">
            {materias ?? 0}
          </p>
        </div>

        <div className="bg-blue-600 rounded-2xl p-6 shadow">
          <h2 className="text-white">Matrículas</h2>
          <p className="text-4xl font-bold text-white">
            {matriculas ?? 0}
          </p>
        </div>

      </div>

    </div>
  );
}