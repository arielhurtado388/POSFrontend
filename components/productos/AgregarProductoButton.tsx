"use client";

import { Producto } from "@/src/schemas";
import { useTienda } from "@/src/store";

export default function AgregarProductoButton({
  producto,
}: {
  producto: Producto;
}) {
  const agregarAlCarrito = useTienda((state) => state.agregarAlCarrito);
  return (
    <button type="button" className="absolute top-5 -right-3">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-8 h-8 bg-indigo-600 rounded-full text-white"
        onClick={() => agregarAlCarrito(producto)}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </button>
  );
}
