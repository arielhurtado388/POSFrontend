import EditarProductoForm from "@/components/productos/EditarProductoForm";
import ProductoForm from "@/components/productos/ProductoForm";
import Heading from "@/components/ui/Heading";
import { ProductoSchema } from "@/src/schemas";
import Link from "next/link";
import { notFound } from "next/navigation";

async function obtenerProducto(id: string) {
  const url = `${process.env.API_URL}/productos/${id}`;
  const req = await fetch(url);
  const json = await req.json();
  if (!req.ok) {
    notFound();
  }
  const producto = ProductoSchema.parse(json);
  return producto;
}

type Params = Promise<{ id: string }>;

export default async function EditarProductoPage({
  params,
}: {
  params: Params;
}) {
  const { id } = await params;

  const producto = await obtenerProducto(id);

  return (
    <>
      <Link
        className="rounded bg-green-400 font-bold py-2 px-10"
        href={"/admin/productos?pagina=1"}
      >
        Volver
      </Link>

      <Heading>Editar Producto: {producto.nombre}</Heading>

      <EditarProductoForm>
        <ProductoForm producto={producto} />
      </EditarProductoForm>
    </>
  );
}
