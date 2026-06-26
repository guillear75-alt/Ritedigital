import Link from "next/link";
import Image from "next/image";

import { supabase } from "@/lib/supabase";
import PrintButton from "@/components/PrintButton";

export default async function PasePage({
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
          className="bg-slate-700 hover:bg-slate-800 text-white font-bold px-5 py-3 rounded-xl"
        >
          Volver
        </Link>

        <PrintButton />

      </div>

      <div
        className="bg-white w-[210mm] min-h-[297mm] mx-auto p-[20mm] shadow-xl
          print:shadow-none relative overflow-hidden"
      >

        {/* Marca de agua */}

        <div className="absolute inset-0 flex items-center justify-center opacity-[0.04]">

          <Image
            src="/logo.png"
            alt="Logo"
            width={300}
            height={300}
            className="object-contain"
          />

        </div>

        {/* Encabezado */}

        <div className="relative z-8 text-center">

          <div className="flex justify-center mb-3">

            <Image
              src="/logo-naon.png"
              alt="Logo"
              width={100}
              height={100}
            />

          </div>

          <h1 className="text-3xl font-black">

            ESCUELA SECUNDARIA Nº 1

          </h1>

          <h2 className="text-xl font-bold mt-8">

            CONSTANCIA DE PASE

          </h2>

        </div>

        {/* Texto */}

        <div className="relative z-10 mt-16 text-lg leading-10">

          <p>
            Se deja constancia que el/la estudiante:
          </p>

          <p className="text-2xl font-black mt-6">

            {alumno.apellido}, {alumno.nombre}

          </p>

          <p className="mt-6">

            <strong>DNI:</strong> {alumno.dni}

          </p>

          <p>

            <strong>Curso:</strong> {alumno.curso || "-"}

          </p>

          <p className="mt-10">

            ha solicitado pase a otro establecimiento educativo.
          </p>

          <p className="mt-6">

            Se extiende la presente constancia a los efectos que correspondan.

          </p>

        </div>

        {/* Fecha */}

        <div className="relative z-10 mt-20">

          <p>

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

      </div>

    </div>
  );
}