import Link from "next/link";
import Image from "next/image";

import { supabase } from "@/lib/supabase";
import PrintButton from "@/components/PrintButton";

export default async function CertificadoAlumnoRegularPage({
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

  const hoy = new Date().toLocaleDateString("es-AR");

  return (
    <div className="min-h-screen bg-slate-200 py-8 print:bg-white">

      <div className="max-w-[210mm] mx-auto flex justify-between mb-5 print:hidden">

        <Link
          href={`/imprimir/alumno/${id}`}
          className="bg-slate-700 hover:bg-slate-800 text-white px-5 py-3 rounded-xl"
        >
          ← Volver
        </Link>

        <PrintButton />

      </div>

      <div
        className="
          bg-white
          w-[210mm]
          min-h-[297mm]
          mx-auto
          p-[20mm]
          shadow-xl
          print:shadow-none
          relative
          overflow-hidden
        "
      >

        {/* Marca de agua */}

        <div className="absolute inset-0 flex items-center justify-center opacity-[0.04]">

          <Image
            src="/logo.png"
            alt="Logo"
            width={500}
            height={500}
            className="object-contain"
          />

        </div>

        {/* Encabezado */}

        <div className="relative z-10 text-center">

          <div className="flex justify-center mb-4">

            <Image
              src="/logo-naon.png"
              alt="Logo"
              width={120}
              height={120}
            />

          </div>

          <h1 className="text-3xl font-black">
            ESCUELA SECUNDARIA Nº 1
          </h1>

          <p className="text-slate-600 mt-2">
            Distrito 9 de Julio - Provincia de Buenos Aires
          </p>

          <h2 className="text-2xl font-bold mt-10">
            CERTIFICADO DE ALUMNO REGULAR
          </h2>

        </div>

        {/* Cuerpo */}

        <div className="relative z-10 mt-20 text-xl leading-[2.8rem] text-justify">

          <p>
            Se certifica que el/la estudiante
            <span className="font-black">
              {" "} {alumno.apellido}, {alumno.nombre}
            </span>,
            DNI
            <span className="font-black">
              {" "} {alumno.dni}
            </span>,
            es alumno/a regular de esta institución educativa,
            cursando actualmente
            <span className="font-black">
              {" "} {alumno.curso || "-"}
            </span>,
            durante el ciclo lectivo 2026.
          </p>

          <p className="mt-10">
            Se extiende la presente constancia a solicitud del interesado/a,
            para ser presentada ante quien corresponda.
          </p>

        </div>

        {/* Fecha */}

        <div className="relative z-10 mt-20">

          <p className="text-lg">
            Nueve de Julio, {hoy}
          </p>

        </div>

        {/* Firma */}

        <div className="relative z-10 mt-24 flex justify-end">

          <div className="w-72 text-center">

            <div className="border-t border-slate-700 pt-2">

              <p className="font-semibold">
                Equipo Directivo
              </p>

            </div>

          </div>

        </div>

        {/* Pie */}

        <div className="absolute bottom-6 left-0 right-0 text-center text-xs text-slate-400">

          Documento emitido por RITE Escolar

        </div>

      </div>

    </div>
  );
}