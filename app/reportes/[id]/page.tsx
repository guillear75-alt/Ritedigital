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

  const { data: cursosAlumno } = await supabase
    .from("alumno_curso")
    .select(`
      ciclo_lectivo,
      cursos (
        nombre
      )
    `)
    .eq("alumno_id", alumnoId);

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

  const { data: calificaciones } = await supabase
    .from("calificaciones")
    .select(`
      id,
      periodo,
      tipo_evaluacion,
      nota,
      observacion,
      materias (
        nombre
      )
    `)
    .eq("alumno_id", alumnoId)
    .order("fecha", { ascending: false });

  const { data: asistencias } = await supabase
  .from("asistencias")
  .select("*")
  .eq("alumno_id", alumnoId);
  
  const totalAsistencias =
  asistencias?.filter(
    (a) => a.estado === "Presente"
  ).length || 0;

const totalAusencias =
  asistencias?.filter(
    (a) => a.estado === "Ausente"
  ).length || 0;

  const tea =
  valoraciones?.filter(
    (v) => v.valoracion === "TEA"
  ).length || 0;

const tep =
  valoraciones?.filter(
    (v) => v.valoracion === "TEP"
  ).length || 0;

const ted =
  valoraciones?.filter(
    (v) => v.valoracion === "TED"
  ).length || 0;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">

  <div className="flex items-center justify-between">

    <div className="flex items-center gap-5">

      <img
        src="/logo-naon.png"
        alt="Logo"
        className="h-21"
      />

      <div>

        <h1 className="text-3xl font-bold text-slate-900">
          Reporte Pedagógico
        </h1>

        <p className="text-1xl text-slate-600">
          RITE Escolar
        </p>

        <p className="text-slate-500">
          Sistema Integral de Gestión Educativa
        </p>

      </div>

    </div>

    <PrintButton />

  </div>



      <div className="flex items-center gap-3 mb-6 text-lg">
        <Link
          href="/reportes"
          className="px-2 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700
            text-sm font-bold rounded-lg transition"
        >
          ← Reportes
        </Link>

        <Link
          href="/dashboard/admin"
          className="px-2 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700
            text-sm font-bold rounded-lg transition"
        >
          Dashboard
        </Link>
      </div>

      <div className="bg-white rounded-1xl shadow-xl p-3 mb-3">

  <div className="flex items-center gap-8">

    <div className="w-21 h-21 rounded-full bg-blue-900 text-white flex items-center justify-center text-3xl font-bold">
      {alumno?.apellido?.charAt(0)}
      {alumno?.nombre?.charAt(0)}
    </div>

    <div className="flex-1">

      <h2 className="text-3xl font-bold text-slate-900">
        {alumno?.apellido}, {alumno?.nombre}
      </h2>

      <div className="grid md:grid-cols-5 gap-6 mt-6">

        <div>
          <p className="text-sm text-slate-500">
            Curso
          </p>

          <p className="font-semibold text-xl">
            {(cursosAlumno?.[0]?.cursos as any)?.nombre ||
            (cursosAlumno?.[0]?.cursos as any)?.[0]?.nombre ||
            "-"}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Ciclo Lectivo
          </p>

          <p className="font-semibold text-xl">
            {cursosAlumno?.[0]?.ciclo_lectivo}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Fecha Nacimiento
          </p>

          <p className="font-semibold">
            {alumno?.fecha_nacimiento || "-"}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            DNI
          </p>

          <p className="font-semibold">
            {alumno?.dni || "-"}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Legajo
          </p>

          <p className="font-semibold">
            {alumno?.id}
          </p>
        </div>

      </div>

    </div>
    

  </div>
  

</div>
<div className="grid md:grid-cols-5 gap-3 mb-6">

  <div className="bg-white rounded-xl shadow-md p-7">

  <h3 className="font-semibold text-green-700 mb-2 text-sm">
    ASISTENCIAS
  </h3>

  <div className="grid grid-cols-2 gap-3">

    <div className="text-center">
      <p className="text-xs text-slate-500">
        Presentes
      </p>

      <p className="text-3xl font-bold text-green-700">
        {totalAsistencias}
      </p>
    </div>

    <div className="text-center">
      <p className="text-xs text-slate-500">
        Ausentes
      </p>

      <p className="text-3xl font-bold text-red-700">
        {totalAusencias}
      </p>
    </div>

  </div>

