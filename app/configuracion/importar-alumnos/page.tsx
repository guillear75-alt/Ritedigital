"use client";

import Link from "next/link";
import * as XLSX from "xlsx";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ImportarAlumnosPage() {
  const [datos, setDatos] = useState<any[]>([]);

  const manejarArchivo = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const archivo = event.target.files?.[0];

    if (!archivo) return;

    const buffer = await archivo.arrayBuffer();

    const workbook = XLSX.read(buffer);

    const hoja = workbook.Sheets[workbook.SheetNames[0]];

    const jsonOriginal = XLSX.utils.sheet_to_json(hoja);

    const json = jsonOriginal.map((fila: any) => {
    const limpia: any = {};

  Object.keys(fila).forEach((key) => {
    limpia[key.trim()] = fila[key];
  });

  return limpia;
});

    setDatos(json);
  };

  const importarAlumnos = async () => {
    try {
      const alumnos = datos.map((fila: any) => ({
        apellido: fila.apellido,
        nombre: fila.nombre,
        dni: String(fila.dni),

        fecha_nacimiento:
          typeof fila.fecha_nacimiento === "number"
            ? XLSX.SSF.format(
                "yyyy-mm-dd",
                fila.fecha_nacimiento
              )
            : fila.fecha_nacimiento,

        curso: fila.curso,

        estado: "Activo",
      }));

      const { error } = await supabase
  .from("alumnos")
  .upsert(
    alumnos,
    {
      onConflict: "dni"
    }
  );

      if (error) {
        console.error(error);
        alert("Error al importar alumnos");
        return;
      }

      alert(
        `${alumnos.length} alumnos importados correctamente`
      );

      setDatos([]);

    } catch (error) {
      console.error(error);
      alert("Error durante la importación");
    }
  };

  return (
    <div className="p-8">

      <Link
        href="/configuracion"
        className="text-blue-600 hover:underline"
      >
        ← Volver a Configuración
      </Link>

      <h1 className="text-3xl font-bold mt-4 mb-6">
        Importar Alumnos
      </h1>

      <div className="bg-white rounded-xl shadow p-6">

        <p className="mb-4 text-gray-600">
          Seleccione un archivo Excel (.xlsx)
        </p>

        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={manejarArchivo}
          className="w-full border rounded p-2"
        />

      </div>

      {datos.length > 0 && (
        <div className="mt-6 bg-white rounded-xl shadow p-6">

          <h2 className="text-xl font-bold mb-4">
            Vista previa ({datos.length} registros)
          </h2>

          <div className="overflow-auto">

            <table className="w-full">

              <thead>
                <tr className="bg-slate-100 text-center">
                  <th className="p-2 text-center">Apellido</th>
                  <th className="p-2 text center">Nombre</th>
                  <th className="p-2 text center">DNI</th>
                  <th className="p-2 text center">Fecha Nacimiento</th>
                  <th className="p-2 text center">Curso</th>
                </tr>
              </thead>

              <tbody>
                {datos.map((fila: any, index) => (
                  <tr
                    key={index}
                    className="border-t"
                  >
                    <td className="p-2 text-center">{fila.apellido}</td>
                    <td className="p-2 text-center">{fila.nombre}</td>
                    <td className="p-2 text-center">{fila.dni}</td>
                    <td className="p-2 text-center"> {typeof fila.fecha_nacimiento === "number"
                            ? XLSX.SSF.format("dd/mm/yyyy", fila.fecha_nacimiento
                            ): fila.fecha_nacimiento}</td>
                    <td className="p-2 text-center">{fila.curso}</td>
                  </tr>
                ))}
              </tbody>

            </table>

          </div>

          <button
            onClick={importarAlumnos}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
          >
            Importar a Supabase
          </button>

        </div>
      )}

    </div>
  );
}