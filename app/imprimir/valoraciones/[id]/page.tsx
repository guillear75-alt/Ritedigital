export default function ImprimirValoracionesPage() {
  return (
    <div className="bg-slate-200 py-10 print:bg-white">

      <div
        className="mx-auto bg-white w-[297mm] min-h-[210mm] p-[12mm]
          shadow-xl print:shadow-none print:p-[15mm]"
      >

        {/* ENCABEZADO */}

        <div className="text-center pb-5">

          <h1 className="text-5xl font-black tracking-wide">
            RITE ESCOLAR
          </h1>

          <h2 className="text-1xl font-semibold text-slate-700 mt-2">
            INFORME DE VALORACIONES
          </h2>

        </div>

        {/* DATOS */}

        <div className="grid grid-cols-2 gap-12 mt-5 mb-5 text-lg">

          <div className="space-y-1">

            <p>
              <span className="font-bold">
                Alumno:
              </span>{" "}
              Guillermo Ríos
            </p>

            <p>
              <span className="font-bold">
                DNI:
              </span>{" "}
              32.456.789
            </p>

          </div>

          <div className="space-y-1">

            <p>
              <span className="font-bold">
                Curso:
              </span>{" "}
              4° Economía
            </p>

            <p>
              <span className="font-bold">
                Fecha:
              </span>{" "}
              15/07/2026
            </p>

          </div>

        </div>

        {/* MATERIAS */}

        {[
          {
            materia: "Matemática",
            valoracion: "TEP",
            texto:
              "Participa activamente de las clases. Resuelve situaciones sencillas y continúa fortaleciendo la resolución de problemas.",
          },
          {
            materia: "Lengua y Literatura",
            valoracion: "TEA",
            texto:
              "Comprende distintos tipos de textos. Participa con interés y expresa sus ideas con claridad.",
          },
          {
            materia: "Historia",
            valoracion: "TED",
            texto:
              "Requiere acompañamiento para consolidar contenidos prioritarios.",
          },
          {
            materia: "Geografía",
            valoracion: "TEA",
            texto:
              "Participa activamente y demuestra interés por los contenidos.",
          },
          {
            materia: "Biología",
            valoracion: "TEP",
            texto:
              "Necesita fortalecer algunos contenidos específicos.",
          },
          {
            materia: "Lengua y Literatura",
            valoracion: "TEA",
            texto:
              "Comprende distintos tipos de textos. Participa con interés y expresa sus ideas con claridad.",
          },
          {
            materia: "Historia",
            valoracion: "TED",
            texto:
              "Requiere acompañamiento para consolidar contenidos prioritarios.",
          },
          {
            materia: "Geografía",
            valoracion: "TEA",
            texto:
              "Participa activamente y demuestra interés por los contenidos.",
          },
          {
            materia: "Biología",
            valoracion: "TEP",
            texto:
              "Necesita fortalecer algunos contenidos específicos.",
          },
        ].map((item, index) => (

          <div
            key={index}
            className="py-6"
          >

            <div className="flex items-start gap-3">

              {/* Materia */}

              <div className="w-60">

                <h3 className="text-2xl font-bold">
                  {item.materia}
                </h3>

              </div>

              {/* Valoración */}

              <div className="w-28">

                <span
                  className={`
                    px-5
                    py-2
                    rounded-full
                    font-bold
                    text-lg

                    ${
                      item.valoracion === "TEA"
                        ? "bg-green-100 text-green-700"
                        : item.valoracion === "TEP"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }
                  `}
                >
                  {item.valoracion}
                </span>

              </div>

              {/* Texto */}

              <div className="flex-1">

                <p className="text-slate-700 leading-7">
                  {item.texto}
                </p>

              </div>

            </div>

          </div>

        ))}

        {/* FIRMA */}

        <div className="mt-7 flex justify-end">

          <div className="text-center w-72">

            <div className="border-slate-500 pt-2">

              <p className="font-semibold">
                Firma Equipo Directivo
              </p>

            </div>

          </div>

        </div>

        {/* PIE */}

        <div className="mt-3 pt-4  font-bold text-xs text-slate-500 text-center">

          TEA: Trayectoria Educativa Alcanzada ·
          TEP: Trayectoria Educativa en Proceso ·
          TED: Trayectoria Educativa Discontinua

        </div>

      </div>

    </div>
  );
}