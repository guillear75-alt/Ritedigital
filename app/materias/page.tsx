import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function MateriasPage() {
  const { data: materias } = await supabase
    .from("materias")
    .select("*")
    .order("nombre");

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-slate-900">
            Materias
          </h1>

          <Link
            href="/materias/nueva"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl"
          >
            Nueva Materia
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

          <table className="w-full">

            <thead className="bg-slate-100">
              <tr>
                <th className="p-4 text-left">Materia</th>
                <th className="p-4 text-left">Año</th>
                <th className="p-4 text-left">Área</th>
              </tr>
            </thead>

            <tbody>
              {materias?.map((materia) => (
                <tr
                  key={materia.id}
                  className="border-t"
                >
                  <td className="p-4">{materia.nombre}</td>
                  <td className="p-4">{materia.anio}</td>
                  <td className="p-4">{materia.area}</td>
                </tr>
              ))}
            </tbody>

          </table>

        </div>

      </div>
    </div>
  );
}