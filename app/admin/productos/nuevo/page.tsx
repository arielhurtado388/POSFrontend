export const dynamic = "force-dynamic";

import AgregarProductoForm from "@/components/productos/AgregarProductoForm";
import ProductoForm from "@/components/productos/ProductoForm";
import Heading from "@/components/ui/Heading";
import Link from "next/link";

export default function NuevoProductoPage() {
  return (
    <>
      <Link
        className="rounded bg-green-400 font-bold py-2 px-10"
        href={"/admin/productos?pagina=1"}
      >
        Volver
      </Link>

      <Heading>Nuevo Producto</Heading>

      <AgregarProductoForm>
        <ProductoForm />
      </AgregarProductoForm>
    </>
  );
}
