import { supabase } from "@/lib/supabase";
import ProteccionRol from "@/components/ProteccionRol";

export default async function DashboardDirectivoPage() {

  const { count: alumnos } = await supabase
    .from("alumnos")
    .select("*", { count: "exact", head: true });

  const { count: docentes } = await supabase
    .from("docentes")
    .select("*", { count: "exact", head: true });

  const { count: cursos } = await supabase
    .from("cursos")
    .select("*", { count: "exact", head: true });

  const { count: valoraciones } = await supabase
    .from("valoraciones")
    .select("*", { count: "exact", head: true });

  const { count: calificaciones } = await supabase
    .from("calificaciones")
    .select("*", { count: "exact", head: true });

  const { count: materias } = await supabase
  .from("materias")
  .select("*", { count: "exact", head: true });

const { count: matriculas } = await supabase
  .from("alumno_curso")
  .select("*", { count: "exact", head: true });

const { count: asistencias } = await supabase
  .from("asistencias")
  .select("*", { count: "exact", head: true });

const { count: primero } = await supabase
  .from("alumno_curso")
  .select("*", { count: "exact", head: true })
  .eq("curso_id", 1);

const { count: segundo } = await supabase
  .from("alumno_curso")
  .select("*", { count: "exact", head: true })
  .eq("curso_id", 2);

const { count: tercero } = await supabase
  .from("alumno_curso")
  .select("*", { count: "exact", head: true })
  .eq("curso_id", 3);

const { count: cuarto } = await supabase
  .from("alumno_curso")
  .select("*", { count: "exact", head: true })
  .eq("curso_id", 4);

const { count: quinto } = await supabase
  .from("alumno_curso")
  .select("*", { count: "exact", head: true })
  .eq("curso_id", 5);

const { count: sexto } = await supabase
  .from("alumno_curso")
  .select("*", { count: "exact", head: true })
  .eq("curso_id", 6);

const { count: tea } = await supabase
  .from("valoraciones")
  .select("*", { count: "exact", head: true })
  .eq("valoracion", "TEA");

const { count: tep } = await supabase
  .from("valoraciones")
  .select("*", { count: "exact", head: true })
  .eq("valoracion", "TEP");

const { count: ted } = await supabase
  .from("valoraciones")
  .select("*", { count: "exact", head: true })
  .eq("valoracion", "TED");

const { count: ausentes } = await supabase
  .from("asistencias")
  .select("*", { count: "exact", head: true })
  .eq("estado", "Ausente");

const { count: intervenciones } = await supabase
  .from("intervenciones_rite")
  .select("*", { count: "exact", head: true });

const alertasActivas = ausentes ?? 0;

const { data: ultimasValoraciones } = await supabase
  .from("valoraciones")
  .select("fecha, valoracion")
  .order("fecha", { ascending: false })
  .limit(3);

const { data: ultimasAsistencias } = await supabase
  .from("asistencias")
  .select("fecha, estado")
  .order("fecha", { ascending: false })
  .limit(3);

const { data: ultimasIntervenciones } = await supabase
  .from("intervenciones_rite")
  .select("fecha, motivo")
  .order("fecha", { ascending: false })
  .limit(3);

return(
    <div className="p-5">

      <h1 className="text-4xl font-bold mb-1">
        Panel de Gestión Institucional Direccion
      </h1>

      <p className="text-slate-400 mb-3">
        Resumen general de la situación escolar.
      </p>

 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-4">

  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
    <h2 className="text-slate-400 text-sm uppercase">
      Alumnos
    </h2>
    <p className="text-5xl font-bold text-white mt-2">
      {alumnos ?? 0}
    </p>
  </div>

  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
    <h2 className="text-slate-400 text-sm uppercase">
      Docentes
    </h2>
    <p className="text-5xl font-bold text-white mt-2">
      {docentes ?? 0}
    </p>
  </div>

  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
    <h2 className="text-slate-400 text-sm uppercase">
      Cursos
    </h2>
    <p className="text-5xl font-bold text-white mt-2">
      {cursos ?? 0}
    </p>
  </div>

  <div className="bg-amber-500 rounded-2xl p-6">
    <h2 className="text-white text-sm uppercase">
      Alertas Activas
    </h2>
    <p className="text-5xl font-bold text-white mt-2">
      {alertasActivas}
    </p>
  </div>

</div>

<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-3">

  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
    <h2 className="text-xl font-semibold text-white font-bold mb-2">
      Situación Institucional
    </h2>

     <div className="flex text-white font-bold justify-between">
      <span>1° Año</span>
      <span>{primero}</span>
    </div>

    <div className="flex text-white font-bold justify-between">
      <span>2° Año</span>
      <span>{segundo}</span>
    </div>

    <div className="flex text-white font-bold justify-between">
      <span>3° Año</span>
      <span>{tercero}</span>
    </div>

    <div className="flex text-white font-bold justify-between">
      <span>4° Economía</span>
      <span>{cuarto}</span>
    </div>

    <div className="flex text-white font-bold justify-between">
      <span>5° Economía</span>
      <span>{quinto}</span>
    </div>

    <div className="flex text-white font-bold justify-between">
      <span>6° Economía</span>
      <span>{sexto}</span>
    </div>
  </div>

  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
    <h2 className="text-xl font-semibold text-white mb-4">
      Seguimiento Pedagógico
    </h2>

    <div className="space-y-3 text-slate-300">

  <div className="flex justify-between">
    <span>TEA</span>
    <span>{tea ?? 0}</span>
  </div>

  <div className="flex justify-between">
    <span>TEP</span>
    <span>{tep ?? 0}</span>
  </div>

  <div className="flex justify-between">
    <span>TED</span>
    <span>{ted ?? 0}</span>
  </div>


    </div>
  </div>

  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
    <h2 className="text-xl font-semibold text-white mb-4">
      Alertas Institucionales
    </h2>

    <div className="space-y-3 text-slate-300">

  <div className="flex justify-between">
    <span>Ausentes</span>
    <span className="font-semibold text-white">
      {ausentes ?? 0}
    </span>
  </div>

  <div className="flex justify-between">
    <span>TED</span>
    <span className="font-semibold text-white">
      {ted ?? 0}
    </span>
  </div>

  <div className="flex justify-between">
    <span>Intervenciones RITE</span>
    <span className="font-semibold text-white">
      {intervenciones ?? 0}
    </span>
  </div>


    </div>
  </div>

</div>

<div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
  <h2 className="text-2xl text-white font-bold mb-3">
  Actividad Institucional Reciente
  </h2>

<div className="space-y-2 text-white">

  {ultimasValoraciones?.map((v, i) => (
    <div key={`v-${i}`}>
      • Valoración {v.valoracion} registrada el {v.fecha}
    </div>
  ))}

  {ultimasAsistencias?.map((a, i) => (
    <div key={`a-${i}`}>
      • Asistencia registrada ({a.estado}) el {a.fecha}
    </div>
  ))}

  {ultimasIntervenciones?.map((i, idx) => (
    <div key={`i-${idx}`}>
      • Intervención RITE registrada el {i.fecha}
    </div>
  ))}

</div>


      </div>

    </div>
  );
}