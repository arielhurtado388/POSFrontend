"use client";

import { useTienda } from "@/src/store";
import ItemCarrito from "./ItemCarrito";
import Cantidad from "./Cantidad";
import CuponForm from "./CuponForm";

export default function CarritoCompras() {
  const contenido = useTienda((state) => state.contenido);
  const total = useTienda((state) => state.total);
  const descuento = useTienda((state) => state.descuento);
  return (
    <>
      {contenido.length ? (
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
          <dl className="space-y-6 border-t border-gray-300 py-6 text-sm font-medium text-gray-500">
            {descuento ? (
              <Cantidad
                titulo="Descuento"
                cantidad={descuento}
                descuento={true}
              />
            ) : null}
            <Cantidad titulo="Total a pagar" cantidad={total} />
          </dl>
          <CuponForm />
        </>
      ) : (
        <p className="text-center text-xl text-gray-900">
          El carrito está vacío
        </p>
      )}
    </>
  );
}
