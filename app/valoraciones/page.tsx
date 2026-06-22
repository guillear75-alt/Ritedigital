"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function ValoracionesCursoPage({
  params,
}: {
  params: { id: string };
}) {
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
      .order("anio")
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
      docente_id: 143,
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

    <div className="flex gap-2 mb-6">

  <Link
    href="/dashboard"
    className="bg-green-600 text-white px-4 py-2 rounded-xl"
  >
    Dashboard
  </Link>

  <Link
    href="/mis-cursos"
    className="bg-blue-600 text-white px-4 py-2 rounded-xl"
  >
    Mis Cursos
  </Link>

</div>

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
              {m.nombre} ({m.anio}°)
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
        <div className="grid md:grid-cols-2 gap-4 mt-6">

          {alumnos.map((alumno) => (
            <div key={alumno.id}
            className="bg-white rounded-2xl shadow-lg p-5"

            >
             

              <div className="flex items-center gap-3 mb-4">

  <div className="w-10 h-10 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold">
    {alumno.apellido?.charAt(0)}
    {alumno.nombre?.charAt(0)}
  </div>

  <div>
    <h3 className="font-bold">
      {alumno.apellido}, {alumno.nombre}
    </h3>
  </div>

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
  className="mt-4 bg-blue-600 text-white px-3 py-2 rounded"
>
  Guardar todas las valoraciones
</button>

        </div>
      )}

    </div>
  );
}