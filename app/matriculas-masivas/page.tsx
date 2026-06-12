"use client";

import { supabase } from "@/lib/supabase";

export default function MatriculasMasivasPage() {

  const generarMatriculas = async () => {

    const { data: alumnos } = await supabase
      .from("alumnos")
      .select("*");

    if (!alumnos) {
      alert("No se encontraron alumnos");
      return;
    }

    let creadas = 0;

    for (const alumno of alumnos) {

      if (!alumno.curso) continue;

      const { data: curso } = await supabase
        .from("cursos")
        .select("id")
        .eq("nombre", alumno.curso)
        .single();

      if (!curso) continue;

      const { data: existe } = await supabase
        .from("alumno_curso")
        .select("id")
        .eq("alumno_id", alumno.id)
        .eq("curso_id", curso.id)
        .maybeSingle();

      if (existe) continue;

      const { error } = await supabase
        .from("alumno_curso")
        .insert({
          alumno_id: alumno.id,
          curso_id: curso.id,
          ciclo_lectivo: 2026,
        });

      if (!error) {
        creadas++;
      }
    }

    alert(
      `Matrículas generadas correctamente: ${creadas}`
    );
  };

  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold mb-6">
        Matrículas Masivas
      </h1>

      <button
        onClick={generarMatriculas}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Generar Matrículas
      </button>

    </div>
  );
}