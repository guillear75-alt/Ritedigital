import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default async function CursoDetalle({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ materia?: string }>;
}) {
  const { id } = await params;
const { materia } = await searchParams;

const cursoId = Number(id);
const materiaId = Number(materia);

  const { data: curso } = await supabase
    .from("cursos")
    .select("*")
    .eq("id", cursoId)
    .single();

  const { data: relaciones } = await supabase
    .from("alumno_curso")
    .select("alumno_id")
    .eq("curso_id", cursoId)

  const { data: materiaData } = await supabase
    .from("materias")
    .select("*")
    .eq("id", materiaId)
    .single();

  const alumnoIds =
    relaciones?.map((r) => r.alumno_id) || [];

  let alumnos: any[] = [];

if (alumnoIds.length > 0) {
  const { data } = await supabase
    .from("alumnos")
    .select("*")
    .in("id", alumnoIds)
    .order("apellido");

  alumnos = data || [];
}

 return (
  <div className="min-h-screen bg-slate-50 p-8">
    <div className="max-w-5xl mx-auto">

      <Link
        href="/cursos"
        className="text-slate-500 hover:text-slate-800"
      >
        ← Volver a Cursos
      </Link>

      <div className="mt-4 mb-8">
        <h1 className="text-4xl font-bold text-slate-900">
          {curso?.nombre}
        </h1>

        <p className="text-lg text-blue-600 mt-2">
          Materia: {materiaData?.nombre}
        </p>

        <p className="text-slate-500 mt-2">
          {alumnos.length} alumnos registrados
        </p>
      </div>

      {alumnos.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
          <p className="text-slate-500">
            No hay alumnos en este curso.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {alumnos.map((alumno) => (
            <div
            key={alumno.id}
            className="
              bg-white
              rounded-xl
              border
              border-slate-200
              px-3
              py-2
              flex
              justify-between
              items-center
              hover:shadow-sm
              transition
            "
          >
              <div>
              <h2 className="font-semibold text-slate-900">
                {alumno.apellido}, {alumno.nombre}
              </h2>

              <p className="text-xs text-slate-500">
                DNI {alumno.dni}
              </p>
            </div>

              <Link
                href={`/valoraciones/alumno/${alumno.id}?materia=${materiaId}`}
                className="
                  bg-slate-900
                  hover:bg-slate-700
                  text-white
                  px-3
                  py-1.5
                  rounded-lg
                  text-sm
                  transition
                "
              >
                Ver ficha
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);
      }
