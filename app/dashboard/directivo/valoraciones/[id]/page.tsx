import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default async function CursoValoracionesPage({
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

  const { data: valoraciones } = await supabase
    .from("valoraciones")
    .select("*")
    .in("alumno_id", alumnoIds);

  const totalAlumnos =
    alumnos?.length || 0;

  const valorados =
    new Set(
      valoraciones?.map(
        (v) => v.alumno_id
      )
    ).size;

  const pendientes =
    totalAlumnos - valorados;

    const listoParaCalificar =
  pendientes === 0;

  const tea =
    valoraciones?.filter(
      (v) => v.valoracion === "TEA"
    ).length || 0;

  const tep =
    valoraciones?.filter(
      (v) => v.valoracion === "TEP"
    ).length || 0;

  const ted =
    valoraciones?.filter(
      (v) => v.valoracion === "TED"
    ).length || 0;

  return (
    <div className="p-8">

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-4xl font-bold">
            {curso}
          </h1>

          <p className="text-slate-500">
            Seguimiento de valoraciones.
          </p>
        </div>

        <Link
          href="/dashboard/directivo/valoraciones"
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
          <p>Valorados</p>
          <p className="text-3xl font-bold text-green-700">
            {valorados}
          </p>
        </div>

        <div className="bg-red-50 rounded-xl p-4 shadow">
          <p>Pendientes</p>
          <p className="text-3xl font-bold text-red-700">
            {pendientes}
          </p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow">
          <p>TEA</p>
          <p className="text-3xl font-bold text-green-700">
            {tea}
          </p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow">
          <p>TEP</p>
          <p className="text-3xl font-bold text-amber-700">
            {tep}
          </p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow">
          <p>TED</p>
          <p className="text-3xl font-bold text-red-700">
            {ted}
          </p>
        </div>

      </div>

<div className="mb-8">

  {listoParaCalificar ? (

    <div className="
      bg-green-50
      border
      border-green-300
      rounded-xl
      p-5
    ">
      <h2 className="font-bold text-green-700">
        ✅ Valoraciones completas
      </h2>

      <p className="mt-2 text-slate-700">
        Todos los alumnos del curso poseen valoración pedagógica.
        El curso se encuentra listo para iniciar el proceso de calificación.
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
        ⚠ Valoraciones pendientes
      </h2>

      <p className="mt-2 text-slate-700">
        Restan {pendientes} alumnos sin valoración.
        Se recomienda completar las valoraciones antes de calificar.
      </p>
    </div>

  )}

</div>

      <div className="space-y-3">

        <h2 className="text-2xl font-bold mb-4">
        Alumnos del curso
        </h2>
        <p>Total alumnos encontrados: {alumnos?.length}</p>

        {alumnos?.map((alumno) => {

          const valoracion =
            valoraciones?.find(
              (v) =>
                v.alumno_id === alumno.id
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

                {valoracion ? (

                  <span
                    className={`
                      px-3 py-1 rounded-full font-bold
                      ${
                        valoracion.valoracion === "TEA"
                          ? "bg-green-100 text-green-700"
                          : valoracion.valoracion === "TEP"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-red-100 text-red-700"
                      }
                    `}
                  >
                    {valoracion.valoracion}
                  </span>

                ) : (

                  <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full font-bold">
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