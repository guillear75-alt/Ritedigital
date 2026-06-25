import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function AlertasPage() {

  // ALUMNOS

  const { count: sinTutor } = await supabase
    .from("alumnos")
    .select("*", { count: "exact", head: true })
    .is("tutor_nombre", null);

  const { count: sinTelefono } = await supabase
    .from("alumnos")
    .select("*", { count: "exact", head: true })
    .is("telefono", null);

  // DOCENTES

  const { count: docentesSinEmail } = await supabase
    .from("docentes")
    .select("*", { count: "exact", head: true })
    .is("email", null);

  // MATERIAS

  const { count: materias } = await supabase
    .from("materias")
    .select("*", { count: "exact", head: true });

  const { count: asignadas } = await supabase
    .from("docente_curso_materia")
    .select("materia_id", {
      count: "exact",
      head: true,
    });

  const materiasSinDocente =
    (materias ?? 0) - (asignadas ?? 0);

  const alertasCriticas =
    materiasSinDocente;

  const alertasAdvertencia =
    (sinTutor ?? 0) +
    (sinTelefono ?? 0) +
    (docentesSinEmail ?? 0);

    return (

    <div className="min-h-screen bg-slate-100 p-8">

      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between items-center mb-8">

          <div>

            <h1 className="text-4xl font-black">
              🚨 Centro de Alertas
            </h1>

            <p className="text-slate-500 mt-2">
              Estado general del establecimiento.
            </p>

          </div>

          <Link
            href="/dashboard/secretario"
            className="bg-slate-700 hover:bg-slate-800 text-white px-5 py-3 rounded-xl"
          >
            ← Dashboard
          </Link>

        </div>

    <div className="grid md:grid-cols-3 gap-6 mb-10">

  <div className="bg-red-500 text-white rounded-3xl p-8">

    <p>Críticas</p>

    <h2 className="text-5xl font-black mt-3">
      {alertasCriticas}
    </h2>

  </div>

  <div className="bg-amber-500 text-white rounded-3xl p-8">

    <p>Advertencias</p>

    <h2 className="text-5xl font-black mt-3">
      {alertasAdvertencia}
    </h2>

  </div>

  <div className="bg-emerald-500 text-white rounded-3xl p-8">

    <p>Estado</p>

    <h2 className="text-3xl font-black mt-4">

      {alertasCriticas === 0
        ? "Excelente"
        : "Revisar"}

    </h2>

  </div>

</div>
<div className="grid lg:grid-cols-2 gap-6">

  {/* Materias sin docente */}

  <div className="bg-white rounded-3xl shadow-lg p-6 border-l-8 border-red-500">

    <div className="flex justify-between items-center">

      <div>

        <h2 className="text-xl font-bold text-red-600">
          🚨 Materias sin docente
        </h2>

        <p className="text-slate-500 mt-1">
          Materias que todavía no tienen un profesor asignado.
        </p>

      </div>

      <span className="text-5xl font-black text-red-500">
        {materiasSinDocente}
      </span>

    </div>

    <Link
      href="/materias"
      className="mt-6 inline-block bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-xl"
    >
      Ver materias
    </Link>

  </div>

  {/* Alumnos sin tutor */}

  <div className="bg-white rounded-3xl shadow-lg p-6 border-l-8 border-amber-500">

    <div className="flex justify-between items-center">

      <div>

        <h2 className="text-xl font-bold text-amber-600">
          👨‍🎓 Alumnos sin tutor
        </h2>

        <p className="text-slate-500 mt-1">
          Alumnos que no tienen un tutor registrado.
        </p>

      </div>

      <span className="text-5xl font-black text-amber-500">
        {sinTutor}
      </span>

    </div>

    <Link
      href="/alumnos"
      className="mt-6 inline-block bg-amber-500 hover:bg-amber-600 text-white px-5 py-3 rounded-xl"
    >
      Ver alumnos
    </Link>

  </div>

  {/* Alumnos sin teléfono */}

  <div className="bg-white rounded-3xl shadow-lg p-6 border-l-8 border-yellow-500">

    <div className="flex justify-between items-center">

      <div>

        <h2 className="text-xl font-bold text-yellow-600">
          📞 Alumnos sin teléfono
        </h2>

        <p className="text-slate-500 mt-1">
          Es recomendable completar los datos de contacto.
        </p>

      </div>

      <span className="text-5xl font-black text-yellow-500">
        {sinTelefono}
      </span>

    </div>

    <Link
      href="/alumnos"
      className="mt-6 inline-block bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-3 rounded-xl"
    >
      Ver alumnos
    </Link>

  </div>

  {/* Docentes sin email */}

  <div className="bg-white rounded-3xl shadow-lg p-6 border-l-8 border-blue-500">

    <div className="flex justify-between items-center">

      <div>

        <h2 className="text-xl font-bold text-blue-600">
          👩‍🏫 Docentes sin email
        </h2>

        <p className="text-slate-500 mt-1">
          Docentes con datos de contacto incompletos.
        </p>

      </div>

      <span className="text-5xl font-black text-blue-500">
        {docentesSinEmail}
      </span>

    </div>

    <Link
      href="/docentes"
      className="mt-6 inline-block bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-xl"
    >
      Ver docentes
    </Link>

  </div>

</div>
      </div>
    </div>
  );
}