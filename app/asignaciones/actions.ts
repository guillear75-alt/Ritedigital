"use server";

import { supabase } from "@/lib/supabase";
import { redirect } from "next/navigation";
import * as XLSX from "xlsx";

export async function importarAsignaciones(
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

console.log(
  "HOJAS:",
  workbook.SheetNames
);

const filas: any[] = [];

const hojasValidas = [
  "CICLO BASICO 2025",
  "CICLO SUPERIOR 2025",
];

for (const nombreHoja of hojasValidas) {
  const hoja = workbook.Sheets[nombreHoja];

  if (!hoja) continue;

  const datos: any[] =
    XLSX.utils.sheet_to_json(hoja);

  filas.push(...datos);
}

console.log("TOTAL FILAS:", filas.length);

  const columnasCursos: Record<
  string,
  number
> = {
  "1ER AÑO": 1,
  "2 DO AÑO ": 2,
  "2DO AÑO": 2,
  "3ER AÑO": 3,
  "4TO AÑO": 4,
  "5TO AÑO": 5,
  "6TO AÑO": 6,
};


  const materiaMap: Record<
    string,
    string
  > = {
    "MATEMÁTICA": "Matemática",
    "INGLÉS": "Inglés",
    "HISTORIA": "Historia",
    "GEOGRAFÍA": "Geografía",
    "BIOLOGÍA": "Biología",
    "CIENCIAS NATURALES":
      "Ciencias Naturales",
    "CIENCIAS SOCIALES":
      "Ciencias Sociales",
    "PRACT. DEL LENGUAJE":
      "Prácticas del Lenguaje",
    "EDUCACIÓN FÍSICA":
      "Educación Física",
    "ED. ARTÍSTICA":
      "Educación Artística",
    "ED. ARTÍSTICA (Plástica)":
      "Educación Artística",
    "CIUDADANÍA":
      "Construcción de Ciudadanía",
    "FISICO QUÍMICA":
      "Fisicoquímica",
    "FISICO":
      "Fisicoquímica",
    "NTICx": "NTICx",
      "SIC": "Sistemas de Información Contable",
      "TEORÍA DE LAS ORG.": "Teoría de las Organizaciones",
      "G. ORGANIZACIONAL": "Gestión Organizacional",
      "PROYECTO ORGANIZ.": "Proyectos Organizacionales",
      "ECONOMÍA POLÍTICA": "Economía Política",
      "TRAB. Y CIUD.": "Trabajo y Ciudadanía",
      "FILOSOFÍA": "Filosofía",
      "DERECHO": "Derecho",
      "INTROD. A LA FÍSICA": "Introducción a la Física",
      "INTROD. A LA QUÍMICA": "Introducción a la Química",
      "SALUD Y ADOLESC.": "Salud y Adolescencia",
      "LITERATURA": "Literatura",
      "POLÍTICA Y CIUDADANÍA": "Política y Ciudadanía",
      "ARTE": "Educación Artística",
      "MATEMATICA": "Matemática",
      "EDUCACION FISICA": "Educación Física",
      "ITI": "ITI",
      "GEOGRAFIA": "Geografía",
      
  };

  

  let cargadas = 0;
 

  for (const fila of filas) {
    for (const [
      columna,
      cursoId,
    ] of Object.entries(
      columnasCursos
    )) {
      const valor = fila[columna];

      if (!valor) continue;

      if (
        !String(valor).includes("-")
      )
        continue;

      const partes =
        String(valor).split("-");

      const materiaHorario =
        partes[0].trim();

        

      const docenteHorario =
        partes
          .slice(1)
          .join("-")
          .trim();

      const nombreMateria =
        materiaMap[
          materiaHorario
        ];

          console.log(
  "CURSO:",
  cursoId,
  "MATERIA:",
  nombreMateria,
  "DOCENTE:",
  docenteHorario
);

      if (!nombreMateria) {
        console.log(
          "MATERIA NO MAPEADA:",
          materiaHorario
        );
        continue;
      }

      const partesDocente =
  docenteHorario.trim();

const {
  data: docentes,
} = await supabase
  .from("docentes")
  .select("id,apellido,nombre");

const docente =
  docentes?.find(d =>
    `${d.apellido} ${d.nombre}`
      .toLowerCase()
      .includes(
        partesDocente.toLowerCase()
      )
  );

      if (!docente) {
        console.log(
          "DOCENTE NO ENCONTRADO:",
          docenteHorario
        );
        continue;
      }

      const {
        data: materia,
      } = await supabase
        .from("materias")
        .select("id")
        .eq(
          "nombre",
          nombreMateria
        )
        .eq("anio", cursoId)
        .maybeSingle();

      if (!materia) {
        console.log(
          "MATERIA NO ENCONTRADA:",
          nombreMateria,
          cursoId
        );
        continue;
      }

      const {
        data: existe,
      } = await supabase
        .from(
          "docente_curso_materia"
        )
        .select("id")
        .eq(
          "docente_id",
          docente.id
        )
        .eq(
          "curso_id",
          cursoId
        )
        .eq(
          "materia_id",
          materia.id
        )
        .maybeSingle();

      if (existe) continue;

      const { error } =
        await supabase
          .from(
            "docente_curso_materia"
          )
          .insert({
            docente_id:
              docente.id,
            curso_id: cursoId,
            materia_id:
              materia.id,
            ciclo_lectivo: 2026,
          });

      if (error) {
        console.log(error);
        continue;
      }

      cargadas++;
    }
  }

  console.log(
    "ASIGNACIONES CARGADAS:",
    cargadas
  );

  redirect("/asignaciones");
}

export async function crearAsignacion(
  formData: FormData
) {
  const { error } = await supabase
    .from("docente_curso_materia")
    .insert({
      docente_id: Number(formData.get("docente_id")),
      curso_id: Number(formData.get("curso_id")),
      materia_id: Number(formData.get("materia_id")),
      ciclo_lectivo: Number(formData.get("ciclo_lectivo")),
    });

  if (error) {
    throw new Error(error.message);
  }

  redirect("/asignaciones");
}
