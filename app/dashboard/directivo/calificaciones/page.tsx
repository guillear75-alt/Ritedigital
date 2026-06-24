import Link from "next/link";

export default function CalificacionesDirectivoPage() {
  return (
    <div className="p-8">

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-4xl font-bold">
            Calificaciones Institucionales
          </h1>

          <p className="text-slate-500 mt-2">
            Seguimiento académico por curso.
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

        <Link
          href="/dashboard/directivo/calificaciones/1"
          className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition"
        >
          <h2 className="text-2xl font-bold">
            1° Año
          </h2>

          <p className="text-slate-500 mt-2">
            Ver situación académica
          </p>
        </Link>

        <Link
          href="/dashboard/directivo/calificaciones/2"
          className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition"
        >
          <h2 className="text-2xl font-bold">
            2° Año
          </h2>

          <p className="text-slate-500 mt-2">
            Ver situación académica
          </p>
        </Link>

        <Link
          href="/dashboard/directivo/calificaciones/3"
          className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition"
        >
          <h2 className="text-2xl font-bold">
            3° Año
          </h2>

          <p className="text-slate-500 mt-2">
            Ver situación académica
          </p>
        </Link>

        <Link
          href="/dashboard/directivo/calificaciones/4"
          className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition"
        >
          <h2 className="text-2xl font-bold">
            4° Economía
          </h2>

          <p className="text-slate-500 mt-2">
            Ver situación académica
          </p>
        </Link>

        <Link
          href="/dashboard/directivo/calificaciones/5"
          className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition"
        >
          <h2 className="text-2xl font-bold">
            5° Economía
          </h2>

          <p className="text-slate-500 mt-2">
            Ver situación académica
          </p>
        </Link>

        <Link
          href="/dashboard/directivo/calificaciones/6"
          className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition"
        >
          <h2 className="text-2xl font-bold">
            6° Economía
          </h2>

          <p className="text-slate-500 mt-2">
            Ver situación académica
          </p>
        </Link>

      </div>

    </div>
  );
}