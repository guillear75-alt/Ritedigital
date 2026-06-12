"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const [rol, setRol] = useState("");

  useEffect(() => {
    const rolGuardado =
      localStorage.getItem("rol") || "administrador";

    setRol(rolGuardado);
  }, []);

  const menus: Record<string, any[]> = {
    docente: [
      { href: "/dashboard", label: "Dashboard" },
      { href: "/alumnos", label: "Alumnos" },
      { href: "/valoraciones", label: "Valoraciones" },
      { href: "/calificaciones", label: "Calificaciones" },
      { href: "/reportes", label: "Reportes" },
    ],

    preceptor: [
      { href: "/dashboard", label: "Dashboard" },
      { href: "/alumnos", label: "Alumnos" },
      { href: "/asistencias", label: "Asistencias" },
      { href: "/observaciones", label: "Observaciones" },
      { href: "/valoraciones", label: "Valoraciones" },
      { href: "/reportes", label: "Reportes" },
      { href: "/alertas", label: "Alertas" },
    ],

    secretario: [
      { href: "/dashboard", label: "Dashboard" },
      { href: "/alumnos", label: "Alumnos" },
      { href: "/docentes", label: "Docentes" },
      { href: "/cursos", label: "Cursos" },
      { href: "/materias", label: "Materias" },
      { href: "/matriculas", label: "Matrículas" },
      { href: "/reportes", label: "Reportes" },
      { href: "/alertas", label: "Alertas" },
    ],

    directivo: [
      { href: "/dashboard", label: "Dashboard" },
      { href: "/alumnos", label: "Alumnos" },
      { href: "/docentes", label: "Docentes" },
      { href: "/cursos", label: "Cursos" },
      { href: "/asignaciones", label: "Asignaciones" },
      { href: "/matriculas", label: "Matrículas" },
      { href: "/valoraciones", label: "Valoraciones" },
      { href: "/asistencias", label: "Asistencias" },
      { href: "/observaciones", label: "Observaciones" },
      { href: "/reportes", label: "Reportes" },
      { href: "/alertas", label: "Alertas" },
    ],

    administrador: [
      { href: "/dashboard", label: "Dashboard" },
      { href: "/usuarios", label: "Usuarios" },
      { href: "/alumnos", label: "Alumnos" },
      { href: "/docentes", label: "Docentes" },
      { href: "/cursos", label: "Cursos" },
      { href: "/materias", label: "Materias" },
      { href: "/asignaciones", label: "Asignaciones" },
      { href: "/matriculas", label: "Matrículas" },
      { href: "/valoraciones", label: "Valoraciones" },
      { href: "/calificaciones", label: "Calificaciones" },
      { href: "/asistencias", label: "Asistencias" },
      { href: "/observaciones", label: "Observaciones" },
      { href: "/reportes", label: "Reportes" },
      { href: "/configuracion", label: "Configuración" },
      { href: "/alertas", label: "Alertas" },
    ],
  };

  const menuItems = menus[rol] || [];

  return (
    <aside className="w-72 bg-slate-950 text-white min-h-screen flex flex-col">

      <div className="p-8 border-b border-slate-800">
        <h1 className="text-4xl font-black tracking-tight">
          RITE
        </h1>

        <p className="text-slate-400 text-sm mt-2">
          Registro Institucional
        </p>
      </div>

      <div className="px-6 py-4 border-b border-slate-800">
        <p className="text-xs uppercase tracking-widest text-slate-500">
          Perfil activo
        </p>

        <p className="mt-1 font-semibold capitalize">
          {rol}
        </p>
      </div>

      <nav className="flex-1 p-4 space-y-2">

        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="
              block
              px-4
              py-3
              rounded-xl
              text-sm
              font-medium
              hover:bg-slate-800
              transition
            "
          >
            {item.label}
          </Link>
        ))}

      </nav>

      <div className="p-4 border-t border-slate-800">

        <button
          onClick={() => {
            localStorage.removeItem("rol");
            window.location.href = "/";
          }}
          className="
            w-full
            bg-slate-800
            hover:bg-slate-700
            rounded-xl
            py-3
            text-sm
          "
        >
          Cerrar sesión
        </button>

        <p className="text-xs text-slate-500 mt-4 text-center">
          RITE Escolar v1.0
        </p>

      </div>

    </aside>
  );
}