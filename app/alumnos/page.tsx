import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default async function AlumnosPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    curso?: string;
  }>;
}) {

  const params = await searchParams;

const q = params.q ?? "";
const curso = params.curso ?? "";

let query = supabase
  .from("alumnos")
  .select("*")
  .order("apellido");

if (q) {
  query = query.or(
    `apellido.ilike.%${q}%,nombre.ilike.%${q}%,dni.ilike.%${q}%`
  );
}

if (curso) {
  query = query.eq("curso", curso);
}

const { data: alumnos } = await query;

  return (
    <div className="p-8">

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">
            Alumnos
          </h1>

          <p className="text-slate-500 mt-1">
            Total de alumnos: {alumnos?.length ?? 0}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">

          <Link
            href="/alumnos/importar"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
          >
            Importar Excel
          </Link>

          <Link
            href="/alumnos/nuevo"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Nuevo Alumno
          </Link>

          <Link
            href="/dashboard/directivo"
            className="bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded-lg"
          >
            Volver
          </Link>

        </div>
      </div>

      <div className="bg-white rounded-2xl shadow p-4 mb-6">

  <form className="flex flex-col md:flex-row gap-3">

    <input
      type="text"
      name="q"
      defaultValue={q}
      placeholder="Buscar por apellido, nombre o DNI..."
      className="border rounded-lg px-4 py-2 flex-1"
    />

    

    <button
      type="submit"
      className="bg-slate-800 text-white px-6 py-2 rounded-lg"
    >
      Buscar
    </button>

  </form>
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

  {alumnos?.map((alumno) => (
    <div
      key={alumno.id}
      className="bg-white rounded-2xl shadow p-6 border border-slate-200 hover:shadow-lg transition"
    >

      <h2 className="text-xl font-bold text-slate-900">
        {alumno.apellido}
      </h2>

      <p className="text-slate-700 mb-4">
        {alumno.nombre}
      </p>

      <div className="space-y-2 text-sm text-slate-600">

        <div>
          <span className="font-semibold">DNI:</span>{" "}
          {alumno.dni}
        </div>

        <div>
          <span className="font-semibold">Curso:</span>{" "}
          {alumno.curso}
        </div>

      </div>

      <div className="mt-6">

        <Link
          href={`/alumnos/${alumno.id}`}
          className="w-full block text-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          Ficha Integral
        </Link>

      </div>

    </div>
  ))}

</div>

</div>

        

      </div>
   
  );
}