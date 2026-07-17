"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import GraficoCalificaciones from "@/components/GraficoCalificaciones";

export default function DashboardDocenteClient() {
  const [cursosDocente, setCursosDocente] = useState<any[]>([]);
  const [misCursos, setMisCursos] = useState(0);

  const [valoraciones, setValoraciones] = useState(0);
  const [calificaciones, setCalificaciones] = useState(0);
  const [alertasActivas, setAlertasActivas] = useState(0);

  const [tea, setTea] = useState(0);
  const [tep, setTep] = useState(0);
  const [ted, setTed] = useState(0);

  const [rango13, setRango13] = useState(0);
  const [rango46, setRango46] = useState(0);
  const [rango710, setRango710] = useState(0);

  useEffect(() => {
    async function cargarDashboard() {
      const docenteId = Number(
        localStorage.getItem("docente_id")
      );

      if (!docenteId) return;

      const { data: cursos } = await supabase
        .from("docente_curso_materia")
        .select(`
          curso_id,
          materia_id,
          cursos(nombre),
          materias(nombre)
        `)
        .eq("docente_id", docenteId)
        .eq("ciclo_lectivo", 2026);

      setCursosDocente(cursos || []);
      setMisCursos(cursos?.length || 0);

      const { count: cantValoraciones } =
        await supabase
          .from("valoraciones")
          .select("*", {
            count: "exact",
            head: true,
          });

      setValoraciones(cantValoraciones || 0);

      const { count: cantCalificaciones } =
        await supabase
          .from("calificaciones")
          .select("*", {
            count: "exact",
            head: true,
          });

      setCalificaciones(cantCalificaciones || 0);

      const { data: ausentes } =
        await supabase
          .from("asistencias")
          .select("*")
          .eq("estado", "Ausente");

      setAlertasActivas(
        ausentes?.length || 0
      );

      const { data: valoracionesData } =
        await supabase
          .from("valoraciones")
          .select("valoracion");

      setTea(
        valoracionesData?.filter(
          (v) => v.valoracion === "TEA"
        ).length || 0
      );

      setTep(
        valoracionesData?.filter(
          (v) => v.valoracion === "TEP"
        ).length || 0
      );

      setTed(
        valoracionesData?.filter(
          (v) => v.valoracion === "TED"
        ).length || 0
      );

      const { data: notasData } =
        await supabase
          .from("calificaciones")
          .select("nota");

      setRango13(
        notasData?.filter(
          (n) =>
            Number(n.nota) >= 1 &&
            Number(n.nota) <= 3
        ).length || 0
      );

      setRango46(
        notasData?.filter(
          (n) =>
            Number(n.nota) >= 4 &&
            Number(n.nota) <= 6
        ).length || 0
      );

      setRango710(
        notasData?.filter(
          (n) =>
            Number(n.nota) >= 7 &&
            Number(n.nota) <= 10
        ).length || 0
      );
    }

    cargarDashboard();
  }, []);

  const totalValoraciones =
    tea + tep + ted;

  const teaPorcentaje =
    totalValoraciones > 0
      ? (tea / totalValoraciones) * 100
      : 0;

  const tepPorcentaje =
    totalValoraciones > 0
      ? (tep / totalValoraciones) * 100
      : 0;

  const tedPorcentaje =
    totalValoraciones > 0
      ? (ted / totalValoraciones) * 100
      : 0;

  return (
    <div className="p-8">

      <div className="bg-white rounded-2xl shadow-lg p-3 mb-3">
        <h1 className="text-3xl font-bold">
          Dashboard Docente
        </h1>

        <p className="text-slate-500 mt-2">
          Gestión pedagógica, valoraciones y seguimiento académico.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">

        <div className="bg-blue-50 rounded-2xl shadow-lg p-5 text-center">
          <p className="text-sm text-blue-700">
            Mis Cursos
          </p>

          <p className="text-4xl font-bold text-blue-700">
            {misCursos}
          </p>
        </div>

        <div className="bg-green-50 rounded-2xl shadow-lg p-5 text-center">
          <p className="text-sm text-green-700">
            Valoraciones
          </p>

          <p className="text-4xl font-bold text-green-700">
            {valoraciones}
          </p>
        </div>

        <div className="bg-purple-50 rounded-2xl shadow-lg p-5 text-center">
          <p className="text-sm text-purple-700">
            Calificaciones
          </p>

          <p className="text-4xl font-bold text-purple-700">
            {calificaciones}
          </p>
        </div>

        <div className="bg-amber-50 rounded-2xl shadow-lg p-5 text-center">
          <p className="text-sm text-amber-700">
            Alertas
          </p>

          <p className="text-4xl font-bold text-amber-700">
            {alertasActivas}
          </p>
        </div>

      </div>

      <div className="grid lg:grid-cols-2 gap-5">

        <div className="bg-white rounded-2xl shadow-lg p-3">

          <h2 className="text-xl font-bold mb-4">
            Mis Cursos
          </h2>

          <div className="space-y-3">

            {cursosDocente.map(
              (item: any, index: number) => (
                <div
                  key={index}
                  className="bg-slate-50 rounded-xl p-3"
                >
                  <p className="font-semibold">
                    {item.cursos?.nombre}
                  </p>

                  <p className="text-sm text-slate-500">
                    {item.materias?.nombre}
                  </p>
                </div>
              )
            )}

          </div>

        </div>

        <div className="bg-white rounded-2xl shadow-lg p-5">

          <h2 className="text-xl font-bold mb-4">
            Valoraciones Pedagógicas
          </h2>

          <div className="space-y-4">

            <div>
              <div className="flex justify-between">
                <span>TEA</span>
                <span>{tea}</span>
              </div>

              <div className="w-full bg-slate-200 rounded-full h-3">
                <div
                  className="bg-green-500 h-3 rounded-full"
                  style={{
                    width: `${teaPorcentaje}%`,
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between">
                <span>TEP</span>
                <span>{tep}</span>
              </div>

              <div className="w-full bg-slate-200 rounded-full h-3">
                <div
                  className="bg-yellow-500 h-3 rounded-full"
                  style={{
                    width: `${tepPorcentaje}%`,
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between">
                <span>TED</span>
                <span>{ted}</span>
              </div>

              <div className="w-full bg-slate-200 rounded-full h-3">
                <div
                  className="bg-red-500 h-3 rounded-full"
                  style={{
                    width: `${tedPorcentaje}%`,
                  }}
                />
              </div>
            </div>

          </div>

        </div>

      </div>

      <div className="bg-white rounded-2xl shadow-lg p-4 mt-5">

        <h2 className="text-xl font-bold mb-4">
          Distribución de Calificaciones
        </h2>

        <GraficoCalificaciones
          rango13={rango13}
          rango46={rango46}
          rango710={rango710}
        />

      </div>

    </div>
  );
}