import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function MateriasPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {

const params = await searchParams;
const busqueda = params.q || "";

let query = supabase
  .from("materias")
  .select("*")
  .order("nombre");

if (busqueda) {
  query = query.ilike("nombre", `%${busqueda}%`);
}

const { data: materias } = await query;

const totalMaterias = materias?.length ?? 0;

const totalAreas = new Set(
  materias?.map((m) => m.area).filter(Boolean)
).size;

const totalModulos = 0;

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">

  <h1 className="text-4xl font-bold text-slate-900">
    📚 Materias
  </h1>

  <div className="flex gap-3">

    <Link
      href="/dashboard/secretario"
      className="bg-slate-700 hover:bg-slate-800 text-white px-5 py-3 rounded-xl font-semibold transition"
    >
      Volver
    </Link>

    <Link
      href="/materias/nueva"
      className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl font-semibold transition"
    >
      Nueva Materia
    </Link>

  </div>

</div>
        
        

  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

  <div className="bg-white rounded-2xl p-5 shadow-sm border">
    <p className="text-slate-500 text-sm">Total Materias</p>
    <p className="text-3xl font-bold">{totalMaterias}</p>
  </div>

  <div className="bg-white rounded-2xl p-5 shadow-sm border">
    <p className="text-slate-500 text-sm">Áreas</p>
    <p className="text-3xl font-bold">{totalAreas}</p>
  </div>

  <div className="bg-white rounded-2xl p-5 shadow-sm border">
    <p className="text-slate-500 text-sm">Módulos Totales</p>
    <p className="text-3xl font-bold">{totalModulos}</p>
  </div>

</div>
</div>
  <form className="mb-6">
  <input
    type="text"
    name="q"
    placeholder="🔍 Buscar materia..."
    defaultValue={busqueda}
    className="w-full md:w-96 px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
  />
</form>
<div className="flex justify-between items-center mb-6">
  <p className="text-slate-500">
    {materias?.length || 0} materias encontradas
  </p>

  <Link
    href="/materias"
    className="text-indigo-600 hover:text-indigo-800"
  >
    Limpiar búsqueda
  </Link>
</div>


        <div className="space-y-4">

  {materias?.map((materia) => (
    <div
      key={materia.id}
      className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition"
    >
      <div className="flex items-center justify-between">

        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            {materia.nombre}
          </h3>

          <div className="flex flex-wrap gap-2 mt-3">

            <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm">
              Año {materia.anio}
            </span>

            <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm">
              {materia.area}
            </span>

            {materia.modulos && (
              <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm">
                {materia.modulos} módulos
              </span>
            )}

          </div>
        </div>

        <Link
          href={`/materias/${materia.id}`}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl"
        >
          Ver
        </Link>

      </div>
    </div>
  ))}

</div>

      </div>
    
  );
}