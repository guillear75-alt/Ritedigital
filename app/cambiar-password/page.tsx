"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function CambiarPasswordPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [guardando, setGuardando] = useState(false);

  async function guardarPassword() {
    const usuarioId = localStorage.getItem("usuario_id");

    if (!usuarioId) {
      alert("Sesión no válida");
      router.push("/");
      return;
    }

    if (password.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    if (password !== confirmar) {
      alert("Las contraseñas no coinciden");
      return;
    }

    setGuardando(true);

    const { error } = await supabase
      .from("usuarios")
      .update({
        password,
        primer_acceso: false,
      })
      .eq("id", usuarioId);

    setGuardando(false);

    if (error) {
      alert("Error al actualizar contraseña");
      return;
    }

    const rol = localStorage.getItem("rol");

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
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-6">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-8">

        <h1 className="text-3xl font-bold text-center">
          Cambiar contraseña
        </h1>

        <p className="text-center text-slate-500 mt-3">
          Primer acceso al sistema
        </p>

        <div className="mt-8">
          <input
            type="password"
            placeholder="Nueva contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-slate-300 rounded-xl p-3"
          />
        </div>

        <div className="mt-4">
          <input
            type="password"
            placeholder="Repetir contraseña"
            value={confirmar}
            onChange={(e) => setConfirmar(e.target.value)}
            className="w-full border border-slate-300 rounded-xl p-3"
          />
        </div>

        <button
          onClick={guardarPassword}
          disabled={guardando}
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
        >
          {guardando
            ? "Guardando..."
            : "Actualizar contraseña"}
        </button>

      </div>
    </div>
  );
}