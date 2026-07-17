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
  .upsert(
    {
      alumno_id,
      docente_id,
      materia_id,
      periodo,
      ciclo_lectivo: 2026,
      valoracion,
      observaciones,
      fecha: new Date()
        .toISOString()
        .split("T")[0],
    },
    {
      onConflict:
        "alumno_id,materia_id,periodo,ciclo_lectivo",
    }
  );

console.log(error);

  redirect(
    `/valoraciones/curso/${curso_id}?materia=${materia_id}`
  );
}