"use server";

import { supabase } from "@/lib/supabase";
import { redirect } from "next/navigation";

export async function guardarCalificacion(
  formData: FormData
) {
  const alumno_id = Number(
    formData.get("alumno_id")
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

  const tipo_evaluacion = String(
    formData.get("tipo_evaluacion")
  );

  const nota = Number(
    formData.get("nota")
  );

  const observacion = String(
    formData.get("observacion")
  );

  const fecha = String(
    formData.get("fecha")
  );

  // Buscar si ya existe
  const { data: existente } = await supabase
    .from("calificaciones")
    .select("id")
    .eq("alumno_id", alumno_id)
    .eq("materia_id", materia_id)
    .eq("periodo", periodo)
    .maybeSingle();

  let error;

  if (existente) {
    // UPDATE
    const resultado = await supabase
      .from("calificaciones")
      .update({
        tipo_evaluacion,
        nota,
        observacion,
        fecha,
      })
      .eq("id", existente.id);

    error = resultado.error;
  } else {
    // INSERT
    const resultado = await supabase
      .from("calificaciones")
      .insert({
        alumno_id,
        materia_id,
        periodo,
        tipo_evaluacion,
        nota,
        observacion,
        fecha,
      });

    error = resultado.error;
  }

  console.log(error);

  redirect(
    `/calificaciones/cursos/${curso_id}?materia=${materia_id}`
  );
}