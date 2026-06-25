import { supabase } from "@/lib/supabase";
import ProteccionRol from "@/components/ProteccionRol";

export default async function DashboardSecretarioPage() {

  const { count: alumnos } = await supabase
    .from("alumnos")
    .select("*", { count: "exact", head: true });

  const { count: docentes } = await supabase
    .from("docentes")
    .select("*", { count: "exact", head: true });

  const { count: cursos } = await supabase
    .from("cursos")
    .select("*", { count: "exact", head: true });

  const { count: materias } = await supabase
    .from("materias")
    .select("*", { count: "exact", head: true });

  const { count: matriculas } = await supabase
    .from("alumno_curso")
    .select("*", { count: "exact", head: true });

  const { data: ultimosAlumnos } = await supabase
  .from("alumnos")
  .select("id, apellido, nombre")
  .order("id", { ascending: false })
  .limit(5);

  const { count: sinTelefono } = await supabase
  .from("alumnos")
  .select("*", { count: "exact", head: true })
  .is("telefono", null);

  return (
    <div className="p-5">

      <h1 className="text-4xl font-bold mb-8">
        Dashboard Secretaría
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">

        <div className="bg-slate-900 rounded-2xl p-6 shadow">
          <h2 className="text-slate-200">Alumnos</h2>
          <p className="text-4xl font-bold text-white">
            {alumnos ?? 0}
          </p>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6 shadow">
          <h2 className="text-slate-200">Docentes</h2>
          <p className="text-4xl font-bold text-white">
            {docentes ?? 0}
          </p>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6 shadow">
          <h2 className="text-slate-200">Cursos</h2>
          <p className="text-4xl font-bold text-white">
            {cursos ?? 0}
          </p>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6 shadow">
          <h2 className="text-slate-200">Materias</h2>
          <p className="text-4xl font-bold text-white">
            {materias ?? 0}
          </p>
        </div>

        <div className="bg-blue-600 rounded-2xl p-6 shadow">
          <h2 className="text-white">Matrículas</h2>
          <p className="text-4xl font-bold text-white">
            {matriculas ?? 0}
          </p>
        </div>
        

      </div>
      <div className="mt-7">
  <h2 className="text-2xl font-bold mb-4">
    Accesos rápidos
  </h2>

  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

    <a
      href="/alumnos/nuevo"
      className="bg-white font-bold rounded-xl p-4 shadow hover:shadow-lg transition"
    >
       Nuevo Alumno
    </a>

    <a
      href="/docentes/nuevo"
      className="bg-white font-bold rounded-xl p-4 shadow hover:shadow-lg transition"
    >
       Nuevo Docente
    </a>

    <a
      href="/alumnos/importar"
      className="bg-white  font-bold rounded-xl p-4 shadow hover:shadow-lg transition"
    >
       Importar Excel
    </a>

    <a
      href="/reportes"
      className="bg-white font-bold rounded-xl p-4 shadow hover:shadow-lg transition"
    >
       Reportes
    </a>

  </div>
</div>
<div className="bg-white rounded-2xl shadow p-6 mt-8">
  <h2 className="text-xl font-bold mb-4">
    Últimos alumnos incorporados
  </h2>

  <div className="space-y-2">
    {ultimosAlumnos?.map((alumno) => (
      <div
        key={alumno.id}
        className="flex items-center justify-between bg-slate-50 rounded-xl p-3 hover:bg-slate-200 transition"
      >
        <div>
          <p className="font-bold text-slate-800">
            {alumno.apellido}, {alumno.nombre}
          </p>
          <p className="text-sm text-slate-500">
            ID: {alumno.id}
          </p>
        </div>

        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm">
          Alumno
        </span>
      </div>
    ))}
  </div>
</div>

<div className="bg-red-50 border border-red-200 rounded-2xl p-6 mt-8">
  <h2 className="text-xl font-bold text-red-700 mb-2">
    Alertas
  </h2>

  <p>
    Alumnos sin teléfono registrado: {sinTelefono ?? 0}
  </p>
</div>

    </div>
  );
}