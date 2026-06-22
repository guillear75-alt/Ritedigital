import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default async function MisCursosPage() {
  const docenteId = 143; // Inés por ahora

  const { data } = await supabase
    .from("docente_curso_materia")
    .select(`
      id,
      cursos (
        id,
        nombre
      ),
      materias (
        id,
        nombre
      )
    `)
    .eq("docente_id", docenteId)
    .eq("ciclo_lectivo", 2026)
    .order("curso_id");

  return (
    <div className="p-8">

      
      <h1 className="text-3xl font-bold mb-6">
        Mis Cursos
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((item: any) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow p-6 hover:shadow-lg"
          >
            <h2 className="text-xl font-bold">
              {item.cursos.nombre}
            </h2>

            <p className="text-slate-600 font-bold mt-2">
              Materia: {item.materias.nombre}
            </p>

            <div className="mt-4 flex gap-2">
              <Link
                href={`/valoraciones/curso/${item.cursos.id}?materia=${item.materias.id}`}
                className="bg-blue-600 text-white font-bold px-3 py-2 rounded-xl"
              >
                Valoraciones
              </Link>

              <Link
                href={`/calificaciones/cursos/${item.cursos.id}?materia=${item.materias.id}`}
                className="bg-green-600 text-white font-bold px-3 py-2 rounded-xl"
              >
                Calificaciones
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}