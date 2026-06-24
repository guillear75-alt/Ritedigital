import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default async function CursoCalificacionesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await params;

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

  const alumnoIds =
    alumnos?.map((a) => a.id) || [];

  const { data: calificaciones } = await supabase
    .from("calificaciones")
    .select("*")
    .in("alumno_id", alumnoIds);

  const totalAlumnos =
    alumnos?.length || 0;

  const alumnosCalificados =
    new Set(
      calificaciones?.map(
        (c) => c.alumno_id
      )
    ).size;

  const pendientes =
    totalAlumnos - alumnosCalificados;

  const notas =
    calificaciones?.map((c) => Number(c.nota))
      .filter((n) => !isNaN(n)) || [];

  const promedio =
    notas.length > 0
      ? (
          notas.reduce((a, b) => a + b, 0) /
          notas.length
        ).toFixed(2)
      : "0";

  const maxima =
    notas.length > 0
      ? Math.max(...notas)
      : 0;

  const minima =
    notas.length > 0
      ? Math.min(...notas)
      : 0;

  const listo =
    pendientes === 0;

  return (
    <div className="p-8">

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-4xl font-bold">
            {curso}
          </h1>

          <p className="text-slate-500">
            Seguimiento de calificaciones.
          </p>
        </div>

        <Link
          href="/dashboard/directivo/calificaciones"
          className="
            bg-slate-600
            hover:bg-slate-700
            text-white
            px-4
            py-2
            rounded-lg
          "
        >
          Volver
        </Link>

      </div>

      <div className="grid md:grid-cols-6 gap-4 mb-8">

        <div className="bg-white rounded-xl p-4 shadow">
          <p>Total</p>
          <p className="text-3xl font-bold">
            {totalAlumnos}
          </p>
        </div>

        <div className="bg-green-50 rounded-xl p-4 shadow">
          <p>Calificados</p>
          <p className="text-3xl font-bold text-green-700">
            {alumnosCalificados}
          </p>
        </div>

        <div className="bg-red-50 rounded-xl p-4 shadow">
          <p>Pendientes</p>
          <p className="text-3xl font-bold text-red-700">
            {pendientes}
          </p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow">
          <p>Promedio</p>
          <p className="text-3xl font-bold text-indigo-700">
            {promedio}
          </p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow">
          <p>Máxima</p>
          <p className="text-3xl font-bold">
            {maxima}
          </p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow">
          <p>Mínima</p>
          <p className="text-3xl font-bold">
            {minima}
          </p>
        </div>

      </div>

      <div className="mb-8">

        {listo ? (

          <div className="
            bg-green-50
            border
            border-green-300
            rounded-xl
            p-5
          ">
            <h2 className="font-bold text-green-700">
              ✅ Curso completo
            </h2>

            <p className="mt-2">
              Todos los alumnos poseen
              calificaciones registradas.
            </p>
          </div>

        ) : (

          <div className="
            bg-amber-50
            border
            border-amber-300
            rounded-xl
            p-5
          ">
            <h2 className="font-bold text-amber-700">
              ⚠ Calificaciones pendientes
            </h2>

            <p className="mt-2">
              Restan {pendientes} alumnos
              por calificar.
            </p>
          </div>

        )}

      </div>

      <h2 className="text-2xl font-bold mb-4">
        Situación por Alumno
      </h2>

      <div className="space-y-3">

        {alumnos?.map((alumno) => {

          const notaAlumno =
            calificaciones?.find(
              (c) =>
                c.alumno_id === alumno.id
            );

          return (

            <div
              key={alumno.id}
              className="
                bg-white
                rounded-xl
                shadow
                p-4
                flex
                justify-between
                items-center
              "
            >

              <div>
                <h3 className="font-bold">
                  {alumno.apellido},{" "}
                  {alumno.nombre}
                </h3>
              </div>

              <div>

                {notaAlumno ? (

                  <span className="
                    bg-green-100
                    text-green-700
                    px-3
                    py-1
                    rounded-full
                    font-bold
                  ">
                    {notaAlumno.nota}
                  </span>

                ) : (

                  <span className="
                    bg-red-100
                    text-red-700
                    px-3
                    py-1
                    rounded-full
                    font-bold
                  ">
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