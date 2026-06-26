import Link from "next/link";
import Image from "next/image";

import { supabase } from "@/lib/supabase";
import PrintButton from "@/components/PrintButton";

export default async function ImprimirCalificacionesPage({
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

  if (!alumno) {
    return (
      <div className="p-10">
        Alumno no encontrado.
      </div>
    );
  }

  const { data: calificaciones } = await supabase
    .from("calificaciones")
    .select(`
      *,
      materias (
        nombre
      )
    `)
    .eq("alumno_id", id)
    .eq("periodo", "1° Cuatrimestre")
    .order("materia_id");

  const hoy = new Date().toLocaleDateString("es-AR");

  const promedio =
    calificaciones && calificaciones.length > 0
      ? (
          calificaciones.reduce(
            (acc, item) => acc + Number(item.nota || 0),
            0
          ) / calificaciones.length
        ).toFixed(2)
      : "0";

  return (
    <div className="min-h-screen bg-slate-200 py-8 print:bg-white">

      <div className="max-w-[210mm] mx-auto flex justify-between mb-5 print:hidden">

        <Link
          href={`/imprimir/alumno/${id}`}
          className="bg-slate-700 hover:bg-slate-800 text-white font-bold px-5 py-3 rounded-xl"
        >
          Volver
        </Link>

        <PrintButton />

      </div>

      <div
        className="
          bg-white
          w-[210mm]
          min-h-[297mm]
          mx-auto
          p-[12mm]
          shadow-xl
          print:shadow-none
          relative
          overflow-hidden
        "
      >

        {/* Marca de agua */}

        <div className="absolute inset-0 flex items-center justify-center opacity-[0.04]">

          <Image
            src="/logo-naon.png"
            alt="Logo"
            width={500}
            height={500}
            className="object-contain"
          />

        </div>

        {/* Encabezado */}

        <div className="relative z-10 border-b-2 border-slate-800 pb-4">

          <div className="flex justify-between">

            <div className="flex gap-4">

              <div className="relative w-20 h-20">

                <Image
                  src="/logo-naon.png"
                  alt="Logo"
                  fill
                  className="object-contain"
                />

              </div>

              <div>

                <h2 className="text-2xl font-black">
                  Escuela Secundaria Nº 1  
                </h2>

                <h2 className="text-xl font-semibold">
                  Jose Manuel Estrada  
                </h2>

                <p className="text-slate-600">
                  Distrito 9 de Julio - Provincia de Buenos Aires
                </p>

              </div>

            </div>

            <div className="text-right">

              <h1 className="text-4xl font-black">
                BOLETÍN
              </h1>

              <h2 className="text-xl font-semibold">
                CALIFICACIONES
              </h2>

              <p className="text-slate-500">
                1° Cuatrimestre
              </p>

            </div>

          </div>

        </div>

        {/* Datos alumno */}

        <div className="relative z-10 mt-6">

          <h2 className="text-3xl font-black">

            {alumno.apellido}, {alumno.nombre}

          </h2>

          <div className="flex gap-10 mt-1">

            <p>
              <strong>DNI:</strong> {alumno.dni}
            </p>

            <p>
              <strong>Curso:</strong> {alumno.curso || "-"}
            </p>

            <p>
              <strong>Fecha:</strong> {hoy}
            </p>

          </div>

        </div>

        {/* CONTINÚA BLOQUE 2 */}

                {/* Encabezado tabla */}

        <div className="relative z-10 mt-8">

          <div className="flex border-b-2 border-slate-800 pb-2 font-bold uppercase text-sm">

            <div className="flex-1">
              Materia
            </div>

            <div className="w-28 text-center">
              Nota
            </div>

            <div className="w-40 text-center">
              Tipo
            </div>

          </div>

        </div>

        {/* Calificaciones */}

        <div className="relative z-10">

          {calificaciones?.length === 0 && (

            <div className="mt-6 bg-amber-50 border border-amber-200 rounded-2xl p-6">

              <h3 className="font-bold text-amber-800">
                Sin calificaciones registradas
              </h3>

              <p className="text-amber-700 mt-2">
                El alumno no posee calificaciones cargadas para este período.
              </p>

            </div>

          )}

          {calificaciones?.map((item: any) => (

            <div
              key={item.id}
              className="flex border-b border-slate-200 py-3 items-center"
            >

              <div className="flex-1 font-medium">

                {item.materias?.nombre}

              </div>

              <div className="w-28 text-center">

                <span
                  className="
                    inline-flex
                    items-center
                    justify-center
                    w-12
                    h-12
                    rounded-full
                    bg-indigo-100
                    text-indigo-700
                    font-black
                    text-lg
                  "
                >
                  {item.nota}
                </span>

              </div>

              <div className="w-40 text-center text-slate-600 text-sm">

                {item.tipo_evaluacion || "-"}

              </div>

            </div>

          ))}

        </div>

        {/* Promedio */}

        <div className="relative z-10 mt-10 flex justify-end">

          <div className="bg-slate-100 rounded-2xl px-8 py-5">

            <p className="text-slate-500 text-sm uppercase">

              Promedio General

            </p>

            <h2 className="text-5xl font-black text-indigo-700">

              {promedio}

            </h2>

          </div>

        </div>

        {/* Firma */}

        <div className="relative z-10 mt-16 flex justify-end">

          <div className="w-72 text-center">

            <div className="border-t border-slate-700 pt-2">

              <p className="font-semibold">

                Equipo Directivo

              </p>

            </div>

          </div>

        </div>

        {/* Pie */}

        <div className="relative z-10 mt-8 border-t pt-3">

          <div className="flex justify-between text-xs text-slate-500">

            <div>

              Documento generado por RITE Escolar

            </div>

            <div>

              BOLETIN-{new Date().getFullYear()}-{id}

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}