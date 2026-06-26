import React from "react";

interface PrintLayoutProps {
  titulo: string;
  children: React.ReactNode;
}

export default function PrintLayout({
  titulo,
  children,
}: PrintLayoutProps) {
  return (
    <div className="bg-slate-100 min-h-screen py-10">

      <div
        className="
          bg-white
          mx-auto
          shadow-xl
          w-[210mm]
          min-h-[297mm]
          p-12
          print:shadow-none
          print:p-8
        "
      >

        {/* Encabezado */}

        <div className="border-b-2 pb-6">

          <div className="flex justify-between items-center">

            <div>

              <h1 className="text-3xl font-black">
                RITE Escolar
              </h1>

              <p className="text-slate-500">
                Sistema Integral de Gestión Escolar
              </p>

            </div>

            <div className="text-right">

              <p className="font-semibold">
                Ciclo Lectivo 2026
              </p>

              <p className="text-slate-500">
                Provincia de Buenos Aires
              </p>

            </div>

          </div>

        </div>

        {/* Título */}

        <div className="my-8 text-center">

          <h2 className="text-2xl font-bold uppercase">
            {titulo}
          </h2>

        </div>

        {/* Contenido */}

        <div>

          {children}

        </div>

        {/* Pie */}

        <div className="border-t mt-12 pt-6 flex justify-between text-sm text-slate-500">

          <span>
            RITE Escolar
          </span>

          <span>
            ___________________________
            <br />
            Firma y sello
          </span>

        </div>

      </div>

    </div>
  );
}