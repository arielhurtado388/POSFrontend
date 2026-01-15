import { Producto } from "@/src/schemas";
import {
  estaDisponible,
  formatearMoneda,
  obtenerRutaImagen,
} from "@/src/utils";
import Image from "next/image";
import AgregarProductoButton from "./AgregarProductoButton";

export default function ProductoCard({ producto }: { producto: Producto }) {
  return (
    <div className="rounded bg-white shadow relative p-5">
      <div
        className={`${!estaDisponible(producto.inventario) && "opacity-40"}`}
      >
        <Image
          src={obtenerRutaImagen(producto.imagen)}
          alt={`${producto.nombre}`}
          width={400}
          height={600}
          loading="eager"
          unoptimized
        />

        <div className="p-3 space-y-2">
          <h3 className="text-xl font-bold text-gray-600">{producto.nombre}</h3>
          <p className="text-gray-500">Disponibles: {producto.inventario}</p>
          <p className="text-2xl font-extrabold  text-gray-900">
            {formatearMoneda(producto.precio)}
          </p>
        </div>
      </div>
      {estaDisponible(producto.inventario) ? (
        <AgregarProductoButton producto={producto} />
      ) : (
        <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white opacity-60 w-full text-center py-5 text-2xl uppercase font-black">
          Agotado
        </p>
      )}
    </div>
  );
}
