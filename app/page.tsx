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

  router.push(`/login/${perfil}`);


    
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

        <div className="p-10 border-b">
  <div className="flex flex-col md:flex-row items-center justify-between gap-8">

    {/* Logo e institución */}
    <div className="flex items-center gap-5">
      <div className="w-28 h-28 bg-slate-100 rounded-2xl flex items-center justify-center border">
        <img
          src="/logo-naon.png"
          alt="Logo Institucional"
          className="max-h-30 object-contain"
        />
      </div>

      <div>
        <p className="text-sm text-slate-500 uppercase tracking-wider">
          Institución Educativa
        </p>

        <h2 className="text-1xl font-bold text-slate-900">
          E.E.S. N° 1  
        </h2>
        <h5 className="text-1xl font-bold text-slate-900">
         J.M. Estrada
        </h5>

        <p className="text-slate-600">
          Distrito de Nueve de Julio
        </p>
        <p className="text-slate-600">
          Carlos Maria Naon
        </p>
      </div>
    </div>

    {/* Nombre del sistema */}
    <div className="text-center md:text-right">
      <h1 className="text-6xl font-black tracking-tight text-slate-900">
        RITE
      </h1>

      <p className="text-xl text-slate-700 mt-2">
        Registro Institucional de Trayectorias Educativas
      </p>

      <p className="text-sm text-slate-500 mt-2">
        Gestión académica, asistencia, valoraciones y seguimiento pedagógico
      </p>
    </div>

  </div>
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
              localStorage.setItem(
                "rol",
                "administrador"
              );

              router.push(
                "/dashboard/admin"
              );
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