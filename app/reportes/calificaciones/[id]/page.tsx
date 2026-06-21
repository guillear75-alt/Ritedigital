import { supabase } from "@/lib/supabase";
import PrintButton from "@/components/PrintButton";
import Link from "next/link";

export default async function ReporteCalificaciones({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const alumnoId = Number(id);

  const { data: alumno } = await supabase
    .from("alumnos")
    .select("*")
    .eq("id", alumnoId)
    .single();

  const { data: calificaciones } = await supabase
    .from("calificaciones")
    .select(`
      id,
      periodo,
      tipo_evaluacion,
      nota,
      materias (
        nombre
      )
    `)
    .eq("alumno_id", alumnoId);

  const promedio =
    calificaciones?.length
      ? (
          calificaciones.reduce(
            (acc, item) =>
              acc + Number(item.nota),
            0
          ) / calificaciones.length
        ).toFixed(2)
      : "0.00";

  return (
    <div className="p-8 max-w-4xl mx-auto">

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Reporte de Calificaciones
        </h1>

        <PrintButton />

      </div>

      <Link
        href={`/reportes/${alumnoId}`}
        className="text-blue-600 hover:underline"
      >
        ← Volver
      </Link>

      <div className="bg-white shadow rounded-xl p-6 mt-4 mb-6">

        <h2 className="text-2xl font-bold">
          {alumno?.apellido}, {alumno?.nombre}
        </h2>

        <p className="mt-3">
          <strong>Promedio General:</strong>{" "}
          {promedio}
        </p>

      </div>

      <div className="bg-white shadow rounded-xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="p-3 text-left">
                Materia
              </th>

              <th className="p-3 text-left">
                Tipo
              </th>

              <th className="p-3 text-left">
                Período
              </th>

              <th className="p-3 text-left">
                Nota
              </th>

            </tr>

          </thead>

          <tbody>

            {calificaciones?.map((c) => (
              <tr
                key={c.id}
                className="border-t"
              >
                {(c.materias as any)?.nombre ||
 (c.materias as any)?.[0]?.nombre ||
 "-"}

                <td className="p-3">
                  {c.tipo_evaluacion}
                </td>

                <td className="p-3">
                  {c.periodo}
                </td>

                <td className="p-3 font-bold">
                  {c.nota}
                </td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}