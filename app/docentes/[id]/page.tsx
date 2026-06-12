import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default async function DocenteDetalle({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

const docenteId = Number(id);

const { data: docente, error } = await supabase
  .from("docentes")
  .select("*")
  .eq("id", docenteId)
  .single();

console.log("ID:", docenteId);
console.log("DOCENTE:", docente);
console.log("ERROR:", error);
  if (!docente) {
    return (
      <div className="p-8">
        Docente no encontrado
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto">

        <Link
          href="/docentes"
          className="text-slate-500 hover:text-slate-800"
        >
          ← Volver a Docentes
        </Link>

        <div className="mt-6 bg-white rounded-2xl p-6 shadow-sm border border-slate-200">

          <h1 className="text-3xl font-bold">
            {docente.apellido}, {docente.nombre}
          </h1>

          <div className="mt-6 space-y-2">

            <p>
              <b>Materia:</b> {docente.materia}
            </p>

            <p>
              <b>Email:</b> {docente.email || "-"}
            </p>

            <p>
              <b>Teléfono:</b> {docente.telefono || "-"}
            </p>

          </div>

        </div>

      </div>
    </div>
  );
}