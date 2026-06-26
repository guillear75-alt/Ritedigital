import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function CentroDocumentacion({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const busqueda = params.q?.trim() || "";

  let alumnos: any[] = [];

  if (busqueda.length >= 3) {
    const { data } = await supabase
      .from("alumnos")
      .select(`
        id,
        apellido,
        nombre,
        dni,
        curso
      `)
      .or(
        `apellido.ilike.%${busqueda}%,nombre.ilike.%${busqueda}%,dni.ilike.%${busqueda}%`
      )
      .order("apellido");

    alumnos = data || [];
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-black text-slate-900">
          📑 Centro de Documentación
        </h1>

        <p className="text-slate-500 mt-2 mb-8">
          Busque un alumno para generar documentación institucional.
        </p>

        {/* BUSCADOR */}

        <form className="mb-8">

          <input
            type="text"
            name="q"
            defaultValue={busqueda}
            placeholder="Buscar por apellido, nombre o DNI..."
            className="
              w-full
              rounded-2xl
              border
              border-slate-300
              bg-white
              px-5
              py-4
              text-lg
              shadow-sm
              focus:outline-none
              focus:ring-2
              focus:ring-indigo-500
            "
          />

        </form>

        {/* MENSAJES */}

        {busqueda.length === 0 && (

          <div className="bg-white rounded-3xl p-10 shadow text-center">

            <div className="text-6xl mb-4">
              📄
            </div>

            <h2 className="text-2xl font-bold">
              Documentación Institucional
            </h2>

            <p className="text-slate-500 mt-3">
              Escriba el apellido, nombre o DNI del alumno para comenzar.
            </p>

          </div>

        )}

        {busqueda.length > 0 && busqueda.length < 3 && (

          <div className="bg-amber-50 border border-amber-300 rounded-2xl p-6">

            Escriba al menos <strong>3 caracteres</strong> para realizar la búsqueda.

          </div>

        )}

        {busqueda.length >= 3 && alumnos.length === 0 && (

          <div className="bg-red-50 border border-red-300 rounded-2xl p-6">

            No se encontraron alumnos.

          </div>

        )}

        {/* RESULTADOS */}

        <div className="space-y-4 mt-6">

          {alumnos.map((alumno) => (

            <div
              key={alumno.id}
              className="
                bg-white
                rounded-3xl
                shadow
                p-6
                flex
                justify-between
                items-center
              "
            >

              <div>

                <h2 className="text-2xl font-bold">
                  {alumno.apellido}, {alumno.nombre}
                </h2>

                <p className="text-slate-500 mt-2">
                  DNI: {alumno.dni}
                </p>

                <p className="text-slate-500">
                  Curso: {alumno.curso || "-"}
                </p>

              </div>

              <Link
                href={`/imprimir/alumno/${alumno.id}`}
                className="
                  bg-indigo-600
                  hover:bg-indigo-700
                  text-white
                  px-6
                  py-3
                  rounded-xl
                  font-semibold
                "
              >
                Abrir documentación
              </Link>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}