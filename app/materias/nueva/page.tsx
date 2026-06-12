import { crearMateria } from "../actions";

export default function NuevaMateriaPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-2xl mx-auto">

        <h1 className="text-3xl font-bold mb-6 text-slate-900">
          Nueva Materia
        </h1>

        <form
          action={crearMateria}
          className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4"
        >

          <div>
            <label className="block mb-1 text-slate-700">
              Nombre
            </label>

            <input
              type="text"
              name="nombre"
              required
              className="w-full h-10 border border-slate-300 rounded-lg px-3 text-slate-900"
            />
          </div>

          <div>
            <label className="block mb-1 text-slate-700">
              Año
            </label>

            <input
              type="number"
              name="anio"
              required
              className="w-full h-10 border border-slate-300 rounded-lg px-3 text-slate-900"
            />
          </div>

          <div>
            <label className="block mb-1 text-slate-700">
              Área
            </label>

            <input
              type="text"
              name="area"
              required
              className="w-full h-10 border border-slate-300 rounded-lg px-3 text-slate-900"
            />
          </div>

          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl"
          >
            Guardar Materia
          </button>

        </form>

      </div>
    </div>
  );
}