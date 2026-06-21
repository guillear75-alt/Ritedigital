"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ValoracionesCursoPage() {
  const [curso, setCurso] = useState("");
  const [materia, setMateria] = useState("");
  const [periodo, setPeriodo] = useState("1° Cuatrimestre");

  const [cursos, setCursos] = useState<any[]>([]);
  const [materias, setMaterias] = useState<any[]>([]);
  const [alumnos, setAlumnos] = useState<any[]>([]);
  const [valoraciones, setValoraciones] = useState<Record<number, string>>({});
  const [observaciones, setObservaciones] = useState<Record<number, string>>({});

  useEffect(() => {
    cargarDatos();
  }, []);

  useEffect(() => {
    if (curso) {
      cargarAlumnos();
    }
  }, [curso]);

  async function cargarDatos() {
    const { data: cursosData } = await supabase
      .from("cursos")
      .select("*")
      .order("id");

    const { data: materiasData } = await supabase
      .from("materias")
      .select("*")
      .order("nombre");

    setCursos(cursosData || []);
    setMaterias(materiasData || []);
  }

  async function cargarAlumnos() {

  let cursoBusqueda = curso;

  if (curso === "4° Economía")
    cursoBusqueda = "4°";

  if (curso === "5° Economía")
    cursoBusqueda = "5°";

  if (curso === "6° Economía")
    cursoBusqueda = "6°";

  const { data } = await supabase
    .from("alumnos")
    .select("*")
    .eq("curso", cursoBusqueda)
    .order("apellido");

  setAlumnos(data || []);
}

  async function guardarValoraciones() {

  const registros = alumnos.map(
    (alumno) => ({
      alumno_id: alumno.id,
      materia_id: Number(materia),
      docente_id: 127,
      periodo,
      ciclo_lectivo: 2026,
      valoracion:
        valoraciones[alumno.id] || "TEA",
      observaciones:
        observaciones[alumno.id] || "",
      fecha: new Date()
        .toISOString()
        .split("T")[0],
    })
  );

  const { error } = await supabase
    .from("valoraciones")
    .upsert(registros, {
      onConflict:
        "alumno_id,materia_id,periodo,ciclo_lectivo",
    });

  if (error) {
    console.error(error);
    alert("Error al guardar");
    return;
  }

  alert(
    "Valoraciones guardadas correctamente"
  );
}

  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold mb-6">
        Valoraciones por Curso
      </h1>

      <div className="bg-white rounded-xl shadow p-6 space-y-4">

        <select
          value={curso}
          onChange={(e) => setCurso(e.target.value)}
          className="w-full border rounded p-2"
        >
          <option value="">
            Seleccionar curso
          </option>

          {cursos.map((c) => (
            <option
              key={c.id}
              value={c.nombre}
            >
              {c.nombre}
            </option>
          ))}
        </select>

        <select
          value={materia}
          onChange={(e) => setMateria(e.target.value)}
          className="w-full border rounded p-2"
        >
          <option value="">
            Seleccionar materia
          </option>

          {materias.map((m) => (
            <option
              key={m.id}
              value={m.id}
            >
              {m.nombre}
            </option>
          ))}
        </select>

        <select
          value={periodo}
          onChange={(e) => setPeriodo(e.target.value)}
          className="w-full border rounded p-2"
        >
          <option>
            1° Cuatrimestre
          </option>

          <option>
            2° Cuatrimestre
          </option>
        </select>

      </div>

      {alumnos.length > 0 && (
        <div className="mt-6 bg-white rounded-xl shadow">

          {alumnos.map((alumno) => (
            <div
              key={alumno.id}
              className="border-b p-4"
            >
              <div className="font-medium mb-2">
                {alumno.apellido}, {alumno.nombre}
              </div>

              <select
  value={
    valoraciones[alumno.id] || "TEA"
  }
  onChange={(e) =>
    setValoraciones((prev) => ({
      ...prev,
      [alumno.id]: e.target.value,
    }))
  }
              className="border rounded p-2 w-full mb-2"
            >
              <option value="TEA">TEA</option>
              <option value="TEP">TEP</option>
              <option value="TED">TED</option>
            </select>

            <textarea
              value={
                observaciones[alumno.id] || ""
              }
              onChange={(e) =>
                setObservaciones((prev) => ({
                  ...prev,
                  [alumno.id]: e.target.value,
                }))
              }
              placeholder="Valoración pedagógica"
              className="w-full border rounded p-2"
              rows={3}
            />
            </div>
          ))}
          <button
  onClick={guardarValoraciones}
  className="mt-6 bg-blue-600 text-white px-5 py-2 rounded"
>
  Guardar todas las valoraciones
</button>

        </div>
      )}

    </div>
  );
}