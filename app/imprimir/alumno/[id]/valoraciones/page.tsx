import Link from "next/link";
import Image from "next/image";

import { supabase } from "@/lib/supabase";
import PrintButton from "@/components/PrintButton";

export default async function ImprimirValoracionesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  //========================
  // Alumno
  //========================

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

  //========================
  // Valoraciones
  //========================

  const { data: valoraciones } = await supabase
    .from("valoraciones")
    .select(`
      *,
      materias (
        nombre
      )
    `)
    .eq("alumno_id", id)
    .eq("periodo", "1° Cuatrimestre")
    .order("materia_id");

    console.log(valoraciones);

  const hoy = new Date().toLocaleDateString("es-AR");

  console.log("ALUMNO:", id);
console.log("VALORACIONES:", valoraciones?.length);
console.log(valoraciones);

const periodo =
  valoraciones?.[0]?.periodo || "Sin período";

  return (
    <div className="min-h-screen bg-slate-200 py-8 print:bg-white">

      {/* Barra superior */}

      <div className="max-w-[297mm] mx-auto flex justify-between items-center mb-5 print:hidden">

        <Link
          href={`/imprimir/alumno/${id}`}
          className="bg-slate-700 hover:bg-slate-800 text-white font-bold px-5 py-3 rounded-xl transition"
        >
          Volver
        </Link>

        <PrintButton />

      </div>

      {/* Documento */}

      <div
        className="
          relative
          mx-auto
          w-[297mm]
          min-h-[210mm]
          bg-white
          shadow-xl
          p-[12mm]
          print:shadow-none
          print:p-[10mm]
          overflow-hidden
        "
      >

        {/* Marca de agua */}

        <div
          className="
            absolute
            inset-0
            flex
            items-center
            justify-center
            opacity-[0.03]
            pointer-events-none
            select-none
          "
        >

          <Image
            src="/logo-naon.png"
            alt="Logo"
            width={520}
            height={520}
            className="object-contain"
          />

        </div>

        {/* Encabezado */}

        <div className="relative z-10 border-b-2 border-slate-800 pb-4">

          <div className="flex justify-between items-start">

            
            {/* Logo */}

            <div className="flex gap-5">

              <div className="relative w-28 h-28">

                <Image
                  src="/logo-naon.png"
                  alt="Logo Institucional"
                  fill
                  className="object-contain"
                  priority
                />

              </div>

              <div>

                <h2 className="text-2xl font-black">

                  Escuela Secundaria Nº 1

                </h2>

                <p className="text-slate-600">
                    Jose Manuel Estrada - Carlos Maria Naon
                 

                </p>

                <p className="text-slate-600">

                  Distrito 9 de Julio - Provincia de Buenos Aires

                </p>

                

              </div>

            </div>

            {/* Título */}

            <div className="text-right">

              <h1 className="text-4xl font-black tracking-wide">

                RITE ESCOLAR

              </h1>

              <h2 className="text-xl font-bold mt-2">

                INFORME DE VALORACIONES

              </h2>

              <p className="text-slate-500 mt-1">
                {periodo}
                </p>

            </div>

          </div>

        </div>

        {/* Datos del alumno */}

        <div className="relative z-10 mt-5">

          <h2 className="text-3xl font-black uppercase">

            {alumno.apellido}, {alumno.nombre}

          </h2>

          <div className="flex flex-wrap gap-x-10 gap-y-2 mt-4 text-base">

            <p>

              <strong>DNI:</strong> {alumno.dni}

            </p>

            <p>

              <strong>Curso:</strong> {alumno.curso || "-"}

            </p>

            <p>

              <strong>Ciclo Lectivo:</strong> 2026

            </p>

            <p>

              <strong>Fecha:</strong> {hoy}

            </p>

          </div>

        </div>

        {/* ===== BLOQUE 2 CONTINÚA DESDE AQUÍ ===== */}

                {/* Encabezado */}

        <div className="relative z-10 mt-6">

          <div className="flex border-b-2 border-slate-700 pb-2 font-bold text-sm uppercase tracking-wide">

            <div className="w-[28%]">
              Materia
            </div>

            <div className="w-[7%] text-center">
              Tray.
            </div>

            <div className="flex-1">
              Valoración Pedagógica
            </div>

          </div>

        </div>

        {/* Materias */}

        <div className="relative z-10">

          {valoraciones?.map((item: any) => (

            <div
              key={item.id}
              className="border-b border-slate-300 py-3"
            >

              <div className="flex items-start">

                {/* Materia */}

                <div className="w-[28%] pr-3">

                  <h3 className="font-bold text-[15px] leading-5">

                    {item.materias?.nombre}

                  </h3>

                </div>

                {/* Trayectoria */}

                <div className="w-[7%] flex justify-center">

                  <span className="font-black text-sm">
  {item.valoracion}
</span>

                </div>

                {/* Observación */}

                <div className="flex-1 pl-4">

                  <p className="text-[14px] leading-6 text-slate-800">

                    {item.observaciones?.trim() ||
                      "Sin valoración pedagógica registrada."}

                  </p>

                </div>

              </div>

            </div>

          ))}

        </div>

        {/* Espacio libre si hay pocas materias */}

        {valoraciones && valoraciones.length < 11 && (

          <div
            style={{
              height: `${(11 - valoraciones.length) * 42}px`,
            }}
          />

        )}

        {/* Firma */}

        <div className="relative z-10 mt-8 flex justify-end">

          <div className="w-72 text-center">

            <div className="border-t border-slate-700 pt-2">

              <p className="font-semibold">

                Equipo Directivo

              </p>

            </div>

          </div>

        </div>

                {/* Pie del documento */}

        <div className="relative z-10 mt-6 border-t border-slate-300 pt-3">

          <div className="flex justify-between items-end">

            <div>

              <p className="text-[11px] text-slate-500">

                TEA: Trayectoria Educativa Alcanzada ·
                TEP: Trayectoria Educativa en Proceso ·
                TED: Trayectoria Educativa Discontinua

              </p>

              <p className="text-[10px] text-slate-400 mt-2">

                Documento generado por RITE Escolar

              </p>

            </div>

            <div className="text-right">

              <p className="text-[10px] text-slate-400">

                Emitido: {hoy}

              </p>

              <p className="text-[10px] text-slate-400">

                Documento: VAL-{new Date().getFullYear()}-{id}

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}