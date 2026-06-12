"use server";

import { supabase } from "@/lib/supabase";
import { redirect } from "next/navigation";

import * as XLSX from "xlsx";

export async function importarDocentes(
  formData: FormData
) {
  const archivo = formData.get("archivo") as File;

  if (!archivo) {
    throw new Error(
      "No se seleccionó ningún archivo"
    );
  }

  const bytes =
    await archivo.arrayBuffer();

    const workbook = XLSX.read(bytes, {
    type: "array",
  });

  console.log("HOJAS:", workbook.SheetNames);

  const filas: any[] = [];

for (const nombreHoja of workbook.SheetNames) {
  const hoja = workbook.Sheets[nombreHoja];

  const datos =
    XLSX.utils.sheet_to_json(hoja);

  filas.push(...datos);
}

  console.log("CANTIDAD:", filas.length);

  if (filas.length > 0) {
    console.log("PRIMERA:", filas[0]);
  }
  console.log(
  JSON.stringify(
    filas.slice(0, 10),
    null,
    2
  )
);

  if (filas.length > 1) {
    console.log("SEGUNDA:", filas[1]);
  }

  const docentesUnicos = new Map();

for (const fila of filas) {
  const columnasCursos = [
    "1ER AÑO",
    "2DO AÑO",
    "3ER AÑO",
    "4TO AÑO",
    "5TO AÑO",
    "6TO AÑO",
  ];

  for (const columna of columnasCursos) {
    const valor = fila[columna];

    if (!valor) continue;

    if (!String(valor).includes("-")) continue;

    const partes = String(valor).split("-");

    if (partes.length < 2) continue;

    const materia = partes[0].trim();

    const docenteCompleto =
      partes.slice(1).join("-").trim();

    if (!docenteCompleto) continue;

    console.log("DOCENTE:", docenteCompleto);

    if (!docentesUnicos.has(docenteCompleto)) {
      docentesUnicos.set(docenteCompleto, {
        materia,
      });
    }
  }
}

console.log(
  "DOCENTES ENCONTRADOS:",
  docentesUnicos.size
);

let cargados = 0;

for (const [nombreCompleto, datos] of docentesUnicos) {

  let apellido = "";
let nombre = "";

const partesNombre =
  nombreCompleto
    .trim()
    .split(/\s+/);

if (partesNombre.length === 1) {
  apellido = partesNombre[0];
  nombre = "";
} else {
  apellido =
    partesNombre
      .slice(0, -1)
      .join(" ");

  nombre =
    partesNombre
      .slice(-1)
      .join(" ");
}

  console.log(
  "DOCENTE:",
  nombreCompleto
);  


  const { error } = await supabase
    .from("docentes")
    .insert({
      apellido,
      nombre,
      materia: datos.materia,
    });

  if (error) {
    console.log(error.message);
    continue;
  }

  cargados++;
}

console.log(
  `DOCENTES IMPORTADOS: ${cargados}`
);

  redirect("/docentes");
}

export async function crearDocente(formData: FormData) {
  const { error } = await supabase
    .from("docentes")
    .insert({
      apellido: formData.get("apellido"),
      nombre: formData.get("nombre"),
      materia: formData.get("materia"),
      email: formData.get("email"),
      telefono: formData.get("telefono"),
    });

  if (error) {
    throw new Error(error.message);
  }

  redirect("/docentes");
}