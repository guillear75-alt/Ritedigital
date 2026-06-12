import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default async function ReportesPage() {

  const { data: alumnos } = await supabase
    .from("alumnos")
    .select("*")
    .order("apellido");

  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold mb-6">
        Reportes
      </h1>

      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr>
            <th className="p-3 text-left">Alumno</th>
            <th className="p-3 text-left">Acción</th>
          </tr>
        </thead>

        <tbody>
          {alumnos?.map((alumno) => (
            <tr key={alumno.id} className="border-t">

              <td className="p-3">
                {alumno.apellido}, {alumno.nombre}
              </td>

              <td className="p-3">
                <Link
                  href={`/reportes/${alumno.id}`}
                  className="bg-blue-600 text-white px-3 py-2 rounded"
                >
                  Ver Reporte
                </Link>
              </td>

            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}