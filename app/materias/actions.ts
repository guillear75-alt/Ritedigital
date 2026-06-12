"use server";

import { supabase } from "@/lib/supabase";
import { redirect } from "next/navigation";

export async function crearMateria(formData: FormData) {
  await supabase.from("materias").insert({
    nombre: formData.get("nombre"),
    anio: Number(formData.get("anio")),
    area: formData.get("area"),
  });

  redirect("/materias");
}