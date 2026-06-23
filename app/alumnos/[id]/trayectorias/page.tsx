import { supabase } from "@/lib/supabase";

export default async function TrayectoriasPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: alumno } = await supabase
    .from("alumnos")
    .select("*")
    .eq("id", id)
    .single();

  const { data: asistencias } = await supabase
    .from("asistencias")
    .select("*")
    .eq("alumno_id", id);

  const { data: valoraciones } = await supabase
  .from("valoraciones")
  .select(`
    *,
    materias(nombre)
  `)
  .eq("alumno_id", id)
  .order("fecha", { ascending: false });

  const { data: calificaciones } = await supabase
    .from("calificaciones")
    .select("*")
    .eq("alumno_id", id);

  const { data: intervenciones } = await supabase
    .from("intervenciones_rite")
    .select("*")
    .eq("alumno_id", id);

  const ausencias =
    asistencias?.filter(
      (a) => a.estado === "Ausente"
    ).length || 0;

  const tea =
    valoraciones?.filter(
      (v) => v.valoracion === "TEA"
    ).length || 0;

  const ted =
    valoraciones?.filter(
      (v) => v.valoracion === "TED"
    ).length || 0;

  const tep =
    valoraciones?.filter(
      (v) => v.valoracion === "TEP"
    ).length || 0;

  const promedio =
    calificaciones?.length
      ? (
          calificaciones.reduce(
            (acc, c) => acc + Number(c.nota),
            0
          ) / calificaciones.length
        ).toFixed(2)
      : "0";
      const valoracionesUnicas = Object.values(
  (valoraciones || []).reduce((acc: any, item: any) => {
    const key =
      `${item.periodo}-${item.materia_id}`;

    if (!acc[key]) {
      acc[key] = item;
    }

    return acc;
  }, {})
);

let riesgo = "Bajo";
let colorRiesgo = "text-green-600";

if (ted > 0 || ausencias >= 15) {
  riesgo = "Alto";
  colorRiesgo = "text-red-600";
} else if (tep > 0 || ausencias >= 5) {
  riesgo = "Medio";
  colorRiesgo = "text-amber-600";
}


  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-2">

        <div>
          <p className="text-slate-500">
            Trayectoria Educativa
          </p>
        </div>

        <a
          href={`/alumnos/${id}`}
          className="bg-slate-600 hover:bg-slate-700 text-white px-4 py-2
            rounded-lg font-semibold"
        >
          Volver
        </a>

</div>

        <h1 className="text-4xl font-bold mb-3">
          {alumno?.apellido}, {alumno?.nombre}
        </h1>
        
        <div className="mb-3 text-slate-600">
          <p>
            Curso: {alumno?.curso}
          </p>

          <p>
            DNI: {alumno?.dni}
          </p>

        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">

          <div className="bg-white rounded-xl p-4 shadow">
            <h3 className="text-slate-900">
              Ausencias
            </h3>

            <p className="text-3xl font-bold">
              {ausencias}
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow">
            <h3 className="text-slate-500">
              TEA
            </h3>

            <p className="text-3xl font-bold text-green-900">
              {tea}
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow">
            <h3 className="text-slate-900">
              TEP
            </h3>

            <p className="text-3xl font-bold text-amber-900">
              {tep}
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow">
            <h3 className="text-slate-900">
              TED
            </h3>

            <p className="text-3xl font-bold text-red-600">
              {ted}
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow">
            <h3 className="text-slate-900">
              Promedio
            </h3>

            <p className="text-3xl font-bold text-indigo-900">
              {promedio}
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow">
  <h3 className="text-slate-500">
    Riesgo
  </h3>

  <p className={`text-2xl font-bold ${colorRiesgo}`}>
    {riesgo}
  </p>
</div>

        </div>

        <div className="mt-5 bg-white rounded-2xl p-4 shadow">

          <h2 className="text-xl font-bold mb-4">
            Estado de Trayectoria
          </h2>

          {ausencias < 10 &&
ted === 0 &&
tep === 0 ? (
  <div className="bg-green-50 border border-green-300 rounded-xl p-4">
    <p className="font-semibold">
      Trayectoria sostenida.
    </p>

    <p className="text-sm mt-2">
      Predominio de valoraciones TEA, sin alertas pedagógicas registradas.
    </p>
  </div>
) : (
  <div className="bg-amber-50 border border-amber-300 rounded-xl p-4">
    <p className="font-semibold">
      Requiere seguimiento pedagógico.
    </p>

    <p className="text-sm mt-2">
      Se registran indicadores que requieren acompañamiento institucional.
    </p>
  </div>
)}
</div>
        <div className="mt-5 bg-white rounded-2xl p-4 shadow">

  <div className="flex justify-between items-center mb-6">

  <h2 className="text-xl font-bold">
    Valoraciones Pedagógicas
  </h2>

  <div
  className="
    bg-slate-700
    text-white
    px-4
    py-2
    rounded-lg
    font-semibold
  "
>
  Imprimir Informe
</div>

</div>
  {valoracionesUnicas.length === 0 ? (
  <p className="text-slate-500">
    No existen valoraciones registradas.
  </p>
) : (
  <>
    <h3 className="text-lg font-bold mb-4">
      Primer Cuatrimestre
    </h3>

    <div className="space-y-4">

  <div className="grid grid-cols-[250px_130px_1fr] gap-4 font-bold border-b-2 border-slate-300 pb-2 mb-2">
    <div>Materia</div>
    <div>Valoración</div>
    <div>Apreciación Pedagógica</div>
  </div>

  {valoracionesUnicas
    .filter(
      (v: any) =>
        v.periodo === "1° Cuatrimestre"
    )
    .map((v: any) => (
          <div
  key={v.id}
  className="grid grid-cols-[250px_130px_1fr] gap-4 py-3 border-b border-slate-200"
>
  <div className="font-medium">
    {v.materias?.nombre}
  </div>

  <div
    className={`font-bold
      ${
        v.valoracion === "TEA"
          ? "text-green-600"
          : v.valoracion === "TEP"
          ? "text-amber-600"
          : "text-red-600"
      }
    `}
  >
    {v.valoracion}
  </div>

  <div className="text-slate-700">
    {v.observaciones}
  </div>
</div>
        ))}

    </div>
  </>
)}

</div>

<div className="mt-8 bg-white rounded-2xl p-6 shadow">

  <h2 className="text-xl font-bold mb-6">
    Intervenciones RITE
  </h2>

  {intervenciones?.length === 0 ? (

    <p className="text-slate-500">
      No existen intervenciones registradas.
    </p>

  ) : (

    <div className="space-y-4">

      {(intervenciones ?? []).map((i: any) => (

        <div
          key={i.id}
          className="border-l-4 border-blue-500 pl-4 py-2"
        >
          <p className="font-semibold">
            {i.fecha}
          </p>

          <p className="text-slate-700">
            {i.descripcion || i.observacion || "Intervención registrada"}
          </p>
        </div>

      ))}

    </div>

  )}

</div>

        <div className="mt-8 bg-white rounded-2xl p-6 shadow">

          <h2 className="text-xl font-bold mb-4">
            Resumen Integral
          </h2>

          <ul className="space-y-3">

            <li>
              Valoraciones registradas:{" "}
              {valoraciones?.length || 0}
            </li>

            <li>
              Calificaciones registradas:{" "}
              {calificaciones?.length || 0}
            </li>

            <li>
              Intervenciones RITE:{" "}
              {intervenciones?.length || 0}
            </li>

            <li>
              Inasistencias: {ausencias}
            </li>

          </ul>

        </div>

      </div>

    </div>
  );
}