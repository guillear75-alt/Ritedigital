import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default async function AlumnoDetalle({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: alumno } = await supabase
    .from("alumnos")
    .select("*")
    .eq("id", id)
    .single();

  const { data: intervenciones } = await supabase
    .from("intervenciones_rite")
    .select("*")
    .eq("alumno_id", id)
    .order("fecha", { ascending: false });

  if (!alumno) {
    return <div>Alumno no encontrado</div>;
  }

  const { data: asistencias } = await supabase
  .from("asistencias")
  .select("*")
  .eq("alumno_id", id);

const { data: valoraciones } = await supabase
  .from("valoraciones")
  .select("*")
  .eq("alumno_id", id);

const { data: calificaciones } = await supabase
  .from("calificaciones")
  .select("*")
  .eq("alumno_id", id);

  const ausencias =
  asistencias?.filter(
    (a) => a.estado === "Ausente"
  ).length || 0;

const tea =
  valoraciones?.filter(
    (v) => v.valoracion === "TEA"
  ).length || 0;

const ted =
  valoraciones?.filter(
    (v) => v.valoracion === "TED"
  ).length || 0;

const tep =
  valoraciones?.filter(
    (v) => v.valoracion === "TEP"
  ).length || 0;

const promedio =
  calificaciones?.length
    ? (
        calificaciones.reduce(
          (acc, c) => acc + Number(c.nota),
          0
        ) / calificaciones.length
      ).toFixed(2)
    : "0";

    const { data: observaciones } = await supabase
  .from("observaciones")
  .select("*")
  .eq("alumno_id", id)
  .order("created_at", { ascending: false });

  const timeline = [
  ...(intervenciones || []).map((i) => ({
    fecha: i.fecha,
    tipo: "Intervención",
    descripcion: i.motivo,
  })),

  ...(valoraciones || []).map((v) => ({
    fecha: v.created_at,
    tipo: "Valoración",
    descripcion: `${v.valoracion} - ${v.periodo || ""}`,
  })),

  ...(calificaciones || []).map((c) => ({
    fecha: c.fecha,
    tipo: "Calificación",
    descripcion: `Nota: ${c.nota}`,
  })),

  ...(observaciones || []).map((o) => ({
    fecha: o.created_at,
    tipo: "Observación",
    descripcion: o.observacion,
  })),
].sort(
  (a, b) =>
    new Date(b.fecha).getTime() -
    new Date(a.fecha).getTime()
);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 text-slate-900 p-8">
      <div className="max-w-7xl mx-auto">

        <p className="text-slate-500 mb-2">
  Legajo digital del estudiante
</p>

<h1 className="text-4xl font-bold text-slate-900 mb-8">
  {alumno.apellido}, {alumno.nombre}
</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition">
            <h2 className="font-bold text-lg mb-4">
              Alumno
            </h2>

            <p><b>DNI:</b> {alumno.dni}</p>
            <p><b>Curso:</b> {alumno.curso}</p>
            <p><b>Teléfono:</b> {alumno.telefono}</p>
            <p><b>Email:</b> {alumno.email}</p>
            <p><b>Dirección:</b> {alumno.direccion}</p>
          </div>

          <div className="bg-white rounded-xl shadow p-4">
            <h2 className="font-bold text-lg mb-4">
              Tutor Responsable
            </h2>

            <p><b>Nombre:</b> {alumno.tutor_nombre}</p>
            <p><b>DNI:</b> {alumno.tutor_dni}</p>
            <p><b>Parentesco:</b> {alumno.tutor_parentesco}</p>
            <p><b>Teléfono:</b> {alumno.tutor_telefono}</p>
            <p><b>Email:</b> {alumno.tutor_email}</p>
          </div>

          <div className="bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl p-5 text-white shadow-lg">

            <h2 className="text-sm uppercase tracking-wider opacity-80">
                Resumen RITE
            </h2>

            <div className="mt-4 text-5xl font-bold">
                {intervenciones?.length || 0}
            </div>

            <p className="opacity-80 mt-2">
                Intervenciones registradas
            </p>

            </div>

        </div>
        <div className="mt-8 grid md:grid-cols-4 gap-4">

  <div className="bg-white rounded-2xl p-5 shadow">
    <h3 className="text-slate-500 text-sm">
      Ausencias
    </h3>

    <p className="text-3xl font-bold">
      {ausencias}
    </p>
  </div>

  <div className="bg-white rounded-2xl p-5 shadow">
    <h3 className="text-slate-500 text-sm">
      TEA
    </h3>

    <p className="text-3xl font-bold text-green-600">
      {tea}
    </p>
  </div>

  <div className="bg-white rounded-2xl p-5 shadow">
    <h3 className="text-slate-500 text-sm">
      TED
    </h3>

    <p className="text-3xl font-bold text-amber-600">
      {ted}
    </p>
  </div>

  <div className="bg-white rounded-2xl p-5 shadow">
    <h3 className="text-slate-500 text-sm">
      Promedio
    </h3>

    <p className="text-3xl font-bold text-indigo-600">
      {promedio}
    </p>
  </div>

</div>

     <div className="mt-8 bg-white border border-slate-200 rounded-2xl shadow-sm">

  <div className="flex justify-between items-center p-4 border-b border-slate-200">

    <h2 className="text-xl font-bold text-slate-800">
      Intervenciones RITE
    </h2>

    <Link
      href={`/alumnos/${id}/intervenciones/nueva`}
      className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-xl transition font-medium"
    >
      Nueva Intervención
    </Link>

  </div>

  <div className="p-4">

    <Link
      href={`/alumnos/${id}/trayectorias`}
      className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-xl transition font-medium"
    >
      Trayectorias
    </Link>

  </div>

  <div className="p-5">

    {intervenciones?.length === 0 ? (
      <p className="text-slate-500">
        No hay intervenciones registradas.
      </p>
    ) : (
        
      <div className="space-y-3">
              {intervenciones?.map((item) => (
                <div
                  key={item.id}
                  className="border border-slate-200 rounded-xl p-4 hover:bg-slate-50 transition"
                >
                  <p>
                    <b>Fecha:</b> {item.fecha}
                  </p>

                  <p>
                    <b>Motivo:</b> {item.motivo}
                  </p>

                  <p>
                    <b>Estado:</b> {item.estado}
                  </p>
                </div>
                  

              ))}
              
            </div>
            
          )}
        </div>
        </div>

      </div>
    </div>
  );
}