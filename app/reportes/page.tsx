import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default async function ReportesPage() {

  const { data: alumnos } = await supabase
  .from("alumnos")
  .select("*")
  .order("curso")
  .order("apellido");

  return (

    
    
    <div className="p-5">
      

      <div className="flex gap-3 mb-3">

        
        <Link
          href="/reportes/curso"
          className="bg-green-800 text-white font-bold px-3 py-2 rounded-xl"
        >
          Reportes por Curso
        </Link>

         <Link
          href="/dashboard"
          className="bg-green-800 text-white font-bold px-3 py-2 rounded-xl"
        >
          Dashboard
        </Link>

      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">

  <h1 className="text-3xl font-bold">
    Centro de Reportes
  </h1>

  <p className="text-slate-500 mt-2">
    Seleccione un alumno para visualizar su ficha pedagógica completa.
  </p>

</div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">

  {alumnos?.map((alumno) => (

    <div
  key={alumno.id}
  className="bg-white rounded-2xl shadow-lg p-5"
>

  <div className="flex items-center justify-between">

    <div className="w-11 h-11 rounded-full bg-blue-900 text-white flex items-center justify-center text-lg font-bold">
      {alumno.apellido?.charAt(0)}
      {alumno.nombre?.charAt(0)}
    </div>

    <span className="text-xm bg-blue-100 font-bold text-blue-800 px-2 py-1 rounded-full">
      {alumno.curso || "Sin curso"}
    </span>

  </div>

  <h3 className="font-bold text-lg mt-3">
    {alumno.apellido}, {alumno.nombre}
  </h3>

  
  <p className="text-sm text-slate-500">
    DNI: {alumno.dni || "-"}
  </p>

  <Link
    href={`/reportes/${alumno.id}`}
    className="
      mt-4
      block
      text-center
      bg-blue-600
      hover:bg-blue-700
      text-white
      py-2
      rounded-xl
    "
  >
    Ver Reporte
  </Link>

</div>

  ))}

</div>

    </div>
  );
}