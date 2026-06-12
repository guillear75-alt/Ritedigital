import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default async function DashboardPage() {

  const { count: aluusuarios } = await supabase
    .from("usuarios")
    .select("*", { count: "exact", head: true });

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

  const { count: valoraciones } = await supabase
    .from("valoraciones")
    .select("*", { count: "exact", head: true });

  const { count: asistencias } = await supabase
  .from("asistencias")
  .select("*", { count: "exact", head: true });

  const { data: ausentes } = await supabase
  .from("asistencias")
  .select("*")
  .eq("estado", "Ausente");

  const alertasActivas =
  ausentes?.length || 0;

  return (
    <div className="p-8">

      <h1 className="text-4xl font-bold mb-8">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 shadow">
          <h2 className="text-slate-200">Usuarios</h2>
          <p className="text-4xl font-bold text-white">
            {aluusuarios ?? 0}
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 shadow">
          <h2 className="text-slate-200">Alumnos</h2>
          <p className="text-4xl font-bold text-white">
            {alumnos ?? 0}
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 shadow">
          <h2 className="text-slate-200">Docentes</h2>
          <p className="text-4xl font-bold text-white">
            {docentes ?? 0}
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow">
          <h2 className="text-slate-200">Cursos</h2>
          <p className="text-4xl font-bold text-white">
            {cursos ?? 0}
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow">
          <h2 className="text-slate-200">Materias</h2>
          <p className="text-4xl font-bold text-white">
            {materias ?? 0}
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow">
          <h2 className="text-slate-200">Matrículas</h2>
          <p className="text-4xl font-bold text-white">
            {matriculas ?? 0}
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow">
          <h2 className="text-slate-200">Valoraciones</h2>
          <p className="text-4xl font-bold text-white">
            {valoraciones ?? 0}
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