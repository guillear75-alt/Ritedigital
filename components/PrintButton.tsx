"use client";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="
        bg-indigo-600
        hover:bg-indigo-700
        text-white
        px-5
        py-3
        rounded-xl
        font-semibold
        shadow
        transition
      "
    >
      🖨 Imprimir
    </button>
  );
}