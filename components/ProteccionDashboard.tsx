"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function ProteccionDashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [ok, setOk] = useState(false);

  useEffect(() => {
    const rol = localStorage.getItem("rol");

    if (!rol) {
      router.replace("/");
      return;
    }

    const rutaRol = pathname.split("/")[2];

    if (
      rutaRol &&
      ["admin", "docente", "preceptor", "secretario", "directivo"].includes(rutaRol)
    ) {
      const equivalencias: Record<string, string> = {
        administrador: "admin",
        docente: "docente",
        preceptor: "preceptor",
        secretario: "secretario",
        directivo: "directivo",
      };

      if (equivalencias[rol] !== rutaRol) {
        router.replace(`/dashboard/${equivalencias[rol]}`);
        return;
      }
    }

    setOk(true);
  }, [pathname, router]);

  if (!ok) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Verificando acceso...
      </div>
    );
  }

  return <>{children}</>;
}