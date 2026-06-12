import { supabase } from "@/lib/supabase";

import Link from "next/link";
import { importarAlumnos } from "./actions";


export default async function AlumnosPage() {
  const { data: alumnos } = await supabase
  .from("alumnos")
  .select("*")
  .order("apellido");
    
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Alumnos
        </h1>
        
<Link
  href="/alumnos/importar"
  className="bg-green-600 text-white px-4 py-2 rounded-lg"
>
  Importar Excel
</Link>
<Link
  href="/dashboard"
  className="inline-flex items-center mb-4 text-blue-600 hover:text-blue-800"
>
  ← Volver al Dashboard
</Link>

        <Link
            href="/alumnos/nuevo"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
            Nuevo Alumno
            </Link>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="text-left p-4">ID</th>
              <th className="text-left p-4">Apellido</th>
              <th className="text-left p-4">Nombre</th>
              <th className="text-left p-4">DNI</th>
              <th className="text-left p-4">Curso</th>
            </tr>
          </thead>

          <tbody>
  {alumnos?.map((alumno) => (
    <tr
      key={alumno.id}
      className="border-t"
    >
      <td className="p-4">
        {alumno.id}
      </td>

      <td className="p-4">
        {alumno.apellido}
      </td>

      <td className="p-4">
        {alumno.nombre}
      </td>

      <td className="p-4">
        {alumno.dni}
      </td>

      <td className="p-4">
        {alumno.curso || "-"}
      </td>
    </tr>
  ))}
</tbody>
        </table>
      </div>
    </div>
  );
}