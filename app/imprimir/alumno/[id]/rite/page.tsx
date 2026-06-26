import { supabase } from "@/lib/supabase";

export default async function Page({
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

  const { data: valoraciones } = await supabase
  .from("valoraciones")
  .select(`
    *,
    materias (
      nombre
    )
  `)
  .eq("alumno_id", id);

  return (
  <div className="min-h-screen bg-slate-100 p-8">

    <div className="max-w-6xl mx-auto bg-white shadow-xl p-8">

      <h1 className="text-4xl font-black text-center">
        REGISTRO INSTITUCIONAL DE TRAYECTORIAS EDUCATIVAS
      </h1>

      <h2 className="text-center text-slate-500 mt-2">
        RITE Escolar
      </h2>

      <div className="mt-8">

        <p>
          <strong>Alumno:</strong>{" "}
          {alumno?.apellido}, {alumno?.nombre}
        </p>

      </div>

      <div className="mt-8">

        <div className="grid grid-cols-12 border-b-2 pb-2 font-bold">

          <div className="col-span-6">
            Materia
          </div>

          <div className="col-span-2 text-center">
            Valoración
          </div>

          <div className="col-span-4">
            Observaciones
          </div>

        </div>

        {valoraciones?.map((item: any) => (

          <div
            key={item.id}
            className="grid grid-cols-12 py-3 border-b"
          >

            <div className="col-span-6">

              {item.materias?.nombre}

            </div>

            <div className="col-span-2 text-center font-bold">

              {item.valoracion}

            </div>

            <div className="col-span-4 text-slate-600">

              {item.observaciones || "-"}

            </div>

          </div>

        ))}

      </div>

    </div>

  </div>

  );
}