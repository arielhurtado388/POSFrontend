import { Venta } from "@/src/schemas";
import { formatearMoneda, obtenerRutaImagen } from "@/src/utils";
import Image from "next/image";

export default function VentaResumen({ venta }: { venta: Venta }) {
  return (
    <>
      <div className="mb-6  text-sm font-medium text-gray-500 border border-gray-200">
        <p className="text-sm font-black text-gray-900 p-2 bg-gray-200 ">
          ID: {venta.id}
        </p>
        <ul
          role="list"
          className="divide-y divide-gray-200 border-t border-gray-200 border-b"
        >
          {venta.contenido.map((item) => (
            <li key={item.id} className="p-5">
              <div className="flex items-center space-x-6 ">
                <div className="relative w-32 h-32">
                  <Image
                    src={obtenerRutaImagen(item.producto.imagen)}
                    alt={`${item.producto.nombre}`}
                    fill
                    unoptimized
                    loading="eager"
                  />
                </div>
                <div className="flex-auto space-y-1 ">
                  <h3 className="text-gray-900">{item.producto.nombre}</h3>
                  <p className="text-lg font-extrabold  text-gray-900">
                    {formatearMoneda(+item.precio)}
                  </p>
                  <p className="text-lg  text-gray-900">
                    Cantidad: {item.cantidad}{" "}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <dl className="space-y-6  text-sm font-medium text-gray-500 p-5">
          {venta.cupon && (
            <>
              <div className="flex justify-between">
                <dt>Cupón Utilizado</dt>
                <dd className="text-gray-900">{venta.cupon}</dd>
              </div>

              <div className="flex justify-between">
                <dt>Descuento</dt>
                <dd className="text-gray-900">
                  - {formatearMoneda(+venta.descuento!)}
                </dd>
              </div>
            </>
          )}

          <div className="flex justify-between">
            <dt className="text-lg text-black font-black">Total</dt>
            <dd className="text-lg text-black font-black">
              {formatearMoneda(+venta.total)}
            </dd>
          </div>
        </dl>
      </div>
    </>
  );
}
