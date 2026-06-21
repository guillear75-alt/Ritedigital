"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProteccionRol({
  permitido,
}: {
  permitido: string;
}) {
  const router = useRouter();

  useEffect(() => {
    const rol = localStorage.getItem("rol");

    if (rol !== permitido) {
      router.push("/");
    }
  }, [permitido, router]);

  return null;
}