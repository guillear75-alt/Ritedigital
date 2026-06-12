import { supabase } from "@/lib/supabase";
import { crearAlumno } from "../actions";

import Link from "next/link";

export default async function NuevoAlumnoPage() {

  const { data: cursos } = await supabase
    .from("cursos")
    .select("*")
    .order("nombre");

    console.log("CURSOS:", cursos);

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-4xl mx-auto">
        
        <h1 className="text-4xl font-bold text-slate-900 mb-8">
          Nuevo Alumno
        </h1>

        <Link
  href="/dashboard"
  className="inline-flex items-center mb-4 text-blue-600 hover:text-blue-800"
>
  ← Dashboard
</Link>

<h1 className="text-4xl font-bold text-slate-900 mb-8">
  Nuevo Alumno
</h1>


        <form
  action={crearAlumno}
  className="bg-white rounded-2xl shadow-lg p-8"
>
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

  {/* COLUMNA 1 - ALUMNO */}
  <div className="space-y-3">
    <h2 className="text-lg font-bold text-slate-800 border-b pb-2">
      Datos del Alumno
    </h2>

    <div>
      <label className="block mb-1 text-sm font-semibold text-slate-700">
        Apellido
      </label>
      <input
        type="text"
        name="apellido"
        required
        className="w-full h-9 rounded border border-slate-300 px-3 text-slate-900"
      />
    </div>

    <div>
      <label className="block mb-1 text-sm font-semibold text-slate-700">
        Nombre
      </label>
      <input
        type="text"
        name="nombre"
        required
        className="w-full h-9 rounded border border-slate-300 px-3 text-slate-900"
      />
    </div>

    <div>
      <label className="block mb-1 text-sm font-semibold text-slate-700">
        DNI
      </label>
      <input
        type="text"
        name="dni"
        required
        className="w-full h-9 rounded border border-slate-300 px-3 text-slate-900"
      />
    </div>

    <div>
      <label className="block mb-1 text-sm font-semibold text-slate-700">
        Fecha Nacimiento
      </label>
      <input
        type="date"
        name="fecha_nacimiento"
        className="w-full h-9 rounded border border-slate-300 px-3 text-slate-900"
      />
    </div>
  </div>

  {/* COLUMNA 2 */}
  <div className="space-y-3">
    <h2 className="text-lg font-bold text-slate-800 border-b pb-2">
      Contacto y Curso
    </h2>

    <div>
      <div>
      <label className="block mb-1 text-sm font-semibold text-slate-700">
        Curso
      </label>
      <p className="text-red-500">
  Cursos encontrados: {cursos?.length}
</p>

      <select
        name="curso_id"
        required
        className="w-full h-9 rounded border border-slate-300 px-3 text-slate-900"
      >
        <option value="">Seleccionar curso</option>

        {cursos?.map((curso) => (
          <option key={curso.id} value={curso.id}>
            {curso.nombre}
          </option>
        ))}
      </select>
    </div>
        </div>

    <div>
      <label className="block mb-1 text-sm font-semibold text-slate-700">
        Teléfono
      </label>
      <input
        type="text"
        name="telefono"
        className="w-full h-9 rounded border border-slate-300 px-3 text-slate-900"
      />
    </div>

    <div>
      <label className="block mb-1 text-sm font-semibold text-slate-700">
        Email
      </label>
      <input
        type="email"
        name="email"
        className="w-full h-9 rounded border border-slate-300 px-3 text-slate-900"
      />
    </div>

    <div>
      <label className="block mb-1 text-sm font-semibold text-slate-700">
        Dirección
      </label>
      <input
        type="text"
        name="direccion"
        className="w-full h-9 rounded border border-slate-300 px-3 text-slate-900"
      />
    </div>
  </div>

  {/* COLUMNA 3 - TUTOR */}
  <div className="space-y-3 bg-blue-50 border border-blue-100 rounded-xl p-4">
    <h2 className="text-lg font-bold text-blue-900 border-b border-blue-200 pb-2">
      Tutor Responsable
    </h2>

    <input
      name="tutor_nombre"
      placeholder="Nombre y Apellido"
      className="w-full h-9 rounded border border-slate-300 px-3 text-slate-900"
    />

    <input
      name="tutor_dni"
      placeholder="DNI"
      className="w-full h-9 rounded border border-slate-300 px-3 text-slate-900"
    />

    <input
      name="tutor_parentesco"
      placeholder="Parentesco"
      className="w-full h-9 rounded border border-slate-300 px-3 text-slate-900"
    />

    <input
      name="tutor_telefono"
      placeholder="Teléfono"
      className="w-full h-9 rounded border border-slate-300 px-3 text-slate-900"
    />

    <input
      name="tutor_telefono_alt"
      placeholder="Teléfono alternativo"
      className="w-full h-9 rounded border border-slate-300 px-3 text-slate-900"
    />

    <input
      name="tutor_email"
      placeholder="Email"
      className="w-full h-9 rounded border border-slate-300 px-3 text-slate-900"
    />

    <input
      name="tutor_ocupacion"
      placeholder="Ocupación"
      className="w-full h-9 rounded border border-slate-300 px-3 text-slate-900"
    />

    <input
      name="tutor_direccion"
      placeholder="Dirección"
      className="w-full h-9 rounded border border-slate-300 px-3 text-slate-900"
    />
  </div>

</div>

  <div className="mt-5">
    <label className="block mb-2 text-sm font-semibold text-slate-700">
      Observaciones
    </label>

    <textarea
      name="observaciones"
      rows={4}
      className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 bg-white"
    />
  </div>

  <div className="mt-6 flex gap-3">
    <button
      type="submit"
      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
    >
      Guardar Alumno
    </button>

    <a
      href="/alumnos"
      className="bg-slate-200 hover:bg-slate-300 text-slate-800 px-6 py-3 rounded-lg font-semibold"
    >
      Cancelar
    </a>
  </div>
</form>

      </div>
    </div>
  );
}