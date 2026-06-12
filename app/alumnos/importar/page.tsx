import { importarAlumnos } from "../actions";

export default function ImportarAlumnosPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Importar Alumnos
      </h1>

      <form
        action={importarAlumnos}
        className="bg-white p-6 rounded-xl shadow"
      >
        <input
          type="file"
          name="archivo"
          accept=".xlsx,.xls"
          required
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Importar Excel
        </button>
      </form>
    </div>
  );
}