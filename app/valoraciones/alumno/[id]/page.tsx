import { supabase } from "@/lib/supabase";
import { guardarValoracion } from "./actions";

export default async function ValorarAlumno({
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

console.log({
  alumno: id,
  curso,
  materia,
  docente,
});

  const alumnoId = Number(id);

  const { data: alumno } = await supabase
    .from("alumnos")
    .select("*")
    .eq("id", alumnoId)
    .single();

  const { data: valoracionExistente } = await supabase
  .from("valoraciones")
  .select("*")
  .eq("alumno_id", alumnoId)
  .eq("materia_id", Number(materia))
  .eq("ciclo_lectivo", 2026)
  .single();

  console.log("VALORACION:", valoracionExistente);

  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold mb-6">
        {alumno?.apellido}, {alumno?.nombre}
      </h1>

      <p className="text-slate-500 mb-6">
        Curso: {alumno?.curso}
      </p>

      <form
  action={guardarValoracion}
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
    valoracionExistente?.periodo ||
    "1° Cuatrimestre"
  }>
      <option>1° Cuatrimestre</option>
      <option>2° Cuatrimestre</option>
      <option>Intensificación Diciembre</option>
      <option>Intensificación Febrero</option>
      <option>Intensificación Marzo</option>
    </select>
  </div>

  <div className="mb-4">
    <label>Valoración</label>

    <select
  name="valoracion"
  defaultValue={
    valoracionExistente?.valoracion || "TEA"
  }
  className="w-full border rounded p-2 mt-2"
>
      <option value="TEA">TEA</option>
      <option value="TEP">TEP</option>
      <option value="TED">TED</option>
    </select>
  </div>

  <div className="mb-4">
    <label>Síntesis Pedagógica</label>

    <textarea
  name="observaciones"
  rows={5}
  defaultValue={
    valoracionExistente?.observaciones || ""
  }
  className="w-full border rounded p-2 mt-2"
/>
  </div>

  <button
    type="submit"
    className="bg-blue-600 text-white px-4 py-2 rounded"
  >
    Guardar Valoración
  </button>

  </form>

</div>

  );
}