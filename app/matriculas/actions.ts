"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function crearMatricula(formData: FormData) {

  await supabase
    .from("alumno_curso")
    .insert({
      alumno_id: Number(formData.get("alumno_id")),
      curso_id: Number(formData.get("curso_id")),
      ciclo_lectivo: Number(formData.get("ciclo_lectivo")),
    });

  revalidatePath("/matriculas");
}