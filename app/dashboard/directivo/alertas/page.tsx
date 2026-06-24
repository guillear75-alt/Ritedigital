import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default async function AlertasDirectivoPage() {

  const alertas: {
    tipo: string;
    mensaje: string;
  }[] = [];

  // INASISTENCIAS

  const { data: asistencias } = await supabase
    .from("asistencias")
    .select(`
      alumno_id,
      estado,
      alumnos(
        apellido,
        nombre
      )
    `);

  const contador: Record<number, any> = {};

  asistencias?.forEach((a: any) => {

    if (a.estado !== "Ausente") return;

    if (!contador[a.alumno_id]) {
      contador[a.alumno_id] = {
        cantidad: 0,
        alumno: a.alumnos,
      };
    }

    contador[a.alumno_id].cantidad++;

  });

  Object.values(contador).forEach((item: any) => {

    if (item.cantidad >= 10) {

      alertas.push({
        tipo: "Inasistencias",
        mensaje:
          `${item.alumno?.apellido}, ${item.alumno?.nombre}
          acumula ${item.cantidad} inasistencias.`,
      });

    }

  });

  // TED

  const { data: tedData } = await supabase
    .from("valoraciones")
    .select(`
      valoracion,
      alumnos(
        apellido,
        nombre
      )
    `)
    .eq("valoracion", "TED");

  tedData?.forEach((item: any) => {

    alertas.push({
      tipo: "Trayectoria TED",
      mensaje:
        `${item.alumnos?.apellido}, ${item.alumnos?.nombre}
        presenta trayectoria TED.`,
    });

  });

  // TEP

  const { data: tepData } = await supabase
    .from("valoraciones")
    .select(`
      valoracion,
      alumnos(
        apellido,
        nombre
      )
    `)
    .eq("valoracion", "TEP");

  tepData?.forEach((item: any) => {

    alertas.push({
      tipo: "Trayectoria TEP",
      mensaje:
        `${item.alumnos?.apellido}, ${item.alumnos?.nombre}
        requiere seguimiento pedagógico.`,
    });

  });

  return (
    <div className="min-h-screen bg-slate-200 p-8">

      <div className="max-w-6xl mx-auto">

        <div className="flex justify-between items-center mb-8">

          <div>

            <h1 className="text-4xl font-bold">
              Alertas Institucionales
            </h1>

            <p className="text-slate-600 mt-2">
              Situaciones que requieren seguimiento directivo.
            </p>

          </div>

          <Link
            href="/dashboard/directivo"
            className="
              bg-slate-700
              hover:bg-slate-800
              text-white
              px-4
              py-2
              rounded-lg
            "
          >
            Volver
          </Link>

        </div>

        <div className="bg-white rounded-2xl shadow p-5 mb-8">

          <h2 className="text-xl font-bold">
            Total de Alertas
          </h2>

          <p className="text-5xl font-bold text-red-600 mt-2">
            {alertas.length}
          </p>

        </div>

        {alertas.length === 0 ? (

          <div className="
            bg-green-50
            border
            border-green-300
            rounded-2xl
            p-6
          ">

            <h2 className="font-bold text-green-700">
              ✅ Sin alertas activas
            </h2>

            <p className="mt-2">
              No se detectan situaciones que requieran
              intervención institucional.
            </p>

          </div>

        ) : (

          <div className="space-y-4">

            {alertas.map((alerta, index) => (

              <div
                key={index}
                className="
                  bg-white
                  rounded-2xl
                  shadow
                  border-l-4
                  border-red-500
                  p-5
                "
              >

                <h3 className="font-bold text-red-700">
                  {alerta.tipo}
                </h3>

                <p className="mt-2 text-slate-700">
                  {alerta.mensaje}
                </p>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}