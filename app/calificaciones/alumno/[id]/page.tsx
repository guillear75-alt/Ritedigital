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

    <div className="mb-6">

      <a
        href={`/calificaciones/cursos/${curso}?materia=${materia}`}
        className="bg-slate-600 text-white font-bold px-4 py-2 rounded-xl"
      >
        ← Volver
      </a>

    </div>

    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">

      <div className="flex items-center gap-4">

        <div className="w-12 h-12 rounded-full bg-purple-700 text-white flex items-center justify-center text-xl font-bold">
          {alumno?.apellido?.charAt(0)}
          {alumno?.nombre?.charAt(0)}
        </div>

        <div>

          <h1 className="text-3xl font-bold">
            {alumno?.apellido}, {alumno?.nombre}
          </h1>

          <p className="text-slate-500">
            Curso {alumno?.curso}
          </p>

        </div>

      </div>

    </div>

    

    <form
      action={guardarCalificacion}
      className="bg-white rounded-2xl shadow-lg p-8"
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

      <div className="grid lg:grid-cols-3 gap-4 mb-6">

  <div>

    <label className="font-semibold">
      Período
    </label>

    <select
      name="periodo"
      defaultValue={
        calificacionExistente?.periodo ||
        "1° Cuatrimestre"
      }
      className="w-full border rounded-xl p-3 mt-2"
    >
      <option>1° Cuatrimestre</option>
      <option>2° Cuatrimestre</option>
      <option>Intensificación Diciembre</option>
      <option>Intensificación Febrero</option>
      <option>Intensificación Marzo</option>
    </select>

  </div>

  <div>

    <label className="font-semibold">
      Tipo de Evaluación
    </label>

    <select
      name="tipo_evaluacion"
      defaultValue={
        calificacionExistente?.tipo_evaluacion ||
        "Prueba"
      }
      className="w-full border rounded-xl p-3 mt-2"
    >
      <option value="Prueba">Prueba</option>
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

  <div>

    <label className="font-semibold">
      Nota
    </label>

    <input
      type="number"
      name="nota"
      step="0.25"
      min="1"
      max="10"
      defaultValue={
        calificacionExistente?.nota || ""
      }
      className="
        w-full
        border
        rounded-xl
        p-3
        mt-2
        text-center
        text-2xl
        font-bold
      "
    />

  </div>

</div>
      <div className="mb-6">

        <label className="font-semibold">
          Observación
        </label>

        <textarea
          name="observacion"
          rows={5}
          defaultValue={
            calificacionExistente?.observacion || ""
          }
          className="w-full border rounded-xl p-3 mt-2"
        />

      </div>

      <div className="mb-8">

        <label className="font-semibold">
          Fecha
        </label>

        <input
          type="date"
          name="fecha"
          defaultValue={
            calificacionExistente?.fecha ||
            new Date()
              .toISOString()
              .split("T")[0]
          }
          className="w-full border rounded-xl p-3 mt-2"
        />

      </div>

      <div className="flex justify-between items-center mt-8">

  <a
    href={`/calificaciones/alumno/${alumnoId - 1}?curso=${curso}&materia=${materia}&docente=${docente}`}
    className="bg-slate-600 text-white font-bold px-4 py-2 rounded-xl"
  >
    Anterior
  </a>

  <button
    type="submit"
    className="bg-green-700 hover:bg-green-800 text-white font-bold
      px-8 py-3 rounded-xl transition"
  >
    Guardar
  </button>

  <a
    href={`/calificaciones/alumno/${alumnoId + 1}?curso=${curso}&materia=${materia}&docente=${docente}`}
    className="bg-purple-700 text-white font-bold px-4 py-2 rounded-xl"
  >
    Siguiente 
  </a>

</div>

    </form>

    
  </div>
  
);}