import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default async function CursoAsistenciasPage({
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

  const { data: asistencias } = await supabase
    .from("asistencias")
    .select("*")
    .in("alumno_id", alumnoIds);

  const totalAlumnos =
    alumnos?.length || 0;

  const presentes =
    asistencias?.filter(
      (a) => a.estado === "Presente"
    ).length || 0;

  const ausentes =
    asistencias?.filter(
      (a) => a.estado === "Ausente"
    ).length || 0;

  const justificados =
    asistencias?.filter(
      (a) => a.estado === "Justificado"
    ).length || 0;

  const totalRegistros =
    presentes + ausentes + justificados;

  const porcentajeAsistencia =
    totalRegistros > 0
      ? (
          (presentes / totalRegistros) *
          100
        ).toFixed(1)
      : "0";

  const alumnosRiesgo =
    alumnos?.filter((alumno) => {

      const faltas =
        asistencias?.filter(
          (a) =>
            a.alumno_id === alumno.id &&
            a.estado === "Ausente"
        ).length || 0;

      return faltas >= 10;
    }) || [];

  return (
    <div className="p-8">

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-4xl font-bold">
            {curso}
          </h1>

          <p className="text-slate-500">
            Seguimiento institucional de asistencia.
          </p>
        </div>

        <Link
          href="/dashboard/directivo/asistencias"
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
          <p>Presentes</p>
          <p className="text-3xl font-bold text-green-700">
            {presentes}
          </p>
        </div>

        <div className="bg-red-50 rounded-xl p-4 shadow">
          <p>Ausentes</p>
          <p className="text-3xl font-bold text-red-700">
            {ausentes}
          </p>
        </div>

        <div className="bg-blue-50 rounded-xl p-4 shadow">
          <p>Justificados</p>
          <p className="text-3xl font-bold text-blue-700">
            {justificados}
          </p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow">
          <p>% Asistencia</p>
          <p className="text-3xl font-bold text-indigo-700">
            {porcentajeAsistencia}%
          </p>
        </div>

        <div className="bg-amber-50 rounded-xl p-4 shadow">
          <p>Alertas</p>
          <p className="text-3xl font-bold text-amber-700">
            {alumnosRiesgo.length}
          </p>
        </div>

      </div>

      <div className="mb-8">

        {alumnosRiesgo.length === 0 ? (

          <div className="
            bg-green-50
            border
            border-green-300
            rounded-xl
            p-5
          ">
            <h2 className="font-bold text-green-700">
              ✅ Asistencia normal
            </h2>

            <p className="mt-2">
              No se detectan trayectorias en riesgo
              por inasistencias.
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
              ⚠ Seguimiento requerido
            </h2>

            <p className="mt-2">
              Existen {alumnosRiesgo.length} alumnos
              con más de 10 inasistencias.
            </p>
          </div>

        )}

      </div>

      <h2 className="text-2xl font-bold mb-4">
        Situación por Alumno
      </h2>

      <div className="space-y-3">

        {alumnos?.map((alumno) => {

          const faltas =
            asistencias?.filter(
              (a) =>
                a.alumno_id === alumno.id &&
                a.estado === "Ausente"
            ).length || 0;

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

                {faltas >= 10 ? (

                  <span className="
                    bg-red-100
                    text-red-700
                    px-3
                    py-1
                    rounded-full
                    font-bold
                  ">
                    {faltas} faltas ⚠
                  </span>

                ) : (

                  <span className="
                    bg-green-100
                    text-green-700
                    px-3
                    py-1
                    rounded-full
                    font-bold
                  ">
                    {faltas} faltas
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