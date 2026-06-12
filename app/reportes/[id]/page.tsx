import { supabase } from "@/lib/supabase";
import PrintButton from "@/components/PrintButton";
import Link from "next/link";

export default async function ReporteAlumno({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const alumnoId = Number(id);

  const { data: alumno } = await supabase
    .from("alumnos")
    .select("*")
    .eq("id", alumnoId)
    .single();

  const { data: cursoAlumno } = await supabase
    .from("alumno_curso")
    .select(`
      ciclo_lectivo,
      cursos (
        nombre
      )
    `)
    .eq("alumno_id", alumnoId)
    .single();

    console.log("ALUMNO ID:", alumnoId);

  const { data: valoraciones } = await supabase
    .from("valoraciones")
    .select(`
  id,
  periodo,
  valoracion,
  observaciones,
  docentes (
    apellido,
    nombre
  ),
  materias (
    nombre,
    anio
  )
`)
    .eq("alumno_id", alumnoId);

  return (
    <div className="p-8">

      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">
            Reporte Pedagógico
          </h1>

          <p className="text-gray-600">
            RITE Escolar
          </p>
        </div>

        <PrintButton />
      </div>

      <Link
        href="/reportes"
        className="text-blue-600 hover:underline"
      >
        ← Volver a Reportes
      </Link>
      <Link
  href="/dashboard"
  className="text-blue-600 hover:underline ml-4"
>
  Dashboard
</Link>

      <div className="bg-white rounded-xl shadow p-6 mt-4 mb-6">

        <h2 className="text-2xl font-bold">
          {alumno?.apellido}, {alumno?.nombre}
        </h2>

        <div className="mt-3 space-y-1">
          <p>
            <strong>Curso:</strong>{" "}
            {cursoAlumno?.cursos?.[0]?.nombre || "Sin asignar"}
          </p>

          <p>
            <strong>Ciclo Lectivo:</strong>{" "}
            {cursoAlumno?.ciclo_lectivo || "-"}
          </p>
        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {valoraciones?.map((v) => (
          <div
            key={v.id}
            className="bg-white rounded-xl shadow p-4 border"
          >
            <h3 className="font-bold text-lg">
            {v.materias?.[0]?.nombre}
            </h3>

            <p>
            <strong>Año:</strong> {v.materias?.[0]?.anio}°
            </p>

            <div className="mt-3 text-sm space-y-1">

              <p>
                <strong>Período:</strong>{" "}
                {v.periodo || "Sin período"}
              </p>

              <p>
                <strong>Valoración:</strong>{" "}
                <span className="font-bold">
                  {v.valoracion}
                </span>
              </p>
              <p>
  <strong>Docente:</strong>{" "}
  {v.docentes?.[0]?.apellido}, {v.docentes?.[0]?.nombre}
</p>

            </div>

            <div className="mt-4">

              <p className="font-semibold">
                Observación
              </p>

              <p className="text-sm mt-1">
                {v.observaciones || "Sin observaciones"}
              </p>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}