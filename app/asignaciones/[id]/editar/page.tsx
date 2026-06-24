import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { reemplazarDocente } from "./actions";

export default async function EditarAsignacion({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: asignacion } = await supabase
    .from("docente_curso_materia")
    .select(`
      *,
      docentes (
        id,
        apellido,
        nombre
      ),
      cursos (
        nombre
      ),
      materias (
        nombre
      )
    `)
    .eq("id", id)
    .single();

  const { data: docentes } = await supabase
    .from("docentes")
    .select("*")
    .order("apellido");

  if (!asignacion) {
    return (
      <div className="p-8">
        Asignación no encontrada
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">
          Reemplazo de Docente
        </h1>

        <Link
          href="/asignaciones"
          className="
            bg-slate-600
            hover:bg-slate-700
            text-white
            px-4
            py-2
            rounded-lg
          "
        >
          Volver
        </Link>

      </div>

      <div className="bg-white rounded-2xl shadow p-6 mb-6">

        <h2 className="font-bold text-xl mb-4">
          Asignación Actual
        </h2>

        <p>
          <strong>Curso:</strong>{" "}
          {(asignacion.cursos as any)?.nombre}
        </p>

        <p>
          <strong>Materia:</strong>{" "}
          {(asignacion.materias as any)?.nombre}
        </p>

        <p>
          <strong>Docente Actual:</strong>{" "}
          {(asignacion.docentes as any)?.apellido},{" "}
          {(asignacion.docentes as any)?.nombre}
        </p>

      </div>

      <form className="bg-white rounded-2xl shadow p-6">

        <div className="mb-4">

          <label className="block mb-2 font-medium">
            Nuevo Docente
          </label>

          <select
            className="w-full border rounded-lg p-3"
            name="nuevo_docente"
          >
            <option value="">
              Seleccionar docente
            </option>

            {docentes?.map((docente) => (
              <option
                key={docente.id}
                value={docente.id}
              >
                {docente.apellido}, {docente.nombre}
              </option>
            ))}
          </select>

        </div>

        <div className="mb-4">

          <label className="block mb-2 font-medium">
            Motivo
          </label>

          <select
            className="w-full border rounded-lg p-3"
            name="motivo"
          >
            <option>
              Licencia
            </option>

            <option>
              Movimiento de personal
            </option>

            <option>
              Reorganización institucional
            </option>

            <option>
              Renuncia
            </option>
          </select>

        </div>

        <div className="mb-6">

          <label className="block mb-2 font-medium">
            Observaciones
          </label>

          <textarea
            rows={4}
            className="w-full border rounded-lg p-3"
            placeholder="Detalle del cambio..."
          />

        </div>

        <button
          type="submit"
          className="
            bg-amber-600
            hover:bg-amber-700
            text-white
            px-6
            py-3
            rounded-lg
            font-semibold
          "
        >
          Guardar Reemplazo
        </button>

      </form>

    </div>
  );
}