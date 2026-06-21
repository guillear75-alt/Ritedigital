"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Alumno = {
id: number;
apellido: string;
nombre: string;
curso: string;
};

const cursos = [
  "1°",
  "2°",
  "3°",
  "4°",
  "5°",
  "6°",
];

export default function AsistenciasPage() {
const [curso, setCurso] = useState("");
const [alumnos, setAlumnos] = useState<Alumno[]>([]);

const [fecha, setFecha] = useState(
new Date().toISOString().split("T")[0]
);

const [asistencias, setAsistencias] =
useState<Record<number, string>>({});

useEffect(() => {
if (curso) {
cargarAlumnos();
}
}, [curso]);

useEffect(() => {
if (curso) {
cargarAsistencias();
}
}, [curso, fecha]);

async function cargarAlumnos() {
const { data, error } = await supabase
.from("alumnos")
.select("id,apellido,nombre,curso")
.eq("curso", curso)
.order("apellido");

if (!error && data) {
  setAlumnos(data);
}

}

async function cargarAsistencias() {
const { data, error } = await supabase
.from("asistencias")
.select("*")
.eq("fecha", fecha);

if (!error && data) {
  const mapa: Record<number, string> = {};

  data.forEach((a) => {
    mapa[a.alumno_id] = a.estado;
  });

  setAsistencias(mapa);
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
const registros = alumnos.map(
(alumno) => ({
alumno_id: alumno.id,
fecha,
estado:
asistencias[alumno.id] ||
"Presente",
})
);

const { error } = await supabase
  .from("asistencias")
  .upsert(registros, {
    onConflict: "alumno_id,fecha",
  });

if (error) {
  console.error(error);
  alert("Error al guardar");
  return;
}

alert("Asistencias guardadas");

}

const presentes = alumnos.filter(
(a) =>
(asistencias[a.id] || "Presente") ===
"Presente"
).length;

const ausentes = alumnos.filter(
(a) =>
asistencias[a.id] === "Ausente"
).length;

const tardanzas = alumnos.filter(
(a) =>
asistencias[a.id] === "Tarde"
).length;

const justificadas = alumnos.filter(
(a) =>
asistencias[a.id] ===
"Justificada"
).length;

return (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-6">
      Registro de Asistencias
    </h1>
  

  <div className="flex gap-4 mb-6">
    <div>
      <label className="block mb-2">
        Curso
      </label>

      <select
        value={curso}
        onChange={(e) =>
          setCurso(e.target.value)
        }
        className="border rounded p-2"
      >
        <option value="">
          Seleccionar curso
        </option>

        {cursos.map((c) => (
          <option
            key={c}
            value={c}
          >
            {c}
          </option>
        ))}
      </select>
    </div>

    <div>
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
  </div>

  {curso && (
    <div className="mb-6 flex gap-6">
      <span>
        Presentes: {presentes}
      </span>

      <span>
        Ausentes: {ausentes}
      </span>

      <span>
        Tarde: {tardanzas}
      </span>

      <span>
        Justificadas: {justificadas}
      </span>
    </div>
  )}

  <div className="bg-white rounded-lg shadow overflow-hidden">
    <table className="w-full">
      <thead className="bg-slate-100">
        <tr>
          <th className="text-left p-3">
            Alumno
          </th>

          <th className="text-left p-3">
            Estado
          </th>
        </tr>
      </thead>

      <tbody>
       <div className="bg-white rounded-xl shadow p-4">
  <div className="space-y-2">
    {alumnos.map((alumno) => (
      <div
        key={alumno.id}
        className=" border rounded-lg px-3 py-1.5 flex justify-between
items-center"
      >
        <div>
          <p className="font-medium">
            {alumno.apellido}, {alumno.nombre}
          </p>
          
        </div>

        <select
          value={
            asistencias[alumno.id] ||
            "Presente"
          }
          onChange={(e) =>
            cambiarEstado(
              alumno.id,
              e.target.value
            )
          }
          className="border rounded-lg px-1 py-1"
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
          <option value="Justificada">
            Justificada
          </option>
        </select>
      </div>
    ))}
  </div>
</div>
      </tbody>
    </table>
  </div>

  {curso && (
    <button
      onClick={
        guardarAsistencias
      }
      className="mt-6 bg-blue-600 text-white px-5 py-2 rounded"
    >
      Guardar Asistencias
    </button>
  )}
  </div>
);
}
