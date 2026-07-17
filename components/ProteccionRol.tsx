"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";


export default function ProteccionRol({
  permitido,
}: {
  permitido: string | string[];
}) {
  const router = useRouter();

  useEffect(() => {
    const rol = localStorage.getItem("rol");

    const rolesPermitidos = Array.isArray(permitido)
      ? permitido
      : [permitido];

    if (!rol || !rolesPermitidos.includes(rol)) {
      router.push("/");
    }
  }, [permitido, router]);

  return null;
}