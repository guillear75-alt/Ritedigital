import { importarDocentes } from "../actions";

export default function ImportarDocentesPage() {
  return (
    <div className="p-8 max-w-xl">
      <h1 className="text-2xl font-bold mb-6">
        Importar Docentes
      </h1>

      <form action={importarDocentes}>
        <input
          type="file"
          name="archivo"
          accept=".xlsx,.xls"
          required
          className="mb-4"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Importar
        </button>
      </form>
    </div>
  );
}