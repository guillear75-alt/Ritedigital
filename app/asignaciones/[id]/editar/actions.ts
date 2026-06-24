"use server";

import { supabase } from "@/lib/supabase";
import { redirect } from "next/navigation";

export async function reemplazarDocente(
  formData: FormData
) {
  const asignacionId = Number(
    formData.get("asignacion_id")
  );

  const nuevoDocenteId = Number(
    formData.get("nuevo_docente")
  );

  const { error } = await supabase
    .from("docente_curso_materia")
    .update({
      docente_id: nuevoDocenteId,
    })
    .eq("id", asignacionId);

  if (error) {
    console.error(error);
    throw new Error(
      "Error al reemplazar docente"
    );
  }

  redirect("/asignaciones");
}