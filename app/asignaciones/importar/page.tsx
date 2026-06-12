import { importarAsignaciones } from "../actions";

export default function ImportarAsignacionesPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">
        Importar Asignaciones desde Horario
      </h1>

      <form
        action={importarAsignaciones}
        className="space-y-4"
      >
        <input
          type="file"
          name="archivo"
          accept=".xlsx,.xls"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Importar Horario
        </button>
      </form>
    </div>
  );
}