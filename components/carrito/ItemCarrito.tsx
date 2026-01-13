import { Item } from "@/src/schemas";
import { useTienda } from "@/src/store";
import { formatearMoneda } from "@/src/utils";
import Image from "next/image";

export default function ItemCarrito({ item }: { item: Item }) {
  const actualizarCantidad = useTienda((state) => state.actualizarCantidad);
  const eliminarDelCarrito = useTienda((state) => state.eliminarDelCarrito);
  return (
    <li className="flex items-center space-x-6 py-6 relative">
      <div className="h-24 w-24">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}/img/${item.imagen}`}
          alt={`${item.nombre}`}
          width={100}
          height={100}
          loading="eager"
          unoptimized
        />
      </div>
      <div className="flex-auto space-y-2">
        <h3 className="text-gray-900">{item.nombre}</h3>
        <p>{formatearMoneda(item.precio)}</p>
        <select
          className="w-32 text-center p-2 rounded-lg bg-gray-100"
          value={item.cantidad}
          onChange={(e) => actualizarCantidad(item.productoId, +e.target.value)}
        >
          {Array.from({ length: item.inventario }, (_, index) => index + 1).map(
            (num) => (
              <option key={num} value={num}>
                {num}
              </option>
            )
          )}
        </select>
      </div>
      <div className="absolute top-10 -right-0">
        <button
          type="button"
          onClick={() => eliminarDelCarrito(item.productoId)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-8 h-8 text-red-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </div>
    </li>
  );
}
