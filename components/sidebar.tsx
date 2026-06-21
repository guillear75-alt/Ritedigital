"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

export default function Sidebar() {
  const [rol, setRol] = useState<string | null>(null);

    const router = useRouter();

    const [nombreUsuario, setNombreUsuario] = useState("");

  useEffect(() => {
  const rolGuardado = localStorage.getItem("rol");

  if (!rolGuardado) {
    window.location.href = "/";
    return;
  }

  const nombreGuardado =
    localStorage.getItem("usuario_nombre") || "";

  setRol(rolGuardado);
  setNombreUsuario(nombreGuardado);

}, []);


  

  const menus: Record<string, any[]> = {
    docente: [
      { href: "/dashboard/docente", label: "Dashboard" },
      { href: "/mis-cursos", label: "Mis Cursos",},
      { href: "/valoraciones", label: "Valoraciones" },
      { href: "/calificaciones/cursos/1?materia=6",label: "Calificaciones",},
      { href: "/reportes", label: "Reportes" },
    ],

    preceptor: [
      { href: "/dashboard/preceptor", label: "Dashboard" },
      { href: "/alumnos", label: "Alumnos" },
      { href: "/asistencias", label: "Asistencias" },
      { href: "/observaciones", label: "Observaciones" },
      { href: "/reportes", label: "Reportes" },
      { href: "/alertas", label: "Alertas" },
    ],

    secretario: [
      { href: "/dashboard/secretario", label: "Dashboard" },
      { href: "/alumnos", label: "Alumnos" },
      { href: "/docentes", label: "Docentes" },
      { href: "/cursos", label: "Cursos" },
      { href: "/materias", label: "Materias" },
      { href: "/matriculas", label: "Matrículas" },
      { href: "/reportes", label: "Reportes" },
      { href: "/alertas", label: "Alertas" },
    ],

    directivo: [
      { href: "/dashboard/directivo", label: "Dashboard" },
      { href: "/alumnos", label: "Alumnos" },
      { href: "/docentes", label: "Docentes" },
      { href: "/cursos", label: "Cursos" },
      { href: "/asignaciones", label: "Asignaciones" },
      { href: "/matriculas", label: "Matrículas" },
      { href: "/valoraciones", label: "Valoraciones" },
      { href: "/calificaciones", label: "Calificaciones" },
      { href: "/asistencias", label: "Asistencias" },
      { href: "/reportes", label: "Reportes" },
      { href: "/alertas", label: "Alertas" },
    ],

    administrador: [
      { href: "/dashboard/admin", label: "Dashboard" },
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

 

  const nombresRoles: Record<string, string> = {
  administrador: "Administrador",
  docente: "Docente",
  preceptor: "Preceptor",
  secretario: "Secretaría",
  directivo: "Equipo Directivo",
};

if (!rol) {
  return null;
}

const menuItems = menus[rol] || [];

console.log("ROL:", rol);
console.log("NOMBRE:", nombreUsuario);


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

  <p className="mt-2 font-semibold text-white">
  {nombreUsuario}
</p>

<p className="text-sm text-slate-400">
  {nombresRoles[rol as keyof typeof nombresRoles] || rol}
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