</div>

  <div className="bg-green-50 rounded-xl shadow-md p-2">
    <h3 className="font-bold text-green-800">
      TEA
    </h3>

    <p className="text-3xl font-bold mt-3">
      {tea}
    </p>
  </div>

  <div className="bg-yellow-50 rounded-xl shadow-md p-2">
    <h3 className="font-bold text-yellow-800">
      TEP
    </h3>

    <p className="text-3xl font-bold mt-3">
      {tep}
    </p>
  </div>

  <div className="bg-red-50 rounded-xl shadow-md p-2">
    <h3 className="font-bold text-red-800">
      TED
    </h3>

    <p className="text-3xl font-bold mt-3">
      {ted}
    </p>
  </div>

  <div className="bg-white rounded-xl shadow-md p-2">
    <h3 className="font-bold text-blue-900 mb-4">
      RESUMEN
    </h3>

    <div className="space-y-3 text-sm">

      <div className="flex justify-between">
        <span>Valoraciones</span>
        <strong>{valoraciones?.length || 0}</strong>
      </div>

      <div className="flex justify-between">
        <span>Calificaciones</span>
        <strong>{calificaciones?.length || 0}</strong>
      </div>

      <div className="flex justify-between">
        <span>Materias</span>
        <strong>{valoraciones?.length || 0}</strong>
      </div>

    </div>
  </div>

</div>

<h2 className="text-2xl font-bold mb-4">
  Valoraciones
</h2>

<div className="bg-white rounded-2xl shadow overflow-hidden mb-8">

  <table className="w-full">

    <thead className="bg-slate-100">

      <tr>
        <th className="p-3 text-left">Materia</th>
        <th className="p-3 text-left">Año</th>
        <th className="p-3 text-left">Período</th>
        <th className="p-3 text-left">Valoración</th>
        <th className="p-3 text-left">Docente</th>
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
            {(v.materias as any)?.nombre ||
            (v.materias as any)?.[0]?.nombre ||
            "-"}
          </td>

          <td className="p-3">
            {(v.materias as any)?.anio ||
            (v.materias as any)?.[0]?.anio ||
            "-"}°
          </td>

          <td className="p-3">
            {v.periodo}
          </td>

          <td className="p-3 font-bold">
            {v.valoracion}
          </td>

          <td className="p-3">
            {(v.docentes as any)?.apellido
              ? `${(v.docentes as any).apellido}, ${(v.docentes as any).nombre}`
              : "Sin asignar"}
          </td>

          <td className="p-3">
            {v.observaciones ||
              "Sin observaciones"}
          </td>

        </tr>

      ))}

    </tbody>

  </table>

  <div className="mt-8">
  <h2 className="text-2xl font-bold mb-4">
    Calificaciones
  </h2>

  <div className="bg-white rounded-xl shadow overflow-hidden">
    <table className="w-full">
      <thead className="bg-slate-100">
        <tr>
          <th className="p-3 text-left">
            Materia
          </th>

          <th className="p-3 text-left">
            Período
          </th>

          <th className="p-3 text-left">
            Tipo
          </th>

          <th className="p-3 text-left">
            Nota
          </th>
        </tr>
      </thead>

      <tbody>
        {calificaciones?.length ? (
          calificaciones.map((c) => (
            <tr
              key={c.id}
              className="border-t"
            >
              <td className="p-3">
                {(c.materias as any)?.nombre ||
                (c.materias as any)?.[0]?.nombre ||
                "-"}
              </td>

              <td className="p-3">
                {c.periodo}
              </td>

              <td className="p-3">
                {c.tipo_evaluacion}
              </td>

              <td className="p-3 font-bold">
                {c.nota}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan={4}
              className="p-4 text-center text-slate-500"
            >
              Sin calificaciones registradas
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>

</div>


      </div>
      
  
  );
}