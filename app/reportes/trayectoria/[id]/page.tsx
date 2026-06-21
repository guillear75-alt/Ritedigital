import { supabase } from "@/lib/supabase";
import PrintButton from "@/components/PrintButton";
import Link from "next/link";

export default async function ReporteTrayectoria({
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

  const { data: valoraciones } = await supabase
    .from("valoraciones")
    .select(`
      id,
      periodo,
      valoracion,
      observaciones,
      materias (
        nombre
      )
    `)
    .eq("alumno_id", alumnoId);

  return (
    <div className="p-8 max-w-4xl mx-auto">

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Trayectoria Educativa
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
      </div>

      <div className="bg-white shadow rounded-xl overflow-hidden">

        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-3 text-left">
                Materia
              </th>

              <th className="p-3 text-left">
                Período
              </th>

              <th className="p-3 text-left">
                Valoración
              </th>
            </tr>
          </thead>

          <tbody>
            {valoraciones?.map((v) => (
              <tr
                key={v.id}
                className="border-t"
              >
                <td className="p-3">
                {(v.materias as any)?.nombre ||
                (v.materias as any)?.[0]?.nombre ||
                "-"}
                </td>

                <td className="p-3">
                  {v.periodo}
                </td>

                <td className="p-3 font-bold">
                  {v.valoracion}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

    </div>
  );
}