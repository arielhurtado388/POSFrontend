"use client";

import { useTienda } from "@/src/store";
import ItemCarrito from "./ItemCarrito";

export default function CarritoCompras() {
  const contenido = useTienda((state) => state.contenido);
  return (
    <>
      <h2 className="text-3xl font-bold text-shadow-gray-900">
        Resumen de venta
      </h2>
      <ul
        role="list"
        className="mt-6 divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-gray-500"
      >
        {contenido.map((item) => (
          <ItemCarrito key={item.productoId} item={item} />
        ))}
      </ul>
    </>
  );
}
