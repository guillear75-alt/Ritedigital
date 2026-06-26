import { supabase } from "@/lib/supabase";
import ProteccionRol from "@/components/ProteccionRol";
import Link from "next/link";



export default async function DashboardPreceptorPage() {

  const { count: alumnos } = await supabase
    .from("alumnos")
    .select("*", { count: "exact", head: true });

  const { count: matriculas } = await supabase
    .from("alumno_curso")
    .select("*", { count: "exact", head: true });

  const { data: ausentes } = await supabase
    .from("asistencias")
    .select("*")
    .eq("estado", "Ausente");

  const { count: intervenciones } = await supabase
    .from("intervenciones_rite")
    .select("*", { count: "exact", head: true });

  const ausentesHoy =
    ausentes?.length || 0;

 return (
  <div className="min-h-screen bg-slate-100 p-5">

    <div className="max-w-7xl mx-auto">

      <div className="mb-5">
        <h1 className="text-4xl font-black text-slate-900">
           Dashboard Preceptor
        </h1>

        <p className="text-slate-500 mt-2">
          Gestión diaria de asistencia, alumnos e intervenciones.
        </p>
      </div>

      {/* Tarjetas */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-slate-900 rounded-3xl p-6 shadow-lg">
          <p className="font-bold text-slate-300">
            Alumnos
          </p>

          <h2 className="text-5xl font-black text-white mt-3">
            {alumnos ?? 0}
          </h2>
        </div>

        <div className="bg-indigo-500 rounded-3xl p-6 shadow-lg">
          <p className=" font-bold text-indigo-100">
            Matrículas
          </p>

          <h2 className="text-5xl font-black text-white mt-3">
            {matriculas ?? 0}
          </h2>
        </div>

        <div className="bg-red-600 rounded-3xl p-6 shadow-lg">
          <p className="font-bold text-red-100">
            Ausentes
          </p>

          <h2 className="text-5xl font-black text-white mt-3">
            {ausentesHoy}
          </h2>
        </div>

        <div className="bg-amber-700 rounded-3xl p-6 shadow-lg">
          <p className="font-bold text-amber-100">
            Intervenciones RITE
          </p>

          <h2 className="text-5xl font-black text-white mt-3">
            {intervenciones ?? 0}
          </h2>
        </div>

      </div>

      {/* Accesos rápidos */}

      <h2 className="text-2xl font-bold mt-8 mb-3">
        Accesos rápidos
      </h2>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

        <Link
          href="/asistencias"
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-3xl p-6 shadow-lg transition hover:scale-105"
        >
          
          <h3 className="text-xl font-bold">
            Asistencia
          </h3>

          <p className="mt-2 text-blue-100">
            Registrar presentes y ausentes.
          </p>
        </Link>

        <Link
          href="/alumnos"
          className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-3xl p-6 shadow-lg transition hover:scale-105"
        >
          

          <h3 className="text-xl font-bold">
            Alumnos
          </h3>

          <p className="mt-2 text-emerald-100">
            Consultar fichas de estudiantes.
          </p>
        </Link>

        <Link
          href="/observaciones"
          className="bg-amber-500 hover:bg-amber-600 text-white rounded-3xl p-6 shadow-lg transition hover:scale-105"
        >
          

          <h3 className="text-xl font-bold">
            Intervenciones
          </h3>

          <p className="mt-2 text-amber-100">
            Registrar intervenciones RITE.
          </p>
        </Link>

        <Link
          href="/alertas"
          className="bg-red-600 hover:bg-red-700 text-white rounded-3xl p-6 shadow-lg transition hover:scale-105"
        >
          

          <h3 className="text-xl font-bold">
            Alertas
          </h3>

          <p className="mt-2 text-red-100">
            Revisar situaciones pendientes.
          </p>
        </Link>

      </div>


      {/* Panel inferior */}

      <div className="mt-5 bg-white rounded-3xl shadow-lg p-5">

        <h2 className="text-2xl font-bold mb-4">
          Resumen del día
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-slate-100 rounded-2xl p-5">

            <p className="font-bold text-slate-500">
              Estado de asistencia
            </p>

            <h3 className="text-3xl font-black mt-2">
              {ausentesHoy === 0 ? "Excelente" : `${ausentesHoy} ausentes`}
            </h3>

          </div>

          <div className="bg-slate-100 rounded-2xl p-5">

            <p className="font-bold text-slate-500">
              Intervenciones
            </p>

            <h3 className="text-3xl font-black mt-2">
              {intervenciones ?? 0}
            </h3>

          </div>

          <div className="bg-slate-100 rounded-2xl p-5">

            <p className="font-bold text-slate-500">
              Alumnos registrados
            </p>

            <h3 className="text-3xl font-black mt-2">
              {alumnos ?? 0}
            </h3>

          </div>

        </div>

      </div>

    </div>

  </div>
); }