import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default async function ResumenInstitucionalPage() {

  const { count: totalAlumnos } = await supabase
    .from("alumnos")
    .select("*", { count: "exact", head: true });

  const { count: totalDocentes } = await supabase
    .from("docentes")
    .select("*", { count: "exact", head: true });

  const { count: totalCursos } = await supabase
    .from("cursos")
    .select("*", { count: "exact", head: true });

  const { count: intervenciones } = await supabase
    .from("intervenciones_rite")
    .select("*", { count: "exact", head: true });

  const { data: valoraciones } = await supabase
    .from("valoraciones")
    .select("valoracion");

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

  const { data: asistencias } = await supabase
    .from("asistencias")
    .select("estado");

  const presentes =
    asistencias?.filter(
      (a) => a.estado === "Presente"
    ).length || 0;

  const totalAsistencias =
    asistencias?.length || 0;

  const porcentajeAsistencia =
    totalAsistencias > 0
      ? (
          (presentes / totalAsistencias) *
          100
        ).toFixed(1)
      : "0";

  const { data: notas } = await supabase
    .from("calificaciones")
    .select("nota");

  const promedioInstitucional =
    notas?.length
      ? (
          notas.reduce(
            (acc, n) =>
              acc + Number(n.nota),
            0
          ) / notas.length
        ).toFixed(2)
      : "0";

  return (
    <div className="p-5 min-h-screen bg-slate-200">

      <div className="flex justify-between items-center mb-5">

        <div>
          <h1 className="text-4xl font-bold">
            Resumen Institucional
          </h1>

          <p className="text-slate-500 mt-2">
            Indicadores generales de la institución.
          </p>
        </div>

        <Link
          href="/dashboard/directivo/reportes"
          className="
            bg-slate-700
            hover:bg-slate-800
            text-white
            px-4
            py-2
            rounded-lg
          "
        >
          Volver
        </Link>

      </div>

      <div className="grid md:grid-cols-4 gap-4 mb-5">

        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-slate-500 font-bold">
            Alumnos
          </p>

          <p className="text-4xl font-bold">
            {totalAlumnos}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-slate-500 font-bold">
            Docentes
          </p>

          <p className="text-4xl font-bold">
            {totalDocentes}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-slate-500 font-bold">
            Cursos
          </p>

          <p className="text-4xl font-bold">
            {totalCursos}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-slate-500 font-bold">
            Intervenciones RITE
          </p>

          <p className="text-4xl font-bold">
            {intervenciones}
          </p>
        </div>

      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-5">

        <div className="bg-green-50 border border-green-200 rounded-xl p-5">

          <h2 className="font-bold text-green-800 mb-2">
            Asistencia General
          </h2>

          <p className="text-5xl font-bold text-green-700">
            {porcentajeAsistencia}%
          </p>

        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">

          <h2 className="font-bold text-blue-800 mb-2">
            Promedio General
          </h2>

          <p className="text-5xl font-bold text-blue-700">
            {promedioInstitucional}
          </p>

        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">

          <h2 className="font-bold text-amber-800 mb-3">
            Trayectorias
          </h2>

          <div className="space-y-2">

            <p>
              <strong>TEA:</strong> {tea}
            </p>

            <p>
              <strong>TEP:</strong> {tep}
            </p>

            <p>
              <strong>TED:</strong> {ted}
            </p>

          </div>

        </div>

      </div>

      <div className="bg-white rounded-2xl shadow p-6">

        <h2 className="text-2xl font-bold mb-2">
          Estado Institucional
        </h2>

        <ul className="space-y-3 font-bold text-black-700">

          <li>
            • Alumnos registrados: {totalAlumnos}
          </li>

          <li>
            • Docentes registrados: {totalDocentes}
          </li>

          <li>
            • Cursos activos: {totalCursos}
          </li>

          <li>
            • Asistencia general: {porcentajeAsistencia}%
          </li>

          <li>
            • Promedio institucional: {promedioInstitucional}
          </li>

          <li>
            • Trayectorias TED: {ted}
          </li>

          <li>
            • Intervenciones RITE: {intervenciones}
          </li>

        </ul>

      </div>

    </div>
  );
}