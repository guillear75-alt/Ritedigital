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

    const totalAlumnos = alumnos?.length || 0;
const totalCursos = cursos?.length || 0;
const totalMatriculas = matriculas?.length || 0;

const matriculasPorCurso = matriculas?.reduce(
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

  <div className="flex justify-between items-center mb-5">

  <div>
    <h1 className="text-4xl font-bold">
      Matrículas
    </h1>

    <p className="text-slate-500">
      Gestión de inscripciones y cursos.
    </p>
  </div>

  <Link
    href="/dashboard/directivo"
    className="
      bg-slate-600
      hover:bg-slate-700
      text-white font-bold
      px-4
      py-2
      rounded-lg
    "
  >
    Volver
  </Link>

</div>

      <form
        action={crearMatricula}
        className="bg-white rounded-xl shadow p-6"
      >
<div className="grid md:grid-cols-3 gap-4">
        <select
          name="alumno_id"
          required
          className="w-full border rounded p-1"
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
          className="w-full border rounded p-1"
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
          className="w-full border rounded p-1"
        />
      </div>
        <button
          type="submit"
          className="bg-blue-600 text-white font-bold px-4 py-2 rounded-xl mt-3"
        >
          Guardar Matrícula
        </button>

      </form>

      <div className="grid md:grid-cols-3 gap-6 mb-5 mt-3">

  <div className="bg-white rounded-xl p-5 shadow">
    <p className="text-slate-500 text-sm">
      Alumnos
    </p>

    <p className="text-3xl font-bold">
      {totalAlumnos}
    </p>
  </div>

  <div className="bg-white rounded-xl p-5 shadow">
    <p className="text-slate-500 text-sm">
      Cursos
    </p>

    <p className="text-3xl font-bold">
      {totalCursos}
    </p>
  </div>

  <div className="bg-white rounded-xl p-5 shadow">
    <p className="text-slate-500 text-sm">
      Matrículas
    </p>

    <p className="text-3xl font-bold">
      {totalMatriculas}
    </p>
  </div>

</div>

      <div className="space-y-10 mt-8">

  {Object.entries(
    matriculasPorCurso || {}
  ).map(([curso, items]: any) => (

    <div key={curso}>

      <h2 className="text-2xl font-bold mb-4">
        {curso}
      </h2>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">

        {items.map((m: any) => (

          <div
            key={m.id}
            className="
              bg-white
              rounded-xl
              shadow
              border
              border-slate-200
              p-5
            "
          >

            <h3 className="font-bold text-lg">
              {(m.alumnos as any)?.apellido}
            </h3>

            <p className="text-slate-600">
              {(m.alumnos as any)?.nombre}
            </p>

            <p className="text-sm text-slate-500 mt-3">
              Ciclo Lectivo: {m.ciclo_lectivo}
            </p>

          </div>

        ))}

      </div>

    </div>

  ))}


      </div>

    </div>
  );
}