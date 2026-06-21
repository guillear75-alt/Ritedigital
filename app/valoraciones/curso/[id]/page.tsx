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
  <div className="p-8">

    <div className="flex gap-3 mb-6">

  <Link
    href="/reportes/curso"
    className="bg-slate-600 text-white px-4 py-2 rounded"
  >
    ← Volver
  </Link>

  <Link
    href="/reportes"
    className="bg-blue-600 text-white px-4 py-2 rounded"
  >
    Reportes
  </Link>

  <Link
    href="/dashboard"
    className="bg-green-600 text-white px-4 py-2 rounded"
  >
    Dashboard
  </Link>

</div>

    <h1 className="text-3xl font-bold mb-2">
      Curso {curso}
    </h1>

    <p className="text-slate-600 mb-6">
      {totalValorados} / {totalAlumnos} valorados
    </p>

    <div className="bg-white rounded-xl shadow overflow-hidden">

      <table className="w-full">

        <thead className="bg-slate-100">
          <tr>
            <th className="p-3 text-left">
              Alumno
            </th>

            <th className="p-3 text-left">
              Estado
            </th>

            <th className="p-3 text-left">
              Valoración
            </th>

            <th className="p-3 text-left">
              Observación
            </th>
          </tr>
        </thead>

        <tbody>

          {alumnos?.map((alumno) => {

            const valoracionAlumno =
              valoraciones?.find(
                (v) => v.alumno_id === alumno.id
              );

const valorado = !!valoracionAlumno;

            return (
              <tr
                key={alumno.id}
                className="border-t"
              >
                <td className="p-3">
                  {alumno.apellido}, {alumno.nombre}
                </td>

                <td className="p-3">

              {valorado ? (

    <div className="flex items-center gap-3">

      <span className="text-green-600 font-semibold">
        ✔ Valorado
      </span>

      <a
        href={`/valoraciones/alumno/${alumno.id}?curso=${cursoId}&materia=${materiaId}&docente=143`}
        className="bg-amber-500 text-white px-3 py-1 rounded"
      >
        Editar
      </a>

    </div>

  ) : (

    <a
      href={`/valoraciones/alumno/${alumno.id}?curso=${cursoId}&materia=${materiaId}&docente=143`}
      className="bg-blue-600 text-white px-3 py-1 rounded"
    >
      Valorar
    </a>

  )}

</td>
<td className="p-3 text-sm text-slate-600">

  {valoracionAlumno?.observaciones
    ? valoracionAlumno.observaciones.substring(0, 30) + "..."
    : "-"}

</td>
<td className="p-3">

  {valoracionAlumno?.observaciones ? (

    <a
      href={`/valoraciones/alumno/${alumno.id}?curso=${cursoId}&materia=${materiaId}&docente=143`}
      className="text-blue-600 hover:underline"
    >
      📝 Ver
    </a>

  ) : (

    "-"

  )}

</td>

              </tr>
            );

          })}

        </tbody>

      </table>

    </div>

  </div>
);
}