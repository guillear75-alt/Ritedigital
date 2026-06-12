"use server";

import { supabase } from "@/lib/supabase";
import { redirect } from "next/navigation";
import * as XLSX from "xlsx";

/* =====================================
   CREAR ALUMNO
===================================== */

export async function crearAlumno(
  formData: FormData
) {
  const cursoId = Number(
    formData.get("curso_id")
  );

  const { data: curso } = await supabase
    .from("cursos")
    .select("nombre")
    .eq("id", cursoId)
    .single();

  const { data: alumno, error } =
    await supabase
      .from("alumnos")
      .insert({
        apellido: formData.get("apellido"),
        nombre: formData.get("nombre"),
        dni: formData.get("dni"),
        curso: curso?.nombre,
        fecha_nacimiento:
          formData.get("fecha_nacimiento"),
        telefono: formData.get("telefono"),
        email: formData.get("email"),
        direccion: formData.get("direccion"),
        observaciones:
          formData.get("observaciones"),
        tutor_nombre:
          formData.get("tutor_nombre"),
        tutor_dni:
          formData.get("tutor_dni"),
        tutor_parentesco:
          formData.get("tutor_parentesco"),
        tutor_telefono:
          formData.get("tutor_telefono"),
        tutor_telefono_alt:
          formData.get("tutor_telefono_alt"),
        tutor_email:
          formData.get("tutor_email"),
        tutor_direccion:
          formData.get("tutor_direccion"),
        tutor_ocupacion:
          formData.get("tutor_ocupacion"),
        estado: "Activo",
      })
      .select()
      .single();

  if (error || !alumno) {
    throw new Error(
      error?.message ||
        "Error al crear alumno"
    );
  }

  await supabase
    .from("alumno_curso")
    .insert({
      alumno_id: alumno.id,
      curso_id: cursoId,
      ciclo_lectivo:
        new Date().getFullYear(),
    });

  redirect("/alumnos");
}

/* =====================================
   CREAR INTERVENCIÓN
===================================== */

export async function crearIntervencion(
  formData: FormData
) {
  const alumnoId = Number(
    formData.get("alumno_id")
  );

  const { error } = await supabase
    .from("intervenciones_rite")
    .insert({
      alumno_id: alumnoId,
      fecha: formData.get("fecha"),
      motivo: formData.get("motivo"),
      descripcion:
        formData.get("descripcion"),
      acciones_realizadas:
        formData.get(
          "acciones_realizadas"
        ),
      responsable:
        formData.get("responsable"),
      estado: formData.get("estado"),
    });

  if (error) {
    throw new Error(error.message);
  }

  redirect(`/alumnos/${alumnoId}`);
}

/* =====================================
   IMPORTAR ALUMNOS DESDE EXCEL
===================================== */

export async function importarAlumnos(
  formData: FormData
) {
  const archivo = formData.get(
    "archivo"
  ) as File;

  if (!archivo) {
    throw new Error(
      "No se seleccionó archivo"
    );
  }

  const bytes =
    await archivo.arrayBuffer();

  const workbook = XLSX.read(bytes, {
    type: "array",
  });

  const mapaCursos: Record<
    string,
    number
  > = {
    "1° AÑO": 1,
    "2° AÑO": 2,
    "3° AÑO": 3,
    "4° AÑO": 4,
    "5° AÑO": 5,
    "6° AÑO": 6,
  };

  for (const hoja of workbook.SheetNames) {
    const cursoId =
      mapaCursos[hoja];

    if (!cursoId) continue;

    const sheet =
      workbook.Sheets[hoja];

    const filas: any[] =
      XLSX.utils.sheet_to_json(
        sheet,
        {
          range: 3,
        }
      );

    for (const fila of filas) {
      const apellido = String(
        fila["  APELLIDO"] ||
          fila[" APELLIDO"] ||
          fila["APELLIDO"] ||
          ""
      ).trim();

      const nombre = String(
        fila["NOMBRE"] || ""
      ).trim();

      const dni = String(
        fila["DNI"] || ""
      )
        .replace(/\./g, "")
        .trim();

      if (!apellido || !nombre)
        continue;

      const {
        data: alumno,
        error,
      } = await supabase
        .from("alumnos")
        .insert({
          apellido,
          nombre,
          dni,
          curso: hoja.replace(
            " AÑO",
            ""
          ),
          estado: "Activo",
        })
        .select()
        .single();

      if (error || !alumno)
        continue;

      await supabase
        .from("alumno_curso")
        .insert({
          alumno_id: alumno.id,
          curso_id: cursoId,
          ciclo_lectivo: 2026,
        });
    }
  }

  redirect("/alumnos");
}