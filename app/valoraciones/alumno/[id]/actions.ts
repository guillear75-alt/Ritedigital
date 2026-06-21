"use server";

import { supabase } from "@/lib/supabase";
import { redirect } from "next/navigation";

export async function guardarValoracion(
  formData: FormData
) {
  const alumno_id = Number(
    formData.get("alumno_id")
  );

  const docente_id = Number(
    formData.get("docente_id")
  );

  const materia_id = Number(
    formData.get("materia_id")
  );

  const curso_id = Number(
    formData.get("curso_id")
  );

  const periodo = String(
    formData.get("periodo")
  );

  const valoracion = String(
    formData.get("valoracion")
  );

  const observaciones = String(
    formData.get("observaciones")
  );

  const { error } = await supabase
  .from("valoraciones")
  .update({
    valoracion,
    observaciones,
    fecha: new Date()
      .toISOString()
      .split("T")[0],
  })
  .eq("alumno_id", alumno_id)
  .eq("materia_id", materia_id)
  .eq("periodo", periodo)
  .eq("ciclo_lectivo", 2026);

console.log(error);

  redirect(
    `/valoraciones/curso/${curso_id}?materia=${materia_id}`
  );
}