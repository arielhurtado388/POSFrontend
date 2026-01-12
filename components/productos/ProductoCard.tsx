import { Producto } from "@/src/schemas";
import { formatearMoneda } from "@/src/utils";
import Image from "next/image";
import AgregarProductoButton from "./AgregarProductoButton";

export default function ProductoCard({ producto }: { producto: Producto }) {
  return (
    <div className="rounded bg-white shadow relative p-5">
      <div>
        <Image
          src={`${process.env.API_URL}/img/${producto.imagen}`}
          alt={`${producto.nombre}`}
          width={400}
          height={600}
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
      <AgregarProductoButton producto={producto} />
    </div>
  );
}
