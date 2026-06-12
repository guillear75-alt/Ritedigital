import { supabase } from "@/lib/supabase";
import { crearDocente } from "../actions";
import Link from "next/link";

export default async function NuevoDocentePage() {
  const { data: materias } = await supabase
    .from("materias")
    .select("*")
    .order("nombre");

    

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-3xl mx-auto">

        <Link
          href="/dashboard"
          className="inline-flex items-center mb-4 text-blue-600"
        >
          ← Volver al Dashboard
        </Link>

        <h1 className="text-4xl font-bold text-slate-900 mb-8">
          Nuevo Docente
        </h1>

        <form
          action={crearDocente}
          className="bg-white rounded-2xl shadow-lg p-8 space-y-4"
        >
          <div>
            <label className="block mb-1 font-semibold">
              Apellido
            </label>
            <input
              name="apellido"
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">
              Nombre
            </label>
            <input
              name="nombre"
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">
              Materia
            </label>

            <select
              name="materia"
              required
              className="w-full border rounded px-3 py-2"
            >
              <option value="">
                Seleccionar materia
              </option>

              {materias?.map((materia) => (
                <option
                    key={materia.id}
                    value={`${materia.nombre} (${materia.anio}°)`}
                >
                    {materia.nombre} ({materia.anio}°)
                </option>
                ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-semibold">
              Email
            </label>

            <input
              type="email"
              name="email"
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">
              Teléfono
            </label>

            <input
              name="telefono"
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Guardar Docente
          </button>
        </form>

      </div>
    </div>
  );
}