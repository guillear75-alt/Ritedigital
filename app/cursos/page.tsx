import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default async function CursosPage() {
  const { data: cursos } = await supabase
    .from("cursos")
    .select("*")
    .order("id");

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">
        Cursos
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {cursos?.map((curso) => (
          <Link
            key={curso.id}
            href={`/cursos/${curso.id}`}
            className="
              bg-white
              rounded-2xl
              shadow-sm
              border
              border-slate-200
              p-6
              hover:shadow-md
              hover:border-blue-300
              transition
            "
          >
            <h2 className="text-2xl font-bold text-slate-800">
              {curso.nombre}
            </h2>

            <p className="text-slate-500 mt-2">
              Ver nómina y gestión del curso
            </p>

            <div className="mt-6 text-blue-600 font-medium">
              Ingresar →
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}