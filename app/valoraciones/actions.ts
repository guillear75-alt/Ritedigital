"use server";

import { supabase } from "@/lib/supabase";
import { redirect } from "next/navigation";

export async function crearValoracion(formData: FormData) {

  console.log("PERIODO:", formData.get("periodo"));

    const { error } = await supabase
    .from("valoraciones")
    .insert({
      alumno_id: Number(formData.get("alumno_id")),
      docente_id: Number(formData.get("docente_id")),
      materia_id: Number(formData.get("materia_id")),
      ciclo_lectivo: Number(formData.get("ciclo_lectivo")),
      periodo: formData.get("periodo"),
      valoracion: formData.get("valoracion"),
      observaciones: formData.get("observaciones"),
    });

  if (error) {
    throw new Error(error.message);
  }

  redirect("/valoraciones");
}