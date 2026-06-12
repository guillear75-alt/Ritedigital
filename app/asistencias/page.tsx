"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Alumno = {
  id: number;
  apellido: string;
  nombre: string;
  curso: string;
};

export default function AsistenciasPage() {
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);
  const [fecha, setFecha] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [asistencias, setAsistencias] = useState<
    Record<number, string>
  >({});

  useEffect(() => {
    cargarAlumnos();
  }, []);

    useEffect(() => {
    cargarAsistencias(fecha);
  }, [fecha]);

  async function cargarAsistencias(fechaSeleccionada: string) {
  const { data, error } = await supabase
    .from("asistencias")
    .select("*")
    .eq("fecha", fechaSeleccionada);

  if (!error && data) {
    const mapa: Record<number, string> = {};

    data.forEach((a) => {
      mapa[a.alumno_id] = a.estado;
    });

    setAsistencias(mapa);
  }
}

  async function cargarAlumnos() {
    const { data, error } = await supabase
      .from("alumnos")
      .select("*")
      .order("apellido");

    if (!error && data) {
      setAlumnos(data);
    }
  }

  function cambiarEstado(
    alumnoId: number,
    estado: string
  ) {
    setAsistencias((prev) => ({
      ...prev,
      [alumnoId]: estado,
    }));
  }

  async function guardarAsistencias() {
    const registros = Object.entries(asistencias).map(
      ([alumno_id, estado]) => ({
        alumno_id: Number(alumno_id),
        fecha,
        estado,
      })
    );

    const { error } = await supabase
      .from("asistencias")
      .upsert(registros, {
        onConflict: "alumno_id,fecha",
      });

    if (error) {
      alert("Error al guardar");
      console.error(error);
      return;
    }

    alert("Asistencias guardadas correctamente");
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Registro de Asistencias
      </h1>

      <div className="mb-6">
        <label className="block mb-2">
          Fecha
        </label>

        <input
          type="date"
          value={fecha}
          onChange={(e) =>
            setFecha(e.target.value)
          }
          className="border rounded p-2"
        />
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="text-left p-3">
                Alumno
              </th>
              <th className="text-left p-3">
                Curso
              </th>
              <th className="text-left p-3">
                Estado
              </th>
            </tr>
          </thead>

          <tbody>
            {alumnos.map((alumno) => (
              <tr
                key={alumno.id}
                className="border-t"
              >
                <td className="p-3">
                  {alumno.apellido},{" "}
                  {alumno.nombre}
                </td>

                <td className="p-3">
                  {alumno.curso}
                </td>

                <td className="p-3">
                  <select
                    value={
                      asistencias[
                        alumno.id
                      ] || "Presente"
                    }
                    onChange={(e) =>
                      cambiarEstado(
                        alumno.id,
                        e.target.value
                      )
                    }
                    className="border rounded p-2"
                  >
                    <option value="Presente">
                      Presente
                    </option>

                    <option value="Ausente">
                      Ausente
                    </option>

                    <option value="Tarde">
                      Tarde
                    </option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={guardarAsistencias}
        className="mt-6 bg-blue-600 text-white px-5 py-2 rounded"
      >
        Guardar Asistencias
      </button>
    </div>
  );
}