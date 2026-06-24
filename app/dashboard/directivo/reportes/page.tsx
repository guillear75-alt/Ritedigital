import Link from "next/link";

export default function ReportesDirectivoPage() {
  return (
    <div className="p-8">

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-4xl font-bold">
            Reportes Institucionales
          </h1>

          <p className="text-slate-500 mt-2">
            Información estratégica para la gestión escolar.
          </p>
        </div>

        <Link
          href="/dashboard/directivo"
          className="
            bg-slate-600
            hover:bg-slate-700
            text-white
            px-4
            py-2
            rounded-lg
          "
        >
          Volver
        </Link>

      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-4">

        <Link
            href="/dashboard/directivo/reportes/resumen"
            className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white
                rounded-2xl shadow p-4 hover:shadow-lg transition"
            >
            <h2 className="text-2xl font-bold">
                Resumen Institucional
            </h2>

            <p className="mt-2 opacity-90">
                Indicadores generales de la institución.
            </p>

            <div className="mt-6 font-semibold">
                Ver resumen →
            </div>
        </Link>

        <Link
          href="/dashboard/directivo/reportes/Valoraciones"
           className="bg-gradient-to-r from-emerald-700 to-green-500 text-white
            rounded-2xl shadow p-6 hover:shadow-lg transition"
        >
          <h2 className="text-2xl font-bold">
            Valoraciones
          </h2>

          <p className="text-white-300 mt-2">
            TEA, TEP, TED y seguimiento pedagógico.
          </p>

          <div className="mt-6 text-white-600 font-semibold">
            Ver reporte →
          </div>
        </Link>

        <Link
          href="/dashboard/directivo/calificaciones"
          className="
bg-gradient-to-r
from-blue-700
to-cyan-400
text-white
rounded-2xl
shadow
p-6
hover:shadow-lg
transition
"
        >
          <h2 className="text-2xl font-bold">
            Calificaciones
          </h2>

          <p className="text-grey-500 mt-2">
            Promedios, pendientes y rendimiento.
          </p>

          <div className="mt-6 text-white-600 font-semibold">
            Ver reporte →
          </div>
        </Link>

        <Link
          href="/dashboard/directivo/asistencias"
          className="bg-gradient-to-r from-amber-700 to-orange-400 text-white
        rounded-2xl shadow p-6 hover:shadow-lg transition"
        >
          <h2 className="text-2xl font-bold">
            Asistencias
          </h2>

          <p className="text-grey-500 mt-2">
            Ausencias, alertas y seguimiento.
          </p>

          <div className="mt-6 text-white-600 font-semibold">
            Ver reporte →
          </div>
        </Link>

        <Link
          href="/alumnos"
          className="bg-gradient-to-r from-violet-800 to-fuchsia-400 text-white
        rounded-2xl shadow p-6 hover:shadow-lg transition"
        >
          <h2 className="text-2xl font-bold">
            Trayectorias
          </h2>

          <p className="text-grey-500 mt-2">
            Situación integral de los estudiantes.
          </p>

          <div className="mt-6 text-white-600 font-semibold">
            Ver reporte →
          </div>
        </Link>

      </div>

      <div className="mt-10 bg-white rounded-2xl shadow p-6">

        <h2 className="text-2xl font-bold mb-4">
          Resumen Ejecutivo
        </h2>

        <p className="text-slate-600">
          Desde este módulo la dirección puede acceder a los
          principales indicadores institucionales vinculados
          con asistencia, valoración pedagógica, desempeño
          académico y trayectorias educativas.
        </p>

      </div>

    </div>
  );
}