import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default async function DocentesPage({
  searchParams,
}: {
  searchParams: Promise<{
    curso?: string;
  }>;
}) {

  const { curso } = await searchParams;

  let query = supabase
    .from("docente_curso_materia")
    .select(`
      id,
      docentes (
        id,
        apellido,
        nombre
      ),
      cursos (
        nombre
      ),
      materias (
        nombre
      )
    `)
    .order("curso_id");

  if (curso) {
    query = query.eq("curso_id", Number(curso));
  }

  const { data: asignaciones } = await query;

  const cursosAgrupados = asignaciones?.reduce(
  (acc: any, item: any) => {
    const nombreCurso =
      item.cursos?.nombre || "Sin curso";

    if (!acc[nombreCurso]) {
      acc[nombreCurso] = [];
    }

    acc[nombreCurso].push(item);

    return acc;
  },
  {}
);

    return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-5xl mx-auto">
         <div className="flex flex-col xl:flex-row xl:justify-between xl:items-center gap-6 mb-8">

  <div>
    <h1 className="text-4xl font-bold">
      Docentes por Curso
    </h1>

    <p className="text-slate-500 mt-2">
      Asignación de materias y docentes.
    </p>
  </div>

  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

    <div className="bg-white rounded-xl p-4 shadow min-w-[140px]">
      <p className="text-slate-500 text-sm text-center font-bold">
        Docentes
      </p>

      <p className="text-3xl text-center font-bold">
        {new Set(
          asignaciones?.map((a: any) => a.docentes?.id)
        ).size}
      </p>
    </div>

    <div className="bg-white rounded-xl p-4 shadow min-w-[140px]">
      <p className="text-slate-500 text-sm text-center font-bold">
        Asignaciones
      </p>

      <p className="text-3xl text-center font-bold">
        {asignaciones?.length ?? 0}
      </p>
    </div>

    <div className="bg-white rounded-xl p-4 shadow min-w-[140px]">
      <p className="text-slate-500 text-sm text-center font-bold">
        Cursos
      </p>

      <p className="text-3xl text-center font-bold">
        6
      </p>
    </div>

    <Link
  href="/dashboard/directivo"
  className="bg-slate-600 hover:bg-slate-700 text-white rounded-xl
    px-4 py-2 h-fit self-center text-center font-bold"
>
  Volver
</Link>

  </div>

</div>
        
       <div className="space-y-10">

      {Object.entries(cursosAgrupados || {}).map(
        ([curso, items]: any) => (

          <div key={curso}>

        <h2 className="text-2xl font-bold mb-2">
          {curso}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          {items.map((item: any) => (

            <div
              key={item.id}
              className="bg-white rounded-2xl shadow border border-slate-200 p-6"
            >
              <h3 className="text-lg font-bold">
                {item.materias?.nombre}
              </h3>

              <p className="text-slate-600 mt-3">
                {item.docentes?.nombre} {item.docentes?.apellido}
              </p>

              <div className="mt-6">
                <Link
                  href={`/docentes/${item.docentes?.id}`}
                  className="block text-center bg-slate-700 hover:bg-slate-800
                    text-white font-bold py-2 rounded-lg"
                >
                  Datos
                </Link>
              </div>

            </div>

          ))}

        </div>

      </div>

        )
      )}

    </div>
          </div>
        </div>
      );
    }