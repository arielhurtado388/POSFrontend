import ProductosTabla from "@/components/productos/ProductoTabla";
import Heading from "@/components/ui/Heading";
import { ProductosResponseSchema } from "@/src/schemas";

async function obtenerProductos() {
  const url = `${process.env.API_URL}/productos`;
  const req = await fetch(url);
  const json = await req.json();
  const data = ProductosResponseSchema.parse(json);
  return {
    productos: data.productos,
    total: data.total,
  };
}

export default async function ProductosPage() {
  const { total, productos } = await obtenerProductos();
  return (
    <>
      <Heading>Administrar productos</Heading>
      <ProductosTabla productos={productos} />
    </>
  );
}
