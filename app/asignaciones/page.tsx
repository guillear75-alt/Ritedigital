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

const cursosAgrupados = asignaciones?.reduce(
  (acc: any, item: any) => {

    const curso =
      (item.cursos as any)?.nombre ||
      "Sin curso";

    if (!acc[curso]) {
      acc[curso] = [];
    }

    acc[curso].push(item);

    return acc;
  },
  {}
);

    

  return (
    <div className="p-5">

      <Link
  href="/dashboard/directivo"
  className="inline-flex items-center bg-slate-600 text-white px-4 py-2
    rounded-lg font-semibold transition"
>
  Dashboard Directivo
</Link>

      <h1 className="text-3xl font-bold mt-4 mb-5">
        Asignaciones Docentes
      </h1>

      <form
        action={crearAsignacion}
        className="bg-white rounded-xl shadow p-6 space-y-4"
      >

        <div className="grid md:grid-cols-4 gap-3">

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

</div>

<div className="flex justify-end mt-3">

  <button
    type="submit"
    className="bg-blue-600 hover:bg-blue-700 text-white
      px-4 py-2 rounded-lg font-semibold"
  >
    Asignar
  </button>

</div>

      </form>

      <div className="mt-10">
        <h1 className="text-4xl font-bold mt-2 mb-1">
  Asignaciones Docentes
</h1>

<p className="text-slate-500 mb-6">
  Gestión de docentes, cursos y materias.
</p>

        <div className="space-y-10">

  {Object.entries(
    cursosAgrupados || {}
  ).map(([curso, items]: any) => (

    <div key={curso}>

      <h3 className="text-2xl font-bold mb-4">
        {curso}
      </h3>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">

        {items.map((item: any) => (

          <div
            key={item.id}
            className="
              bg-white
              rounded-2xl
              shadow
              border
              border-slate-200
              p-5
            "
          >

            <p className="text-sm text-slate-500">
              Materia
            </p>

            <h4 className="text-lg font-bold mb-3">
              {item.materias?.nombre}
            </h4>

            <p className="text-sm text-slate-500">
              Docente
            </p>

            <p className="font-semibold mb-5">
              {item.docentes?.apellido},{" "}
              {item.docentes?.nombre}
            </p>

            <div className="flex gap-2">

              <Link
                href={`/docentes/${item.docentes?.id}`}
                className="
                  flex-1
                  bg-slate-700
                  text-white
                  text-center
                  py-2
                  rounded-lg
                "
              >
                Ficha
              </Link>

              <Link
                href={`/asignaciones/${item.id}/editar`}
                className="
                  flex-1
                  bg-amber-600
                  text-white
                  text-center
                  py-2
                  rounded-lg
                "
              >
                Reemplazar
              </Link>

            </div>

          </div>

        ))}

      </div>

    </div>

  ))}

</div>
      </div>

    </div>
  );
}