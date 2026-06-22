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

  const { data: calificaciones } = await supabase
    .from("calificaciones")
    .select(
      `
      alumno_id,
      nota,
      tipo_evaluacion,
      observacion,
      fecha
    `
    )
    .eq("materia_id", materiaId)
    .eq("periodo", "1° Cuatrimestre");

    console.log("MATERIA:", materiaId);
console.log("CALIFICACIONES:", calificaciones);

  const totalAlumnos = alumnos?.length || 0;
  const totalCalificados = calificaciones?.length || 0;

  return (
    <div className="p-8">

    <div className="flex gap-2 mb-6">

  <Link
    href="/reportes/curso"
    className="bg-slate-600 text-white font-bold px-4 py-2 rounded-xl"
  >
    Volver
  </Link>

  <Link
    href="/reportes"
    className="bg-blue-600 text-white font-bold px-4 py-2 rounded-xl"
  >
    Reportes
  </Link>

  <Link
    href="/dashboard"
    className="bg-green-600 text-white font-bold px-4 py-2 rounded-xl"
  >
    Dashboard
  </Link>

</div>

      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">

  <div className="flex items-center justify-between">

    <div>

      <h1 className="text-3xl font-bold">
        Calificaciones
      </h1>

      <p className="text-slate-500 mt-1">
        Curso {curso}
      </p>

    </div>

    <div className="text-right">

      <p className="text-sm text-slate-500">
        Alumnos
      </p>

      <p className="text-2xl font-bold text-purple-700">
        {totalCalificados}/{totalAlumnos}
      </p>

    </div>

  </div>

</div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

  {alumnos?.map((alumno) => {

    const calificacionAlumno =
      calificaciones?.find(
        (c) =>
          Number(c.alumno_id) === Number(alumno.id)
      );

    const calificado =
      !!calificacionAlumno;

    return (

      <div
        key={alumno.id}
        className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-xl transition"
      >

        <div className="flex items-center justify-between mb-4">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-full bg-purple-700 text-white flex items-center justify-center font-bold">
              {alumno.apellido?.charAt(0)}
              {alumno.nombre?.charAt(0)}
            </div>

            <div>

              <h3 className="font-bold">
                {alumno.apellido}, {alumno.nombre}
              </h3>

            </div>

          </div>

          {calificado ? (
            <span className="bg-green-100 text-green-700 font-bold px-3 py-1 rounded-full text-sm font-semibold">
              Calificado
            </span>
          ) : (
            <span className="bg-red-100 text-red-700 font-bold px-3 py-1 rounded-full text-sm font-semibold">
              Pendiente
            </span>
          )}

        </div>

        <div className="space-y-2 mb-4">

          <p className="text-sm text-slate-600">
            <strong>Nota:</strong>{" "}
            {calificacionAlumno?.nota || "-"}
          </p>

          <p className="text-sm text-slate-600">
            <strong>Evaluación:</strong>{" "}
            {calificacionAlumno?.tipo_evaluacion || "-"}
          </p>

          <p className="text-sm text-slate-600">
            <strong>Observación:</strong>{" "}
            {calificacionAlumno?.observacion
              ? calificacionAlumno.observacion.substring(0, 40) + "..."
              : "-"}
          </p>

        </div>

        <a
          href={`/calificaciones/alumno/${alumno.id}?curso=${cursoId}&materia=${materiaId}&docente=143`}
          className={`block text-center py-2 rounded-xl text-white font-bold
            ${
              calificado
                ? "bg-amber-700 hover:bg-amber-800"
                : "bg-blue-600 hover:bg-blue-800"
            }
          `}
        >
          {calificado
            ? "Editar Calificación"
            : "Calificar Alumno"}
        </a>

      </div>

    );
  })}

</div>
          
      </div>
    
  );
}