import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default async function CursoDetalle({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await params;

  const cursoId = Number(id);

  const { count: totalAlumnos } = await supabase
  .from("alumno_curso")
  .select("*", { count: "exact", head: true })
  .eq("curso_id", cursoId);

const { data: asignaciones } = await supabase
  .from("docente_curso_materia")
  .select(`
    id,
    docentes (
      id,
      apellido,
      nombre
    ),
    materias (
      id,
      nombre
    )
  `)
  .eq("curso_id", cursoId);

const totalMaterias = asignaciones?.length || 0;

const totalDocentes = new Set(
  asignaciones?.map((a: any) => a.docentes?.id)
).size;

  const { data: curso } = await supabase
    .from("cursos")
    .select("*")
    .eq("id", cursoId)
    .single();

  
  const { data: materiasCurso } = await supabase
    .from("docente_curso_materia")
    .select(`
      id,
      docentes (
        id,
        apellido,
        nombre
      ),
      materias (
        id,
        nombre
      )
    `)
    .eq("curso_id", cursoId);

  
  return (
    <div className="min-h-screen bg-slate-50 p-8">

      <div className="max-w-6xl mx-auto">

        <div className="flex justify-between items-center mb-8">

          <div>
            <h1 className="text-4xl font-bold">
              {curso?.nombre}
            </h1>

            <p className="text-slate-500 mt-2">
              Materias y docentes asignados al curso
            </p>
          </div>

          <Link
            href="/cursos"
            className="bg-slate-600 text-white px-4 py-2 rounded-lg"
          >
            Volver
          </Link>

        </div>
      
        <div className="grid grid-cols-1 md:grid-cols-6 gap-5 mb-5">

        <div className="bg-white text-center rounded-xl p-4 shadow">
          <p className="text-slate-500">Alumnos</p>
          <p className="text-3xl font-bold">
            {totalAlumnos ?? 0}
          </p>
        </div>

        <div className="bg-white text-center rounded-xl p-4 shadow">
          <p className="text-slate-500">Materias</p>
          <p className="text-3xl font-bold">
            {totalMaterias}
          </p>
        </div>

        <div className="bg-white text-center rounded-xl p-4 shadow">
          <p className="text-slate-500">Docentes</p>
          <p className="text-3xl font-bold">
            {totalDocentes}
          </p>
        </div>

        

        <Link
          href={`/alumnos?curso=${curso?.nombre}`}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl
           p-5 text-center font-bold shadow"
        >
          Ver Alumnos
        </Link>

        <Link
          href={`/docentes?curso=${cursoId}`}
          className="bg-slate-700 hover:bg-slate-800 text-white rounded-2xl
            p-5 text-center font-bold shadow"
        >
            Ver Plantel
          </Link>

          <Link
            href={`/reportes/curso/${cursoId}`}
            className="bg-green-600 hover:bg-green-700 text-white rounded-2xl
              p-5 text-center font-bold shadow"
          >
            Ver Reportes
          </Link>


          </div>
          

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {materiasCurso?.map((item: any) => (

            <div
              key={item.id}
              className="
                bg-white
                rounded-2xl
                shadow
                border
                border-slate-200
                p-6
              "
            >

              <h2 className="text-xl font-bold text-slate-900">
                {item.materias?.nombre}
              </h2>

              <p className="text-slate-600 mt-3">
                {item.docentes?.nombre} {item.docentes?.apellido}
              </p>

              <div className="mt-6">

                <Link
                  href={`/reportes/curso/${cursoId}?materia=${item.materias?.id}`}
                  className="
                    block
                    text-center
                    bg-blue-600
                    hover:bg-blue-700
                    text-white
                    py-2
                    rounded-lg
                  "
                >
                  Ver Alumnos
                </Link>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}