import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default async function DocentesPage() {
  const { data: docentes } = await supabase
    .from("docentes")
    .select("*")
    .order("apellido");

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          Docentes
        </h1>

        <div className="space-y-3">
          {docentes?.map((docente) => (
            <div
              key={docente.id}
              className="
                bg-white
                border
                border-slate-200
                rounded-xl
                px-4
                py-3
                flex
                justify-between
                items-center
              "
            >
              <div>
                <h2 className="font-semibold">
                  {docente.apellido},
                  {" "}
                  {docente.nombre}
                </h2>

                <p className="text-sm text-slate-500">
                  {docente.materia}
                </p>
              </div>

              <Link
                href={`/docentes/${docente.id}`}
                className="
                  bg-slate-600
                  text-white
                  px-2
                  py-1
                  rounded-lg
                "
              >
                Ver ficha
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}