import Link from "next/link";

export default function AsistenciasDirectivoPage() {
  return (
    <div className="p-8">

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-4xl font-bold">
            Asistencias Institucionales
          </h1>

          <p className="text-slate-500 mt-2">
            Seguimiento de asistencia por curso.
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

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

        <Link href="/dashboard/directivo/asistencias/1" className="bg-white rounded-2xl shadow p-6 hover:shadow-lg">
          <h2 className="text-2xl font-bold">1° Año</h2>
          <p className="text-slate-500 mt-2">Ver asistencia</p>
        </Link>

        <Link href="/dashboard/directivo/asistencias/2" className="bg-white rounded-2xl shadow p-6 hover:shadow-lg">
          <h2 className="text-2xl font-bold">2° Año</h2>
          <p className="text-slate-500 mt-2">Ver asistencia</p>
        </Link>

        <Link href="/dashboard/directivo/asistencias/3" className="bg-white rounded-2xl shadow p-6 hover:shadow-lg">
          <h2 className="text-2xl font-bold">3° Año</h2>
          <p className="text-slate-500 mt-2">Ver asistencia</p>
        </Link>

        <Link href="/dashboard/directivo/asistencias/4" className="bg-white rounded-2xl shadow p-6 hover:shadow-lg">
          <h2 className="text-2xl font-bold">4° Economía</h2>
          <p className="text-slate-500 mt-2">Ver asistencia</p>
        </Link>

        <Link href="/dashboard/directivo/asistencias/5" className="bg-white rounded-2xl shadow p-6 hover:shadow-lg">
          <h2 className="text-2xl font-bold">5° Economía</h2>
          <p className="text-slate-500 mt-2">Ver asistencia</p>
        </Link>

        <Link href="/dashboard/directivo/asistencias/6" className="bg-white rounded-2xl shadow p-6 hover:shadow-lg">
          <h2 className="text-2xl font-bold">6° Economía</h2>
          <p className="text-slate-500 mt-2">Ver asistencia</p>
        </Link>

      </div>

    </div>
  );
}