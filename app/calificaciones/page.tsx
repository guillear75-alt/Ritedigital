"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function CalificacionesPage() {
  const [alumnos, setAlumnos] = useState<any[]>([]);
  const [materias, setMaterias] = useState<any[]>([]);

  const [alumnoId, setAlumnoId] = useState("");
  const [materiaId, setMateriaId] = useState("");
  const [periodo, setPeriodo] = useState("1° Cuatrimestre");
  const [tipoEvaluacion, setTipoEvaluacion] = useState("Prueba");
  const [nota, setNota] = useState("");
  const [observacion, setObservacion] = useState("");

  useEffect(() => {
  cargarDatos();
  cargarCalificaciones();
}, []);

const [filtroAlumno, setFiltroAlumno] = useState("");
const [filtroMateria, setFiltroMateria] = useState("");
const [filtroPeriodo, setFiltroPeriodo] = useState("");

const [calificaciones, setCalificaciones] = useState<any[]>([]);

  async function cargarCalificaciones() {
  const { data } = await supabase
    .from("calificaciones")
    .select(`
      *,
      alumnos(nombre, apellido),
      materias(nombre)
    `)
    .order("created_at", { ascending: false });

    console.log(data);

  setCalificaciones(data || []);
}

  async function cargarDatos() {
    const { data: alumnosData } = await supabase
      .from("alumnos")
      .select("*")
      .order("apellido");

    const { data: materiasData } = await supabase
      .from("materias")
      .select("*")
      .order("nombre");

    setAlumnos(alumnosData || []);
    setMaterias(materiasData || []);
  }

  async function guardarCalificacion() {
    if (!alumnoId || !materiaId || !nota) {
      alert("Complete todos los campos obligatorios");
      return;
    }

    const { error } = await supabase
      .from("calificaciones")
      .insert({
        alumno_id: Number(alumnoId),
        materia_id: Number(materiaId),
        periodo,
        tipo_evaluacion: tipoEvaluacion,
        nota: Number(nota),
        observacion,
        fecha: new Date().toISOString().split("T")[0],
      });

    if (error) {
      console.error(error);
      alert("Error al guardar la calificación");
      return;
    }

    alert("Calificación guardada correctamente");
    await cargarCalificaciones();

    setNota("");
    setObservacion("");
  }

  const calificacionesFiltradas = calificaciones.filter((c) => {
  const alumnoOk =
    !filtroAlumno ||
    String(c.alumno_id) === filtroAlumno;

  const materiaOk =
    !filtroMateria ||
    String(c.materia_id) === filtroMateria;

  const periodoOk =
    !filtroPeriodo ||
    c.periodo === filtroPeriodo;

  return alumnoOk && materiaOk && periodoOk;
});

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Calificaciones
      </h1>

      <div className="bg-white rounded-lg shadow p-6 space-y-4">

        <div>
          <label className="block mb-2 font-medium">
            Alumno
          </label>

          <select
            value={alumnoId}
            onChange={(e) => setAlumnoId(e.target.value)}
            className="w-full border rounded p-2"
          >
            <option value="">
              Seleccionar alumno
            </option>

            {alumnos.map((alumno) => (
            <option key={alumno.id} value={alumno.id}>
                {alumno.apellido}, {alumno.nombre} - {alumno.curso}
            </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Materia
          </label>

          <select
            value={materiaId}
            onChange={(e) => setMateriaId(e.target.value)}
            className="w-full border rounded p-2"
          >
            <option value="">
              Seleccionar materia
            </option>

            {materias.map((materia) => (
            <option key={materia.id} value={materia.id}>
                {materia.nombre} - {materia.anio}° Año
            </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Cuatrimestre
          </label>

          <select
            value={periodo}
            onChange={(e) => setPeriodo(e.target.value)}
            className="w-full border rounded p-2"
          >
            <option>1° Cuatrimestre</option>
            <option>2° Cuatrimestre</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Tipo de evaluación
          </label>

          <select
            value={tipoEvaluacion}
            onChange={(e) =>
              setTipoEvaluacion(e.target.value)
            }
            className="w-full border rounded p-2"
          >
            <option>Prueba</option>
            <option>Trabajo Práctico</option>
            <option>Exposición</option>
            <option>Integrador</option>
            <option>Participación</option>
            <option>Otro</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Nota
          </label>

          <input
            type="number"
            step="0.01"
            value={nota}
            onChange={(e) => setNota(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Observación
          </label>

          <textarea
            value={observacion}
            onChange={(e) =>
              setObservacion(e.target.value)
            }
            className="w-full border rounded p-2"
            rows={4}
          />
        </div>

        <button
          onClick={guardarCalificacion}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Guardar Calificación
        </button>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">

  {/* Alumno */}
  <select
    value={filtroAlumno}
    onChange={(e) => setFiltroAlumno(e.target.value)}
    className="border rounded p-2"
  >
    <option value="">Todos los alumnos</option>

        {alumnos.map((a) => (
    <option key={a.id} value={a.id}>
        {a.apellido}, {a.nombre} - {a.curso}
    </option>
    ))}
  </select>

  {/* Materia */}
  <select
    value={filtroMateria}
    onChange={(e) => setFiltroMateria(e.target.value)}
    className="border rounded p-2"
  >
    <option value="">Todas las materias</option>

    {materias.map((m) => (
  <option key={m.id} value={m.id}>
    {m.nombre} - {m.anio}° Año
  </option>
))}
  </select>

  {/* Cuatrimestre */}
  <select
    value={filtroPeriodo}
    onChange={(e) => setFiltroPeriodo(e.target.value)}
    className="border rounded p-2"
  >
    <option value="">Todos los períodos</option>
    <option value="1° Cuatrimestre">
      1° Cuatrimestre
    </option>
    <option value="2° Cuatrimestre">
      2° Cuatrimestre
    </option>
  </select>

</div>

        <div className="mt-8">
  <h2 className="text-xl font-bold mb-4">
    Últimas Calificaciones
  </h2>

  <div className="bg-blue-50 border rounded-lg p-4 mb-4">
  <h3 className="font-semibold">
    Total de Calificaciones
  </h3>

  <p className="text-2xl font-bold">
    {calificacionesFiltradas.length}
  </p>
</div>

  <table className="w-full border">
    <thead>
        <tr>
            <th className="border p-2">Alumno</th>
            <th className="border p-2">Materia</th>
            <th className="border p-2">Tipo</th>
            <th className="border p-2">Nota</th>
            <th className="border p-2">Fecha</th>
            <th className="border p-2">Período</th>
        </tr>
        </thead>

    <tbody>
  {calificacionesFiltradas.map((c) => (
    <tr key={c.id}>
      <td className="border p-2">
        {c.alumnos?.apellido}, {c.alumnos?.nombre}
      </td>

      <td className="border p-2">
        {c.materias?.nombre}
      </td>

      <td className="border p-2">
        {c.tipo_evaluacion}
      </td>

      <td className="border p-2">
        {c.nota}
      </td>

      <td className="border p-2">
        {c.fecha}
        </td>

      <td className="border p-2">
        {c.periodo}
      </td>
    </tr>
  ))}
</tbody>
  </table>
</div>
      </div>
      
    </div>
  );
}