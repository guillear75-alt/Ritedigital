import { supabase } from "@/lib/supabase";

import Link from "next/link";

export default async function ReporteMateria({
  params,
}: {
  params: Promise<{
    id: string;
    materia: string;
  }>;
}) {
  const { id, materia } = await params;

  const cursoId = Number(id);
  const materiaId = Number(materia);

  let curso = "";

  switch (id) {
    case "1":
      curso = "1°";
      break;
    case "2":
      curso = "2°";
      break;
    case "3":
      curso = "3°";
      break;
    case "4":
      curso = "4°";
      break;
    case "5":
      curso = "5°";
      break;
    case "6":
      curso = "6°";
      break;
  }

  const { data: materiaData } = await supabase
    .from("materias")
    .select("*")
    .eq("id", materiaId)
    .single();

  const { data: alumnos } = await supabase
    .from("alumnos")
    .select("*")
    .eq("curso", curso)
    .order("apellido");

  const { data: calificaciones } = await supabase
    .from("calificaciones")
    .select("*")
    .eq("materia_id", materiaId)
    .eq("periodo", "1° Cuatrimestre");

  const notas =
    calificaciones?.map((c) => Number(c.nota)) || [];

  const promedio =
    notas.length > 0
      ? (
          notas.reduce((a, b) => a + b, 0) /
          notas.length
        ).toFixed(2)
      : "0.00";

  const maxima =
    notas.length > 0
      ? Math.max(...notas)
      : 0;

  const minima =
    notas.length > 0
      ? Math.min(...notas)
      : 0;

   const evaluados = calificaciones?.length || 0;

    const pendientes =
    (alumnos?.length || 0) - evaluados;   

  return (
            <div className="p-6">

        <div className="mb-4">
        <Link
          href={`/reportes/curso/${cursoId}`}
          className="bg-slate-600 font-bold text-white px-4 py-1 rounded"
        >
          Volver
        </Link>
        </div>    

      <div className="grid lg:grid-cols-6 gap-3 mb-6">

  <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-5">

    <h1 className="text-2xl font-bold">
      {materiaData?.nombre}
    </h1>

    <p className="text-slate-500 mt-2">
      Curso {curso} • 1° Cuatrimestre
    </p>

    <p className="text-slate-500 mt-3">
      {alumnos?.length || 0} alumnos • Promedio {promedio}
    </p>

  </div>

  <div className="bg-green-50 rounded-2xl shadow-lg p-4 text-center">
    <p className="text-xs text-green-700">
      Evaluados
    </p>

    <p className="text-2xl font-bold text-green-700">
      {evaluados}
    </p>
  </div>

  <div className="bg-red-50 rounded-2xl shadow-lg p-4 text-center">
    <p className="text-xs text-red-700">
      Pendientes
    </p>

    <p className="text-2xl font-bold text-red-700">
      {pendientes}
    </p>
  </div>

  <div className="bg-white rounded-2xl shadow-lg p-4 text-center">
    <p className="text-xs text-slate-500">
      Máxima
    </p>

    <p className="text-2xl font-bold">
      {maxima}
    </p>
  </div>

  <div className="bg-white rounded-2xl shadow-lg p-4 text-center">
    <p className="text-xs text-slate-500">
      Mínima
    </p>

    <p className="text-2xl font-bold">
      {minima}
    </p>
  </div>


      </div>

            <div className="space-y-3">

        {alumnos?.map((alumno) => {

          const calificacion =
            calificaciones?.find(
              (c) => c.alumno_id === alumno.id
            );

          return (
            <div
              key={alumno.id}
              className="bg-white rounded-xl shadow-md px-5 py-4 flex items-center justify-between"
            >

              <div className="flex items-center gap-4">

                <div className="w-10 h-10 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold">
                  {alumno.apellido?.charAt(0)}
                  {alumno.nombre?.charAt(0)}
                </div>

                <h3 className="font-semibold">
                  {alumno.apellido}, {alumno.nombre}
                </h3>

              </div>

              <div className="flex items-center gap-6">

                <div className="text-center">
                  <p className="text-xs text-slate-500">
                    Nota
                  </p>

                  <p className="font-bold">
                    {calificacion?.nota || "-"}
                  </p>
                </div>

                {calificacion ? (
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                    Evaluado
                  </span>
                ) : (
                  <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
                    Pendiente
                  </span>
                )}

              </div>

            </div>
          );
        })}

      </div>

    </div>

  );
}