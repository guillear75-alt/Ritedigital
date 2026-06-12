"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  const [perfil, setPerfil] = useState("");

  function ingresar() {
    if (!perfil) {
      alert("Seleccione un perfil");
      return;
    }

    localStorage.setItem("rol", perfil);
    router.push("/dashboard");
  }

  const perfiles = [
    {
      id: "docente",
      titulo: "DOCENTE",
      descripcion: "Seguimiento pedagógico y valoraciones",
    },
    {
      id: "preceptor",
      titulo: "PRECEPTOR",
      descripcion: "Asistencia, alertas y observaciones",
    },
    {
      id: "secretario",
      titulo: "SECRETARÍA",
      descripcion: "Gestión académica e institucional",
    },
    {
      id: "directivo",
      titulo: "EQUIPO DIRECTIVO",
      descripcion: "Supervisión y seguimiento integral",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden">

        <div className="p-12 text-center border-b">
          <h1 className="text-6xl font-black tracking-tight text-slate-900">
            RITE
          </h1>

          <p className="text-2xl text-slate-700 mt-3">
            Registro Institucional de Trayectorias Educativas
          </p>

          <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
            Plataforma para la gestión, seguimiento y evaluación
            de las trayectorias escolares.
          </p>
        </div>

        <div className="p-10">
          <h2 className="text-center text-lg font-semibold text-slate-700 mb-8">
            ACCESO AL SISTEMA
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            {perfiles.map((item) => (
              <button
                key={item.id}
                onClick={() => setPerfil(item.id)}
                className={`
                  text-left
                  p-6
                  rounded-2xl
                  border-2
                  transition-all
                  ${
                    perfil === item.id
                      ? "border-blue-600 bg-blue-50 shadow-lg"
                      : "border-slate-200 hover:border-slate-400"
                  }
                `}
              >
                <h3 className="font-bold text-slate-900 text-lg">
                  {item.titulo}
                </h3>

                <p className="text-sm text-slate-600 mt-2">
                  {item.descripcion}
                </p>
              </button>
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <button
              onClick={ingresar}
              className="
                bg-slate-900
                hover:bg-slate-800
                text-white
                px-10
                py-4
                rounded-xl
                font-semibold
                tracking-wide
                transition
              "
            >
              INGRESAR AL SISTEMA
            </button>
          </div>
        </div>

        <div className="border-t bg-slate-50 px-10 py-6 flex justify-between text-sm text-slate-500">
          <span>RITE Escolar v1.0</span>

          <button
            onClick={() => {
              localStorage.setItem("rol", "administrador");
              router.push("/dashboard");
            }}
            className="hover:text-slate-900"
          >
            Administración del sistema
          </button>
        </div>
      </div>
    </div>
  );
}