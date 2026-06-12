"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AlertasPage() {
  const [alertas, setAlertas] = useState<any[]>([]);

  useEffect(() => {
    cargarAlertas();
  }, []);

  async function cargarAlertas() {
  const nuevasAlertas: any[] = [];

  const { data: inasistencias } = await supabase
    .from("asistencias")
    .select(`
      alumno_id,
      estado,
      alumnos(nombre, apellido)
    `);

  const contador: Record<number, any> = {};

  inasistencias?.forEach((a: any) => {
    if (a.estado !== "Ausente") return;

    if (!contador[a.alumno_id]) {
      contador[a.alumno_id] = {
        cantidad: 0,
        alumno: a.alumnos,
      };
    }

    contador[a.alumno_id].cantidad++;
  });

  Object.values(contador).forEach((item: any) => {
    if (item.cantidad >= 10) {
      nuevasAlertas.push({
        tipo: "Inasistencias",
        mensaje: `${item.alumno?.apellido}, ${item.alumno?.nombre} acumula ${item.cantidad} inasistencias.`,
      });
    }
  });

  setAlertas(nuevasAlertas);
}

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Alertas Institucionales
      </h1>

      <div className="space-y-4">
        {alertas.length === 0 ? (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            No hay alertas activas.
          </div>
        ) : (
          alertas.map((a, i) => (
            <div
  key={i}
  className="
    bg-amber-50
    border-l-4
    border-amber-500
    rounded-xl
    p-4
    shadow-sm
  "
>
  <h3 className="font-semibold text-amber-800">
    {a.tipo}
  </h3>

  <p className="text-slate-700 mt-1">
    {a.mensaje}
  </p>
</div>
          ))
        )}
      </div>
    </div>
  );
}