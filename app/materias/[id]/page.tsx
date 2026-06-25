import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default async function MateriaDetallePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: materia } = await supabase
    .from("materias")
    .select("*")
    .eq("id", id)
    .single();

  const { data: asignaciones } = await supabase
    .from("docente_curso_materia")
    .select(`
      id,
      ciclo_lectivo,
      docentes(
        id,
        apellido,
        nombre
      ),
      cursos(
        id,
        nombre
      )
    `)
    .eq("materia_id", id);

  if (!materia) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">
          Materia no encontrada
        </h1>
      </div>
    );
  }

  const totalDocentes = asignaciones?.length ?? 0;

  const cursos = [
    ...new Set(
      asignaciones?.map((a: any) => a.cursos?.nombre)
    ),
  ];

  return (
    <div className="min-h-screen bg-slate-100">

      {/* HERO */}

      <div className="bg-gradient-to-r from-indigo-700 via-blue-600 to-cyan-500">

        <div className="max-w-7xl mx-auto px-1 py-5">

          <Link
            href="/materias"
            className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-bold px-3 py-1 rounded-xl transition"
          >
            Volver
          </Link>

          <div className="mt-3 flex items-center justify-between">

            <div>

              <span className="uppercase tracking-widest text-cyan-100 text-sm">
                RITE Escolar
              </span>

              <h1 className="text-5xl font-black text-white mt-1">
                {materia.nombre}
              </h1>

              <p className="text-blue-100 mt-2 text-lg max-w-2xl">
                Información institucional de la materia,
                docentes asignados, cursos relacionados y
                datos académicos.
              </p>

            </div>

            <div className="hidden lg:flex">

              <div className="w-33 h-33 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-6xl">
                📚
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* CONTENIDO */}

      <div className="max-w-7xl mx-auto px-2 -mt">

        <div className="grid md:grid-cols-4 gap-5">

          <div className="bg-white rounded-3xl shadow-lg p-7">

            <p className="text-slate-500 font-bold text-sm">
              Año
            </p>

            <h2 className="text-4xl font-black mt-2 text-indigo-700">
              {materia.anio}°
            </h2>

          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6">

            <p className="text-slate-500 font-bold text-sm">
              Área
            </p>

            <h2 className="text-2xl font-bold mt-2">
              {materia.area}
            </h2>

          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6">

            <p className="text-slate-500 font-bold text-sm">
              Docentes
            </p>

            <h2 className="text-4xl font-black mt-2 text-emerald-600">
              {totalDocentes}
            </h2>

          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6">

            <p className="text-slate-500 font-bold text-sm">
              Cursos
            </p>

            <h2 className="text-4xl font-black mt-2 text-orange-500">
              {cursos.length}
            </h2>

          </div>

        </div>

        <div className="grid lg:grid-cols-3 gap-8 mt-5">

          <div className="lg:col-span-2">

            <div className="bg-white rounded-3xl shadow-lg p-5">

              <div className="flex items-center justify-between mb-5">

                <div>

                  <h2 className="text-3xl font-bold">
                    Información General
                  </h2>

                  <p className="text-slate-500 mt-2">
                    Datos principales de la materia.
                  </p>

                </div>

                <div className="text-5xl">
                  📖
                </div>

              </div>

              <div className="grid md:grid-cols-2 gap-6">

                <div className="bg-slate-50 rounded-2xl p-5">
                  <p className="text-slate-500">
                    Nombre
                  </p>

                  <h3 className="text-xl font-bold mt-2">
                    {materia.nombre}
                  </h3>
                </div>

                <div className="bg-slate-50 rounded-2xl p-5">
                  <p className="text-slate-500">
                    Área
                  </p>

                  <h3 className="text-xl font-bold mt-2">
                    {materia.area}
                  </h3>
                </div>

                <div className="bg-slate-50 rounded-2xl p-5">
                  <p className="text-slate-500">
                    Módulos
                  </p>

                  <h3 className="text-xl font-bold mt-2">
                    {materia.modulos ?? "-"}
                  </h3>
                </div>

                <div className="bg-slate-50 rounded-2xl p-5">
                  <p className="text-slate-500">
                    Orientación
                  </p>

                  <h3 className="text-xl font-bold mt-2">
                    {materia.orientacion ?? "-"}
                  </h3>
                </div>

              </div>

            </div>
                      </div>

          {/* PANEL DERECHO */}

          <div className="space-y-4">

            <div className="bg-white rounded-3xl shadow-lg p-5">

              <h2 className="text-xl font-bold mb-2">
                Resumen
              </h2>

              <div className="space-y-4">

                <div className="flex justify-between items-center">
                  <span className="text-slate-500">
                    Docentes
                  </span>

                  <span className="text-2xl font-bold text-indigo-600">
                    {totalDocentes}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-500">
                    Cursos
                  </span>

                  <span className="text-2xl font-bold text-emerald-600">
                    {cursos.length}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-500">
                    Módulos
                  </span>

                  <span className="text-2xl font-bold text-orange-500">
                    {materia.modulos ?? "-"}
                  </span>
                </div>

              </div>

            </div>

            <div className="bg-gradient-to-br from-indigo-600 to-blue-600 rounded-3xl text-white p-3">

              <h2 className="text-xl font-bold mb-1">
                Acciones
              </h2>

              <div className="space-y-3">

                <Link
                  href={`/materias/editar/${materia.id}`}
                  className="block text-center bg-white font-bold text-indigo-700 font-bold py-3 rounded-xl hover:bg-slate-100 transition"
                >
                  ✏️ Editar Materia
                </Link>

                <Link
                  href="/materias"
                  className="block text-center font-bold bg-white/20 hover:bg-white/30 py-3 rounded-xl transition"
                >
                  ← Volver al listado
                </Link>

              </div>

            </div>

          </div>

        </div>

        {/* DOCENTES */}

        <div className="mt-1">

          <div className="flex items-center justify-between mb-2">

            <div>

              <h2 className="text-3xl font-bold">
                Docentes Asignados
              </h2>

              <p className="text-slate-500">
                Profesores que dictan esta materia.
              </p>

            </div>

            <div className="bg-indigo-100 text-indigo-700 px-5 py-3 rounded-2xl font-bold">
              {totalDocentes} docentes
            </div>

          </div>

          {asignaciones && asignaciones.length > 0 ? (

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

              {asignaciones.map((item: any) => (

                <div
                  key={item.id}
                  className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition p-6 border border-slate-200"
                >

                  <div className="flex items-center gap-4">

                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 text-white flex items-center justify-center text-2xl font-black">

                      {item.docentes?.nombre?.charAt(0)}
                      {item.docentes?.apellido?.charAt(0)}

                    </div>

                    <div>

                      <h3 className="text-xl font-bold">

                        {item.docentes?.apellido},{" "}
                        {item.docentes?.nombre}

                      </h3>

                      <p className="text-slate-500">

                        {item.cursos?.nombre}

                      </p>

                    </div>

                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-3">

                    <div className="bg-slate-100 rounded-xl p-4">

                      <p className="text-xs text-slate-500">
                        Curso
                      </p>

                      <p className="font-bold mt-1">
                        {item.cursos?.nombre}
                      </p>

                    </div>

                    <div className="bg-slate-100 rounded-xl p-4">

                      <p className="text-xs text-slate-500">
                        Ciclo
                      </p>

                      <p className="font-bold mt-1">
                        {item.ciclo_lectivo}
                      </p>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          ) : (

            <div className="bg-white rounded-3xl shadow-lg border border-dashed border-slate-300 p-10 text-center">

              <div className="text-6xl mb-2">
                👨‍🏫
              </div>

              <h3 className="text-2xl font-bold">
                Sin docentes asignados
              </h3>

              <p className="text-slate-500 mt-2">
                Esta materia todavía no tiene asignaciones registradas.
              </p>

              <Link
                href="/asignaciones"
                className="inline-block mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition"
              >
                Ir a Asignaciones
              </Link>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}