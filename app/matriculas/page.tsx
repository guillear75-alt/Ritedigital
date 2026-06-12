import { supabase } from "@/lib/supabase";
import { crearMatricula } from "./actions";
import Link from "next/link";

export default async function MatriculasPage() {

  const { data: alumnos } = await supabase
    .from("alumnos")
    .select("*")
    .order("apellido");

  const { data: cursos } = await supabase
    .from("cursos")
    .select("*")
    .order("nombre");

  const { data: matriculas } = await supabase
    .from("alumno_curso")
    .select(`
      id,
      ciclo_lectivo,
      alumnos (
        apellido,
        nombre
      ),
      cursos (
        nombre
      )
    `)
    .order("id", { ascending: false });

  return (
    <div className="p-8">

  <Link
    href="/dashboard"
    className="text-blue-600 hover:underline"
  >
    ← Volver al Dashboard
  </Link>

  <h1 className="text-3xl font-bold mb-6">
    Matrículas
  </h1>

      <form
        action={crearMatricula}
        className="bg-white rounded-xl shadow p-6 space-y-4"
      >

        <select
          name="alumno_id"
          required
          className="w-full border rounded p-2"
        >
          <option value="">
            Seleccionar alumno
          </option>

          {alumnos?.map((alumno) => (
            <option
              key={alumno.id}
              value={alumno.id}
            >
              {alumno.apellido}, {alumno.nombre}
            </option>
          ))}
        </select>

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

        <input
          type="number"
          name="ciclo_lectivo"
          defaultValue={2026}
          className="w-full border rounded p-2"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Guardar Matrícula
        </button>

      </form>

      <div className="mt-8 bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-100">
            <tr>
              <th className="p-3 text-left">Alumno</th>
              <th className="p-3 text-left">Curso</th>
              <th className="p-3 text-left">Ciclo</th>
            </tr>
          </thead>

          <tbody>

            {matriculas?.map((m) => (
              <tr
                key={m.id}
                className="border-t"
              >
                <td className="p-3">
                  {m.alumnos?.[0]?.apellido}, {m.alumnos?.[0]?.nombre}
                </td>

                <td className="p-3">
                  {m.cursos?.[0]?.nombre}
                </td>

                <td className="p-3">
                  {m.ciclo_lectivo}
                </td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}