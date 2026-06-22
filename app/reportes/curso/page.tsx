import Link from "next/link";

const cursos = [
  { id: 1, nombre: "1° Año", alumnos: 13 },
  { id: 2, nombre: "2° Año", alumnos: 10 },
  { id: 3, nombre: "3° Año", alumnos: 13 },
  { id: 4, nombre: "4° Economía", alumnos: 13 },
  { id: 5, nombre: "5° Economía", alumnos: 4 },
  { id: 6, nombre: "6° Economía", alumnos: 9 },
];

export default function ReportesCursoPage() {
  return (
    <div className="p-5">

      <div className="flex gap-2 mb-5">

        <Link
          href="/reportes"
          className="bg-blue-600 text-white font-bold px-3 py-2 rounded-xl"
        >
          Reportes
        </Link>

        <Link
          href="/dashboard/admin"
          className="bg-green-600 text-white font-bold px-3 py-2 rounded-xl"
        >
          Dashboard
        </Link>

      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">

        <h1 className="text-3xl font-bold">
          Reportes por Curso
        </h1>

        <p className="text-slate-500 mt-2">
          Seleccione un curso para visualizar indicadores,
          valoraciones, calificaciones y reportes grupales.
        </p>

      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

        {cursos.map((curso) => (

          <Link
            key={curso.id}
            href={`/reportes/curso/${curso.id}`}
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl
              transition"
          >

            <div className="flex justify-between items-start">

              <h2 className="text-2xl font-bold text-slate-900">
                {curso.nombre}
              </h2>

              <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded-full">
                Curso
              </span>

            </div>

            <div className="mt-5">

              <p className="text-slate-500 text-sm">
                Alumnos matriculados
              </p>

              <p className="text-4xl font-bold text-blue-700">
                {curso.alumnos}
              </p>

            </div>

            <div className="mt-5 text-sm text-slate-500">
              Ver informe completo del curso
            </div>

          </Link>

        ))}

      </div>

    </div>
  );
}