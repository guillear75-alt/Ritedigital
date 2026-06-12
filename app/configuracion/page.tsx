import Link from "next/link";

export default function ConfiguracionPage() {
  return (
    <div className="p-8">

      <Link
        href="/dashboard"
        className="text-blue-600 hover:underline"
      >
        ← Volver al Dashboard
      </Link>
      <Link
  href="/matriculas-masivas"
  className="bg-green-600 text-white px-4 py-2 rounded inline-block"
>
  Generar Matrículas
</Link>

      <h1 className="text-3xl font-bold mt-4 mb-6">
        Configuración
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-2">
            Importación de Datos
          </h2>

          <p className="text-gray-600 mb-4">
            Carga masiva desde Excel.
          </p>

          <Link
            href="/configuracion/importar-alumnos"
            className="bg-blue-600 text-white px-4 py-2 rounded inline-block"
          >
            Importar Alumnos
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-2">
            Sistema
          </h2>

          <p className="text-gray-600">
            Opciones generales de RITE Escolar.
          </p>
        </div>

      </div>

    </div>
  );
}