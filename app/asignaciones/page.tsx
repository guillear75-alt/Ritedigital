import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { crearAsignacion } from "./actions";

export default async function AsignacionesPage() {

  const { data: docentes } = await supabase
    .from("docentes")
    .select("*")
    .order("apellido");

  const { data: cursos } = await supabase
    .from("cursos")
    .select("*")
    .order("nombre");

  const { data: materias } = await supabase
    .from("materias")
    .select("*")
    .order("nombre");

  const { data: asignaciones } = await supabase
    .from("docente_curso_materia")
    .select(`
      id,
      ciclo_lectivo,
      docentes (
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
    .order("id", { ascending: false });

    console.log(
  JSON.stringify(
    asignaciones,
    null,
    2
  )
);

    

  return (
    <div className="p-8">

      <Link
        href="/dashboard"
        className="text-blue-600"
      >
        ← Volver al Dashboard
      </Link>

      <h1 className="text-3xl font-bold mt-4 mb-6">
        Asignaciones Docentes
      </h1>

      <form
        action={crearAsignacion}
        className="bg-white rounded-xl shadow p-6 space-y-4"
      >

        <div>
          <label>Docente</label>

          <select
            name="docente_id"
            required
            className="w-full border rounded p-2"
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

        <div>
          <label>Curso</label>

          <select
            name="curso_id"
            required
            className="w-full border rounded p-2"
          >
            <option value="">
              Seleccionar curso
            </option>

            {cursos?.map((curso) => (
              <option
                key={curso.id}
                value={curso.id}
              >
                {curso.nombre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Materia</label>

          <select
            name="materia_id"
            required
            className="w-full border rounded p-2"
          >
            <option value="">
              Seleccionar materia
            </option>

            {materias?.map((materia) => (
              <option
                key={materia.id}
                value={materia.id}
              >
                {materia.nombre} ({materia.anio}°)
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Ciclo Lectivo</label>

          <input
            type="number"
            name="ciclo_lectivo"
            defaultValue={2026}
            className="w-full border rounded p-2"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Asignar
        </button>

      </form>

      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">
          Asignaciones Registradas
        </h2>

        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Docente</th>
                <th className="p-3 text-left">Curso</th>
                <th className="p-3 text-left">Materia</th>
                <th className="p-3 text-left">Ciclo Lectivo</th>
              </tr>
            </thead>

            <tbody>
              {asignaciones?.map((asignacion) => (
                <tr
                  key={asignacion.id}
                  className="border-t"
                >
                  <td className="p-3">
                  {asignacion.docentes
                    ? `${(asignacion.docentes as any).apellido}, ${(asignacion.docentes as any).nombre}`
                    : "Sin docente"}
                </td>

                  <td className="p-3">
                  {asignacion.cursos
                    ? (asignacion.cursos as any).nombre
                    : "Sin curso"}
                </td>

                <td className="p-3">
                  {asignacion.materias
                    ? (asignacion.materias as any).nombre
                    : "Sin materia"}
                </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

    </div>
  );
}