"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginRolPage() {
  const params = useParams();
  const router = useRouter();

  const rol = String(params.rol);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function ingresar() {
  const { data: usuario, error } = await supabase
    .from("usuarios")
    .select("*")
    .eq("email", email)
    .eq("password", password)
    .single();

  if (error || !usuario) {
    alert("Usuario o contraseña incorrectos");
    return;
  }

  if (!usuario.activo) {
    alert("Usuario inactivo");
    return;
  }

  localStorage.setItem(
    "rol",
    rol
  );

  localStorage.setItem(
    "usuario_nombre",
    usuario.nombre
  );

  localStorage.setItem(
    "usuario_id",
    usuario.id
  );

  localStorage.setItem(
    "docente_id",
    String(usuario.docente_id || "")
  );

  if (usuario.primer_acceso) {
    router.push("/cambiar-password");
    return;
  }


  const { data: rolesData } = await supabase
    .from("usuario_roles")
    .select("rol_id")
    .eq("usuario_id", usuario.id);

  const rolesMap: Record<number, string> = {
    1: "directivo",
    2: "secretario",
    3: "preceptor",
    4: "docente",
    5: "administrador",
  };

  const rolesUsuario =
    rolesData?.map(
      (r) => rolesMap[r.rol_id]
    ) || [];

  console.log("ROLES:", rolesUsuario);

  if (!rolesUsuario.includes(rol)) {
    alert(
      `Este usuario no posee el perfil ${rol}`
    );
    return;
  }

  localStorage.setItem("rol", rol);
  localStorage.setItem("usuario_nombre", usuario.nombre);
  localStorage.setItem("usuario_id", usuario.id);

  if (usuario.primer_acceso) {
    router.push("/cambiar-password");
    return;
  }

  switch (rol) {
    case "administrador":
      router.push("/dashboard/admin");
      break;

    case "docente":
      router.push("/dashboard/docente");
      break;

    case "preceptor":
      router.push("/dashboard/preceptor");
      break;

    case "secretario":
      router.push("/dashboard/secretario");
      break;

    case "directivo":
      router.push("/dashboard/directivo");
      break;

    default:
      router.push("/");
  }
}
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden">

        <div className="p-10 border-b">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">

            <div className="flex items-center gap-5">
              <div className="w-28 h-28 bg-slate-100 rounded-2xl flex items-center justify-center border">
                <img
                  src="/logo-naon.png"
                  alt="Logo Institucional"
                  className="max-h-24 object-contain"
                />
              </div>

              <div>
                <p className="text-sm text-slate-500 uppercase tracking-wider">
                  Institución Educativa
                </p>

                <h2 className="text-xl font-bold text-slate-900">
                  E.E.S. N° 1 J. M. Estrada
                </h2>

                <p className="text-slate-600">
                  Distrito de Nueve de Julio
                </p>

                <p className="text-slate-600">
                  Carlos María Naón
                </p>
              </div>
            </div>

            <div className="text-center md:text-right">
              <h1 className="text-6xl font-black tracking-tight text-slate-900">
                RITE
              </h1>

              <p className="text-xl text-slate-700 mt-2">
                Registro Institucional de Trayectorias Educativas
              </p>

              <div className="mt-4 inline-block bg-blue-100 text-blue-800 px-5 py-2 rounded-xl font-semibold uppercase">
                {rol}
              </div>
            </div>

          </div>
        </div>

        <div className="p-10">
          <h2 className="text-center text-2xl font-bold text-slate-800">
            Acceso al Sistema
          </h2>

          <p className="text-center text-slate-500 mt-2 mb-10">
            Ingrese sus credenciales institucionales
          </p>

          <div className="max-w-md mx-auto space-y-5">

            <input
              type="email"
              placeholder="usuario@abc.gob.ar"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-slate-300 rounded-xl p-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-slate-300 rounded-xl p-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={ingresar}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-xl font-semibold transition"
            >
              INGRESAR AL SISTEMA
            </button>

          </div>
        </div>

        <div className="border-t bg-slate-50 px-10 py-6 text-center text-sm text-slate-500">
          RITE Escolar v1.0 • Ciclo Lectivo 2026
        </div>

      </div>
    </div>
  );
}