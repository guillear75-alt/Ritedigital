import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function DocumentacionAlumnoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: alumno } = await supabase
    .from("alumnos")
    .select("*")
    .eq("id", id)
    .single();

  if (!alumno) {
    return (
      <div className="p-8">
        Alumno no encontrado.
      </div>
    );

  }
const documentos = [
  {
    titulo: "Informe de Valoraciones",
    descripcion: "Primer informe pedagógico del alumno.",
    icono: "📘",
    estado: "Disponible",
    color: "green",
    ruta: "valoraciones",
  },
  {
    titulo: "Boletín de Calificaciones",
    descripcion: "Calificaciones del ciclo lectivo.",
    icono: "📗",
    estado: "Disponible",
    color: "green",
    ruta: "calificaciones",
  },
  {
    titulo: "Pase a otra Escuela",
    descripcion: "Documento de pase institucional.",
    icono: "📄",
    estado: "En desarrollo",
    color: "amber",
    ruta: "pase",
  },
  {
    titulo: "Alumno Regular",
    descripcion: "Certificado oficial.",
    icono: "🎓",
    estado: "En desarrollo",
    color: "amber",
    ruta: "certificado",
  },
  {
    titulo: "Trayectoria Educativa",
    descripcion: "Historial completo del alumno.",
    icono: "📑",
    estado: "En desarrollo",
    color: "amber",
    ruta: "trayectoria",
  },
];

  return (

    <div className="min-h-screen bg-slate-100 p-8">

      <div className="max-w-7xl mx-auto">

        {/* Volver */}

        <Link
          href="/imprimir"
          className="text-indigo-600 hover:text-indigo-800"
        >
          ← Nueva búsqueda
        </Link>

       {/* Cabecera */}

<div className="bg-white rounded-3xl shadow-lg p-5 mt-3">

  <div className="flex justify-between items-start gap-6">

    {/* Datos del alumno */}

    <div className="flex items-start gap-6">

      <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center text-4xl">
        👤
      </div>

      <div>

        <h1 className="text-4xl font-black text-slate-900">
          {alumno.apellido}, {alumno.nombre}
        </h1>

        <p className="text-slate-500 mt-1">
          Documentación Oficial del Alumno
        </p>

        <div className="grid grid-cols-2 gap-x-7 gap-y-3 mt-3 text-lg">

          <div>
            <span className="font-bold text-slate-700">
              DNI
            </span>

            <p>{alumno.dni}</p>
          </div>

          <div>
            <span className="font-bold text-slate-700">
              Curso
            </span>

            <p>{alumno.curso || "-"}</p>
          </div>

          <div>
            <span className="font-bold text-slate-700">
              Fecha de nacimiento
            </span>

            <p>
              {alumno.fecha_nacimiento || "-"}
            </p>
          </div>

          <div>
            <span className="font-bold text-slate-700">
              Estado
            </span>

            <span className="inline-flex bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
              ACTIVO
            </span>
          </div>

        </div>

      </div>

    </div>

    {/* Panel lateral */}

    <div className="bg-slate-900 rounded-2xl px-5 py-4 text-white w-72">

  <h2 className="text-lg font-bold">
    📑 RITE Escolar
  </h2>

  <p className="text-slate-300 text-sm mt-1">
    Centro de Documentación
  </p>

  <div className="border-t border-slate-700 mt-3 pt-3 space-y-2 text-sm">

    <div className="flex justify-between">
      <span>Documentos</span>
      <strong>{documentos.length}</strong>
    </div>

    <div className="flex justify-between">
      <span>Ciclo</span>
      <strong>2026</strong>
    </div>

  </div>

</div>
      

  </div>

</div>

        {/* Documentos */}

<h2 className="text-3xl font-bold mt-5 mb-2">
  📑 Documentación disponible
</h2>

<div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">

  {documentos.map((doc) => (

    <div
      key={doc.ruta}
      className="bg-white rounded-3xl shadow-lg p-5 hover:shadow-xl transition duration-300"
    >

      <div className="flex justify-between items-start">

        <div>

          <div className="text-3xl">
            {doc.icono}
          </div>

          <h3 className="text-xl font-bold mt-2">
            {doc.titulo}
          </h3>

          <p className="text-slate-500 text-sm mt-2">
            {doc.descripcion}
          </p>

        </div>

        <span
          className={
            doc.color === "green"
              ? "bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full"
              : "bg-amber-100 text-amber-700 text-xs font-semibold px-3 py-1 rounded-full"
          }
        >
          {doc.estado}
        </span>

      </div>

      <div className="border-t mt-5 pt-4 flex gap-3">

        <Link
          href={`/imprimir/alumno/${id}/${doc.ruta}`}
          className="flex-1 bg-slate-700 hover:bg-slate-800 text-white rounded-xl py-2 text-center font-semibold transition"
        >
          👁 Abrir
        </Link>

        <button
          disabled
          className="flex-1 bg-indigo-600 text-white rounded-xl py-2 font-semibold opacity-60 cursor-not-allowed"
        >
          🖨 Imprimir
        </button>

      </div>

    </div>

  ))}

</div>
      </div>

    </div>
  );
}