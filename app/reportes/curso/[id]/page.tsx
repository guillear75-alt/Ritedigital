import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default async function ReporteCurso({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const cursoId = Number(id);

  const { data: materias } = await supabase
    .from("materias")
    .select("*")
    .eq("anio", cursoId)
    .order("nombre");

  return (
    <div className="p-8">

      <div className="flex gap-2 mb-6">

        <Link
          href="/reportes/curso"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
        >
          Cursos
        </Link>

        <Link
          href="/dashboard/admin"
          className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm"
        >
          Dashboard
        </Link>

      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">

        <h1 className="text-3xl font-bold">
          {cursoId}° Año - Materias
        </h1>

        <p className="text-slate-500 mt-2">
          Seleccione una materia para visualizar
          valoraciones pedagógicas, calificaciones
          y reportes académicos.
        </p>

        <div className="mt-4 inline-flex bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
          {materias?.length || 0} materias registradas
        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

        {materias?.map((materia) => (

          <Link
            key={materia.id}
            href={`/reportes/curso/${cursoId}/materia/${materia.id}`}
            className="
              bg-white
              rounded-2xl
              shadow-lg
              p-5
              hover:shadow-xl
              transition
            "
          >

            <div className="flex items-center gap-3">

  <div className="w-10 h-10 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold shrink-0">
    {materia.nombre.charAt(0)}
  </div>

  <h2 className="text-lg font-bold text-slate-900">
    {materia.nombre}
  </h2>

</div>


            <p className="text-slate-500 text-sm mt-2">
              Valoraciones, calificaciones y seguimiento pedagógico
            </p>

            <div className="mt-4 text-blue-600 font-semibold">
              Ver reporte →
            </div>

          </Link>

        ))}

      </div>

    </div>
  );
}