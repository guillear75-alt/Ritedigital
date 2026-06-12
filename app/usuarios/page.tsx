"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function UsuariosPage() {

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [rolId, setRolId] = useState("4");
  const [editandoId, setEditandoId] = useState<string | null>(null);

  const [usuarios, setUsuarios] = useState<any[]>([]);

  async function cargarUsuarios() {
    const { data } = await supabase
      .from("usuarios")
      .select(`
        *,
        roles(nombre)
      `)
      .order("nombre");

    setUsuarios(data || []);
  }

  useEffect(() => {
    cargarUsuarios();
  }, []);

  async function guardarUsuario() {
  let error;

  if (editandoId) {
    const resultado = await supabase
      .from("usuarios")
      .update({
        nombre,
        email,
        rol_id: Number(rolId),
      })
      .eq("id", editandoId);

    error = resultado.error;
  } else {
    const resultado = await supabase
      .from("usuarios")
      .insert({
        nombre,
        email,
        rol_id: Number(rolId),
      });

    error = resultado.error;
  }

  if (error) {
    alert("Error al guardar");
    console.error(error);
    return;
  }

  alert(
    editandoId
      ? "Usuario actualizado"
      : "Usuario creado"
  );

  setNombre("");
  setEmail("");
  setRolId("4");
  setEditandoId(null);

  cargarUsuarios();
}
async function eliminarUsuario(id: string) {
  const confirmar = confirm(
    "¿Desea eliminar este usuario?"
  );

  if (!confirmar) return;

  const { error } = await supabase
    .from("usuarios")
    .delete()
    .eq("id", id);

  if (error) {
    alert("Error al eliminar");
    console.error(error);
    return;
  }

  alert("Usuario eliminado");

  cargarUsuarios();
}

function editarUsuario(usuario: any) {
  setEditandoId(usuario.id);
  setNombre(usuario.nombre);
  setEmail(usuario.email);
  setRolId(String(usuario.rol_id));
}

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Usuarios
        </h1>

        <div className="bg-white p-4 rounded-lg shadow mb-6 space-y-3">
  <input
    type="text"
    placeholder="Nombre"
    value={nombre}
    onChange={(e) => setNombre(e.target.value)}
    className="w-full border rounded p-2"
  />

  <input
    type="email"
    placeholder="Email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    className="w-full border rounded p-2"
  />

  <select
    value={rolId}
    onChange={(e) => setRolId(e.target.value)}
    className="w-full border rounded p-2"
  >
    <option value="1">Directivo</option>
    <option value="2">Secretario</option>
    <option value="3">Preceptor</option>
    <option value="4">Docente</option>
    <option value="5">Administrador</option>
  </select>

  <button
  onClick={guardarUsuario}
  className="bg-blue-600 text-white px-4 py-2 rounded"
>
  {editandoId
    ? "Guardar Cambios"
    : "Agregar Usuario"}
</button>
</div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-3 text-left">Nombre</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Rol</th>
              <th className="p-3 text-left">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {usuarios.map((usuario) => (
              <tr
                key={usuario.id}
                className="border-t"
              >
                <td className="p-3">
                  {usuario.nombre}
                </td>

                <td className="p-3">
                  {usuario.email}
                </td>

                <td className="p-3">
                  {usuario.roles?.nombre}
                </td>

                <td className="p-3 flex gap-3">
                <button
                  onClick={() =>
                    editarUsuario(usuario)
                  }
                  className="text-blue-600"
                >
                  ✏️ Editar
                </button>

                <button
                  onClick={() =>
                    eliminarUsuario(usuario.id)
                  }
                  className="text-red-600"
                >
                  🗑️ Eliminar
                </button>
              </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}