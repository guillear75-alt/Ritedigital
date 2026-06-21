import { supabase } from "@/lib/supabase";
import { guardarCalificacion } from "./actions";

export default async function CalificarAlumno({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    curso?: string;
    materia?: string;
    docente?: string;
  }>;
}) {
  const { id } = await params;

  const {
    curso,
    materia,
    docente,
  } = await searchParams;

  const alumnoId = Number(id);

  const { data: alumno } = await supabase
    .from("alumnos")
    .select("*")
    .eq("id", alumnoId)
    .single();

  const { data: calificacionExistente } = await supabase
    .from("calificaciones")
    .select("*")
    .eq("alumno_id", alumnoId)
    .eq("materia_id", Number(materia))
    .eq("periodo", "1° Cuatrimestre")
    .single();

    
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        {alumno?.apellido}, {alumno?.nombre}
      </h1>

      <p className="text-slate-500 mb-6">
        Curso: {alumno?.curso}
      </p>

      <form
        action={guardarCalificacion}
        className="bg-white rounded-xl shadow p-6"
      >
        <input
          type="hidden"
          name="alumno_id"
          value={alumnoId}
        />

        <input
          type="hidden"
          name="docente_id"
          value={Number(docente)}
        />

        <input
          type="hidden"
          name="materia_id"
          value={Number(materia)}
        />

        <input
          type="hidden"
          name="curso_id"
          value={Number(curso)}
        />

        <div className="mb-4">
          <label>Período</label>

          <select
            name="periodo"
            defaultValue={
              calificacionExistente?.periodo ||
              "1° Cuatrimestre"
            }
            className="w-full border rounded p-2 mt-2"
          >
            <option>1° Cuatrimestre</option>
            <option>2° Cuatrimestre</option>
            <option>Intensificación Diciembre</option>
            <option>Intensificación Febrero</option>
            <option>Intensificación Marzo</option>
          </select>
        </div>

        <div className="mb-4">
          <label>Tipo de Evaluación</label>

          <select
            name="tipo_evaluacion"
            defaultValue={
              calificacionExistente?.tipo_evaluacion ||
              "Prueba"
            }
            className="w-full border rounded p-2 mt-2"
          >
            <option value="Prueba">
              Prueba
            </option>

            <option value="Trabajo Práctico">
              Trabajo Práctico
            </option>

            <option value="Evaluación Integradora">
              Evaluación Integradora
            </option>

            <option value="Exposición">
              Exposición
            </option>

            <option value="Actividad">
              Actividad
            </option>

            <option value="Otro">
              Otro
            </option>
          </select>
        </div>

        <div className="mb-4">
          <label>Nota</label>

          <input
            type="number"
            name="nota"
            step="0.25"
            min="1"
            max="10"
            defaultValue={
              calificacionExistente?.nota || ""
            }
            className="w-full border rounded p-2 mt-2"
          />
        </div>

        <div className="mb-4">
          <label>Observación</label>

          <textarea
            name="observacion"
            rows={4}
            defaultValue={
              calificacionExistente?.observacion || ""
            }
            className="w-full border rounded p-2 mt-2"
          />
        </div>

        <div className="mb-6">
          <label>Fecha</label>

          <input
            type="date"
            name="fecha"
            defaultValue={
              calificacionExistente?.fecha ||
              new Date()
                .toISOString()
                .split("T")[0]
            }
            className="w-full border rounded p-2 mt-2"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Guardar Calificación
        </button>
      </form>
    </div>
  );
}