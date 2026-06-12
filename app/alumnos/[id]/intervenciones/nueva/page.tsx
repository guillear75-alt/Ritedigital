import { crearIntervencion } from "@/app/alumnos/actions";

export default async function NuevaIntervencion({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-3xl font-bold mb-6 text-slate-900">
          Nueva Intervención RITE
        </h1>

        <form
  action={crearIntervencion}
  className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 text-slate-900"
>
          <input 
            type="hidden"
            name="alumno_id"
            value={id}
            className="w-full h-10 border border-slate-300 rounded-lg px-3 text-slate-900 bg-white"
          />

          <div>
            <label className="block mb-1 font-medium text-slate-700">
              Fecha
            </label>

            <input 
              type="date"
              name="fecha"
              required
              className="w-full h-10 border border-slate-300 rounded-lg px-3 text-slate-900 bg-white"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-slate-700">
              Motivo
            </label>

            <input
              type="text"
              name="motivo"
              required
              className="w-full h-10 border border-slate-300 rounded-lg px-3 text-slate-900 bg-white"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-slate-700">
              Descripción
            </label>

            <textarea
              name="descripcion"
              rows={4}
              className="w-full border border-slate-300 rounded-lg p-3 text-slate-900 bg-white"
            />
            </div>

          <div>
            <label className="block mb-1 font-medium text-slate-700">
              Acciones realizadas
            </label>

            <textarea
              
  name="acciones_realizadas"
  rows={4}
  className="w-full border border-slate-300 rounded-lg p-3 text-slate-900 bg-white"
/>
              
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Responsable
            </label>

            <input
              type="text"
              name="responsable"
              className="w-full h-10 border border-slate-300 rounded-lg px-3 text-slate-900 bg-white"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-slate-700">
              Estado
            </label>

            <select
              name="estado"
              className="w-full h-10 border rounded-lg px-3"
            >
              <option>Abierto</option>
              <option>En seguimiento</option>
              <option>Resuelto</option>
              <option>Derivado</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl"
          >
            Guardar Intervención
          </button>

        </form>

      </div>
    </div>
  );
}