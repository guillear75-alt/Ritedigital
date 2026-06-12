import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { crearValoracion } from "./actions";

export default async function ValoracionesPage() {

  const { data: alumnos } = await supabase
    .from("alumnos")
    .select("*")
    .order("apellido");

  const { data: docentes } = await supabase
    .from("docentes")
    .select("*")
    .order("apellido");

  

  const { data: valoraciones } = await supabase
  .from("valoraciones")
  .select(`
    id,
    periodo,
    ciclo_lectivo,
    valoracion,
    observaciones,
    alumnos (
      apellido,
      nombre
    ),
    docentes (
      apellido,
      nombre
    ),
    materias (
      nombre
    )
  `)
  .order("id", { ascending: false });

  console.log(valoraciones);

  const { data: materias } = await supabase
    .from("materias")
    .select("*")
    .order("nombre");

  return (
    <div className="p-8">

      <Link
        href="/dashboard"
        className="text-blue-600"
      >
        ← Volver al Dashboard
      </Link>

      <h1 className="text-3xl font-bold mt-4 mb-6">
        Valoraciones
      </h1>

      <form
        action={crearValoracion}
        className="bg-white rounded-xl shadow p-6 space-y-4"
      >

        <select
          name="alumno_id"
          required
          className="w-full border rounded p-2"
        >
          <option value="">Seleccionar alumno</option>

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
          name="docente_id"
          required
          className="w-full border rounded p-2"
        >
          <option value="">Seleccionar docente</option>

          {docentes?.map((docente) => (
            <option
              key={docente.id}
              value={docente.id}
            >
              {docente.apellido}, {docente.nombre}
            </option>
          ))}
        </select>

        <select
          name="materia_id"
          required
          className="w-full border rounded p-2"
        >
          <option value="">Seleccionar materia</option>

          {materias?.map((materia) => (
            <option
              key={materia.id}
              value={materia.id}
            >
              {materia.nombre} ({materia.anio}°)
            </option>
          ))}
        </select>

        <select
  name="periodo"
  required
  className="w-full border rounded p-2"
  defaultValue="1° Cuatrimestre"
>
            <option value="1° Cuatrimestre">1° Cuatrimestre</option>
            <option value="2° Cuatrimestre">2° Cuatrimestre</option>
            <option value="Intensificación Diciembre">Intensificación Diciembre</option>
            <option value="Intensificación Febrero">Intensificación Febrero</option>
            <option value="Intensificación Marzo">Intensificación Marzo</option>
        </select>

        <select
          name="valoracion"
          required
          className="w-full border rounded p-2"
        >
          <option value="TEA">TEA</option>
          <option value="TEP">TEP</option>
          <option value="TED">TED</option>
        </select>

        <input
          type="number"
          name="ciclo_lectivo"
          defaultValue={2026}
          className="w-full border rounded p-2"
        />

        <textarea
          name="observaciones"
          placeholder="Observaciones"
          className="w-full border rounded p-2"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Guardar Valoración
        </button>

      </form>

      <div className="mt-8 bg-white rounded-xl shadow overflow-hidden">
  <table className="w-full">
    <thead className="bg-slate-100">
      <tr>
        <th className="p-3 text-left">Alumno</th>
        <th className="p-3 text-left">Materia</th>
        <th className="p-3 text-left">Período</th>
        <th className="p-3 text-left">Valoración</th>
        <th className="p-3 text-left">Docente</th>
        <th className="p-3 text-left">Ciclo</th>
        <th className="p-3 text-left">Observaciones</th>
      </tr>
    </thead>

    <tbody>
      {valoraciones?.map((v) => (
        <tr
        key={v.id}
        className="border-t"
      >
        <td className="p-3">
          {v.alumnos?.[0]?.apellido}, {v.alumnos?.[0]?.nombre}
        </td>

        <td className="p-3">
          {v.materias?.[0]?.nombre}
        </td>

        <td className="p-3">
          {v.periodo}
        </td>

        <td className="p-3 font-semibold">
          {v.valoracion}
        </td>

        <td className="p-3">
          {v.docentes?.[0]?.apellido}, {v.docentes?.[0]?.nombre}
        </td>

        <td className="p-3">
          {v.ciclo_lectivo}
        </td>

        <td className="p-3">
          {v.observaciones}
        </td>
      </tr>
      ))}
    </tbody>
  </table>
</div>

    </div>
  );
}