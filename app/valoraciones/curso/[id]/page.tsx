import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ materia?: string }>;
}) {

  const { id } = await params;
  const { materia } = await searchParams;

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

  const { data: alumnos } = await supabase
    .from("alumnos")
    .select("*")
    .eq("curso", curso)
    .order("apellido");

  const { data: valoraciones } = await supabase
  .from("valoraciones")
  .select("alumno_id, valoracion, observaciones")
  .eq("materia_id", materiaId)
  .eq("periodo", "1° Cuatrimestre");

  const totalAlumnos = alumnos?.length || 0;
  const totalValorados = valoraciones?.length || 0;

    
  return (
  <div className="p-3">

    <div className="flex gap-2 mb-3">

  <Link
  href="/dashboard/docente"
  className="bg-slate-600 text-white font-bold px-2 py-2 rounded-xl"
>
  Volver
</Link>

  <Link
    href="/reportes"
    className="bg-blue-600 text-white font-bold px-3 py-2 rounded-xl"
  >
    Reportes
  </Link>

  <Link
    href="/dashboard"
    className="bg-green-600 text-white font-bold px-3 py-2 rounded-xl"
  >
    Dashboard
  </Link>

</div>

    <h1 className="text-3xl font-bold mb-2">
      Curso {curso}
    </h1>

    <p className="text-slate-600 font-bold mb-4">
      {totalValorados} / {totalAlumnos} valorados
    </p>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

  {alumnos?.map((alumno) => {

    const valoracionAlumno =
      valoraciones?.find(
        (v) => v.alumno_id === alumno.id
      );

    const valorado = !!valoracionAlumno;

    return (

      <div
        key={alumno.id}
        className="bg-white rounded-2xl shadow-lg p-5"
      >

        <div className="flex items-center justify-between mb-4">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-full bg-green-700 text-white flex items-center justify-center font-bold">
              {alumno.apellido?.charAt(0)}
              {alumno.nombre?.charAt(0)}
            </div>

            <div>

              <h3 className="font-bold">
                {alumno.apellido}, {alumno.nombre}
              </h3>

            </div>

          </div>

          {valorado ? (
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
              Valorado
            </span>
          ) : (
            <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
              Pendiente
            </span>
          )}

        </div>

        <div className="space-y-2 mb-4">

          <p className="text-sm text-slate-600">
            <strong>Valoración:</strong>{" "}
            {valoracionAlumno?.valoracion || "-"}
          </p>

          <p className="text-sm text-slate-600">
            <strong>Observación:</strong>{" "}
            {valoracionAlumno?.observaciones
              ? valoracionAlumno.observaciones.substring(0, 40) + "..."
              : "-"}
          </p>

        </div>

        <a
          href={`/valoraciones/alumno/${alumno.id}?curso=${cursoId}&materia=${materiaId}`}
          className={`
            block text-center py-2 rounded-xl text-white font-bold ${valorado
              ? "bg-amber-800" : "bg-blue-600"}
          `}
        >
          {valorado
            ? "Editar Valoración"
            : "Valorar Alumno"}
        </a>

      </div>

    );
  })}

</div>
    "-"

  </div>
);
}